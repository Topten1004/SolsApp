import ActionTypes from "./actionTypes";

import { db, auth } from "../../firebase/database";
import { doc, setDoc, getDoc, updateDoc, getDocs, query, collection, orderBy, where, increment } from 'firebase/firestore' ;
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage' ;
import { getCookie, getUuid } from "../../utils/Helper";
import { BalanceByAccount, FetchNFTsByOwner, FetchBidsByOwner, FetchOrdersByBidder , FetchNFTById} from "../../transactions/fetch";

export const ProductsInfoList = () => async dispatch => {
    try {
        let querySnapshots = await getDocs(collection(db, "Web_Products"), where("creator_id", "=", getUuid(getCookie('_SOLSTICE_AUTHUSER')))) ;

        let productsInfoList = [] ;

        await Promise.all(
            querySnapshots.docs.map(async doc => {
                productsInfoList.push({
                    ...doc.data(),
                    id : doc.id
                })
            })
        )

        await dispatch({
            type : ActionTypes.ProductsInfoList,
            payload : productsInfoList
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    } 
}
export const UserBidsInfoList = (web3Provider) => async dispatch => {
    try {
        let userSnap = await getDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER')))) ;

        let bids = [] ;

        let wallets = userSnap.data().wallets ;

        await Promise.all(
            wallets.map(async (wallet) => {
                let _bids = await FetchBidsByOwner(web3Provider, wallet) ;
                _bids = await Promise.all(
                    _bids.map(async _bid => {
                        let bidDocs = await getDocs(query(collection(db, "Web_Bids"), where("bid_id", '==', _bid.bid_id))) ;

                        let to_user = await getDoc(doc(db,  "Web_Users", bidDocs.docs[0].data().to)) ;

                        let nft = await FetchNFTById(web3Provider, _bid.nft_id) ;

                        let productDoc = await getDoc(doc(db, "Web_Products", nft.uri)) ;

                        return {    
                            ..._bid,
                            bidder : {
                                id : to_user.id,
                                profile_link : to_user.data().profile_link,
                                account_name : to_user.data().account_name,
                                email : to_user.data().email
                            },
                            product : {
                                name : productDoc.data().master_piece,
                                type : productDoc.data().product_type
                            }
                        }
                    })
                )
                bids = bids.concat(_bids) ;
            })
        )

        await dispatch({
            type : ActionTypes.UserBidsInfoList,
            payload : bids
        }) ;

        return true ;

    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const UserOrdersInfoList = (web3Provider) => async dispatch => {
    try {
        let userSnap = await getDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER')))) ;

        let orders = [] ;

        let wallets = userSnap.data().wallets ;

        await Promise.all(
            wallets.map(async (wallet, index) => {
                let _orders = await FetchOrdersByBidder(web3Provider, wallet) ;
                _orders = await Promise.all(
                    _orders.map(async _order => {
                        let bidDocs = await getDocs(query(collection(db, "Web_Bids"), where("bid_id", '==', _order.bid_id))) ;
                        
                        let from_user = await getDoc(doc(db,  "Web_Users", bidDocs.docs[0].data().from)) ;

                        let nft = await FetchNFTById(web3Provider, _order.nft_id) ;

                        let productDoc = await getDoc(doc(db, "Web_Products", nft.uri)) ;

                        // let nft_info = await 
                        return {    
                            ..._order,
                            creator : {
                                id : from_user.id,
                                profile_link : from_user.data().profile_link,
                                account_name : from_user.data().account_name,
                                email : from_user.data().email
                            },
                            product : {
                                name : productDoc.data().master_piece,
                                type : productDoc.data().product_type
                            }
                        }
                    })
                )
                orders = orders.concat(_orders) ;
            })
        )

        await dispatch({
            type : ActionTypes.UserOrdersInfoList,
            payload : orders
        }) ;

        return true ;

    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const UserNFTsInfoList = (web3Provider) => async dispatch => {
    try {
        let userSnap = await getDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER')))) ;

        let nfts = [] ;

        let wallets = userSnap.data().wallets ;

        await Promise.all(
            wallets.map(async (wallet, index) => {
                let _nfts = await FetchNFTsByOwner(web3Provider, wallet) ;

                let _detail_nfts = [] ;

                await Promise.all(
                    _nfts.map( async _nft => {
                        let _nft_count = await BalanceByAccount(web3Provider, _nft.nft_id, wallet) ;
                        let nft_price ;

                        switch(_nft.price_id) {
                            case 1 :
                                nft_price = _nft.minimum_bidding;
                                break ;
                            default :
                                break ;
                        }

                        _detail_nfts.push({
                            ..._nft,
                            nft_count : _nft_count,
                            nft_price: nft_price
                        }) ;
                    })
                )
                nfts = nfts.concat(_detail_nfts) ;
            })
        )

        await dispatch({
            type : ActionTypes.UserNFTsInfoList,
            payload : nfts
        }) ;

        return true ;

    } catch(err) {
        console.log(err) ;
        return true ;
    }
}
export const UserTxsInfoList = (web3Provider) => async dispatch => {
    try {
        let userSnap = await getDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER')))) ;

        let txsList = [] ;

        let wallets = userSnap.data().wallets ;

        await Promise.all(
            wallets.map(async (wallet, index) => {
                let _txs = await FetchOrdersByBidder(web3Provider, wallet) ;
                
                txsList = txsList.concat(_txs) ;
                
                _txs = await FetchBidsByOwner(web3Provider, wallet) ;

                txsList = txsList.concat(_txs) ;
            })
        )

        await dispatch({
            type : ActionTypes.UserTxsInfoList,
            payload : txsList
        }) ;

        return true ;

    } catch(err) {
        console.log(err) ;
        return false ;
    }
 
}
export const UpdateResellerCount = () => async dispatch => {
    try {
        await updateDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER'))),{
            reseller_count : increment(1)
        }) ;
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const UpdateBuyerWallets = (buyer_id, buyer_wallet) => async dispatch => {
    try {
        let buyerDoc = await getDoc(doc(db, "Web_Users", buyer_id)) ;

        if(!buyerDoc.data().wallets.includes(buyer_wallet)) {
            await updateDoc(doc(db, "Web_Users", buyer_id), {
                wallets : [...buyerDoc.data().wallets, buyer_wallet] 
            }) ;
        }

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const LoadingTransaction = (isLoading) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.LoadingTransaction,
            payload : isLoading
        })
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

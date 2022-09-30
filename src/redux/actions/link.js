import ActionTypes from "./actionTypes";

import { db, auth } from "../../firebase/database";
import { doc, setDoc, getDoc, updateDoc, getDocs, query, collection, orderBy, where, Timestamp, addDoc, increment } from 'firebase/firestore' ;
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage' ;
import { getCookie, getProductId, setCookie, getUuid } from "../../utils/Helper";

import { FetchNFTsByOwner } from '../../transactions/fetch' ;

export const UpdateBidDB = () => async dispatch => {
    try {
        let querySnapshots = await getDocs(collection(db, 'Web_Bids')) ;

        let new_bid_id = querySnapshots.docs.length ;

        await addDoc(collection(db, 'Web_Bids'), {
            from : getCookie('_SOLSTICE_SELLER') ,
            to : getCookie('_SOLSTICE_BUYER') ,
            bid_id : new_bid_id
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const UpdateResellerCount = () => async dispatch => {
    try {
        await updateDoc(doc(db, "Web_Users", getCookie('_SOLSTICE_SELLER')), {
            reseller_count : increment(1)
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const UpdateWalletInfo = (web3Provider) => async dispatch => {
    try {
        const signer = web3Provider.getSigner() ;
        const address = await signer.getAddress();

        let userSnap = await getDoc(doc(db, "Web_Users", getCookie('_SOLSTICE_BUYER'))) ;

        if(!userSnap.data().wallets.includes(address)) {
            await updateDoc(doc(db, "Web_Users", getCookie('_SOLSTICE_BUYER')), {
                wallets : [...userSnap.data().wallets, address] 
            }) ;
        }

    } catch(err) {
        console.log(err) ;
        return true ;
    }
} 
export const UpdateBundleInfo = (buyerInfo, product_id) => async dispatch => {
    try {
        let productDoc = await getDoc(doc(db, "Web_Products", product_id)) ;

        let new_release_date ;

        if( new Date().getTime() - new Date(productDoc.data().release_date).getTime() > 7 * 24 * 60 * 60 * 1000) {
            new_release_date = new Date().getTime() + 7 * 24 * 60 * 60 * 1000 ;
        } else {
            new_release_date = new Date(productDoc.data().release_date).getTime() + 7 * 24 * 60 * 60 * 1000 ;
        }
        let buyers = productDoc.data().buyers ;

        if(!buyerInfo) {
            buyers[getCookie('_SOLSTICE_BUYER')] = {
                paid_at : new Date().toLocaleDateString(),
                buyer_id : getCookie('_SOLSTICE_BUYER')
            }
            await updateDoc(doc(db, "Web_Products", product_id), {
                buyers : {...buyers},
                release_date : new Date(new_release_date).toLocaleDateString()
            }) ;

            return true ;
        } else {
            let temp = {...buyers} ;

            temp[buyerInfo.buyer_id] = {
                ...temp[buyerInfo.buyer_id],
                paid_at : new Date().toLocaleDateString()
            } ;

            await updateDoc(doc(db, "Web_Products", product_id), {
                buyers : {...temp},
            }) ;

            return true ;
        }
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const ProfileInfoByLink = (profile_link) => async dispatch => {
    try {

        let querySnapShot = await getDocs(query(collection(db, "Web_Users") , where("profile_link", "==", profile_link))) ;

        if(querySnapShot.size === 1) {

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
            const d = new Date(querySnapShot.docs[0].data().joined_date.toDate());
            let month = months[d.getMonth()];
    
            await dispatch({
                type : ActionTypes.ProfileInfoByLink,
                payload : {
                    fullName : querySnapShot.docs[0].data().full_name,
                    coverPictureUrl : querySnapShot.docs[0].data().cover_picture_url,
                    profilePictureUrl : querySnapShot.docs[0].data().profile_picture_url,
                    productTypeList : querySnapShot.docs[0].data().product_type_list,
                    jobTag : querySnapShot.docs[0].data().job_tag,
                    accountName : querySnapShot.docs[0].data().account_name,
                    productCount : querySnapShot.docs[0].data().product_count,
                    platformCount : querySnapShot.docs[0].data().platform_count,
                    resellerCount : querySnapShot.docs[0].data().reseller_count,
                    joinedDate : month + " " + d.getFullYear(),
                    hostId : querySnapShot.docs[0].data().host_id,
                    profileMessage : querySnapShot.docs[0].data().profile_message,
                }
            });

            setCookie('_SOLSTICE_SELLER', querySnapShot.docs[0].id) ;

            return true ;
        } else {
            return false ;
        }
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const UserAllNFTsByLink = (web3Provider) => async dispatch => {
    try {
        let userSnap = await getDoc(doc(db, "Web_Users", getCookie('_SOLSTICE_SELLER'))) ;

        let nfts = [] ;

        let wallets = userSnap.data().wallets ;

        await Promise.all(
            wallets.map(async (wallet, index) => {
                let _nfts = await FetchNFTsByOwner(web3Provider, wallet) ;

                nfts = nfts.concat(_nfts) ;
            })
        )

        let nftsList = [] ;


        await Promise.all(
            nfts.map(async nft => {
                let solsList = [] ;

                let productDoc = await getDoc(doc(db, "Web_Products", nft.uri)) ;

                let querySnapshot_solts = await getDocs(query(collection(db, "Web_Solts"), where('product_id', '==', nft.uri))) ;
                for(let solt of querySnapshot_solts.docs) {
                    solsList.push({
                        ...solt.data(),
                        id : solt.id
                    }) ;
                }
    
                nftsList.push({
                    ...nft ,
                    created_at : productDoc.data()?.created_at,
                    sols : solsList 
                })
            })
        )

        console.log(nftsList) ;

        await dispatch({
            type : ActionTypes.UserAllNFTsByLink,
            payload : nftsList
        }) ;

        return true ;

    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const UserAllProductsByLink = () => async dispatch => {
    try {
        let productDocs = await getDocs(query(collection(db, "Web_Products"), where("creator_id", "==" , getCookie('_SOLSTICE_SELLER')))) ;

        productDocs = productDocs.docs.filter(doc => 
            doc.data().price_type !== 'legendary' && doc.data().price_type !== 'rare'
        ) ;

        let productsList = [] ;

        await Promise.all(
            productDocs.map(async product => {
                let solsList = [] ;

                let querySnapshot_solts = await getDocs(query(collection(db, "Web_Solts"), where('product_id', '==', product.id))) ;
                for(let solt of querySnapshot_solts.docs) {
                    solsList.push({
                        ...solt.data(),
                        id : solt.id
                    }) ;
                }
                productsList.push({
                    ...product.data(),
                    product_id : product.id,
                    sols : solsList
                });
            })
        ) ;

        console.log(productsList) ;

        await dispatch({
            type : ActionTypes.UserAllProductsByLink,
            payload : productsList
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    } 
}

export const BuyerInfoById = async (uuid) => {
    try {
        let userDoc = await getDoc(doc(db, "Web_Users", uuid)) ;

        if(!userDoc.exists()) return false ;

        return userDoc.data() ;

    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const LoadingProductsListByLink = (loadingProductsList) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.LoadingProductsListByLink,
            payload : loadingProductsList
        }) ;
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const LoadingProfileLink = (loadingProfileLink) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.LoadingProfileLink,
            payload : loadingProfileLink
        });

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const InitLinkReducer = () => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InitLinkReducer,
        })
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const LoadingBidTransaction = (isLoading) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.LoadingBidTransaction,
            payload : isLoading
        }) ;
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const LoadingLegendaryTx = (isLoading) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.LoadingLegendaryTx,
            payload : isLoading
        }) ;
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const FreeOfferProduct = (product_id) => async dispatch => {
    try {
        let productDoc = await getDoc(doc(db, "Web_Products", product_id)) ;

        let buyers = productDoc.data().buyers ;

        if(!buyers.includes(getCookie("_SOLSTICE_BUYER"))) {
            await updateDoc(doc(db, "Web_Products", product_id), {
                buyers : [...buyers, getCookie("_SOLSTICE_BUYER")]
            }) ;
        }
        
        return true ;
    } catch(err) {
        return false ;
    }
}
export const LoadingFreeOffer = (isLoading) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.LoadingFreeOffer,
            payload : isLoading
        }) ;
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ; 
    }
}

export const LoadingBundleTx = (isLoading) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.LoadingBundleTx,
            payload: isLoading
        }) ;
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
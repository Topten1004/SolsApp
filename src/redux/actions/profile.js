import ActionTypes from "./actionTypes";

import { db, auth } from "../../firebase/database";
import { doc, setDoc, getDoc, updateDoc, getDocs, query, collection, orderBy, where } from 'firebase/firestore' ;
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage' ;
import { getCookie, getProductId, getUuid } from "../../utils/Helper";
import { FetchNFTsByOwner, } from "../../transactions/fetch";

export const UserAccountInfo = (userUuid) => async dispatch => {
    try {
        let docSnap = await getDoc(doc(db, "Web_Users", userUuid) ) ;

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const d = new Date(docSnap.data().joined_date.toDate());
        let month = months[d.getMonth()];

        await dispatch({
            type : ActionTypes.UserAccountInfo,
            payload : {
                fullName : docSnap.data().full_name,
                coverPictureUrl : docSnap.data().cover_picture_url,
                profilePictureUrl : docSnap.data().profile_picture_url,
                productTypeList : docSnap.data().product_type_list,
                jobTag : docSnap.data().job_tag,
                accountName : docSnap.data().account_name,
                productCount : docSnap.data().product_count,
                platformCount : docSnap.data().platform_count,
                resellerCount : docSnap.data().reseller_count,
                joinedDate : month + " " + d.getFullYear(),
                hostId : docSnap.data().host_id,
                profileMessage : docSnap.data().profile_message,
            }
        });

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const SaveNewMessage = (message) => async dispatch => {
    try {
        await updateDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER'))), {
            profile_message : message
        });

        await dispatch({
            type : ActionTypes.UpdateProfileMessage,
            payload : message 
        }) ;

        return true ;
        
    } catch(err) {
        console.log(err);
        return false ;
    }
}

export const UserAllNFTs = (web3Provider) => async dispatch => {
    try {
        let userSnap = await getDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER')))) ;

        let nfts = [] ;

        let wallets = userSnap.data().wallets ;

        await Promise.all(
            wallets.map(async wallet => {
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
            type : ActionTypes.UserAllNFTs,
            payload : nftsList
        }) ;

        return true ;

    } catch(err) {
        console.log(err) ;
        return true ;
    }
}
export const UserAllProducts = () => async dispatch => {
    try {
        let productDocs = await getDocs(collection(db, "Web_Products")) ;

        productDocs = productDocs.docs.filter(doc => 
            doc.data().price_type !== 'legendary' && doc.data().price_type !== 'rare' && (
                doc.data().creator_id === getUuid(getCookie('_SOLSTICE_AUTHUSER')) 
                || ( doc.data().price_type === 'free' && doc.data().buyers.includes(getUuid(getCookie('_SOLSTICE_AUTHUSER'))) )
                || ( doc.data().price_type === 'bundle' &&  doc.data().buyers[getUuid(getCookie('_SOLSTICE_AUTHUSER'))] )
            )
        ) ;

        let productsList = [] ;

        await Promise.all(
            productDocs.map(async product => {
                let isBuyer = false ;
                let isCreator = false ;
                let isPaid = true ;

                if(product.data().creator_id === getUuid(getCookie('_SOLSTICE_AUTHUSER'))) {
                    isCreator = true ;
                    isBuyer = false ;
                }
                if(typeof product.data().buyers === 'array' && product.data().buyers?.includes(getUuid(getCookie('_SOLSTICE_AUTHUSER')))) {
                    isBuyer = true ;
                    isCreator = false ;
                }
                if(typeof product.data().buyers === 'object' &&  product.data().buyers[getUuid(getCookie('_SOLSTICE_AUTHUSER'))]) {
                    isBuyer = true ;
                    isPaid = new Date().getTime() - new Date(product.data().buyers[getUuid(getCookie('_SOLSTICE_AUTHUSER'))].paid_at).getTime() < 30 * 24 * 60 * 60 * 1000 ;
                    isCreator = false ;
                }

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
                    isCreator : isCreator,
                    isPaid : isPaid,
                    isBuyer : isBuyer,
                    product_id : product.id,
                    sols : solsList
                });
            })
        ) ;

        console.log(productsList) ;
        await dispatch({
            type : ActionTypes.UserAllProducts,
            payload : productsList
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    } 
}
export const LoadingProductsList = (loadingProductsList) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.LoadingProductsList,
            payload : loadingProductsList
        }) ;
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
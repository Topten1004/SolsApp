import ActionTypes from "./actionTypes";

import { storage, db } from '../../firebase/database';
import { doc, setDoc, getDoc, updateDoc, addDoc, collection, Timestamp, getDocs, query, where, increment } from 'firebase/firestore' ;
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage' ;

import { getCookie, getUuid } from "../../utils/Helper";
import { FetchNFTsURI } from "../../transactions/fetch";

export const CloudUploadFiles = () => async dispatch => {
    try {

        let videoFiles = [] ;
        let documentFiles = [] ;
        let audioFiles = [] ;
        let imageFiles = [] ;

        let videoTotalSize = 0 ;
        let documentTotalSize = 0 ;
        let audioTotalSize = 0 ;
        let imageTotalSize = 0 ;

        let productDos = await getDocs(query(collection(db, "Web_Products"), where("creator_id", "==", getUuid(getCookie('_SOLSTICE_AUTHUSER'))))) ;

        for(let product of productDos.docs) {
            let querySnapshot_solts = await getDocs(query(collection(db, "Web_Solts"), where('product_id', '==', product.id))) ;

            for(let solt of querySnapshot_solts.docs) {
                switch(solt.data().category) {
                    case 'pdf' : 
                        documentFiles.push({
                            ...solt.data(),
                            product : {
                                ...product.data()
                            },
                            id : solt.id
                        });
                        documentTotalSize += solt.data().size ;
                        break ;
                    case 'vnd.openxmlformats-officedocument.wordprocessingml.document' : 
                        documentFiles.push({
                            ...solt.data(),
                            product : {
                                ...product.data()
                            },
                            id : solt.id
                        });
                        documentTotalSize += solt.data().size ;
                        break ;
                    case 'video' : 
                        videoFiles.push({
                            ...solt.data(),
                            product : {
                                ...product.data()
                            },
                            id : solt.id
                        });
                        videoTotalSize += solt.data().size ;
                        break ;
                    case 'audio' : 
                        audioFiles.push({
                            ...solt.data(),
                            product : {
                                ...product.data()
                            },
                            id : solt.id
                        });
                        audioTotalSize += solt.data().size ;
                        break ;
                    case 'image' : 
                        imageFiles.push({
                            ...solt.data(),
                            product : {
                                ...product.data()
                            },
                            id : solt.id
                        });
                        imageTotalSize += solt.data().size ;
                        break ;
                    default :
                        break ;
                }
            }
        }

        console.log(documentFiles) ;

        await dispatch({
            type : ActionTypes.CloudUploadFiles,
            payload : {
                videoFiles : videoFiles,
                audioFiles : audioFiles,
                imageFiles : imageFiles,
                documentFiles : documentFiles,

                documentTotalSize : documentTotalSize,
                videoTotalSize : videoTotalSize,
                imageTotalSize : imageTotalSize,
                audioTotalSize : audioTotalSize
            }
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;

        return false ;
    }
}

export const CloudPurchaseFiles = (web3Provider) => async dispatch => {
    try {

        let videoFiles = [] ;
        let documentFiles = [] ;
        let audioFiles = [] ;
        let imageFiles = [] ;

        let videoTotalSize = 0 ;
        let documentTotalSize = 0 ;
        let audioTotalSize = 0 ;
        let imageTotalSize = 0 ;


        let nftsList = [] ;

        if(web3Provider) {
            let userDoc = await getDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER')))) ;

            await Promise.all(
                userDoc.data().wallets.map(async wallet => {
                    let nfts = await FetchNFTsURI(web3Provider, wallet) ;
    
                    nftsList =  nftsList.concat(nfts) ;
                })  
            )
        }

        let productDocs = await getDocs(collection(db, "Web_Products")) ;

        productDocs = productDocs.docs.filter(doc => 
            ( doc.data().price_type === 'free' && doc.data().buyers.includes(getUuid(getCookie('_SOLSTICE_AUTHUSER'))) )
            || ( doc.data().price_type === 'bundle' &&  doc.data().buyers[getUuid(getCookie('_SOLSTICE_AUTHUSER'))] )
        ) ;

        productDocs = productDocs.concat(nftsList) ;

        for(let product of productDocs) { 
            let productDoc = await getDoc(doc(db, "Web_Products", product.id || product.uri)) ;

            let querySnapshot_solts = await getDocs(query(collection(db, "Web_Solts"), where('product_id', '==', product.id || product.uri))) ;

            for(let solt of querySnapshot_solts.docs) {
                switch(solt.data().category) {
                    case 'pdf' : 
                        documentFiles.push({
                            ...solt.data(),
                            product : {
                                ...product.data()
                            },
                            id : solt.id
                        });
                        documentTotalSize += solt.data().size ;
                        break ;
                    case 'vnd.openxmlformats-officedocument.wordprocessingml.document' : 
                        documentFiles.push({
                            ...solt.data(),
                            product : {
                                ...product.data()
                            },
                            id : solt.id
                        });
                        documentTotalSize += solt.data().size ;
                        break ;
                    case 'video' : 
                        videoFiles.push({
                            ...solt.data(),
                            product : {
                                ...productDoc.data()
                            },
                            id : solt.id
                        });
                        videoTotalSize += solt.data().size ;
                        break ;
                    case 'audio' : 
                        audioFiles.push({
                            ...solt.data(),
                            product : {
                                ...productDoc.data()
                            },
                            id : solt.id
                        });
                        audioTotalSize += solt.data().size ;
                        break ;
                    case 'image' : 
                        imageFiles.push({
                            ...solt.data(),
                            product : {
                                ...productDoc.data()
                            },
                            id : solt.id
                        });
                        imageTotalSize += solt.data().size ;
                        break ;
                    default :
                        break ;
                }
            }
        }

        await dispatch({
            type : ActionTypes.CloudPurchaseFiles,
            payload : {
                videoFiles : videoFiles,
                audioFiles : audioFiles,
                imageFiles : imageFiles,
                documentFiles : documentFiles,

                documentTotalSize : documentTotalSize,
                videoTotalSize : videoTotalSize,
                imageTotalSize : imageTotalSize,
                audioTotalSize : audioTotalSize
            }
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;

        return false ;
    }
}
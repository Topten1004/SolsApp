import ActionTypes from './actionTypes' ;

import { convertObjToString, getCookie, getPriceId, getProductId, getUuid } from '../../utils/Helper';

import { storage, db } from '../../firebase/database';
import { doc, setDoc, getDoc, updateDoc, addDoc, collection, Timestamp, getDocs, query, where, increment, deleteDoc } from 'firebase/firestore' ;
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage' ;

import lodash from 'lodash' ;

import { MintLegendary, MintRare } from '../../transactions/mint';

export const InputUploadFiles = (solsForUpload) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InputUploadFiles,
            payload : solsForUpload
        });

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
} 

export const InputExternalLinks = (linksForUpload) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InputExternalLinks,
            payload : linksForUpload
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;

        return false ;
    }
}

export const InputMasterPiece = (masterPiece) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InputMasterPiece,
            payload : masterPiece
        });

        return true ;
    } catch(err) {
        console.log(err) ;

        return false ;
    }
}
export const InputProductType = (product_type) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InputProductType,
            payload : product_type
        })
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const InputPriceConfig = (productDescription, resellTick, priceType, productType) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InputPriceConfig,
            payload : {
                productDescription : productDescription,
                resellTick : resellTick,
                priceType : priceType,
                productType : productType
            }
        });
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const InputLegendaryPriceConfig = (productPrice, priceUnit, resellPrice, resellUnit, resellCount, royaltyFee, paymentAccount) => async dispatch => {
    try {

        await dispatch({
            type : ActionTypes.InputLegendaryPriceConfig,
            payload : {
                productPrice : productPrice,
                resellPrice : resellPrice,
                priceUnit : priceUnit,
                resellUnit : resellUnit,
                resellCount : resellCount,
                royaltyFee : royaltyFee,
                paymentAccount : paymentAccount
            }
        });

        return true ;
    } catch(err) {
        console.log(err) ;

        return false ;
    }
}

export const InputRarePriceConfig = (biddingPrice, biddingUnit, availableItems, royaltyFee, paymentAccount, listingTime, unlimited) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InputRarePriceConfig,
            payload : {
                biddingPrice : biddingPrice,
                biddingUnit : biddingUnit,
                availableItems : availableItems,
                royaltyFee : royaltyFee,
                paymentAccount : paymentAccount,
                listingTime : listingTime,
                unlimited : unlimited
            }
        });

        return true ;
    } catch(err) {  
        console.log(err) ;
        return false ;
    }
}

export const InputBundlePriceConfig = (subscriptionPrice, releaseDate, bundleUnit) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InputBundlePriceConfig,
            payload : {
                subscriptionPrice : subscriptionPrice,
                bundleUnit : bundleUnit,
                releaseDate : releaseDate
            }
        });
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const InputFreePriceConfig = (subscriptionPrice, releaseDate, freeUnit) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InputFreePriceConfig,
            payload : {
                subscriptionPrice : subscriptionPrice,
                freeUnit : freeUnit,
                releaseDate : releaseDate
            }
        });
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const UploadProudctsToFirebase = async (solsFilesForUpload, externalLinksForUpload, docRef, dispatch) => {
    let total_progress = 0 ;
    let upload_progress =  [];

    console.log("&*&&&&") ;
    await Promise.all(
        solsFilesForUpload.map(async item => {
            upload_progress.push(0)
        })
    )

    await Promise.all(
        externalLinksForUpload.map(async item => {
            upload_progress.push(0)
        })
    )
    await Promise.all(
        externalLinksForUpload.map(async link => {
            await addDoc(collection(db, "Web_Solts"), {
                product_id : docRef.id,
                name : link.name,
                duration : link.duration,
                format_duration : link.format_duration,
                type : link.type,
                platform : '*',
                path : link.url,
                size : link.size,
                category : link.category,
                created_at : Timestamp.now()
            }) ; 

            upload_progress[solsFilesForUpload.length + index] = 100 ;
            total_progress = Number( lodash.sum(upload_progress) / ( 100 * (solsFilesForUpload.length + externalLinksForUpload.length)) * 100 ).toFixed(2) ;

            await dispatch({
                type : ActionTypes.UpdateUploadProgress,
                payload : {
                    totalProgress : Number(total_progress),
                }
            }) ;

            await dispatch({
                type : ActionTypes.UpdateUploadedCount,
            }) ;
        })
    )

    await Promise.all(
        solsFilesForUpload.map(async (file, index) => {
            let storageRef = ref(storage, 'web_products/' + docRef.id + "/" + file.name );
            let uploadTask = uploadBytesResumable(storageRef, file.raw);

            uploadTask.on('state_changed', 
                async (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
                    upload_progress[index] = progress ;

                    total_progress = Number( lodash.sum(upload_progress) / ( 100 * (solsFilesForUpload.length + externalLinksForUpload.length)) * 100 ).toFixed(2) ;
    
                    await dispatch({
                        type : ActionTypes.UpdateUploadProgress,
                        payload : {
                            totalProgress : Number(total_progress),
                        }
                    }) ;
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                }, 
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await addDoc(collection(db, "Web_Solts"), {
                            product_id : docRef.id,
                            name : file.name,
                            duration : file.duration,
                            format_duration : file.format_duration,
                            type : file.type,
                            platform : 'firebase',
                            path : downloadURL,
                            size : file.size,
                            category : file.category,
                            created_at : Timestamp.now()
                        }) ;
                    });

                    await dispatch({
                        type : ActionTypes.UpdateUploadedCount,
                    }) ;
                }
            );
        }) 
    );
}

export const UploadFinalLegendary = (
    masterPiece ,
    solsResellTick ,

    solsFilesForUpload ,
    externalLinksForUpload ,
    solsPriceType ,
    solsProductType ,
    solsProductDescription,

    legendaryProductPrice ,
    legendaryResellPrice ,
    legendaryPriceUnit ,
    legendaryResellUnit ,
    legendaryResellCount ,
    legendaryRoyaltyFee ,
    legendaryPaymentAccount,
) => async dispatch => {
    try {
        let docRef ;
        
        docRef = await addDoc(collection(db, "Web_Products"), {
            creator_id : getUuid(getCookie('_SOLSTICE_AUTHUSER')),
            master_piece : masterPiece,
            resell_tick : solsResellTick,

            price_type : solsPriceType ,
            product_type : solsProductType,
            product_description : solsProductDescription,

            product_price : Number(legendaryProductPrice),
            product_unit : Number(legendaryPriceUnit),
            resell_price : Number(legendaryResellPrice),
            resell_unit : Number(legendaryResellUnit),
            resell_count : Number(legendaryResellCount),
            royalty_fee : legendaryRoyaltyFee,
            payment_account : legendaryPaymentAccount,

            created_at : Timestamp.now()
        }) ;
       
        await dispatch({
            type : ActionTypes.UploadedProduct,
            payload: docRef.id
        }) ;

        await UploadProudctsToFirebase(solsFilesForUpload, externalLinksForUpload, docRef, dispatch) ;

        return true ;

    } catch(err) {
        console.log(err);
        return false ;
    }
}

export const UploadFinalRare = (
    masterPiece ,
    solsResellTick ,

    solsFilesForUpload ,
    externalLinksForUpload ,
    solsPriceType ,
    solsProductType ,
    solsProductDescription,

    rareBiddingPrice ,
    rareBiddingUnit,
    rareAvailableItems ,
    rareRoyaltyFee ,
    rarePaymentAccount ,
    rareListingTime ,
    rareUnlimited ,
) => async dispatch => {
    try {
        
        let docRef ;
        
        docRef =  await addDoc(collection(db, "Web_Products"), {
            creator_id : getUuid(getCookie('_SOLSTICE_AUTHUSER')),
            master_piece : masterPiece,
            resell_tick : solsResellTick,

            price_type : solsPriceType ,
            product_type : solsProductType,
            product_description : solsProductDescription,

            minimum_bidding : Number(rareBiddingPrice),
            available_items: Number(rareAvailableItems),
            royalty_fee : rareRoyaltyFee,
            listing_time : rareListingTime,
            unlimited : rareUnlimited,

            created_at : Timestamp.now()
        }) ;
        
        
        await dispatch({
            type : ActionTypes.UploadedProduct,
            payload: docRef.id
        }) ;

        await UploadProudctsToFirebase(solsFilesForUpload, externalLinksForUpload, docRef, dispatch) ;

        return true ;

    } catch(err) {
        console.log(err);
        return false ;
    }
}

export const MintLegendaryNFT = (web3Provider, solsProductType, legendaryProductPrice, legendaryPriceUnit, legendaryResellPrice, legendaryResellUnit, legendaryResellCount, legendaryRoyaltyFee, masterPiece, solsProductDescription, nft_uri) => async dispatch => {
    try {
        const signer = web3Provider.getSigner() ;

        const address = await signer.getAddress();

        let new_nft_id = await MintLegendary(web3Provider, getProductId(solsProductType), legendaryProductPrice, legendaryPriceUnit, legendaryResellPrice, legendaryResellUnit,legendaryResellCount, legendaryRoyaltyFee, masterPiece, solsProductDescription, nft_uri) ;
        
        if(new_nft_id === 'error') {
            console.log("&&&&&&&&&&" , new_nft_id) ;
            
            let solsDocs = await getDocs(query(collection(db, 'Web_Solts'), where('product_id', "==" , nft_uri))) ;

            await Promise.all(
                solsDocs.docs.map(async solDoc => {
                    let solRef = ref(storage, 'web_products/' + nft_uri + "/" + solDoc.data().name) ;

                    await deleteObject(solRef) ;

                    deleteDoc(doc(db, "Web_Solts", solDoc.id)) ;
                })
            )

            await deleteDoc(doc(db, "Web_Products", nft_uri)) ;

            return false ;
        } else {
            await updateDoc(doc(db, "Web_Products", nft_uri), {
                nft_id : new_nft_id
            }) ;

            let userSnap = await getDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER')))) ;

            if(!userSnap.data().wallets.includes(address)) {
                await updateDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER'))), {
                    wallets : [...userSnap.data().wallets, address] 
                }) ;
            }

            await updateDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER'))), {
                product_count : increment(1)
            }) ;
        }

        return true ;
    } catch (err) {
        console.log(err) ;
        return false ;
    }
}
export const MintRareNFT = (web3Provider, solsProductType, rareBiddingPrice, rareBiddingUnit, rareAvailableItems, rareRoyaltyFee, masterPiece, solsProductDescription, nft_uri) => async dispatch => {
    try {
        const signer = web3Provider.getSigner() ;
        const address = await signer.getAddress();
        
        let new_nft_id = await MintRare(web3Provider, getProductId(solsProductType), rareBiddingPrice, rareBiddingUnit, rareAvailableItems, rareRoyaltyFee, masterPiece, solsProductDescription, nft_uri) ;
        
        if(new_nft_id === 'error') {
            console.log("&&&&&&&&&&" , new_nft_id) ;
            
            let solsDocs = await getDocs(query(collection(db, 'Web_Solts'), where('product_id', "==" , nft_uri))) ;

            await Promise.all(
                solsDocs.docs.map(async solDoc => {
                    let solRef = ref(storage, 'web_products/' + nft_uri + "/" + solDoc.data().name) ;

                    await deleteObject(solRef) ;

                    deleteDoc(doc(db, "Web_Solts", solDoc.id)) ;
                })
            )

            await deleteDoc(doc(db, "Web_Products", nft_uri)) ;

            return false ;
        } else { 
            await updateDoc(doc(db, "Web_Products", nft_uri), {
                nft_id : new_nft_id 
            }) ;
    
            let userSnap = await getDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER')))) ;

            if(!userSnap.data().wallets.includes(address)) {
                await updateDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER'))), {
                    wallets : [...userSnap.data().wallets, address] 
                });
            }
    
            await updateDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER'))), {
                product_count : increment(1)
            }) ;

            return true ;
        } 
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const UploadFinalBundle = (
    web3Provider,

    masterPiece ,
    solsResellTick ,

    solsFilesForUpload ,
    externalLinksForUpload ,
    solsPriceType ,
    solsProductType ,
    solsProductDescription,

    bundleSubscriptionPrice,
    bundlePriceUnit,
    bundleReleaseDate
) => async dispatch => {
    try {
        const signer = web3Provider.getSigner() ;
        const address = await signer.getAddress() ;

        let docRef ;
        
        docRef = await addDoc(collection(db, 'Web_Products'), {
            creator_id : getUuid(getCookie('_SOLSTICE_AUTHUSER')),
            creator_wallet : address,
            master_piece : masterPiece,

            price_type : solsPriceType ,
            product_type : solsProductType,
            product_description : solsProductDescription,

            subscription_price : Number(bundleSubscriptionPrice) ,
            bundle_unit : bundlePriceUnit,
            release_date : convertObjToString(bundleReleaseDate) ,

            buyers : {} ,

            payment_method : 'Monthly',
            distribution_schedule : 'Weekly',

            created_at : Timestamp.now()
        }) ;
       
        console.log(docRef.id) ;

        await dispatch({
            type : ActionTypes.UploadedProduct,
            payload: docRef.id
        }) ;

        await UploadProudctsToFirebase(solsFilesForUpload, externalLinksForUpload, docRef, dispatch) ;
        
        await updateDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER'))), {
            product_count : increment(1)
        }) ;

        return true ;

    } catch(err) {
        console.log(err);
        return false ;
    }
}

export const UploadFinalFree = (
    web3Provider,

    masterPiece ,
    solsResellTick ,

    solsFilesForUpload ,
    externalLinksForUpload ,
    solsPriceType ,
    solsProductType ,
    solsProductDescription,

    freeSubscriptionPrice,
    freePriceUnit,
    freeReleaseDate
) => async dispatch => {
    try {
        const signer = web3Provider.getSigner() ;
        const address = await signer.getAddress() ;

        let docRef ;
        
        docRef = await addDoc(collection(db,"Web_Products"), {
            creator_id : getUuid(getCookie('_SOLSTICE_AUTHUSER')),
            master_piece : masterPiece,

            price_type : solsPriceType ,
            product_type : solsProductType,
            product_description : solsProductDescription,

            subscription_price : Number(freeSubscriptionPrice) ,
            free_unit : freePriceUnit,
            release_date : convertObjToString(freeReleaseDate) ,
            creator_wallet : address,
            buyers : [] ,

            distribution_schedule : 'Weekly',

            created_at : Timestamp.now()
        }) ;
       
        await dispatch({
            type : ActionTypes.UploadedProduct,
            payload: docRef.id
        }) ;

        await UploadProudctsToFirebase(solsFilesForUpload, externalLinksForUpload, docRef, dispatch) ;
        
        await updateDoc(doc(db, "Web_Users", getUuid(getCookie('_SOLSTICE_AUTHUSER'))), {
            product_count : increment(1)
        }) ;

        return true ;

    } catch(err) {
        console.log(err);
        return false ;
    }
}

export const InitUploadReducer = () => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InitUploadReducer
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const UploadLoading = (isLoading) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.UploadLoading,
            payload : isLoading
        });
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
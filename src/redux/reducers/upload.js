

import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    progress : 0,
    isLoadingNewSol : false,

    uploadLoading : false,
    
    solsFilesForUpload : [],
    externalLinksForUpload : [],
    masterPiece : '',

    solsProductDescription : '',
    solsResellTick : "NO",
    solsPriceType : 'legendary',
    solsProductType : '#Ebook',

    legendaryProductPrice : '',
    legendaryResellPrice : '',
    legendaryPriceUnit : 0,
    legendaryResellUnit : 0,
    legendaryResellCount : '',
    legendaryRoyaltyFee : 10,
    legendaryPaymentAccount : "visa",

    rareBiddingPrice : '',
    rareBiddingUnit : 0,
    rareAvailableItems : '',
    rareRoyaltyFee : 10,
    rarePaymentAccount : "visa",
    rareListingTime : {
        from :{
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
        },
        to : {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
        }
    },
    rareUnlimited : true,

    bundleSubscriptionPrice : '',
    bundlePriceUnit : 0,
    bundleReleaseDate : {
        year : new Date().getFullYear(),
        month : new Date().getMonth() + 1,
        day : new Date().getDate()
    },

    freeSubscriptionPrice : '',
    freePriceUnit : 0,
    freeReleaseDate : {
        year : new Date().getFullYear(),
        month : new Date().getMonth() + 1,
        day : new Date().getDate()
    },

    uploadedCount : 0,
    totalProgress : 0,
    uploadedProduct : null 
} ;

export default function upload(state=INITIAL_STATE, action={}) {
    switch(action.type) {
        case ActionTypes.UploadRunning : 
            return ({
                ...state ,
                progress : action.payload
            })
        case ActionTypes.LoadingNewSol : 
            return ({
                ...state,
                isLoadingNewSol : action.payload
            })

        case ActionTypes.InputUploadFiles : 
            return ({
                ...state,
                solsFilesForUpload : action.payload
            }) ;
        case ActionTypes.InputExternalLinks : 
            return ({
                ...state,
                externalLinksForUpload : action.payload
            }) ;
        case ActionTypes.InputMasterPiece : 
            return ({
                ...state,
                masterPiece : action.payload
            });
        case ActionTypes.InputProductType :
            return ({
                ...state,
                solsProductType : action.payload
            }) ;
        case ActionTypes.InputPriceConfig : 
            return ({
                ...state,
                solsProductDescription : action.payload.productDescription,
                solsResellTick : action.payload.resellTick,
                solsPriceType : action.payload.priceType,
                solsProductType : action.payload.productType
            }) ;
        case ActionTypes.InputLegendaryPriceConfig : 
            return ({
                ...state,
                legendaryProductPrice : action.payload.productPrice,
                legendaryResellPrice : action.payload.resellPrice,
                legendaryPriceUnit : action.payload.priceUnit,
                legendaryResellUnit : action.payload.resellUnit,
                legendaryResellCount : action.payload.resellCount ,
                legendaryRoyaltyFee : action.payload.royaltyFee,
                legendaryPaymentAccount : action.payload.paymentAccount
            });
        case ActionTypes.InputRarePriceConfig : 
            return ({
                ...state,
                rareBiddingPrice : action.payload.biddingPrice,
                rareBiddingUnit : action.payload.biddingUnit,
                rareAvailableItems : action.payload.availableItems,
                rareRoyaltyFee : action.payload.royaltyFee,
                rarePaymentAccount : action.payload.paymentAccount,
                rareListingTime : action.payload.listingTime,
                rareUnlimited : action.payload.unlimited
            });
        case ActionTypes.InputBundlePriceConfig :
            return ({
                ...state,
                bundleSubscriptionPrice : action.payload.subscriptionPrice,
                bundlePriceUnit : action.payload.bundleUnit,
                bundleReleaseDate : action.payload.releaseDate
            });
        case ActionTypes.InputFreePriceConfig :
            return ({
                ...state,
                freeSubscriptionPrice : action.payload.subscriptionPrice,
                freePriceUnit : action.payload.freeUnit,
                freeReleaseDate : action.payload.releaseDate
            }) ;
        case ActionTypes.UploadedProduct : 
            return ({
                ...state,
                uploadedProduct : action.payload
            }) ;
        case ActionTypes.UpdateUploadProgress :
            return ({
                ...state,
                totalProgress : action.payload.totalProgress
            }) ;
        case ActionTypes.UpdateUploadedCount : 
            return ({
                ...state,
                uploadedCount : state.uploadedCount + 1
            }) ;
        case ActionTypes.UploadLoading : 
            return ({
                ...state,
                uploadLoading : action.payload
            });
        case ActionTypes.InitUploadReducer : 
            return INITIAL_STATE ;
        default : 
            return state ;
    }
} 

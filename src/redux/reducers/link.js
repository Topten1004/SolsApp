import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    loadingProductsList : false,

    accountName : null,
    fullName : null,

    coverPictureUrl : null,
    profilePictureUrl : null,

    productTypeList : [],
    jobTag : null,

    productCount : 0,
    platformCount : 0,
    resellerCount : 0,

    joinedDate : null,
    hostId : null,
    profileMessage : null,

    nftsListByLink : [] ,
    productsListByLink : [] ,

    loadingProfileLink : false ,

    loadingBidTx : false,
    loadingBuyTx : false,
    loadingLegendaryTx : false,
    loadingFreeOffer : false,
    loadingBundleTx : false
}

export default function link(state=INITIAL_STATE, action={}){
    switch(action.type) {
        case ActionTypes.ProfileInfoByLink : 
            return ({
                ...state,
                coverPictureUrl : action.payload.coverPictureUrl,
                profilePictureUrl : action.payload.profilePictureUrl,

                productTypeList : action.payload.productTypeList,
                jobTag : action.payload.jobTag,

                accountName : action.payload.accountName,
                fullName : action.payload.fullName,

                productCount : action.payload.productCount,
                platformCount : action.payload.platformCount,
                resellerCount : action.payload.resellerCount,

                joinedDate : action.payload.joinedDate,
                hostId : action.payload.hostId,
                profileMessage : action.payload.profileMessage
            }) ;
        case ActionTypes.LoadingProductsListByLink : 
            return ({
                ...state,
                loadingProductsList : action.payload
            }) ;
        case ActionTypes.LoadingProfileLink : 
            return ({
                ...state,
                loadingProfileLink : action.payload
            }) ;
        case ActionTypes.UserAllNFTsByLink : 
            return ({
                ...state,
                nftsListByLink : action.payload
            }) ;
        case ActionTypes.UserAllProductsByLink : 
            return ({
                ...state,
                productsListByLink : action.payload
            });
        case ActionTypes.LoadingBidTransaction :
            return ({
                ...state,
                loadingBidTx : action.payload
            });
        case ActionTypes.LoadingBuyTransaction : 
            return ({
                ...state,
                loadingBuyTx : action.payload 
            }) ;
        case ActionTypes.LoadingLegendaryTx :
            return ({
                ...state,
                loadingLegendaryTx : action.payload
            });
        case ActionTypes.LoadingFreeOffer :
            return ({
                ...state,
                loadingFreeOffer : action.payload
            });
        case ActionTypes.LoadingBundleTx : 
            return ({
                ...state,
                loadingBundleTx : action.payload
            })
        case ActionTypes.InitLinkReducer : 
            return INITIAL_STATE ;
        default :
            return state ;
    }
}
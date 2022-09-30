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
    profileMessage : '',

    nftsList : [] ,
    productsList : []
}

export default function profile(state=INITIAL_STATE, action={}){
    switch(action.type) {
        case ActionTypes.UserAccountInfo : 
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
        case ActionTypes.UpdateProfileMessage : 
            return ({
                ...state,
                profileMessage : action.payload
            }) ;
        case ActionTypes.LoadingProductsList : 
            return ({
                ...state,
                loadingProductsList : action.payload
            }) ;
        case ActionTypes.UserAllNFTs:
            return ({
                ...state,
                nftsList : action.payload
            }) ;
        case ActionTypes.UserAllProducts : 
            return ({
                ...state,
                productsList : action.payload
            })
        default :
            return state ;
    }
}
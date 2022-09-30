import { getCookie, getUuid } from "../../utils/Helper";
import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    error : null ,
    isLogin : getUuid(getCookie('_SOLSTICE_AUTHUSER')) ? true : false,

    urlFromLink : null,

    loadingCodeSend : false,
    loadingSignUp : false ,
    loadingSignIn : false,
    codeSentResult : null,

    fullName : null,
    email : null,
    password : null,
    phoneNumber : null,
    credentialId : null,

    hostId : null,
    accountName : null,
    detailAccountTypeList : null,

    generalAccountTypeList : null,
    productTypeList : null,
    jobTag : null,

    appName : null,

    websiteUrl : null,
    linkBio : null,
    appsUrl : null,

    twitterUrl : null,
    instagramUrl : null,
    tiktokUrl : null,
    youtubeUrl : null,
    snapchatUrl : null,
    socialSetting : null,

    profilePictureUrl : null,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ActionTypes.SignUpUserError :
            return({
                ...state,
                error : action.payload,
            });

        case ActionTypes.PhoneVerifyCodeSent :
            return ({
                ...state,
                codeSentResult : action.payload
            });
        case ActionTypes.InputUserMainInfo : 
            return ({
                ...state,
                fullName : action.payload.fullName,
                email : action.payload.email,
                password : action.payload.password,
                phoneNumber : action.payload.phoneNumber
            });
        case ActionTypes.InputAccountName : 
            return ({
                ...state,
                accountName : action.payload.accountName,
                detailAccountTypeList : action.payload.detailAccountTypeList,
                hostId : action.payload.hostId
            });
        case ActionTypes.InputAccountType :
            return ({
                ...state,
                generalAccountTypeList : action.payload.generalAccountTypeList,
                productTypeList : action.payload.productTypeList,
                jobTag : action.payload.jobTag
            });
        case ActionTypes.InputAccountInfo : 
            return ({
                ...state,
                appName : action.payload.appName,
                generalAccountTypeList : action.payload.generalAccountTypeList
            });
        case ActionTypes.InputSocialInfo : 
            return ({
                ...state,
                websiteUrl : action.payload.websiteUrl,
                appsUrl : action.payload.appsUrl,
                linkBio : action.payload.linkBio
            });
        case ActionTypes.InputSyncSocial :
            return ({
                ...state,
                twitterUrl : action.payload.twitterUrl,
                instagramUrl : action.payload.instagramUrl,
                tiktokUrl : action.payload.tiktokUrl,
                youtubeUrl : action.payload.youtubeUrl,
                snapchatUrl : action.payload.snapchatUrl,
                socialSetting : action.payload.socialSetting
            });
        case ActionTypes.SignInUser :
            return ({
                ...state,
                profilePictureUrl : action.payload.profilePictureUrl,
                accountName : action.payload.accountName
            });
        // case ActionTypes.SignInWithGoogle :
        //     return ({
        //         ...state,
        //         profilePictureUrl : action.payload.profilePictureUrl,
        //         accountName : action.payload.accountName
        //     });
        case ActionTypes.LoadingCodeSend :
            return ({
                ...state,
                loadingCodeSend : action.payload
            });
        case ActionTypes.LoadingSignUp : 
            return ({
                ...state,
                loadingSignUp : action.payload
            });
        case ActionTypes.LoadingSignIn :
            return ({
                ...state,
                loadingSignIn : action.payload
            }) ;
        case ActionTypes.ConnectLinkToAccount :
            return ({
                ...state,
                urlFromLink : action.payload
            });
        default :
            return state ;
    }
}
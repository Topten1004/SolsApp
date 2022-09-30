const ActionTypes = {
    // Wallet Connect Flow
    ConnectAppToWallet : "ConnectAppToWallet",
    AccountChanged : "AccountChanged" ,
    UpdateWalletData : "UpdateWalletData",
    
    // Create Account Flow
    LoadingCodeSend : "LoadingCodeSend",
    LoadingSignUp : "LoadingSignUp",
    LoadingSignIn : "LoadingSignIn",
    PhoneVerifyCodeSent : "PhoneVerifyCodeSent",

    InputUserMainInfo : "InputUserMainInfo",

    InputAccountName : "InputAccountName",
    InputAccountType : "InputAccountType",
    InputAccountInfo : "InputAccountInfo",

    InputSocialInfo : "InputSocialInfo",
    InputSyncSocial : "InputSyncSocial",

    SignUpFinalUserInfo : 'SignUpFinalUserInfo',
    SignInUserWithEmailAndPassword : "SignInUserWithEmailAndPassword",
    SignInWithGoogle : "SignInWithGoogle",
    SignInUser : "SignInUser",

    // Upload Files Flow
    InputUploadFiles : "InputUploadFiles",
    InputExternalLinks : "InputExternalLinks",
    InputMasterPiece : "InputMasterPiece",
    InputProductType : "InputProductType",
    InputPriceConfig : "InputPriceConfig",
    InputLegendaryPriceConfig : "InputLegendaryPriceConfig",
    InputRarePriceConfig : "InputRarePriceConfig",
    InputBundlePriceConfig : "InputBundlePriceConfig",
    InputFreePriceConfig : "InputFreePriceConfig",
    InitUploadReducer : "InitUploadReducer",
    UploadedProduct : "UploadedProduct",
    UpdateUploadProgress : "UpdateUploadProgress",
    UpdateUploadedCount : "UpdateUploadedCount",
    UploadLoading : "UploadLoading",

    // Profile Screen Flow
    UserAccountInfo : "UserAccountInfo",
    UpdateProfileMessage : "UpdateProfileMessage",
    LoadingProductsList : "LoadingProductsList",
    UserAllNFTs : "UserAllNFTs" ,
    UserAllProducts : "UserAllProducts",


    // SOLSCloud Flow
    DocumentFiles : "DocumentFiles",
    VideoFiles : "VideoFiles",
    AudioFiles : "AudioFiles",
    ImageFiles : "ImageFiles",
    CloudUploadFiles: "CloudUploadFiles",
    CloudPurchaseFiles : "CloudPurchaseFiles",

    // Cart Flow
    ProductsInfoList : "ProductsInfoList" ,
    UserNFTsInfoList : "UserNFTsInfoList",
    UserBidsInfoList : "UserBidsInfoList",
    UserTxsInfoList : "UserTxsInfoList",
    UserOrdersInfoList : "UserOrdersInfoList",
    LoadingTransaction : "LoadingTransaction" ,

    // Setting Flow
    ExpandedItem : "ExpandedItem",

    // Customers Flow 
    FetchCustomersList : "FetchCustomersList",
    AddNewCustomer : "AddNewCustomer",

    // Notify Flow
    FetchAllNotify : "FetchAllNotify",

    // Transaction Flow
    AllTxsList : "AllTxsList",


    // Profile Link Flow
    ProfileInfoByLink : "ProfileInfoByLink",
    LoadingProductsListByLink : "LoadingProductsListByLink",
    LoadingProfileLink : "LoadingProfileLink",
    UserAllNFTsByLink : "UserAllNFTsByLink" ,
    UserAllProductsByLink : "UserAllProductsByLink",
    InitLinkReducer : "InitLinkReducer",
    LoadingBidTransaction : "LoadingBidTransaction",
    LoadingBuyTransaction : "LoadingBuyTransaction",
    ConnectLinkToAccount : "ConnectLinkToAccount",
    LoadingLegendaryTx:"LoadingLegendaryTx",
    LoadingFreeOffer : "LoadingFreeOffer",
    LoadingBundleTx : "LoadingBundleTx",
}

export default ActionTypes ;
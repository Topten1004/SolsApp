import ActionTypes from "./actionTypes" ;

export const ConnectAppToWallet = (connectionInfo) => async dispatch => {
    try {
        dispatch({
            type : ActionTypes.ConnectAppToWallet,
            payload : {
                provider: connectionInfo.provider,
                walletAddress : connectionInfo.walletAddress,
                web3Provider : connectionInfo.web3Provider
            }
        })
    }
    catch(err) {
        console.log(err);
    }
}
export const UpdateWalletData = (walletData, isConnected=true) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.UpdateWalletData,
            payload : {
                provider : walletData.provider,
                web3Provider : walletData.web3Provider,
                walletAddress : walletData.walletAddress,
                chainData  : walletData.chainData,
                isConnected : isConnected
            }
        }) ;
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const AccountChanged = (account) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.AccountChanged,
            payload : account
        }) ;
        return true ;
    } catch(err){
        console.log(err) ;
        return false ;
    }
}
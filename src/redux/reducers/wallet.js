import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    isConnected : false ,
    web3Provider : null,
    walletAddress : null,
    provider : null,
    chainData : null
}

export default (state=INITIAL_STATE , action={}) => {
    switch(action.type) {
        case ActionTypes.ConnectAppToWallet :
            return ({
                ...state , 
                walletAddress : action.payload.walletAddress ,
                web3Provider : action.payload.web3Provider,
                provider : action.payload.provider,
            }) ;
        case ActionTypes.UpdateWalletData : 
            return ({
                ...state,
                walletAddress : action.payload.walletAddress,
                web3Provider : action.payload.web3Provider,
                provider : action.payload.provider,
                chainData : action.payload.chainData,
                isConnected : action.payload.isConnected
            })
        case ActionTypes.AccountChanged :
            return ({
                ...state,
                walletAddress : action.payload
            }) ;
        default :
            return state ; 
    }
}
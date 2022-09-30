import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    productsInfoList : null,
    bidsInfoList : null,
    ordersInfoList : null,
    nftsInfoList : null,
    txsInfoList : null,
    loadingTx : false
}

export default function cart(state=INITIAL_STATE, action) {
    switch(action.type) {
        case ActionTypes.ProductsInfoList : 
            return ({
                ...state,
                productsInfoList : action.payload
            }) ;
        case ActionTypes.UserNFTsInfoList : 
            return ({
                ...state,
                nftsInfoList : action.payload
            });
        case ActionTypes.UserBidsInfoList :
            return ({
                ...state,
                bidsInfoList : action.payload
            });
        case ActionTypes.UserOrdersInfoList:
            return ({
                ...state,
                ordersInfoList : action.payload
            });
        case ActionTypes.UserTxsInfoList :
            return ({
                ...state,
                txsInfoList : action.payload
            });
        case ActionTypes.LoadingTransaction:
            return ({
                ...state,
                loadingTx : action.payload
            }) ;
        default : 
            return state ;
    }
}
import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    customersList : null
}

export default (state=INITIAL_STATE , action={}) => {
    switch(action.type) {
        case ActionTypes.FetchCustomersList:
            return ({
                ...state,
                customersList : {
                    ...action.payload
                }
            }) ;
        default :
            return state ;
    }
}
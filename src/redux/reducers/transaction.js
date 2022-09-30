import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    txsList : null
}

export default function transaction(state=INITIAL_STATE, action) {
    switch(action.type) {
        case ActionTypes.AllTxsList : 
            return ({
                ...state,
                txsList : action.payload
            });
        default :
            return state ;
    }
}
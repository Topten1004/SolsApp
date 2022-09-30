import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    notifysList : null
}

export default (state=INITIAL_STATE , action={}) => {
    switch(action.type) {
        case ActionTypes.FetchAllNotify:
            return ({
                ...state,
                notifysList : {
                    ...action.payload
                }
            }) ;
        default :
            return state ;
    }
}
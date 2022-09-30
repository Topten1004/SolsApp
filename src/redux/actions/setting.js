import ActionTypes from "./actionTypes";

export const ExpandedItem = (expandedItem) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.ExpandedItem,
            payload : expandedItem
        }) ;
        
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
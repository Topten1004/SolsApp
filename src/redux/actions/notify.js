import ActionTypes from './actionTypes' ;

import { realDb } from '../../firebase/database' ;
import { ref, onValue, push, child, update} from "firebase/database";

export const FetchAllNotify = () => async dispatch =>{
    try {
        const starCountRef = ref(realDb, 'Web_Notify/');
        
        onValue(starCountRef, async (snapshot) => {
            const data = snapshot.val();
            
            await dispatch({
                type : ActionTypes.FetchAllNotify,
                payload : data || {}
            }) ;
        });

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const UpdateNotify = async (notify, notify_id) => {
    try {

        let updates = {} ;
        updates['Web_Notify/' + notify_id] = notify ;

        update(ref(realDb), updates) ;

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}


export const WriteNotify = async (notify) => {
    try {

        // Get a key for a new Post.
        let newNotifyKey = push(child(ref(realDb), 'Web_Notify')).key;

        let updates = {} ;
        updates['Web_Notify/' + newNotifyKey] = notify ;

        update(ref(realDb), updates) ;

        return newNotifyKey ;

    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

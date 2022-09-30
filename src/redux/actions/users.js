import ActionTypes from './actionTypes' ;

import { realDb } from '../../firebase/database' ;
import { ref, onValue, push, child, update} from "firebase/database";

export const FetchCustomersList = () => async dispatch =>{
    try {
        const starCountRef = ref(realDb, 'Web_Customers/');
        
        onValue(starCountRef, async (snapshot) => {
            const data = snapshot.val();
            
            await dispatch({
                type : ActionTypes.FetchCustomersList,
                payload : data || {}
            }) ;
        });

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const WriteCustomerInfo = async (fullName, userName, email, profileLink) => {
    try {

        let newCustomer = {
            fullName: fullName,
            userName: userName,
            email: email,
            profileLink: profileLink
        };
        
        // Get a key for a new Post.
        let newCustomerKey = push(child(ref(realDb), 'Web_Customers')).key;

        let updates = {} ;
        updates['Web_Customers/' + newCustomerKey] = newCustomer ;

        update(ref(realDb), updates) ;

        return newCustomerKey ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

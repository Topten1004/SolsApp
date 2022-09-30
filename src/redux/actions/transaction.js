import ActionTypes from "./actionTypes";

import { db, auth } from "../../firebase/database";
import { doc, setDoc, getDoc, updateDoc, getDocs, query, collection, orderBy, where , Timestamp} from 'firebase/firestore' ;
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage' ;
import { getCookie, getProductId } from "../../utils/Helper";

export const AddTransaction = (_from , _to, status) => async dispatch => {
    try {
        let docRef ;
        
        docRef = await addDoc(collection(db, "Web_Transactions"), {
            from : _from,
            to : _to,
            status : status,
            created_at : Timestamp.now()
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const AllTxsList = () => async dispatch => {
    try {
        let querySnapshots = await getDocs(collection(db, "Web_Transactions")) ;

        let txsList = [] ;

        for(let tx of querySnapshots.docs) {
            txsList.push({
                ...tx.data(),
                tx_id : tx.id
            }) ;
        }

        await dispatch({
            type : ActionTypes.AllTxsList,
            payload : txsList
        });

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
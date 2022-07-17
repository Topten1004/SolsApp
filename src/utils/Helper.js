// import { ethers } from 'ethers';
import axios from 'axios';
import { PRIVATE_CA1EX_API } from '../static/constants';

export const setCookie = async (cname, cvalue) => {
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    let expires = "expires="+ d.toUTCString();

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
}

export const eraseCookie = (cname) => {
    document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return ;
}

export const isset = (value) => {
    try {
        if(typeof value === 'undefined') return false ;
        return true ;     
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

// export const getLibrary = (provider) => {
//     return new ethers.providers.Web3Provider(provider) ;
// }

export const authorization = () => {
    return {
        headers: { Authorization: `Bearer ` + getCookie('access_token') }
    }
}

export const errorHandler = (err) => {
    try {
        if(err.response.status === 429){
            return "Too Many Requests." ;
        }
        if(err.response.status === 401){
            return "Unauthorized" ;
        }
        if(err.response.status >= 400 && err.response.status < 500){
            console.log(err.response.data.message) ;
            return err.response.data.message ;
        }
    } catch(error){
        console.log("error" , err);
        return "Server Side Error" ;
    }
}

// export const isAuthenticated = async () => {
//     if(getCookie('access_token')) {
//         const header = authorization() ;
//         try {
//             let res = await axios.post(`${PRIVATE_CA1EX_API}auth/isAuthenticated`, {} , header) ;

//             if(res.status === 200) {
//                 return true ;
//             }
//             return false ;
//         } catch(err) {
//             console.log(errorHandler(err)) ;

//             return false ;
//         }
//     }
//     return false ;
// }

export const isAuthenticated = () => {
    if(getCookie('email')) {
        return true ;
    }
    return false ;
}
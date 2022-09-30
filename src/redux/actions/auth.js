import ActionTypes from './actionTypes' ;
import { getCookie, setCookie } from '../../utils/Helper' ;
import { db, auth, storage, firebaseApp } from '../../firebase/database';

import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword,
     signInWithPhoneNumber,sendSignInLinkToEmail, isSignInWithEmailLink, sendPasswordResetEmail,
    onAuthStateChanged, getAuth, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { doc, setDoc, getDoc, updateDoc, query, where, collection, getDocs, Timestamp } from 'firebase/firestore' ;
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage' ;
import axios from 'axios';
import { authorization, getUuid } from '../../utils/Helper';

import { WriteCustomerInfo } from './users' ;

import nodemailer from 'nodemailer' ;

export const LoadingCodeSend = (isLoading) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.LoadingCodeSend,
            payload : isLoading
        });

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const LoadingSignUp = (isLoading) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.LoadingSignUp,
            payload : isLoading
        });
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const LoadingSignIn = (isLoading) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.LoadingSignIn,
            payload : isLoading
        });
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const PhoneVerifyCodeSent = (verify, phone_number) => async dispatch => {
    try {
        let result = await signInWithPhoneNumber(auth, "+1" + phone_number , verify) ;

        dispatch({
            type : ActionTypes.PhoneVerifyCodeSent,
            payload : result 
        }); 
    } catch(err) {
        console.log(err) ;
    }
}

export const PhoneVerifyCodeConfirm = (code_sent_result, verify_code) => async dispatch => {
    try {
        await code_sent_result.confirm(verify_code) ;

        return true ;
    } catch(err) {
        console.log(err) ;

        return false ;
    }
}

export const InputUserMainInfo = (email, password, full_name, phone_number) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InputUserMainInfo,
            payload : {
                fullName : full_name,
                email : email ,
                password : password,
                phoneNumber : phone_number,
            }
        }) ;

        return true ;
      
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const InputAccountType = (general_account_type_list, product_type_list, job_tag) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InputAccountType,
            payload : {
                generalAccountTypeList : general_account_type_list,
                productTypeList : product_type_list,
                jobTag : job_tag
            }
        }) ;

        return true ;
    } catch (err) {
        console.log(err) ;
        return false;
    }
}

export const InputAccountName = (account_name, detail_account_type_list ) => async dispatch => {
    try {
        let hostId = account_name + "-" + new Date().getTime() ;

        await dispatch({
            type : ActionTypes.InputAccountName,
            payload : {
                accountName : account_name,
                detailAccountTypeList : detail_account_type_list,
                hostId : hostId
            }
        });

        return true ;
    } catch (err) {
        console.log(err) ;
        return false;
    }
}

export const CheckAccountName = (account_name) => async dispatch => {
    try {
        let docSnap = await getDocs( query(collection(db, "Web_Users"), where("account_name", "==", account_name)) );

        if(docSnap.size)  return false ;
        else return true ;
       
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const CheckMyApp = (app_url) => async dispatch => {
    try {
        let docSnap = await getDocs( query(collection(db, "Web_Users"), where("profile_link", "==", app_url)) );

        if(docSnap.size)  return true ;
        else return false ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const InputAccountInfo = (app_name, general_account_type_list) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InputAccountInfo,
            payload  : {
                appName : app_name,
                generalAccountTypeList : general_account_type_list,
            }
        }) ;

        return true ;
    } catch (err) {
        console.log(err) ;
        return false;
    }
}

export const InputSyncSocial = (twitter_url, instagram_url, tiktok_url, youtube_url, snapchat_url, social_setting) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InputSyncSocial,
            payload : {
                twitterUrl : twitter_url,
                instagramUrl : instagram_url,
                tiktokUrl : tiktok_url,
                youtubeUrl : youtube_url,
                snapchatUrl : snapchat_url,
                socialSetting : social_setting
            }
        });

        return true ;

    } catch(err) {
        return false ;
    }
}

export const InputSocialInfo = (website_url, apps_url, link_bio) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.InputSocialInfo,
            payload : {
                websiteUrl : website_url,
                appsUrl : apps_url,
                linkBio : link_bio
            }
        });
        
        return true ;

    } catch(err) {
        return false ;
    }
}

export const SignUpFinalUserInfo = (
    fullName,
    email,
    password,
    phoneNumber,
    hostId,
    accountName,
    detailAccountTypeList,
    generalAccountTypeList,
    // productTypeList,
    // jobTag,
    appName,
    websiteUrl,
    linkBio,
    appsUrl,
    twitterUrl,
    instagramUrl,
    tiktokUrl,
    youtubeUrl,
    snapchatUrl,
    socialSetting
) => async dispatch => {
    try {
        if(
            fullName &&
            email &&
            password &&
            phoneNumber &&
            hostId &&
            accountName &&
            detailAccountTypeList &&
            generalAccountTypeList &&
            // productTypeList &&
            // jobTag &&
            appName
        ) {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password) ;

            let customerKey = await WriteCustomerInfo( fullName, accountName, email, appName ) ;

            await sendEmailVerification(auth.currentUser) ;

            await setDoc(doc(db, "Web_Users", userCredential.user.uid), {
                customer_key : customerKey,
                full_name : fullName,
                email : email,
                password : password,
                phone_number : phoneNumber,
                account_name : accountName,
                detail_account_type_list : detailAccountTypeList,
                general_account_type_list : generalAccountTypeList,
                product_type_list : ['#Ebook', '#Video', "#Image", "#Music"],
                // job_tag  : jobTag,
                profile_link : appName,
                website_url : websiteUrl,
                link_bio : linkBio,
                apps_url : appsUrl,
                twitter_url : twitterUrl,
                instagram_url : instagramUrl,
                tiktok_url : tiktokUrl,
                youtube_url : youtubeUrl,
                snapchat_url : snapchatUrl,
                social_setting : socialSetting,
                product_count : 0,
                platform_count : 0,
                reseller_count : 0,
                joined_date : Timestamp.now(),
                host_id : hostId,
                profile_message : '',
                wallets : []
            })

            return userCredential.user.uid ;
        } else  return false ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const UploadProfilePicture = (name, raw, user_id) => async dispatch => {
    try {
        if(!raw) return ;

        const storageRef = ref(storage, 'web_profile_images/' + user_id + "/" + name );
        const uploadTask = uploadBytesResumable(storageRef, raw);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, "Web_Users", user_id), {
                        profile_picture_url : downloadURL,
                        profile_picture_name : name,
                    }) ;
                });
            }
        );
    } catch(err) {
        console.log(err) ;
    }
}

export const UploadCoverPhoto = (name, raw, user_id) => async dispatch => {
    try {
        if(!raw) return ;

        const storageRef = ref(storage, 'web_cover_photos/' + user_id + "/" + name );
        const uploadTask = uploadBytesResumable(storageRef, raw);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, "Web_Users", user_id), {
                        cover_picture_url : downloadURL,
                        cover_picture_name : name
                    }) ;
                });
            }
        );
    } catch(err) {
        console.log(err) ;
    }
}

export const SendPasswordResetEmail = (email) => async dispatch => {
    try {
        await sendPasswordResetEmail(auth, email) ;

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
export const SignInUserWithEmailAndPassword = (email, password, urlFromLink) => async dispatch => {
    try {
        
        let userCredential = await signInWithEmailAndPassword(auth, email, password) ;

        if(auth.currentUser.emailVerified) {
            if(urlFromLink) {
                setCookie('_SOLSTICE_BUYER', userCredential.user.uid) ;
            } else {
                setCookie('_SOLSTICE_AUTHUSER', JSON.stringify({
                    uuid : userCredential.user.uid,
                    platform : 'solstice'
                })) ;
            }

            let docSnap = await getDoc(doc(db, "Web_Users", userCredential.user.uid)) ;

            await dispatch({
                type : ActionTypes.SignInUser,
                payload : {
                    profilePictureUrl : docSnap.data().profile_picture_url,
                    accountName : docSnap.data().account_name,
                }
            });

            return 200 ;
        } else {
            await sendEmailVerification(auth.currentUser) ;
                
            return 201;
        }
    } catch(err) {
        console.log(err) ;

        return 401 ;
    }
}
export const SignInWithGoogle = (email, urlFromLink) => async dispatch => {
    try {
        const provider = new GoogleAuthProvider();

        let result = await signInWithPopup(auth, provider) ;

        console.log(result.user.emailVerified) ;

        let userDoc = await getDoc(doc(db, "Web_Users", result.user.uid)) ;

        if(!userDoc.exists()) {
            let customerKey = await WriteCustomerInfo( result.user.displayName, result.user.displayName.replaceAll(' ', '').toLowerCase() , 
                result.user.email,
                "https://solsapp.com/" + result.user.displayName.replaceAll(' ', '').toLowerCase() + '.solsapp.com'
            ) ;

            await setDoc(doc(db, "Web_Users", result.user.uid), {
                customer_key : customerKey,
                full_name : result.user.displayName,
                email : result.user.email,
                password : process.env.REACT_APP_PERSONAL_PASSWORD,
                phone_number : null,
                account_name : result.user.displayName.replaceAll(' ', '').toLowerCase(),
                detail_account_type_list : [],
                general_account_type_list : [],
                product_type_list : ['#Ebook', '#Video', "#Image", "#Music"],
                job_tag  : null,
                profile_link : "https://solsapp.com/" + result.user.displayName.replaceAll(' ', '').toLowerCase() + '.solsapp.com',
                website_url : null,
                link_bio : null,
                apps_url : null,
                twitter_url : null,
                instagram_url : null,
                tiktok_url : null,
                youtube_url : null,
                snapchat_url : null,
                social_setting : null,
                product_count : 0,
                platform_count : 0,
                reseller_count : 0,
                joined_date : Timestamp.now(),
                host_id : result.user.displayName.replaceAll(' ', '').toLowerCase() + "-" + new Date().getTime().toString(),
                profile_message : '',
                wallets : []
            }) ;
        }

        if(result.user.emailVerified) {
            if(urlFromLink) {
                setCookie('_SOLSTICE_BUYER', result.user.uid) ;
            } else {
                setCookie('_SOLSTICE_AUTHUSER', JSON.stringify({
                    uuid : result.user.uid,
                    platform : 'google'
                })) ;
            }
            let docSnap = await getDoc(doc(db, "Web_Users", result.user.uid)) ;

            await dispatch({
                type : ActionTypes.SignInUser,
                payload : {
                    profilePictureUrl : docSnap.data().profile_picture_url,
                    accountName : docSnap.data().account_name,
                }
            });

            if(userDoc.exists()) return 200;
            else return 201;
        } else {
            await sendEmailVerification(result.user) ;
                
            return 204;
        }
    } catch(err) {
        console.log(err) ;
        return 401 ;
    }
}
export const ConnectLinkToAccount = (url) => async dispatch => {
    try {
        await dispatch({
            type : ActionTypes.ConnectLinkToAccount,
            payload : url
        }) ;
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}
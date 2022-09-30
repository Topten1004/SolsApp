import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { SignInWithGoogle } from '../../redux/actions/auth';

import swal from 'sweetalert';

import GoogleImage from '../../assets/auth/Google.png' ;

import {
    Button
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
    buttonCss : {
        background : 'white !important',
        color : 'black !important',
        borderRadius : '30px !important',
        textTransform : 'capitalize !important',
        fontSize : '20px !important'
    }
})) ;
const GoogleLoginButton = (props) => {
    const classes = useStyles() ;
    const navigate = useNavigate() ;

    const {
        urlFromLink,
        SignInWithGoogle,
    } = props ;

    const handleSignIn = async () => {
        let res = await SignInWithGoogle() ;

        if( res === 200 ) {
            if(
                await swal({
                    title: 'Sign in successfully!',
                    text: 'You can mint and purchase with SOLSTICE App',
                    buttons: {
                        confirm : {text:'Got it'},
                    },
                    icon : 'success'
                })
            ) {
                if(urlFromLink) navigate(urlFromLink) ;
                else navigate('/solstice/setting-screen') ;
            }
        }
        if( res === 201 ) {
            if(
                await swal({
                    title: 'Sign in successfully!',
                    text: 'Account has been newly created. \n Initial password is 00000000 \n Please, change it using [ forgot password ? ] for personal security.',
                    buttons: {
                        confirm : {text:'Got it'},
                    },
                    icon : 'success'
                })
            ) {
                if(urlFromLink) navigate(urlFromLink) ;
                else navigate('/solstice/setting-screen') ;
            }
        }
        if( res === 401 ) {
            swal({
                title: 'Please Make sure you enter correct credentials',
                text: 'An email will be sent shortly from admin@solsapp.com',
                buttons: {
                    confirm : {text:'Got it'},
                },
                icon : 'error'
            })
        }
        if( res === 204) {
            swal({
                title: 'Please Check your mailbox to confirm your email',
                text: 'If you don’t recieve the message within 2min please check your spam folder',
                buttons: {
                    confirm : {text:'Got it'},
                },
                icon : 'info'
            })
        }
    };

    return (
        <Button variant={'contained'} onClick={handleSignIn} startIcon={<img src={GoogleImage} width={40}/>} className={classes.buttonCss} fullWidth>
            <span className="buttonText">Sign in with Google</span>
        </Button>
    );
}
GoogleLoginButton.propTypes = {
    SignInWithGoogle : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    urlFromLink : state.auth.urlFromLink
})
const mapDispatchToProps = {
    SignInWithGoogle
}
export default connect(mapStateToProps, mapDispatchToProps)(GoogleLoginButton);
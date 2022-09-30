import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { LoadingSignIn, SignInUserWithEmailAndPassword } from '../../redux/actions/auth';

import Loading from 'react-loading-components' ;

import TickImage from '../../assets/common/tick.png';
import CloseImage from '../../assets/Close.png';
import validate from 'validate.js';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import GoogleLoginButton from '../../components/Auth/GoogleLoginButton';

import {
    Box,
    Grid,
    TextField,
    Button,
    InputAdornment,
    useMediaQuery
} from '@mui/material' ;

import { useTheme } from '@mui/styles';
import { useStyles } from './StylesDiv/SignIn.styles';

const schema = {
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 300,
        },
    },
    password : {
        presence: { allowEmpty: false, message: 'is required' },
        length : {
            minimum : 8,
        }
    }
};

const SignInForm = (props) => {
    const {
        SignInUserWithEmailAndPassword,

        handleChangeAuthStep,
        web3Provider,

        LoadingSignIn,
        loadingSignIn,

        urlFromLink
    } = props;

    const classes = useStyles();
    const theme = useTheme() ;

    const navigate = useNavigate();

    const match800 = useMediaQuery('(min-width : 800px)') ;

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });

    const handlePasswordVisible = () => {
        setPasswordVisible(!passwordVisible) ;
    }

    const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value,
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
        }));
        
    };

    const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

    const handleNext = async () => { 
        if(formState.isValid) {
            LoadingSignIn(true) ;

            let res = await SignInUserWithEmailAndPassword(formState.values.email, formState.values.password, urlFromLink) ;

            if( res === 200) {
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
            } else if( res === 401 ) {
                swal({
                    title: 'Please Make sure you enter correct credentials',
                    text: 'An email will be sent shortly from admin@solsapp.com',
                    buttons: {
                        confirm : {text:'Got it'},
                    },
                    icon : 'error'
                })
            }  else {
                swal({
                    title: 'Please Check your mailbox to confirm your email',
                    text: 'If you don’t recieve the message within 2min please check your spam folder',
                    buttons: {
                        confirm : {text:'Got it'},
                    },
                    icon : 'info'
                })
            }
            LoadingSignIn(false) ;
        }
    }

    const handleSignUp = () => {
        handleChangeAuthStep('signup') ;
    }

    useEffect(()=>{
        const errors = validate(formState.values, schema);
        
        setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
        
    }, [formState.values] );

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={match800 ? 6 : 12}>
                    <Box className={classes.descriptionDiv}>
                        <Box className={classes.lineDiv}>

                        </Box>
                        <Box className={classes.helloDiv}>
                            Hello there,
                        </Box>
                        <Box className={classes.welcomeDiv}>
                            Welcome
                            <br/>to SOLS
                        </Box>
                        <Box className={classes.tickDiv}>
                            &gt; Let's Get Started
                        </Box>
                        <Box className={classes.slashDiv}>
                            // Create Account = HOST
                        </Box>
                        <Box className={classes.tickDiv}>
                            &gt;
                        </Box>
                        <Box className={classes.greenBlur} />
                        <Box className={classes.blueBlur} />
                    </Box>
                </Grid>
                <Grid item xs={match800 ? 6 : 12}>
                    <Box className={classes.formDiv}>
                        <Grid container>
                            <Grid item xs={12} className={classes.signUpDiv}>
                                Sign In
                            </Grid>   
                            <Grid item xs={12}>
                                <TextField
                                    label='Email'
                                    name='email'
                                    placeholder='Enter your email'
                                    focused
                                    fullWidth
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <Box component={'img'} src={( hasError('email') || !formState.values.email) ? CloseImage : TickImage } sx={{width : '16px', height : '12px'}}/>
                                        </InputAdornment>,
                                    }}

                                    helperText={hasError('email') ? formState.errors.email[0] : null}
                                    error={hasError('email')}
                                    onChange={handleChange}
                                    value={formState.values.email || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{marginTop : '10px'}}>
                                <TextField
                                    label='Password'
                                    placeholder='Enter your password'
                                    name='password'
                                    focused
                                    type={!passwordVisible ? 'password' : 'text'}
                                    size='medium'
                                    fullWidth
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end" sx={{cursor : 'pointer'}} onClick={handlePasswordVisible}>
                                        {
                                            !passwordVisible ? <VisibilityIcon/> : <VisibilityOffIcon/>
                                        }
                                    </InputAdornment>,
                                    }}

                                    helperText={hasError('password') ? formState.errors.password[0] : null}
                                    error={hasError('password')}
                                    onChange={handleChange}
                                    value={formState.values.password || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{mt : '10px'}}>
                                <Box className={classes.forgotDiv} onClick={() => handleChangeAuthStep('forgot')}>
                                    <u>forgot password?</u>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' className={classes.nextButtonCss} fullWidth onClick={handleNext}
                                    startIcon={loadingSignIn && <Loading type='tail_spin' width={30} height={30} fill='#e83e8c' />}
                                    disabled={loadingSignIn ? true : ( formState.isValid ? false : true )}
                                >Sign In</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' className={classes.nextButtonCss} fullWidth onClick={handleSignUp}>Create Account</Button>
                            </Grid>
                            <Grid item xs={12} sx={{mt : '20px !important'}}>
                                <GoogleLoginButton />
                            </Grid>
                            <Grid item xs={12} className={classes.contentDiv}>
                                <Box>
                                    By creating an account, you agree to the
                                </Box>
                                <Box sx={{textAlign : 'center'}}>
                                    Company's <span className={classes.contentHighlight}>Terms of Service</span> and <span className={classes.contentHighlight}>Privacy Policy</span>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            
        </Box>
    );
}

SignInForm.propTypes = {
    SignInUserWithEmailAndPassword : PropTypes.func.isRequired,
    LoadingSignIn : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    web3Provider : state.wallet.web3Provider,
    loadingSignIn : state.auth.loadingSignIn,
    urlFromLink  : state.auth.urlFromLink
})
const mapDispatchToProps = {
    SignInUserWithEmailAndPassword,
    LoadingSignIn
}
export default connect(mapStateToProps, mapDispatchToProps) (SignInForm);
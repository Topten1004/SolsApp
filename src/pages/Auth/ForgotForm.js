import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { SendPasswordResetEmail } from '../../redux/actions/auth';

import TickImage from '../../assets/common/tick.png';
import CloseImage from '../../assets/Close.png';
import validate from 'validate.js';

import swal from 'sweetalert' ;

import {
    Box,
    Grid,
    TextField,
    Button,
    InputAdornment,
    useMediaQuery
} from '@mui/material' ;

import { useTheme } from '@mui/styles';
import { useStyles } from './StylesDiv/Forgot.styles';

const schema = {
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 300,
        },
    }
};

const ForgotForm = (props) => {
    const {
        handleChangeAuthStep,
        SendPasswordResetEmail
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

    const handleBack = async () => {
        handleChangeAuthStep('signin') ;
    }
    const handleNext = async () => { 
        if(formState.isValid) {
            if(await SendPasswordResetEmail(formState.values.email)) {
                if(await swal({
                    title : 'Reset password code is sent successfully',
                    text : 'Please Check your mailbox to confirm your email.\n\nIf you don’t recieve the message within 2min please check your spam folder',
                    icon : 'success',
                    buttons : {
                        confirm : {text : "Got it"}
                    }
                })) {
                    handleChangeAuthStep('signin') ;
                }
            }
        }
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
                                Reset Password
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
                            <Grid item xs={12}>
                                <Button variant='contained' className={classes.nextButtonCss} fullWidth onClick={handleNext}
                                    // startIcon={loadingSignIn && <Loading type='tail_spin' width={30} height={30} fill='#e83e8c' />}
                                    // disabled={loadingSignIn ? true : ( formState.isValid ? false : true )}
                                >Send Reset Code</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' className={classes.nextButtonCss} fullWidth onClick={handleBack}
                                    // startIcon={loadingSignIn && <Loading type='tail_spin' width={30} height={30} fill='#e83e8c' />}
                                    // disabled={loadingSignIn ? true : ( formState.isValid ? false : true )}
                                >Back</Button>
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

ForgotForm.propTypes = {
    SendPasswordResetEmail : PropTypes.func.isRequired
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = {
    SendPasswordResetEmail
}
export default connect(mapStateToProps, mapDispatchToProps) (ForgotForm);
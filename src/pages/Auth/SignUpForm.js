import React, { useState, useEffect} from 'react';

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;

import TickImage from '../../assets/common/tick.png';
import CloseImage from '../../assets/Close.png';

import validate from 'validate.js';
import swal from 'sweetalert';
import { validateInputValue } from '../../utils/Helper';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import PhoneVerifyModal from '../../components/Auth/PhoneVerifyModal.js';

import {
    Box,
    Grid,
    TextField,
    Button,
    InputAdornment,
    useMediaQuery
} from '@mui/material' ;

import { useStyles } from './StylesDiv/SignUp.styles';

const schema = {
    fullname : {
        presence: { allowEmpty: false, message: 'is required' },
    },
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 300,
        },
    },
    phone : {
        presence : { allowEmpty : false, message : 'is required'},
        length : {
            maximum : 10,
            minimum : 10,
        }
    },
    password : {
        presence: { allowEmpty: false, message: 'is required' },
        length : {
            minimum : 8,
        }
    }
};

const SignUpForm = (props) => {

    const {
        handleChangeAuthStep
    } = props;

    const classes = useStyles();

    const match800 = useMediaQuery('(min-width : 800px)') ;

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [phoneModalOpen, setPhoneModalOpen] = useState(false);

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });

    const handleGotoSignIn = () => {
        handleChangeAuthStep('signin') ;
    }

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

    const handlePhoneModalOpen = () => {
        setPhoneModalOpen(true) ;
    }
    
    const handlePhoneModalClose = () => {
        setPhoneModalOpen(false) ;
    }

    const handleNext = async () => { 

        if(formState.isValid && validateInputValue(formState.values.fullname?.replaceAll(" ", '')) ) {
            handlePhoneModalOpen(true) ;
        } else {
            swal({
                title : 'Error',
                text : 'Field Invalid',
                buttons : false,
                timer : 3000,
                icon : 'error'
            })
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} className={classes.signUpDiv}>
                                Sign Up
                            </Grid>   
                            <Grid item xs={12}>
                                <TextField
                                    label='Full Name'
                                    placeholder='First | Last'
                                    focused
                                    name='fullname'
                                    size='medium'
                                    fullWidth
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <Box component={'img'} src={( hasError('fullname') || !formState.values.fullname) ? CloseImage : TickImage } sx={{width : '16px', height : '12px'}}/>
                                        </InputAdornment>,
                                    }}

                                    helperText={hasError('fullname') ? formState.errors.fullname[0] : (!validateInputValue(formState.values.fullname?.replaceAll(" ", '')) ? "Invalid Name" : null)}
                                    error={hasError('fullname') || !validateInputValue(formState.values.fullname?.replaceAll(" ", ''))}
                                    onChange={handleChange}
                                    value={formState.values.fullname || ''}
                                />
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
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    placeholder={'Phone Number'}
                                    name='phone'

                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">
                                            +1 |
                                        </InputAdornment>,
                                        endAdornment: <InputAdornment position="end">
                                            <Box component={'img'} src={( hasError('phone') || !formState.values.phone) ? CloseImage : TickImage } sx={{width : '16px', height : '12px'}}/>
                                        </InputAdornment>,
                                    }}

                                    helperText={hasError('phone') ? formState.errors.phone[0] : null}
                                    error={hasError('phone')}
                                    onChange={handleChange}
                                    value={formState.values.phone || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
                                <Button variant='contained' className={classes.nextButtonCss} fullWidth onClick={handleNext} disabled={formState.isValid && validateInputValue(formState.values.fullname?.replaceAll(" ", '')) ? false : true} >Next</Button>
                            </Grid>
                            <Grid item xs={12} className={classes.contentDiv}>
                                <Box sx={{textAlign : 'center'}}>
                                    By creating an account, you agree to the
                                </Box>
                                <Box sx={{textAlign : 'center'}}>
                                    Company's <span className={classes.contentHighlight}>Terms of Service</span> and <span className={classes.contentHighlight}>Privacy Policy</span>
                                </Box>
                            </Grid>
                            <Grid item xs={12} className={classes.questionDiv}>
                                Already have and account? &nbsp; <span className={classes.contentHighlight} onClick={handleGotoSignIn}>Sign In</span>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <PhoneVerifyModal 
                open = {phoneModalOpen}
                handleClose={handlePhoneModalClose}
                handleChangeAuthStep={handleChangeAuthStep}
                userInfo={formState.values}
            />
        </Box>
    );
}

SignUpForm.propTypes = {

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps) (SignUpForm);
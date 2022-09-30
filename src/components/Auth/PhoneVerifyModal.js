import React, { useState } from 'react' ;

import { auth } from '../../firebase/database';
import { RecaptchaVerifier } from "firebase/auth";

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { PhoneVerifyCodeSent, PhoneVerifyCodeConfirm, InputUserMainInfo, LoadingCodeSend } from '../../redux/actions/auth';

import Loading from 'react-loading-components' ;

import OtpInput from "react-otp-input";

import  {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Box,
    Button
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {

    },
    paper : {
        backgroundColor : '#011627 !important',
        border : '1px solid gray !important',
        borderRadius : '10px !important',
        
        "& .MuiDialogTitle-root" : {
            color : 'white'
        },

        "& .MuiButtonBase-root" : {
            textTransform : 'capitalize !important',
            color : '#C3C7E5',
            border : '1px solid #C3C7E5',
            borderRadius : 20,
            width : 200
        },
        "& .MuiButtonBase-root.Mui-disabled": {
            WebkitTextFillColor: theme.palette.green.A200,
            border : '1px solid #C3C7E5',
        },
    },
    titleDiv : {
        ['@media (max-width : 345px)'] : {
            fontSize : 15
        },
    },
    lineDiv : {
        borderBottom : '2px solid #1E2D3D',
    },
    descriptionDiv : {
        color : "#43D9AD",

        ['@media (max-width : 345px)'] : {
            fontSize : 15
        },
    }
})) ;

const PhoneVerifyModal = (props) => {

    const classes = useStyles() ;

    const {
        handleChangeAuthStep,
        open,
        handleClose,
        userInfo,

        PhoneVerifyCodeSent,
        PhoneVerifyCodeConfirm,
        codeSentResult,
        loadingCodeSend,
        InputUserMainInfo,
        LoadingCodeSend
    } = props ;

    const [verifyCode, setVerifyCode] = useState() ;
    const [verifyRobot, setVerifyRobot] = useState() ;

    const handleOpenVerifyRobot = async () => {
        setVerifyRobot(true) ;
    }

    const handleVerifyPhone = async () => {

        await handleOpenVerifyRobot() ;

        await LoadingCodeSend(true) ;
        let verify = new RecaptchaVerifier('recaptcha-container', {}, auth);

        await PhoneVerifyCodeSent(verify, userInfo.phone) ;
        await LoadingCodeSend(false) ;
    }

    const handleChangeVerifyCode = (code) => {
        setVerifyCode(code) ;
    }

    const handleSentVerifyCode = async () => {
        if( await PhoneVerifyCodeConfirm(codeSentResult, verifyCode) ) {
            if( await InputUserMainInfo(userInfo.email, userInfo.password, userInfo.fullname, userInfo.phone) ) {
                handleChangeAuthStep('account') ;
            }
        }
    }

    return (
        <Box className={classes.root}>
            <Dialog
                open={open}
                fullWidth
                classes ={{
                    paper : classes.paper
                }}
            >
                <DialogTitle>
                    <Box className={classes.titleDiv}>
                        Phone Number Verification
                    </Box>
                </DialogTitle>
                <Box className={classes.lineDiv}/>
                <DialogContent>
                    {
                        !codeSentResult ? !verifyRobot ? <Box className={classes.descriptionDiv}>
                            Please, Click "Phone Verify" Button.
                        </Box>
                        :<Box id="recaptcha-container" />
                        : <OtpInput
                            inputStyle={{
                                width: "3rem",
                                height: "3rem",
                                margin: "0 1rem",
                                fontSize: "2rem",
                                color : "#43D9AD",
                                borderRadius: 4,
                                backgroundColor : "#011627",
                                border: "1px solid white"
                            }}
                            isInputNum
                            numInputs={6}
                            value={verifyCode}
                            onChange={handleChangeVerifyCode}
                        />
                    }
                    
                </DialogContent>
                <Box className={classes.lineDiv}/>
                <DialogActions>
                    {
                        !codeSentResult ? <Button variant='outlined' onClick={handleVerifyPhone} disabled={loadingCodeSend} startIcon={loadingCodeSend && <Loading type='tail_spin' width={30} height={30} fill='#e83e8c' />}>
                            {
                                loadingCodeSend ? "Sending Code..." : "Phone Verify"
                            }
                        </Button>
                        : <Button variant={'outlined'} onClick={handleSentVerifyCode}>Confirm Code</Button>
                    }
                    
                </DialogActions>
            </Dialog>
        </Box>
    )
}
PhoneVerifyModal.propTypes = {
    LoadingCodeSend : PropTypes.func.isRequired,
    PhoneVerifyCodeConfirm : PropTypes.func.isRequired,
    PhoneVerifyCodeSent : PropTypes.func.isRequired,
    InputUserMainInfo : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    codeSentResult : state.auth.codeSentResult,
    loadingCodeSend : state.auth.loadingCodeSend
})
const mapDispatchToProps = {
    LoadingCodeSend ,
    PhoneVerifyCodeSent,
    PhoneVerifyCodeConfirm,
    InputUserMainInfo
}
export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerifyModal) ;
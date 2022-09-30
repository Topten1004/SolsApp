import React, { useEffect, useState } from 'react' ;

import { connect } from 'react-redux';

import SuccessImage from '../../assets/modals/Success.svg' ;
import ErrorImage from '../../assets/modals/Error.svg' ;
import InfoImage from '../../assets/modals/Info.svg' ;

import  {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Box,
    Button,
    TextField
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles(() => ({
    root : {
        
    },
    paper : {
        backgroundColor : 'white !important',
        borderRadius : '15px !important',
        
        "& .MuiDialogTitle-root" : {
            color : 'white'
        },

        "& .MuiButtonBase-root" : {
            textTransform : 'capitalize !important',
            color : 'white',
            borderRadius : 20,
            backgroundColor : '#3772FF !important'
        },
    },
})) ;

const MessageModal = (props) => {

    const classes = useStyles() ;

    const {
        open,
        handleClose,

        title,
        type,
        message
    } = props ;

    const [titleColor, setTitleColor] = useState('#05A660') ;

    useEffect(() => {
        if(type === 'success') setTitleColor('#05A660') ;
        if(type === 'error') setTitleColor('#E53535') ;
        if(type === 'info') setTitleColor("#3772FF");
    }, [type]) ;

    return (
        <Box className={classes.root}>
            <Dialog
                open={open}
                fullWidth
                classes ={{
                    paper : classes.paper
                }}
            >
                <DialogContent>
                    <Box sx={{color : titleColor, fontSize : '25px', fontWeight : '500', textAlign : 'center', lineHeight : '32px', mt : '15px'}}>
                        {title}
                    </Box>
                    <Box sx={{display : 'flex', justifyContent : 'center', mt : '40px', mb : '40px'}}>
                        { type === 'success' && <img src={SuccessImage} width={80} height={80}/>}
                        { type === 'error' && <img src={ErrorImage} width={80} height={80}/>}
                        { type === 'info' && <img src={InfoImage} width={80} height={80}/>}
                    </Box>
                    <Box sx={{color : '#87898E', textAlign : 'center', mb : '30px'}}>
                        {message}
                    </Box>
                    <Box sx={{display : 'flex', justifyContent : 'center'}}>
                        <Button variant='contained' fullWidth onClick={() => handleClose()} sx={{width : '200px !important'}}>Got it</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageModal) ;
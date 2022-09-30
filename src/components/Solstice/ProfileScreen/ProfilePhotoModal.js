import React, { useState, useEffect, useRef, createRef } from "react";

import ImageEditorModal from "./ImageEditorModal.js";

import CloseImage from '../../../assets/modals/CloseDark.svg' ;
import EditImage from '../../../assets/modals/Edit.svg' ;
import ThumbImage from '../../../assets/modals/Thumb.svg' ;

import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';

import  {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    DialogActions,
    Button,
    InputLabel,
    Input
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles(() => ({
    root : {

    },
    paper : {
        backgroundColor : '#23262fba  !important',
        borderRadius : '10px !important',
        
        "& .MuiDialogTitle-root" : {
            color : 'white',
            padding : '10px !important',
            fontFamily : 'Montserrat',
            display : 'flex', alignItems : 'center', justifyContent : 'space-between'
        },

        "& .MuiDialogContent-root" : {
            padding : '10px !important'
        },

        "& .MuiDialogActions-root" : {
            display : 'flex', justifyContent : 'flex-end',gap : '10px',
            paddingBottom : '15px'
        },

        "& .MuiButtonBase-root" : {
            backgroundColor : '#3772FF !important',
            textTransform : 'capitalize !important',
            color : 'white',
            borderRadius : 20,
            width : 150,
            paddingLeft : 20, paddingRight : 20,
            "& svg" : {
                fontSize : '25px !important'
            }
        },
    },
    lineDiv : {
        borderBottom : '2px solid gray',
    },
    descriptionDiv : {
        color : "#43D9AD"
    },
    customButtonCss : {
        backgroundColor : '#3772FF !important',
        textTransform : 'capitalize !important',
        color : 'white', fontSize : 14,
        borderRadius : 20,
        width : 150,
        padding : 7,
        cursor : 'pointer',
        display : 'flex', justifyContent : 'center', alignItems : 'flex-end',
    }
})) ;

const ProfilePhotoModal = (props) => {

    const classes = useStyles() ;

    const {
        open,
        handleClose,
        
        photoUrl
    } = props ;

    const [profilePicture, setProfilePicture] = useState({raw : "", preview : "", name:""}) ;
    const [openImageEditorModal, setOpenImageEditorModal] = useState(false) ;

    const handleOpenImageEditorModal = () => {
        // handleClose();
        setOpenImageEditorModal(true) ;
    }
    const handleCloseImageEditorModal = () => {
        setOpenImageEditorModal(false) ;
    }

    const handleChangeProfilePicture = (e) => {
        if(e.target.files.length) {
            setProfilePicture({
                preview : URL.createObjectURL(e.target.files[0]),
                name : e.target.files[0].name,
                raw : e.target.files[0]
            }) ;
        }
    }

    return (
        <Box className={classes.root}>
            <Dialog
                open={open}
                onClose={handleClose}
                classes ={{
                    paper : classes.paper
                }}
            >
                <DialogTitle>
                    Profile Photo <img src={CloseImage} onClick={handleClose} style={{cursor : 'pointer'}}/>
                </DialogTitle>
                <DialogContent>
                    <img src={profilePicture.preview ? profilePicture.preview : photoUrl} style={{width : '100%'}}/>
                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'} startIcon={<img src={EditImage}/>} onClick={handleOpenImageEditorModal}>Edit</Button>
                    <InputLabel htmlFor="upload-profile-picture" className={classes.upload}>
                        <Box className={classes.customButtonCss}><img src={ThumbImage}/>&nbsp;Add Photo</Box>
                    </InputLabel>
                    <Input
                        type="file"
                        id="upload-profile-picture"
                        name="profile-picture"
                        style={{ display: "none" }}
                        onChange={handleChangeProfilePicture}
                    />
                    <Button variant={'contained'} startIcon={<CloudDoneOutlinedIcon/>} >Update</Button>
                </DialogActions>
            </Dialog>
            <ImageEditorModal
                open={openImageEditorModal}
                handleClose={handleCloseImageEditorModal}

                path={profilePicture.preview ? profilePicture.preview : photoUrl}
            />
        </Box>
    )
}

export default ProfilePhotoModal ;
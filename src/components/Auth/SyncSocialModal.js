import React, {useState } from 'react' ;

import { connect } from 'react-redux';
import { InputSyncSocial } from '../../redux/actions/auth';

import CloseIcon from '@mui/icons-material/Close';

import  {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Select,
    FormControl,
    MenuItem,
    Box,
    Button,
    TextField,
    useMediaQuery
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles(() => ({
    root : {

    },
    paper : {
        backgroundColor : '#011627 !important',
        border : '1px solid gray !important',
        borderRadius : '10px !important',
        ['@media (max-width : 375px)'] : {
            borderRadius : '5px !important'
        },

        "& .MuiDialogTitle-root" : {
            color : 'white',
            display : 'flex',
            alignItems: 'center',
            justifyContent : 'space-between'
        },

        "& .MuiFormControl-root" : {
            borderRadius : 5,
            color : '#43D9AD',
            "& svg" :{
                color : 'white'
            },

            marginBottom : 30
        },

        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#C3C7E5 !important',
            },
            '&:hover fieldset': {
                borderColor: '#C3C7E5 !important',
            },
            '&.Mui-focused fieldset': {
                border : '1px solid #C3C7E5 !important'
            },
        },

        "& .MuiInputBase-input" :{
            color : '#43D9AD !important',
        },
    },
    lineDiv : {
        borderBottom : '2px solid #1E2D3D',
    },
    descriptionDiv : {
        color : "#43D9AD"
    },
    labelDiv : {
        color : 'white',
        padding : 5,
        ['@media (max-width : 330px)'] : {
            fontSize : 15
        },
    },
    titleDiv : {
        ['@media (max-width : 330px)'] : {
            fontSize : 15
        },
        ['@media (max-width : 300px)'] : {
            fontSize : 13
        },
    },
    nextButtonCss : {
        color : '#C3C7E5 !important',
        textTransform : 'capitalize !important',
        width : 100,
        fontSize: '15px !important',
        borderRadius : '20px !important',
        border : '1px solid gray !important'
    }
})) ;

const SyncSocialModal = (props) => {

    const classes = useStyles() ;

    const {
        open,
        handleClose,
        handleUpdatedSocialInfo,
        InputSyncSocial,
    } = props ;

    const match375 = useMediaQuery('(min-width : 375px)') ;
    
    const [twitter_url, setTwitterUrl] = useState('') ;
    const [instagram_url, setInstagramUrl] = useState('') ;
    const [tiktok_url, setTickTokUrl] = useState('') ;
    const [youtube_url, setYouTubeUrl] = useState('');
    const [snapchat_url, setSnapChatUrl] = useState('') ;

    const [social_type, setSocialType] = useState('Twitter') ;
    const [social_setting, setSocialSetting] = useState('None') ;

    const social_type_list = [
        "Twitter",
        "Instagram",
        'TikTok',
        "YouTube",
        "Snapchat"
    ]

    const social_setting_list = [
        "None",
    ]

    const handleChangeSocialType = (social_type) => {
        setSocialType(social_type) ;
    }

    const handleChangeSocialSetting = (social_setting) => {
        setSocialSetting(social_setting) ;
    }

    const handleNext = async () => {
        handleClose() ;

        if( await InputSyncSocial(twitter_url, instagram_url, tiktok_url, youtube_url, snapchat_url, social_setting)) {
            handleUpdatedSocialInfo(true) ;
        } 
    }

    return (
        <Box className={classes.root}>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                classes ={{
                    paper : classes.paper
                }}
            >
                <DialogTitle>
                    <span className={classes.titleDiv}>SYNC to Social Media</span>
                    <CloseIcon onClick={handleClose} sx={{cursor : 'pointer'}} />
                </DialogTitle>
                <Box className={classes.lineDiv}/>
                <DialogContent>
                    <Box className={classes.labelDiv}>{social_type} URL</Box>
                    {
                        social_type === 'Twitter' &&    <TextField 
                                                            value={twitter_url}
                                                            onChange={(e) => setTwitterUrl(e.target.value)}

                                                            size={match375 ? 'medium' : 'small'}
                                                            fullWidth
                                                            placeholder="Enter Social URL."
                                                        />
                    }

                    {
                        social_type === 'Instagram' &&    <TextField 
                                                            value={instagram_url}
                                                            onChange={(e) => setInstagramUrl(e.target.value)}

                                                            size={match375 ? 'medium' : 'small'}
                                                            fullWidth
                                                            placeholder="Enter Social URL."
                                                        />
                    }

                    {
                        social_type === 'TikTok' &&    <TextField 
                                                            value={tiktok_url}
                                                            onChange={(e) => setTickTokUrl(e.target.value)}

                                                            size={match375 ? 'medium' : 'small'}
                                                            fullWidth
                                                            placeholder="Enter Social URL."
                                                        />
                    }

                    {
                        social_type === 'YouTube' &&    <TextField 
                                                            value={youtube_url}
                                                            onChange={(e) => setYouTubeUrl(e.target.value)}

                                                            size={match375 ? 'medium' : 'small'}
                                                            fullWidth
                                                            placeholder="Enter Social URL."
                                                        />
                    }

                    {
                        social_type === 'Snapchat' &&    <TextField 
                                                            value={snapchat_url}
                                                            onChange={(e) => setSnapChatUrl(e.target.value)}

                                                            size={match375 ? 'medium' : 'small'}
                                                            fullWidth
                                                            placeholder="Enter Social URL."
                                                        />
                    }

                    <Box className={classes.labelDiv}>Choose Category</Box>
                    <FormControl fullWidth>
                        <Select
                            name={"social"}
                            value={social_type}
                            size={match375 ? 'medium' : 'small'}
                            onChange={(e) => handleChangeSocialType(e.target.value)}
                        >
                            {
                                social_type_list.map( (type , index) => {
                                    return (
                                        <MenuItem value={type} key={index}>{type}</MenuItem>
                                    )
                                } )
                            }
                        </Select>
                    </FormControl>

                    <Box className={classes.labelDiv}>Choose Social</Box>
                    <FormControl fullWidth>
                        <Select
                            name={"social_setting"}
                            value={social_setting}
                            size={match375 ? 'medium' : 'small'}
                            onChange={(e) => handleChangeSocialSetting(e.target.value)}
                        >
                            {
                                social_setting_list.map( (setting , index) => {
                                    return (
                                        <MenuItem value={setting} key={index}>{setting}</MenuItem>
                                    )
                                } )
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <Box className={classes.lineDiv}/>
                <DialogActions>
                    <Button variant={'outlined'} className={classes.nextButtonCss} onClick={handleNext}>Next</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = {
    InputSyncSocial
}
export default connect(mapStateToProps, mapDispatchToProps)(SyncSocialModal) ;
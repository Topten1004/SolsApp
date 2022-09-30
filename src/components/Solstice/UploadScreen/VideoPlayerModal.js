import React, { useState } from 'react' ;

import { connect } from 'react-redux';
import YouTube from 'react-youtube';

import  {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Box,
    Button,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles(() => ({
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
            width : 150
        }
    },
    lineDiv : {
        borderBottom : '2px solid #1E2D3D',
    },
    descriptionDiv : {
        color : "#43D9AD"
    }
})) ;

const VideoPlayerModal = (props) => {

    const classes = useStyles() ;

    const {
        open,
        handleClose,
        
        videoPreview
    } = props ;

    const getYoutubeId = (url) => {
        url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    }

    const isYoutubeUrl = (url) => {
        return url && url.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
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
                    Video Player
                </DialogTitle>
                <Box className={classes.lineDiv}/>
                <DialogContent>
                    {
                        videoPreview && (
                            !isYoutubeUrl(videoPreview) ?  <Box sx={{width : '100%', height : 500, background : 'black'}}>
                                <video src={videoPreview} height={'500px'} width={'100%'} controls/>
                            </Box> :
                            <YouTube videoId={getYoutubeId(videoPreview)} opts={{
                                height: 500,
                                width: 400,
                                playerVars: {
                                    // https://developers.google.com/youtube/player_parameters
                                    autoplay: 1,
                                },
                            }}/>
                        )
                    }
                </DialogContent>
                <Box className={classes.lineDiv}/>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = {
   
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayerModal) ;
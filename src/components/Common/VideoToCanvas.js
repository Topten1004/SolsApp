import * as React from 'react' ;

import Loading from 'react-loading-components' ;

import {
    Box
} from '@mui/material' ;

import { makeStyles, useTheme } from '@mui/styles';

const useStyles= makeStyles((theme) => ({
    root : {
        position : 'relative',
        display : 'flex', justifyContent : 'center', alignItems : 'center',
        cursor : 'pointer',
        zIndex : 10000,
    },
    loadingDiv : {
        display : 'flex', flexDirection : 'column', gap : 10,
        color : theme.palette.green.A200,
        position: 'absolute', left : 0 , top : 0,
        display : 'flex', alignItems : 'center' , justifyContent : 'center',
        borderRadius : 25,
        boxSizing: 'border-box'
    }
})) ;

const VideoToCanvas = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;

    const {
        videoInfo,

        width ,
        height,
        normalColor,
        selectedColor,
        backgroundColor,
        selected
    } = props ;

    const [videoCtrl, setVideoCtrl] = React.useState(null) ;
    const [ctx, setCtx] = React.useState(null) ;
    const [loaded, setLoaded] = React.useState(false) ;
    const [isMounted, setMounted] = React.useState(false) ;
    const [bgColor, setBgColor] = React.useState(theme.palette.blue.main) ;

    const update = async () => {
        if(isMounted) {
            setLoaded(true) ;
        }
        await ctx?.drawImage(videoCtrl,0,0,width,height);  
        videoCtrl?.remove() ;
    }

    const play = async () => {
        setTimeout(() => {
            update();
        }, [5000]) ;
    }

    React.useEffect(() => {
        if(backgroundColor) setBgColor(backgroundColor) ;
    }, [backgroundColor]) ;

    React.useEffect(() => {
        setLoaded(false) ;
        setMounted(true) ;
        if(videoInfo) {
            var canvas = document.getElementById(videoInfo.videoId) ;
            var ctx = canvas.getContext("2d") ;

            setCtx(ctx) ;

            let video = document.createElement("video");
            video.src = videoInfo.videoUrl;
            video.autoplay = true ;
            video.style.width = width + "px" ;
            video.style.height = height + "px" ;
            video.style.position = 'fixed' ;
            video.style.top = '-' + (height - 1) + "px" ;
            video.style.left = '-' + (width - 1) + "px" ;
            video.style.zIndex = 10000 ;
            document.getElementById('xxsl-oediv-nap').appendChild(video);

            setVideoCtrl(video) ;
        }
    }, [JSON.stringify(videoInfo)]) ;

    React.useEffect(() => {
        if(videoCtrl) {
            videoCtrl.addEventListener('loadeddata', async () => {
                play() ;
            });
        }
    }, [videoCtrl]) ;

    React.useEffect(() => {
        setMounted(true) ;
        setLoaded(false) ;
        return () => {
            setMounted(false) ;
            setLoaded(true) ;
            if(videoCtrl) videoCtrl?.remove() ;
        }
    }, []) ;

    return (
        <Box className={classes.root} sx={{height : (height + 6 ) + 'px !important', width : (width + 6) + 'px !important', }}>
            <canvas id={videoInfo?.videoId} width={width} height={height} style={{outline :(selected ? selectedColor : normalColor) + ' 3px solid', borderRadius : '20px'}}/>
            {
                !loaded && <Box className={classes.loadingDiv} 
                                sx={{height : ( height + 6 ) + 'px !important', width : (width+6) + 'px !important', border : '3px solid ' + normalColor, background : bgColor}}
                    >
                    <Loading type='oval' width={30} height={30} fill={theme.palette.green.A200} />
                    <Box>
                        Rendering...
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default VideoToCanvas ;
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

const ImageToCanvas = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;

    const {
        imageInfo,

        width ,
        height,
        normalColor,
        selectedColor,
        backgroundColor,
        selected
    } = props ;

    const [imageCtrl, setImageCtrl] = React.useState(null) ;
    const [ctx, setCtx] = React.useState(null) ;
    const [loaded, setLoaded] = React.useState(false) ;
    const [isMounted, setMounted] = React.useState(true) ;
    const [bgColor, setBgColor] = React.useState(theme.palette.blue.main) ;

    const update = async () => {
        if(isMounted) {
            setLoaded(true) ;
        }
        await ctx?.drawImage(imageCtrl,0,0,width,height);

        imageCtrl?.parentNode?.removeChild(imageCtrl);
    }

    const paint = async () => {
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
        if(imageInfo) {
            // console.log("image load") ;
            var canvas = document.getElementById(imageInfo.imageId) ;
            var ctx = canvas.getContext("2d") ;

            ctx.filter = "invert(100%)" ;
            ctx.fillStyle = "rgb(237,239,240)";
            ctx?.fillRect (0, 0, width, height);

            setCtx(ctx) ;

            let image = document.createElement("img");
            image.src = imageInfo.imageUrl;
            image.style.width = width + "px" ;
            image.style.height = height + "px" ;
            image.style.position = 'fixed' ;
            // image.style.filter = 'blur(5px)' ;
            image.style.top = '-' + (height - 1) + "px" ;
            image.style.left = '-' + (width - 1) + "px" ;
            // image.style.top = "500px",
            // image.style.left = "500px",
            image.style.zIndex = 10000 ;
            image.style.filter = "invert(100%)";

            document.getElementById('xxsl-egami-nap').appendChild(image);
            setImageCtrl(image) ;
        }
    }, [JSON.stringify(imageInfo)]) ;

    React.useEffect(() => {
        if(imageCtrl) {
            // console.log("ctrl loaded", imageCtrl) ;
            // console.log(imageCtrl.complete) ;
            if(imageCtrl.complete) paint() ;
            else {
                imageCtrl.addEventListener('load', async () => {
                    paint() ;
                });
            }
        }
    }, [imageCtrl]) ;

    React.useEffect(() => {
        setMounted(true) ;
        setLoaded(false) ;
        return () => {
            setMounted(false) ;
            setLoaded(true) ;
            
            imageCtrl?.parentNode?.removeChild(imageCtrl);
            setImageCtrl(null) ;
        }
    }, []) ;

    return (
        <Box className={classes.root} sx={{height : (height + 6 ) + 'px !important', width : (width + 6) + 'px !important', }}>
            <canvas id={imageInfo?.imageId} width={width} height={height} style={{outline :(selected ? selectedColor : normalColor) + ' 3px solid', borderRadius : '20px'}}/>
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

export default ImageToCanvas ;
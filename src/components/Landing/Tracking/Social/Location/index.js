import React from 'react';

import clsx from 'clsx';

import {
    Box,
    Grid
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        background : 'white',
        color : 'black',
        borderRadius : '4px',
        marginTop : '20px',
        padding : '15px',
        "& .MuiSvgIcon-root" : {
            color : '#1660CF'
        }
    },
    title : {
        fontSize : '20px',
        fontWeight : 'bold',
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    lightText : {
        fontSize : '12px',
        color : 'grey',
    },
    youtubeSign : {
        background : '#338BEF',
        width : '10px',
        height : '10px',
        marginRight : '10px',
    },
    tiktokSign : {
        background : 'pink',
        width : '10px',
        height : '10px',
        marginRight : '10px',
    },
    instagramSign : {
        background : 'orange',
        width : '10px',
        height : '10px',
        marginRight : '10px',
    },
    twitterSign : {
        background : 'lightgreen',
        width : '10px',
        height : '10px',
        marginRight : '10px',
    },
    percentage : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        color : 'white',
        borderRadius : '4px',
        height : '30px',
        marginRight : '5px',
    },
    youtubePercentage : {
        background : '#338BEF',
        width : '42%',
    },
    instagramPercentage : {
        background : 'orange',
        width : '21%',
    },
    tiktokPercentage : {
        background : 'pink',
        width : '19%',
    },
    twitterPercentage : {
        background : 'lightgreen',
        width : '13%',
    }
}))

const TextField = (props) => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.title}>
                Location
                <Box className={classes.lightText}> Last 30 days </Box>
            </Box>
            <Grid container>
                <Grid item xs={6} sx={{display : 'flex', alignItems : 'center'}}>
                    <Box className={classes.youtubeSign}></Box>
                    <Box> YouTube </Box>
                </Grid>
                <Grid item xs={6} sx={{display : 'flex', alignItems : 'center'}}>
                    <Box className={classes.tiktokSign}></Box>
                    <Box> TikTok </Box>
                </Grid>
                <Grid item xs={6} sx={{display : 'flex', alignItems : 'center'}}>
                    <Box className={classes.instagramSign}></Box>
                    <Box> Instagram </Box>
                </Grid>
                <Grid item xs={6} sx={{display : 'flex', alignItems : 'center'}}>
                    <Box className={classes.twitterSign}></Box>
                    <Box> Twitter </Box>
                </Grid>
                <Grid item xs={12} sx={{display : 'flex'}}>
                    <Box className={clsx(classes.percentage, classes.youtubePercentage)}> 44% </Box>
                    <Box className={clsx(classes.percentage, classes.instagramPercentage)}> 22% </Box>
                    <Box className={clsx(classes.percentage, classes.tiktokPercentage)}> 20% </Box>
                    <Box className={clsx(classes.percentage, classes.twitterPercentage)}> 14% </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TextField;
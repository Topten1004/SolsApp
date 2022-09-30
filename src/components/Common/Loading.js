import React from 'react' ;

import {
    Box, 
    CircularProgress
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles(() => ({
    root : {
        position : 'fixed',
        top:0,
        left : 0,
        zIndex : 1500,

        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center',

        width : '100vw',
        height : '100vh',

        backdropFilter : "blur(5px)"
    },
    status : {
        fontSize : 20,
        fontWeight : 600,
        marginBottom : 10
    }
})) ;

const Loading = (props) => {
    const classes =  useStyles() ;

    const {
        status
    } = props ;

    return (
        <Box className={classes.root}>
            <Box className={classes.status}>
                {
                    status
                }
            </Box>
            <CircularProgress />
        </Box>
    )
}

export default Loading ;
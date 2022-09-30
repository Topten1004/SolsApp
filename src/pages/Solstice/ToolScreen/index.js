import React, { useState } from 'react';

import CommingSoon from '../../../components/Common/CommingSoon';

import {
    Box,
} from '@mui/material' ;

import {makeStyles} from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        backgroundColor : "#011627",
        minHeight : '100vh',
        position : 'relative',
    },
    greenBlur : {
        position : 'absolute',
        width: 200,
        height: 150,
        left: 45,
        top: 170,

        background: '#43D9AD',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    blueBlur : {
        position : 'absolute',
        width: 200,
        height: 150,
        right: 45,
        top: 400,

        background: '#4D5BCE',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
}));

const ToolScreen = () => {

    const classes = useStyles() ;
  
    return (
        <Box className={classes.root}>
            <Box className={classes.greenBlur} />
            <Box className={classes.blueBlur} />
            <CommingSoon />
        </Box>
    );
}

export default ToolScreen ;
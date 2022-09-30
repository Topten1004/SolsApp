import React from "react";


import {
    Box
} from '@mui/material';

import {makeStyles} from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        width : '100%' , height : '100vh',
        display : 'flex', alignItems : 'center', justifyContent : 'center',
        color: theme.palette.green.A200,
        overflow : 'hidden'
    },
    soonPanelDiv : {
        display : 'flex', flexDirection : 'column', alignItems : 'center', justifyContent : 'center',
        border : '2px solid ' + theme.palette.blue.A100,

        background : theme.palette.blue.A200,
        height : 300, minWidth : 500,
        padding : 20,
        borderRadius : 20,
        boxShadow : '0 0 20px #eee !important',

        animation: `$soon-panel-animation 1000ms ease-in-out running` ,
    },
    soonDiv : {
        fontSize : 40,
        fontWeight : 600,
        marginBottom : 10,
    },
    updateDiv : {
        marginTop : 10,
        fontSize : 20
    },
    "@keyframes soon-panel-animation" : {
        "0%" : {
            marginLeft : '100%',
        },
        "50%" : {
            marginLeft : '-20%',
        },
        "100%" : {
            
        }
    },
}))

const CommingSoon = () => {
    const classes = useStyles();

    return(
        <Box className={classes.root}>
            <Box className={classes.soonPanelDiv}>
                <Box className={classes.soonDiv}>Coming Soon</Box>
                <Box className={classes.updateDiv}>We're launching soon, follow us for update...</Box>
            </Box>
        </Box>
    );
}

export default CommingSoon;
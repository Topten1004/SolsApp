import React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {
    Box
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        background : 'white',
        color : 'black',
        borderRadius : '4px',
        marginTop : '20px',
        "& .MuiSvgIcon-root" : {
            color : '#1660CF'
        }
    },
    labelBox : {
        position : 'absolute',
        top : -10,
        left : 10,
        fontSize : '12px',
        paddingLeft : 20,
        paddingRight : 20,
        borderRadius : '4px',
        background : 'white',
    },
    mainContent : {
        position : 'relative',
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : '10px',
    }
}))

const TextField = (props) => {

    const {
        labelText,
        mainText
    } = props;
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.mainContent}>
                <Box className={classes.labelBox}>
                    {labelText}
                </Box>
                {mainText}
                <CheckCircleIcon />
            </Box>
        </Box>
    );
}

export default TextField;
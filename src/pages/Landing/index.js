import React from 'react' ;

import { connect } from 'react-redux' ;

import Home from '../../components/Landing/Home';
import SolsCloud from '../../components/Landing/SolsCloud';
import Panel from '../../components/Landing/Panel';
import Tracking from '../../components/Landing/Tracking';
import SpaceShip from '../../components/Landing/SpaceShip';
import BACKGROUND_IMAGE from '../../assets/background3.png';

import {
    Box,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        color : 'white',
    },
    background : {
        position : 'fixed',
        backgroundImage : `url(${BACKGROUND_IMAGE})`,
        backgroundSize : '100% 100%',
        zIndex : '-10000',
        height : '100vh',
        width : '100%'
    }
})) ;

const Landing = (props) => {

    const classes = useStyles();

    const {

    } = props ;


    return (
        <Box className={classes.root}>
            <Box className={classes.background}/>
            <Home/>
            <SolsCloud/>
            <Panel/>
            <Tracking/>
            <SpaceShip/>
        </Box>
    )
}


const mapStateToProps = state => ({

})
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Landing) ;


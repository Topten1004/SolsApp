import React,{ useEffect } from 'react' ;

import { connect } from 'react-redux';

import Footer from './Layouts/Footer' ;

import Routing from './Routes';
import './styles.css';
import "@fontsource/montserrat";

import {
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
}))


const Main = (props) => {
    const classes = useStyles() ;

    const {
    } = props ;

    return (
        <Box className='main'>
            <Box>
                <Routing />
            </Box>
            <Footer /> 
        </Box>
    )
}

Main.propTypes = {
}

const mapStateToProps = state => ({

}) ;

const mapDispatchToProps = {
} ;

export default connect(mapStateToProps, mapDispatchToProps)(Main) ;
import React, { useState, useEffect} from 'react';

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;

import {
    Box,
    Grid,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : '#010C15',
        height : '100vh'
    },
    descriptionDiv : {
        backgroundColor : '#011627',
        
        padding : 30,
        height : 'calc(100vh)',
        
        border: '1px solid #1E2D3D',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
        
        position : 'relative',

        overflow : 'hidden'
    },
    helloDiv : {
        
        fontStyle: 'normal',
        fontWeight: 450,
        fontSize: 18,
        letterSpacing : 1.5,

        marginBottom : 10,

        color: '#E5E9F0'
    },
    welcomeDiv : {
        
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 50,
        letterSpacing : 5,

        marginBottom : 15,
        
        color: '#E5E9F0',
    },
    tickDiv : {
        color : '#43D9AD',
        fontSize : 20,
        letterSpacing : 1
    },
    slashDiv : {
        color: '#607B96',

        fontSize : 14,
        fontWeight : 400,

        marginTop : 170,
        marginBottom : 100
    },
    lineDiv : {
        borderBottom : '2px solid #1E2D3D',
        
        marginLeft : -30,
        marginBottom : 80,
        marginTop : 30,

        width  : '70%',
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
        top: 450,

        background: '#4D5BCE',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
})) ;

const CalendlyDiscord = (props) => {

    const {
    } = props;

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <Box className={classes.descriptionDiv}>
                        <Box className={classes.lineDiv}>

                        </Box>
                        <Box className={classes.helloDiv}>
                            Hello there,
                        </Box>
                        <Box className={classes.welcomeDiv}>
                            Welcome to the
                            <br/>SOLSTICE DISCORD
                        </Box>
                        <Box className={classes.tickDiv}>
                            > Let's Get The
                        </Box>
                        <Box className={classes.tickDiv}>
                            Conversation Started 
                        </Box>
                        <Box className={classes.slashDiv}>
                            // Create Account = HOST
                        </Box>
                        <Box className={classes.greenBlur} />
                        <Box className={classes.blueBlur} />
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{paddingLeft : '30px', paddingRight : '60px', paddingTop : '30px'}}>
                    <Box className={classes.tickDiv} sx={{marginBottom : '60px', paddingTop : '100px'}}>
                        Thank you for hopping in,
                    </Box>
                    <Box className={classes.tickDiv} sx={{marginBottom : '20px', paddingLeft : '70px'}}>
                        > Welcome to our original creator’s page
                    </Box>
                    <Box className={classes.tickDiv} sx={{marginBottom : '20px', paddingLeft : '70px'}}>
                        > Feedback is welcome along the way and we will provide transparency as we organically grow the conversation
                    </Box>
                    <Box className={classes.tickDiv} sx={{marginBottom : '320px', paddingLeft : '70px'}}>
                        > First Step for the creators will be to book a Calendly demo with our team to visualize your business profile X Solstice...
                    </Box>
                    <Box className={classes.tickDiv} sx={{paddingLeft : '70px'}}>
                        >> Attaching Our Calendly below to get started:
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

CalendlyDiscord.propTypes = {

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps) (CalendlyDiscord);
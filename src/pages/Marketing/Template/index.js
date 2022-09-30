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
        height : '100vh',

        position : 'relative',
    },
    descriptionDiv : {
        left : 0,
        top : 0,

        backgroundColor : '#011627',
        
        height : '100vh',
        width : '50%',
        
        border: '1px solid #1E2D3D',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
        
        overflow : 'hidden',

        position : 'absolute',

        zIndex : 0
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
        fontSize: 62,
        letterSpacing : 5,

        color: '#E5E9F0',
    },
    explainDiv : {
        
        color : "#607B96"
    },    
    tickDiv : {
        color : '#43D9AD',
        fontSize : 20,
        fontWeight : 400,

        letterSpacing : 1,

        marginBottom : 20
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
        marginBottom : 30,
        marginTop : 60,

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
        right: '50%',
        top: 450,

        background: '#4D5BCE',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    leftTopDiv : {
        paddingLeft : 30,
        height : '50vh !important'
    },
    leftBottomDiv : {
        paddingLeft : 30,
        height : '50vh !important',
    },
    rightTopDiv : {
        display : 'flex !important',
        flexDirection : 'column !important',
        justifyContent : 'space-around',

        paddingRight : 40,
        paddingLeft : 80
    },
    rightBottomDiv : {
        display : 'flex !important',
        flexDirection : 'column !important',
        justifyContent : 'space-around',

        paddingRight : 40,
        paddingLeft : 80
    }
})) ;

const Template = (props) => {

    const {
    } = props;

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Grid container >
                <Grid item xs={12} sx={{zIndex : 1000 , borderBottom : '1px solid #EFEFEF'}}>
                    <Grid container>
                        <Grid item xs={6} className={classes.leftTopDiv}>
                            <Box className={classes.lineDiv}/>
                            <Box className={classes.helloDiv}>
                                Join Our Waitlist,
                            </Box>
                            <Box className={classes.welcomeDiv}>
                                <Box>Buy, Sell, and</Box>
                                <Box>Resell Digital</Box>
                                <Box>Products</Box>
                            </Box>
                            <Box className={classes.explainDiv}>
                                Upload any form of Intellectual Property (IP) to  your virtual private sales channel in our SOLSCLoud.  
                            </Box>
                        </Grid>
                        <Grid item xs={6} className={classes.rightTopDiv}>
                            <Box>
                                <Box className={classes.tickDiv}>
                                    > Secure digital product distribution
                                </Box>
                                <Box className={classes.tickDiv}>
                                    > Unlock secondary market transactions 
                                </Box>
                                <Box className={classes.tickDiv}>
                                    > Automate affiliate marketing contracts 
                                </Box>
                                <Box className={classes.tickDiv}>
                                    > Fully integrateable point of sale (POS), single-click checkout 
                                </Box>
                                <Box className={classes.tickDiv}>
                                    > Mint utility based NFTs ontop of the Ethereum Blockchain 
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{zIndex : 1000}} >
                    <Grid container>
                        <Grid item xs={6} className={classes.leftBottomDiv}>
                            <Box sx={{height : 20}}/>
                            <Box className={classes.helloDiv}>
                                Join Our Developer Program,
                            </Box>
                            <Box className={classes.welcomeDiv}>
                                <Box>Secure & Encyrpt</Box>
                                <Box>Content to Unlock</Box>
                                <Box>your Metadata </Box>
                            </Box>
                            <Box className={classes.explainDiv}>
                                Upload any form of Intellectual Property (IP) to  your virtual private sales channel in our SOLSCLoud.  
                            </Box>
                        </Grid>
                        <Grid item xs={6} className={classes.rightBottomDiv}>
                            <Box>
                                <Box className={classes.tickDiv}>
                                    > Immutable data fabric for open-first media applications.
                                </Box>
                                <Box className={classes.tickDiv}>
                                    > Universal media library for content developers
                                </Box>
                                <Box className={classes.tickDiv}>
                                    > Automated payments between developers and content creators & publishers 
                                </Box>
                                <Box className={classes.tickDiv}>
                                    > Fully integrateable point of sale (POS), single-click checkout 
                                </Box>
                                <Box className={classes.tickDiv}>
                                    > Data marketplace for developers, brands, businesses, and curators
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box className={classes.descriptionDiv} />
            <Box className={classes.greenBlur} />
            <Box className={classes.blueBlur} />
        </Box>
    );
}

Template.propTypes = {

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps) (Template);
import React, { useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeasure } from 'react-use';

import { connect } from 'react-redux' ;

import clsx from 'clsx';
import Header from '../../Layouts/Header';
import LANDING_IMAGE from '../../../assets/landing.png';
// import htmlFile from './signup.html';

import {
    Box,
    Grid,
    Button,
    useMediaQuery,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        "& .MuiListItem-root" : {
            padding : '0px'
        },
        "& .MuiButton-root" : {
            width : '300px',
            height : '64px',
            fontSize : '36px',
            fontWeight : 'bold',
            borderRadius : '20px',
            textTransform : 'none',
            margin : '15px 15px',
            border : '3px solid #1472FF',
            color : 'white',
            ['@media (max-width : 1400px)'] : {
                fontSize : '28px',
                width : '200px'
            }
        },
    },
    backgroundImage : {
        paddingLeft : '60px',
        ['@media (max-width : 1000px)'] : {
            paddingLeft : '30px',
            paddingRight : '30px',
        },
    },
    background : {
        position : 'relative',
        height : '100%',

    },
    image : {
        zIndex : -100000,
        width : '100%',
        height : '100%',

    },
    title : {
        fontStyle : 'normal',
        fontSize : '70px',
        fontWeight : '700',
        lineHeight : '100px',
        letterSpacing : '0.05em',
        marginBottom : '70px',
        marginTop : '70px',
        ['@media (max-width : 1350px)'] : {
            fontSize : '50px'
        },
        ['@media (max-width : 1000px)'] : {
            fontSize : '60px',
            textAlign : 'center',
        },
        ['@media (max-width : 700px)'] : {
            fontSize : '45px',
        },
        ['@media (max-width : 500px)'] : {
            fontSize : '32px',
            lineHeight : '70px'
        },
    },
    text : {
        fontSize : '28px',
        marginBottom : '120px',
        marginRight : '54px',
        ['@media (max-width : 1220px)'] : {
            fontSize : '24px'
        },
        ['@media (max-width : 1000px)'] : {
            fontSize : '24px',
            textAlign : 'center',
            marginRight : '0px',
        },
        ['@media (max-width : 600px)'] : {
            fontSize : '20px',
        },
    },
    buttonGroup : {
        marginLeft : '50px',
        ['@media (max-width : 1400px)'] : {
            marginLeft : '0px'
        },
        ['@media (max-width : 1000px)'] : {
            display : 'flex',
            justifyContent : 'center',
            paddingBottom : '100px',
        },
        ['@media (max-width : 600px)'] : {
            flexDirection : 'column',
            alignItems : 'center'
        }
    },
    signButton : {
        background : '#1472FF !important',
    },
    gradient : {
        paddingLeft : '50px',
        paddingRight : '50px',
        paddingTop : '5px',
        paddingBottom : '5px',
        maxWidth : '90%',
        fontSize : '24px',
        display : 'flex',
        alignItems : 'center',
        background: 'linear-gradient(90.71deg, #73E0A9 0%, #5B68DF 100%)',
        borderRadius: '90px',
        transform: 'rotate(-0.08deg)',
        ['@media (max-width : 1400px)'] : {
            fontSize : '16px'
        }
    },
    lesson : {
        position : 'absolute',
        top : 40,
        left : 0,
        cursor : 'pointer',
    },
    solsCloud : {
        position : 'absolute',
        top : '40%',
        right : 0,
        cursor : 'pointer',
    },
    integration : {
        position : 'absolute',
        top : '72%',
        left : '-20',
        cursor : 'pointer',
    },
    money : {
        position : 'absolute',
        top : '90%',
        right : 0,
        cursor : 'pointer',
    },
})) ;

const Landing = () => {

    const classes = useStyles();

    const navigate = useNavigate();
    const match = useMediaQuery('(min-width : 1000px)');

    const imageForm = useRef();
    const [ setImageForm, {width, height} ] = useMeasure();

    useEffect(() => {
        setImageForm(imageForm.current);
        console.log(width, height);
    }, []);

    return (
        <Box className={classes.root}>
            <Box className={classes.backgroundImage}>
                <Grid container>
                    <Grid item xs={match ? 6.5 : 12}>
                        <Header />
                        <Box className={classes.title}>
                            <Box component={'span'} sx={{color : '#1472FF'}}>
                                Control&nbsp;
                        </Box>
                            Your <br/> Premium Content
                        </Box>
                        <Box className={classes.text}>
                            SOLS is built to connect and automate the entire distribution process of digital products and assets accross the web. Creators, publishers, and producers never miss an opportunity to earn. 
                        </Box>
                        <Box className={classes.buttonGroup}>
                            <Button variant='contained' className={classes.signButton}>
                                Sign In
                            </Button>
                            <Button onClick={()=>{window.location.href='/signup.html'}} variant='outlined' sx={{color : '#338BEF !important'}}>
                                Get Started
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={5.5} sx={{display : match ? '' : 'none'}}>
                        <Box className={classes.background}>
                            <Box component={"img"} src={LANDING_IMAGE} className={classes.image}/>
                            <Box className={clsx(classes.gradient, classes.lesson)}>
                                Amy, Creates Video Lessons 
                            </Box>
                            <Box className={clsx(classes.gradient, classes.solsCloud)}>
                                Sells Content on Her Website & Syncs with SOLS
                            </Box>
                            <Box className={clsx(classes.gradient, classes.integration)}>
                                Streams and Shares to 8 Platforms
                            </Box>
                            <Box className={clsx(classes.gradient, classes.money)}>
                                Secure and Private Distribution
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    );
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps) (Landing);
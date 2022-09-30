import React, { useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeasure } from 'react-use';

import { connect } from 'react-redux' ;

import clsx from 'clsx';
import Header from '../Layouts/Header/Landing';
import LANDING_IMAGE from '../../assets/landing/landing.png';
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
            width : '10vw',
            height : '64px',
            fontSize : '1.7vw',
            fontWeight : 'bold',
            borderRadius : '30px',
            textTransform : 'none',
            margin : '15px 15px',
            border : '3px solid #1472FF',
            color : 'white',
            ['@media (max-width : 1400px)'] : {
                fontSize : '28px',
                width : '210px',
            },
            ['@media (max-width : 800px)'] : {
                fontSize : '20px',
                width : '210px',
            }
        },
    },
    backgroundImage : {
        paddingLeft : '60px',
        ['@media (max-width : 1000px)'] : {
            paddingLeft : '30px',
            paddingRight : '30px',
        },
        ['@media (max-width : 400px)'] : {
            paddingLeft : '10px',
            paddingRight : '10px',
        },
    },
    background : {
        position : 'relative',
        width : '100%',
        height : '100%',

    },
    image : {
        zIndex : -100000,
        width : '100%',
        height : '1000px',

    },
    title : {
        fontStyle : 'normal',
        fontSize : '4.5vw',
        fontWeight : '700',
        lineHeight : '5vw',
        letterSpacing : '0.05em',
        marginBottom : '70px',
        marginTop : '70px',
        ['@media (max-width : 1000px)'] : {
            fontSize : '60px',
            textAlign : 'center',
            lineHeight : '100px',
        },
        ['@media (max-width : 700px)'] : {
            fontSize : '45px',
        },
        ['@media (max-width : 500px)'] : {
            fontSize : '30px',
            lineHeight : '70px'
        },
    },
    text : {
        fontSize : '2vw',
        marginBottom : '70px',
        marginRight : '54px',
        ['@media (max-width : 1850px)'] : {
            fontSize : '1.9vw'
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
        ['@media (max-width : 1100px)'] : {
            display : 'flex',
            justifyContent : 'center',
            paddingBottom : '100px',
        },
        ['@media (max-width : 700px)'] : {
            flexDirection : 'column',
            alignItems : 'center'
        }
    },
    signButton : {
        background : '#1472FF !important',
    },
    discordButton : {
        color : '#338BEF !important',
        width : '20vw !important',
        fontWeight : 'bold !important',
        ['@media (max-width : 1400px)'] : {
            width : '370px !important'
        },
        ['@media (max-width : 800px)'] : {
            width : '250px !important',
            margin : '0px !important'
        }
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
        left : 30,
        cursor : 'pointer',
    },
    solsCloud : {
        position : 'absolute',
        top : '38%',
        right : 0,
        cursor : 'pointer',
    },
    integration : {
        position : 'absolute',
        top : '69%',
        left : 30,
        cursor : 'pointer',
    },
    money : {
        position : 'absolute',
        top : '92%',
        right : 0,
        cursor : 'pointer',
    },
})) ;

const Landing = () => {

    const classes = useStyles();

    const match = useMediaQuery('(min-width : 1000px)');

    const navigate = useNavigate() ;

    const imageForm = useRef();
    const [ setImageForm, {width, height} ] = useMeasure();

    const handleSignUp = () => {
        navigate('/auth/');
    }

    useEffect(() => {
        setImageForm(imageForm.current);
        // console.log(width, height);
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
                            <Button variant='contained' className={classes.signButton} onClick={handleSignUp}>
                                Connect
                            </Button>
                            <Button onClick={()=>{window.location.href='https://discord.com/invite/De7vWWGg'}} variant='outlined' className={classes.discordButton}>
                                Join our Discord
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
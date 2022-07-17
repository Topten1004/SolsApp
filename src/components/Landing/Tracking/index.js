import React from "react";

import CLOUD_IMAGE from '../../../assets/cloud.png';
import HOST_IMAGE from '../../../assets/Tracking/host.png';
import SEND_IMAGE from '../../../assets/Tracking/send.png';
import ACCELERATE_IMAGE from '../../../assets/Tracking/accelerate.png';
import TRACK_IMAGE from '../../../assets/Tracking/track.png';
import VIEW_IMAGE from '../../../assets/Tracking/view.png';

import {
    Box,
    Grid,
    useMediaQuery
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        padding : '110px',
        ['@media (max-width : 1000px)'] : {
            padding : '60px'
        }
    },
    cloudContent : {
        position : 'relative',
        marginBottom : '70px',
        ['@media (max-width : 1000px)'] : {
            paddingTop : '20px',
        },
        ['@media (max-width : 700px)'] : {
            paddingTop : '10px',
        }
    },
    cloudImage : {
        position : 'absolute',
        top : -40,
        left : -30,
        width : '227px',
        height : '112px',
        ['@media (max-width : 1300px)'] : {
            top : -40,
            fontSize : '60px',
        },
        ['@media (max-width : 1000px)'] : {
            top : 0,
            left : -20,
            width : '160px',
            height : '70px',
        },
        ['@media (max-width : 700px)'] : {
            top : 10,
            left : -20,
            width : '120px',
            height : '50px',
        },
    },
    cloud : {
        fontSize : '65px',
        fontWeight : 'bold',
        letterSpacing : '0.05em',
        paddingTop : '20px',
        ['@media (max-width : 1000px)'] : {
            fontSize : '45px',
        },
        ['@media (max-width : 700px)'] : {
            fontSize : '36px',
        },
    },
    subTitleContent : {
        display : 'flex',
        alignItems : 'center',
        marginBottom : '20px',
    },
    subTitle : {
        fontSize : '65px',
        fontWeight : 'bold',
        color : '#338BEF',
        marginLeft : '60px',
        ['@media (max-width : 1200px)'] : {
            fontSize : '40px'
        },
        ['@media (max-width : 600px)'] : {
            fontSize : '32px',
            marginLeft : '30px',
        }
    },
    text : {
        fontSize : '32px',
        ['@media (max-width : 1300px)'] : {
            fontSize : '24px'
        },
        ['@media (max-width : 600px)'] : {
            fontSize : '16px'
        }
    },
    hostImage : {
        ['@media (max-width : 1300px)'] : {
            width : '50px',
        },
    },
    sendImage : {
        marginLeft : '-20px',
        ['@media (max-width : 1300px)'] : {
            width : '65px',
            marginLeft : '-10px'
        },
    },
    accelerateImage : {
        ['@media (max-width : 1300px)'] : {
            width : '50px',
        },
    },
    trackImage : {
        ['@media (max-width : 1300px)'] : {
            width : '50px',
        },
    },
    viewImage : {
        width : '100%'
    }
}))
const Tracking = (props) => {
    
    const classes = useStyles();

    const match = useMediaQuery('(min-width : 1000px)');
    return(
        <Box className={classes.root}>
            <Box className={classes.cloudContent}>
                <Box component={'img'} src={CLOUD_IMAGE} className={classes.cloudImage}/>
                <Box className={classes.cloud}>
                    SOLS
                    <Box component={"span"} className={classes.host}>CLOUD</Box>
                </Box>
            </Box>

            <Grid container spacing={5}>
                <Grid item xs={match ? 5 : 12}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <Box className={classes.subTitleContent}>
                                <Box component={'img'} src={HOST_IMAGE} className={classes.hostImage}/>
                                <Box component={'span'} className={classes.subTitle}>
                                    HOST
                                </Box>
                            </Box>
                            <Box className={classes.text}>
                                Upload video products, PDFs, Ebooks, publications, and to your private sales storage cloud. 
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box className={classes.subTitleContent}>
                                <Box component={'img'} src={SEND_IMAGE} className={classes.sendImage}/>
                                <Box component={'span'} className={classes.subTitle}>
                                    Send
                                </Box>
                            </Box>
                            <Box className={classes.text}>
                                Send, sell, and share securley across all your channels with the systems you already use.
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box className={classes.subTitleContent}>
                                <Box component={'img'} src={ACCELERATE_IMAGE} className={classes.accelerateImage}/>
                                <Box component={'span'} className={classes.subTitle}>
                                    Accelerate
                                </Box>
                            </Box>
                            <Box className={classes.text}>
                                Automate “work for earn” contracts that enable products to continuously grow by the people who love them most. 
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box className={classes.subTitleContent}>
                                <Box component={'img'} src={TRACK_IMAGE} className={classes.trackImage}/>
                                <Box component={'span'} className={classes.subTitle}>
                                    Track
                                </Box>
                            </Box>
                            <Box className={classes.text}>
                                End-to-end coverage, hot-spots, sales analytics, insights, visitors, and demographic data all-in-one. 
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={match ? 7 : 12}>
                    <Box component={'img'} src={VIEW_IMAGE} className={classes.viewImage}/>
                </Grid>
            </Grid>
            
        </Box>
    );
}

export default Tracking;
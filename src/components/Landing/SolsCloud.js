import React from 'react';

import { connect } from 'react-redux' ;

import CLOUD_IMAGE from '../../assets/cloud.png';
import MOBILE_IMAGE from '../../assets/mobile.png';


import {
    Box,
    Grid,
    Button,
    useMediaQuery,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        paddingTop : '100px',
        "& .MuiButton-root" : {
            textTransform : 'none',
            fontSize : '30px !important',
            ['@media (max-width : 900px)'] : {
                fontSize : '24px !important',
            },
            ['@media (max-width : 700px)'] : {
                fontSize : '16px !important',
            },
        },
    },
    topContent : {
        paddingLeft : '180px',
        ['@media (max-width : 1300px)'] : {
            paddingLeft : '100px',
        },
        ['@media (max-width : 1000px)'] : {
            paddingLeft : '50px',
            paddingRight : '50px',
        },
        ['@media (max-width : 700px)'] : {
            paddingLeft : '20px',
            paddingRight : '20px',
        },
    },
    textType : {
        fontSize : '4vw',
        fontWeight : 'bold',
        letterSpacing : '0.05em',
        color : '#338BEF',
        ['@media (max-width : 1400px)'] : {
            fontSize : '40px',
        },
        ['@media (max-width : 1200px)'] : {
            fontSize : '36px',
        },
        ['@media (max-width : 1000px)'] : {
            textAlign : 'center',
        },
        ['@media (max-width : 700px)'] : {
            fontSize : '32px',
        },
        ['@media (max-width : 500px)'] : {
            fontSize : '20px',
        }
    },
    baseText : {
        color : 'white',
    },
    secureContent : {
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : '90px',
        ['@media (max-width : 1300px)'] : {
            padding : '50px',
        },
        ['@media (max-width : 700px)'] : {
            paddingLeft : '20px',
            paddingRight : '20px',
        },
        ['@media (max-width : 400px)'] : {
            paddingLeft : '0px',
            paddingRight : '0px',
        },
    },
    add : {
        fontSize : '85px',
        ['@media (max-width : 1000px)'] : {
            fontSize : '60px',
        },
        ['@media (max-width : 700px)'] : {
            fontSize : '40px'
        }
    },
    cloudContent : {
        position : 'relative',
        ['@media (max-width : 1000px)'] : {
            paddingTop : '20px',
        },
        ['@media (max-width : 700px)'] : {
            paddingTop : '10px',
        }
    },
    cloudImage : {
        position : 'absolute',
        top : -30,
        left : -30,
        width : '267px',
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
        ['@media (max-width : 500px)'] : {
            top : 0,
            left : -10,
            width : '80px',
            height : '30px',
        }
    },
    cloud : {
        fontSize : '6vw',
        fontWeight : 'bold',
        paddingTop : '20px',
        ['@media (max-width : 1300px)'] : {
            fontSize : '60px',
        },
        ['@media (max-width : 1000px)'] : {
            fontSize : '45px',
            textAlign : 'center',
        },
        ['@media (max-width : 700px)'] : {
            fontSize : '36px',
        },
        ['@media (max-width : 500px)'] : {
            paddingTop : '5px',
            fontSize : '20px',
        }
    },
    host : {
        fontSize : '6vw',
        fontWeight : 'bold',
        color : '#338BEF',
        ['@media (max-width : 1300px)'] : {
            fontSize : '60px',
        },
        ['@media (max-width : 1000px)'] : {
            fontSize : '45px',
            textAlign : 'center',
        },
        ['@media (max-width : 700px)'] : {
            fontSize : '36px',
        },
        ['@media (max-width : 500px)'] : {
            fontSize : '20px',
        }
    },
    buttonGroup : {
        display : 'flex',
        justifyContent : 'space-between',
        marginRight : '150px',
        ['@media (max-width : 1300px)'] : {
            marginRight : '100px',
        },
        ['@media (max-width : 1000px)'] : {
            marginLeft : '20px',
        },
        ['@media (max-width : 700px)'] : {
            marginLeft : '20px',
        },
        ['@media (max-width : 500px)'] : {
            marginRight : '50px',
            marginLeft : '10px',
        },
    },
    simpleButton : {
        background : '#1472FF !important',
        borderRadius : '0px !important',
        width : '400px !important',
        height : '50px !important',
        fontSize : '16px !important',
        padding : '0px !important',
        margin : '0px !important',
        ['@media (max-width : 1300px)'] : {
            width : '300px !important',
        },
        ['@media (max-width : 1000px)'] : {
            width : '200px !important',
        },
        ['@media (max-width : 700px)'] : {
            width : '90px !important',
        }
    },
    bottomContent : {
        paddingLeft : '140px',
        marginTop : '100px',
        ['@media (max-width : 1300px)'] : {
            paddingLeft : '80px',
        },
        ['@media (max-width : 1000px)'] : {
            paddingLeft : '50px',
            paddingRight : '50px',
        },
        ['@media (max-width : 700px)'] : {
            paddingLeft : '20px',
            paddingRight : '20px',
        },
    },
    
    hostText : {
        fontSize : '2.9vw',
        fontWeight : 'bold',
        letterSpacing : '0.05em',
        color : '#338BEF',
        ['@media (max-width : 1300px)'] : {
            fontSize : '40px',
        },
        ['@media (max-width : 1000px)'] : {
            fontSize : '32px',
            textAlign : 'center'
        },
        ['@media (max-width : 700px)'] : {
            fontSize : '28px',
        },
        ['@media (max-width : 500px)'] : {
            fontSize : '20px',
        }
    },
    hostButton : {
        width : '400px !important',
        fontSize : '32px !important',
        fontWeight : 'bold !important',
        letterSpacing : '0.5px',
        borderRadius : '4px',
        background : 'white !important',
    },
    hostImage : {
        width : '100%',
        height : '130%',
        marginTop : '-100px',
        ['@media (max-width : 1000px)'] : {
            marginTop : 50,
        }
    }
})) ;

const SolsCloud = () => {

    const classes = useStyles();

    const match = useMediaQuery('(min-width : 1000px)');
    const match1 = useMediaQuery('(min-width : 1300px)');

    return (
        <Box className={classes.root}>
            <Box className={classes.topContent}>
                <Box className={classes.textType}>
                    Secure&nbsp;
                    <Box component={"span"} className={classes.baseText}>
                        all content-based monetization streams from a single source.
                    </Box>
                </Box>
                <Box className={classes.secureContent}>
                    <Box className={classes.host}>
                        HOST
                    </Box>
                    <Box className={classes.cloudContent}>
                        <Box component={'img'} src={CLOUD_IMAGE} className={classes.cloudImage}/>
                        <Box className={classes.cloud}>
                            SOLS
                            <Box component={"span"} className={classes.host}>CLOUD</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.bottomContent}>
                <Grid container>
                    <Grid item xs={match ? 6 : 12} className={classes.hostText}>
                        <Box sx={{mb : 12}}>
                            HOSTS&nbsp;
                            <Box component={"span"} sx={{color : 'white'}}>
                                connect and automate their entire content distribution process with SOLS
                                <Box component={"span"} className={classes.hostText}>
                                    CLOUD&nbsp;
                                </Box>
                                by seamlessly creating private sales channels. 
                            </Box>
                        </Box>
                        <Box sx={{display : 'flex', justifyContent : 'center'}}>
                        <Button className={classes.hostButton}>
                            Become a&nbsp;
                            <Box component={'span'} sx={{color : '#338BEF'}}>
                                HOST
                            </Box>
                        </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={match ? 6 : 12}>
                        <Box component={'img'} src={MOBILE_IMAGE} className={classes.hostImage}/>
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

export default connect(mapStateToProps, mapDispatchToProps) (SolsCloud);
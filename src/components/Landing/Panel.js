import React from "react";

import BUSINESS_IMAGE from '../../assets/Host/business.png';
import CREATOR_IMAGE from '../../assets/Host/creator.png';
import RESELLER_IMAGE from '../../assets/Host/reseller.png';
import DEVELOPER_IMAGE from '../../assets/Host/developer.png';

import {
    Box,
    Grid,
    useMediaQuery
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        padding : '110px',
        marginTop : '100px',
        ['@media (max-width : 1000px)'] : {
            padding : '30px'
        }
    },
    title : {
        fontSize : '4vw',
        fontWeight : 'bold',
        marginBottom : '200px',
        ['@media (max-width : 1000px)'] : {
            fontSize : '50px',
            marginBottom : '100px',
            textAlign : 'center'
        },
        ['@media (max-width : 600px)'] : {
            fontSize : '24px'
        }
    },
    content : {
        display : 'flex',
        flexDirection : 'column !important',
        alignItems : 'center',
        background : 'white',
        marginLeft : '2% !important',
        marginRight : '2% !important',
        padding : '20px !important',
        ['@media (max-width : 700px)'] : {
            marginBottom : '30px !important'
        },
    },
    blueColor : {
        color : '#338BEF'
    },
    subTitle : {
        fontSize : '48px',
        fontWeight : 'bold',
        color : '#338BEF',
        marginBottom : '20px',
        ['@media (max-width : 1500px)'] : {
            fontSize : '32px'
        },
        ['@media (max-width : 1300px)'] : {
            fontSize : '24px'
        },
        ['@media (max-width : 1000px)'] : {
            fontSize : '18px'
        }
    },
    icon : {
        width : '100px',
        ['@media (max-width : 1300px)'] : {
            width : '80px'
        },
        ['@media (max-width : 1000px)'] : {
            width : '50px'
        }
    }
}))
const Panel = (props) => {
    
    const classes = useStyles();

    const match1 = useMediaQuery('(min-width : 700px)');
    const match2 = useMediaQuery('(min-width : 400px)');

    return(
        <Box className={classes.root}>
            <Box className={classes.title}>
                Become a&nbsp;
                <Box component={'span'} className={classes.blueColor}>
                    HOST
                </Box>
            </Box>
            <Grid container >
                <Grid item xs={match1 ? 2.5 : match2 ? 5.5 : 12} className={classes.content}>
                    <Box className={classes.subTitle}>
                        Businesses
                    </Box>
                    <Box component={'img'} src={BUSINESS_IMAGE} className={classes.icon}/>
                </Grid>
                <Grid item xs={match1 ? 2.5 : match2 ? 5.5 : 12} className={classes.content}>
                    <Box className={classes.subTitle}>
                        Creators
                    </Box>
                    <Box component={'img'} src={CREATOR_IMAGE} className={classes.icon} />
                </Grid>
                <Grid item xs={match1 ? 2.5 : match2 ? 5.5 : 12} className={classes.content}>
                    <Box className={classes.subTitle}>
                        ReSellers
                    </Box>
                    <Box component={'img'} src={RESELLER_IMAGE} className={classes.icon}/>
                </Grid>
                <Grid item xs={match1 ? 2.5 : match2 ? 5.5 : 12} className={classes.content}>
                    <Box className={classes.subTitle}>
                        Developers
                    </Box>
                    <Box component={'img'} src={DEVELOPER_IMAGE} className={classes.icon}/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Panel;
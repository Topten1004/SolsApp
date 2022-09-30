import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useWalletInfo } from '../../../contexts/WalletContext' ;
import { useNavigate } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import Loading from 'react-loading-components' ;

import ProductBids from './ProductBids.js';
import ProductResellers from './ProductResellers.js';
import OwnNFTs from './OwnNFTs.js';
import ProductsInfo from './ProductsInfo.js' ;
import ProductsTx from './ProductsTx.js';
import ProductOrders from './ProductOrders.js';

import {
    Box,
    Button,
    Tab,
    Tabs
} from '@mui/material' ;

import {makeStyles, useTheme} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : "#011627",
        minHeight : '100vh',
        position : 'relative',
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',

            border  :'1px solid #43D9AD'
        },
        "& .MuiTab-root" : {
            color : 'white',
            textTransform : 'capitalize',
            fontFamily : 'Montserrat',
            fontSize : 15,
        },
        '& .Mui-selected': {
            color: '#43D9AD !important',
        },
    },
    buttonCss : {
        background : 'white !important',
        color : '#2196F3 !important',
        textTransform  :'capitalize !important',
        fontWeight : 'bold !important',

        marginRight : '10px !important'
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
        position : 'absolute', right: 45, top: 400,
        width: 200, height: 150, 
        background: '#4D5BCE',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    loadingDiv : {
        position : 'fixed', left : 0 , top : 0 , zIndex: 2000,
        width : '100vw' , height : '100vh',
        backdropFilter : 'blur(5px)',

        display : 'flex' , alignItems : 'center', justifyContent : 'center' 
    }
}));

const CartScreen = (props) => {

    const classes = useStyles() ;
    const theme = useTheme() ;
    const navigate = useNavigate() ;

    const {
        isConnected
    } = useWalletInfo() ;

    const {
        loadingTx
    } = props ;

    const [value, setValue] = useState(0);

    const a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }
  
    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;
    
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
            {
                value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )
            }
            </div>
        );
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    React.useEffect(() => {
        if(!isConnected) navigate('/solstice/setting-screen') ;
    }, [isConnected]) 
  
    return (
        <Box className={classes.root}>
            <Box className={classes.greenBlur} />
            <Box className={classes.blueBlur} />
            {
                loadingTx && <Box className={classes.loadingDiv} >
                    <Box sx={{display : 'flex', flexDirection : 'column', justifyContent: 'center', alignItems : 'center', gap : '10px'}}>
                        <Loading type='oval' width={50} height={50} fill='#43D9AD' />
                        <Box sx={{color : theme.palette.green.A200, fontSize : '20px'}}>
                            While processing transaction...
                        </Box>
                    </Box>
                </Box>
            }
            <Box sx={{p: '20px', pb : '10px',  display : 'flex', justifyContent : 'space-between', alignItems : 'center'}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    aria-label="full width tabs example"
                >
                    <Tab label="Orders" {...a11yProps(0)} />
                    <Tab label="Bids" {...a11yProps(1)} />
                    <Tab label="Transactions" {...a11yProps(2)} />
                    {/* <Tab label="Transactions" {...a11yProps(3)} /> */}
                </Tabs>
            </Box>
            <Box sx={{borderBottom : '1px solid white', pb : '10px'}} />
            <SwipeableViews
                axis={'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0}>
                    {/* <ProductsInfo /> */}
                    <ProductOrders />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ProductBids />
                    {/* <OwnNFTs /> */}.
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ProductsTx />
                </TabPanel>
                {/* <TabPanel value={value} index={3}>
                    <ProductsTx />
                </TabPanel> */}
            </SwipeableViews>
        </Box>
    );
}
CartScreen.propTypes = {

}
const mapStateToProps = state => ({
    loadingTx : state.cart.loadingTx
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen) ;
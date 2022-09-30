import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import CloudUploads from './CloudUploads.js';
import CloudPurchase from './CloudPurchase.js';
import CloudPlatform from './CloudPlatform.js';

import { useWalletInfo } from '../../../contexts/WalletContext.js';

import PropTypes from 'prop-types';

import {
    Box,
    Button,
    Tab,
    Tabs,
    useMediaQuery
} from '@mui/material' ;

import { useStyles } from './StylesDiv/index.styles.js';

const CloudScreen = () => {

    const classes = useStyles() ;
    const match335 = useMediaQuery('(min-width: 335px)') ;
    const match890 = useMediaQuery('(min-width: 890px)') ;

    const navigate = useNavigate() ;
    
    const {
        isConnected
    } = useWalletInfo() ;
    
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
                    <Box sx={{ p: match335 ? 3 : '2px' }}>
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
    }, [isConnected]) ; 

    return (
        <Box className={classes.root}>
            <Box className={classes.greenBlur} />
            <Box className={classes.blueBlur} />
            <Box className={classes.tabDiv}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    aria-label="full width tabs example"
                >
                    <Tab label="Upload" {...a11yProps(0)} />
                    <Tab label="Purchase" {...a11yProps(1)} />
                    <Tab label="Platform" {...a11yProps(2)} />
                </Tabs>
                <Box className={classes.buttonGroup}>
                    <Button variant={'contained'} className={classes.buttonCss}>List Product Task</Button>
                    <Button variant={'contained'} className={classes.buttonCss}>Distribute Content</Button>
                </Box>
            </Box>
            <Box sx={{borderBottom : '1px solid white', pb : '10px'}} />
            <SwipeableViews
                axis={'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0}>
                    <CloudUploads />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CloudPurchase />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <CloudPlatform />
                </TabPanel>
                
            </SwipeableViews>
        </Box>
    );
}

export default CloudScreen ;
import * as React from 'react' ;

import {
    Box,
    Grid
} from '@mui/material' ;

import ConfigurePayment from '../../../components/Solstice/SettingScreen/ConfigurePayment';
import ConnectWallet from '../../../components/Solstice/SettingScreen/ConnectWallet';
import Branding from '../../../components/Solstice/SettingScreen/Branding';
import CreateProducts from '../../../components/Solstice/SettingScreen/CreateProducts';
import PurchaseLink from '../../../components/Solstice/SettingScreen/PurchaseLink';

import { useStyles } from './StylesDiv/index.styles';

const SettingScreen = () => {
    const classes = useStyles() ;

    return (
        <Box className={classes.root}>
            <Box className={classes.greenBlur} />
            <Box className={classes.blueBlur} />
            <Grid container sx={{borderBottom : '1px solid lightgray', pb : '15px'}}>
                <Grid item xs={12}>
                    <Box className={classes.titleDiv}>
                        Whenever you're ready...
                    </Box>
                    <Box className={classes.descriptionDiv}>
                        You're almost ready to start making money! Just a few more steps.
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{mt : '50px'}}>
                <ConfigurePayment />
                <ConnectWallet />
                <Branding />
                <CreateProducts/>
                <PurchaseLink/>
            </Grid>
        </Box>
    )
}

export default SettingScreen ;
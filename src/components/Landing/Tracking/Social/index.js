import React, { useState } from 'react' ;

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import TextField from './TextField';
import Location from './Location';
import AVATAR_IMAGE from '../../../../assets/Tracking/avatar.png';
import TRADING_IMAGE from '../../../../assets/Tracking/trading.png';

import {
    Box,
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
    Grid
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        "& .MuiFormControl-root" : {
            borderRadius : '4px',
            background : 'white',
            padding : '5px'
        },
        "& .MuiInput-root" : {
            height : '50px',
            fontWeight : 'bold',
            padding : '10px'
        },
        "& .MuiFormHelperText-root" : {
            color : 'black',
        }
    },
    userContent : {
        display : 'flex',
        alignItems : 'center',
        background : '#0601B4',
        borderRadius : '4px',
        padding : '10px',
    },
    avatar : {
        position : 'relative',
        background : 'white',
        width : '60px',
        height : '60px',
        borderRadius : '50%',
        marginRight : '10px'
    },
    avatarImage : {
        position : 'absolute',
        top : 3,
        left : 3,
        width : '53px',
        height : '53px'
    },
    divider : {
        width : '10px',
        height : '80%',
        background : '#C4C4C4'
    },
    calendarContent : {
        height : '75%',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-between'
    },
    tradingImage : {
        position : 'absolute',
        bottom : -100,
        width : '80%',
        height : '400px',
    }
}));

const Social = (props) => {

    const classes = useStyles();

    const [value, onChange] = useState(new Date());
    
    return(
        <Box className={classes.root}>
            <Box sx={{display : 'flex', height : '100%', position : 'relative'}}>
                <Box sx={{width : '50%', mr : 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box className={classes.userContent}>
                                <Box className={classes.avatar}>
                                    <Box component={'img'} src={AVATAR_IMAGE} className={classes.avatarImage}/>
                                </Box>
                                <Box>
                                    Itunuoluwa Abidoye
                                    <Box sx={{fontSize : '14px', color : 'lightgray'}}>
                                        @Itunuoluwa
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Select
                                    name="bank_name" 
                                    variant="standard"
                                    value={'10'}
                                    disableUnderline
                                    
                                    // value={formState.values.bank_name || ''}
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={'10'}>SOLS ACCOUNTS</MenuItem>
                                    <MenuItem value={'20'}>NOK</MenuItem>
                                    <MenuItem value={'30'}>POUND</MenuItem>
                                </Select>
                                <FormHelperText>Single Click Checkout by SOLSTICE</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Select
                                    name="bank_name" 
                                    variant="standard"
                                    value={'10'}
                                    disableUnderline
                                    
                                    // value={formState.values.bank_name || ''}
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={'10'}>Payment Integration</MenuItem>
                                    <MenuItem value={'20'}>NOK</MenuItem>
                                    <MenuItem value={'30'}>POUND</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Select
                                    name="bank_name" 
                                    variant="standard"
                                    value={'10'}
                                    disableUnderline
                                    
                                    // value={formState.values.bank_name || ''}
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={'10'}>Sync to MyChannels</MenuItem>
                                    <MenuItem value={'20'}>NOK</MenuItem>
                                    <MenuItem value={'30'}>POUND</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField labelText={'Personal Site'} mainText={'www.mysite.com'}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField labelText={'Gmail'} mainText={'username@gmail.com'}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField labelText={'iOS App'} mainText={'Sync <>'}/>
                        </Grid>
                    </Grid>
                </Box>
                
                <Box className={classes.divider}></Box>

                <Box className={classes.calendarContent}>
                    <Calendar onChange={onChange} value={value} />
                    <Location />
                </Box>
                <Box component={'img'} src={TRADING_IMAGE} className={classes.tradingImage}/>
            </Box>
        </Box>
    );
}

export default Social;
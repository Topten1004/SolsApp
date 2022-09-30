import React, { useState, useEffect} from 'react';

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;

import DiscordImage from '../../../assets/Discord.svg' ;

import {
    Box,
    Grid,
    TextField,
    Button
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : '#010C15',
        height : '100vh',

        "& .MuiInputLabel-root" : {
            color : "white !important",
        },

        // form control background style
        "& .MuiFormControl-root" : {
            borderRadius : 5,
            color : 'white',
            "& svg" :{
                color : 'white'
            }
        },

        // when hover border color style
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#C3C7E5 !important',
            },
            '&:hover fieldset': {
                borderColor: '#C3C7E5 !important',
            },
            '&.Mui-focused fieldset': {
                border : '1px solid #C3C7E5 !important'
            },
        },

        // textfield color style or disabled color style
        "& .MuiInputBase-input" :{
            color : 'white !important',
        },

        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: 'red',
        },
        "& .MuiFormHelperText-root" : {
            background : '#010C15 !important',
            marginTop : '10px !important'
        }
    },
    descriptionDiv : {
        backgroundColor : '#011627',
        
        padding : 30,
        height : 'calc(100vh)',
        
        border: '1px solid #1E2D3D',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
        
        position : 'relative',

        overflow : 'hidden'
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
    secureDiv : {
        
        color : 'white',
        fontSize : 40,

        paddingLeft : 40,
        paddingTop : 30,
        
        letterSpacing : 1
    },
    heavyDiv : {
        
        color : 'white',
        fontSize : 35,

        paddingLeft : 70,
        paddingTop : 30,
        
        letterSpacing : 1
    },
    tickDiv : {
        color : '#43D9AD',
        fontSize : 18,
        letterSpacing : 1,

        marginBottom : 20,
        paddingLeft : 30
    },
    tickGroup : {
        display : 'flex',
        justifyContent: 'flex-end',
        flexDirection : 'column !important',
    },
    joinButtonCss : {
        fontFamily: 'Montserrat !important',
        fontSize : '20px !important',
        border : '3px solid #5865F2 !important',
        background : 'black !important',
        textTransform : 'capitalize !important'
    },
    forYouDiv : {
        paddingTop : 150,
        paddingLeft : 50,
        color : 'white',
        fontSize : 35,
        

        letterSpacing : 4
    }
})) ;

const PamphletDiscord = (props) => {

    const {
    } = props;

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Box className={classes.descriptionDiv}>
                        <Grid container>
                            <Grid item xs={12} className={classes.secureDiv}>
                                Secure distribution channel for:
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={6} className={classes.heavyDiv}>
                                        <ul>
                                            <li>content heavy creators</li>
                                        </ul>
                                    </Grid>
                                    <Grid item xs={6} className={classes.tickGroup}>
                                        <Box className={classes.tickDiv}> > Enter your email to learn more</Box>
                                        <Box className={classes.tickDiv}> > Join our Discord to get connected</Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{marginTop : '200px'}}>
                                <Grid container>
                                    <Grid item xs={6} sx={{textAlign : 'center'}}>
                                        <TextField
                                            label='Email'
                                            name='email'
                                            placeholder='Enter your email'
                                            focused

                                            // helperText={hasError('email') ? formState.errors.email[0] : null}
                                            // error={hasError('email')}
                                            // onChange={handleChange}
                                            // value={formState.values.email || ''}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sx={{textAlign : 'center'}}>
                                        <Button variant={'contained'} className={classes.joinButtonCss}><img src={DiscordImage} width={25}/>&nbsp;&nbsp;&nbsp; Join the Discord</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className={classes.forYouDiv}>
                                The automated distribution channel that works for you...
                            </Grid>
                        </Grid>
                        <Box className={classes.greenBlur} />
                        <Box className={classes.blueBlur} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

PamphletDiscord.propTypes = {

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps) (PamphletDiscord);
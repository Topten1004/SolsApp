import React, { useState, useEffect} from 'react';

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { InputSocialInfo } from '../../redux/actions/auth';

import TickImage from '../../assets/common/tick.png';
import CloseImage from '../../assets/Close.png';

import SyncSocialModal from '../../components/Auth/SyncSocialModal.js';

import validate from 'validate.js' ;

import {
    Box,
    Grid,
    TextField,
    Button,
    InputAdornment,
    useMediaQuery,
} from '@mui/material' ;

import { useStyles } from './StylesDiv/Socials.styles';

const schema = {
    website_url: {
        presence: { allowEmpty: false, message: 'is required' },
        url: true,
    },
    apps : {
        presence : { allowEmpty : false, message : 'is required'},
    },
    link_bio : {
        presence: { allowEmpty: false, message: 'is required' },
        url : true
    }
};

const SocialAndEmailForm = (props) => {

    const {
        InputSocialInfo,
        handleChangeAuthStep,
    } = props;

    const classes = useStyles();

    const match768 = useMediaQuery('(min-width : 768px)');
    const match375 = useMediaQuery('(min-width : 375px)');

    const [syncSocialOpen, setSyncSocialOpen] = useState(false) ;
    const [updatedSocialInfo, setUpdatedSocialInfo] = useState(false) ;

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });

    const handleGotoSignIn = () => {
        handleChangeAuthStep('signin') ;
    }

    const handleSyncSocialOpen = () => {
        setSyncSocialOpen(true) ;
    }

    const handleSyncSocialClose = () => {
        setSyncSocialOpen(false) ;
    }

    const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value,
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
        }));
        
    };

    const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

    const handleNext = async () => {
        if(formState.isValid && updatedSocialInfo) {
            if( await InputSocialInfo(formState.values.website_url, formState.values.apps, formState.values.link_bio) ) {
                handleChangeAuthStep('imageset') ;
            }
        }
    }

    const handleSkip = async () => {
        handleChangeAuthStep('imageset') ;
    }
    
    useEffect(()=>{
        const errors = validate(formState.values, schema);
        
        setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
        
    }, [formState.values] );

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={match768 ? 6 : 12}>
                    <Box className={classes.descriptionDiv}>
                        <Box className={classes.lineDiv}>

                        </Box>
                        <Box className={classes.helloDiv}>
                            Let's get social,
                        </Box>
                        <Box className={classes.welcomeDiv}>
                            Connect Your
                            <br/>Audience
                        </Box>
                        <Box className={classes.tickDiv}>
                            &gt; Socials and Email
                        </Box>
                        <Box className={classes.slashDiv}>
                            // Create Account = HOST
                        </Box>
                        <Box className={classes.tickDiv}>
                            &gt; Don’t worry, there are more integrations waiting inside
                        </Box>
                        <Box className={classes.tickDiv}>
                            &gt; You can add, edit, or delete connections at any time
                        </Box>
                        <Box className={classes.greenBlur} />
                        <Box className={classes.blueBlur} />
                    </Box>
                </Grid>
                <Grid item xs={match768 ? 6 : 12}>
                    <Box className={classes.formDiv}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} className={classes.signUpDiv}>
                                Social Sync
                            </Grid>   
                            <Grid item xs={12}>
                                <TextField
                                    name={'website_url'}
                                    placeholder='Sync My Website'
                                    focused
                                    size={match375 ? 'medium' : 'small'}
                                    fullWidth
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <Box component={'img'} src={( hasError('website_url') || !formState.values.website_url) ? CloseImage : TickImage } sx={{width : '16px', height : '12px'}}/>
                                        </InputAdornment>,
                                    }}


                                    helperText={hasError('website_url') ? formState.errors.website_url[0] : null}
                                    error={hasError('website_url')}
                                    onChange={handleChange}
                                    value={formState.values.website_url || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    placeholder='Social Media'
                                    focused
                                    size={match375 ? 'medium' : 'small'}
                                    fullWidth
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <Box component={'img'} src={updatedSocialInfo ? TickImage : CloseImage} sx={{width : '16px', height : '12px'}}/>
                                        </InputAdornment>,
                                    }}

                                    value={updatedSocialInfo ? "Social Media" : ""}
                                    onClick={handleSyncSocialOpen}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name='apps'
                                    placeholder='My Apps'
                                    focused
                                    size={match375 ? 'medium' : 'small'}
                                    fullWidth
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <Box component={'img'} src={( hasError('apps') || !formState.values.apps) ? CloseImage : TickImage } sx={{width : '16px', height : '12px'}}/>
                                        </InputAdornment>,
                                    }}

                                    helperText={hasError('apps') ? formState.errors.apps[0] : null}
                                    error={hasError('apps')}
                                    onChange={handleChange}
                                    value={formState.values.apps || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name='link_bio'
                                    placeholder='Link In Bio'
                                    focused
                                    size={match375 ? 'medium' : 'small'}
                                    fullWidth
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <Box component={'img'} src={( hasError('link_bio') || !formState.values.link_bio) ? CloseImage : TickImage } sx={{width : '16px', height : '12px'}}/>
                                        </InputAdornment>,
                                    }}

                                    helperText={hasError('link_bio') ? formState.errors.link_bio[0] : null}
                                    error={hasError('link_bio')}
                                    onChange={handleChange}
                                    value={formState.values.link_bio || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' className={classes.nextButtonCss} fullWidth onClick={handleNext}
                                    disabled={(formState.isValid && updatedSocialInfo) ? false : true}
                                >Next</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' className={classes.nextButtonCss} fullWidth onClick={handleSkip}
                                >Skip</Button>
                            </Grid>
                            <Grid item xs={12} className={classes.contentDiv}>
                                <Box>
                                    By creating an account, you agree to the
                                </Box>
                                <Box sx={{textAlign : 'center'}}>
                                    Company's <span className={classes.contentHighlight}>Terms of Service</span> and <span className={classes.contentHighlight}>Privacy Policy</span>
                                </Box>
                            </Grid>
                            <Grid item xs={12} className={classes.questionDiv}>
                                Already have and account? &nbsp; <span className={classes.contentHighlight} onClick={handleGotoSignIn}>Sign In</span>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <SyncSocialModal 
                open={syncSocialOpen}
                handleClose={handleSyncSocialClose}
                handleUpdatedSocialInfo={setUpdatedSocialInfo}
            />
        </Box>
    );
}

SocialAndEmailForm.propTypes = {
    InputSocialInfo : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    InputSocialInfo
}

export default connect(mapStateToProps, mapDispatchToProps) (SocialAndEmailForm);
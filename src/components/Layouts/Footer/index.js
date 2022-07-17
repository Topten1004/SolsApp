import React from 'react' ;

import FOOTER_IMAGE from '../../../assets/Footer/footer.png';
import FACEBOOK_IMAGE from '../../../assets/Footer/facebook.png';
import SOCIAL_IMAGE from '../../../assets/Footer/social.png';
import GITHUB_IMAGE from '../../../assets/Footer/github.png';
import TELEGRAM_IMAGE from '../../../assets/Footer/telegram.png';
import YOUTUBE_IMAGE from '../../../assets/Footer/instagram.png';
import FIGMA_IMAGE from '../../../assets/Footer/figma.png';


import {
    Box,
    Grid,
    InputAdornment,
    OutlinedInput,
    FormControl,
    Button,
    useMediaQuery,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        background : 'black',
        color : 'white',
        paddingTop : '110px',
        paddingLeft : '120px',
        paddingRight : '140px',
        "& .MuiFormControl-root" : {
            padding : '20px'
        },
        "& .MuiOutlinedInput-root" : {
            background : 'white',
            width : '500px ',
            borderRadius : '50px',
            ['@media (max-width : 1300px)'] : {
                width : '400px ',
            },
            ['@media (max-width : 600px)'] : {
                width : '300px ',
            }
        },
        ['@media (max-width : 1000px)'] : {
            paddingLeft : '60px',
            paddingRight : '60px',
        },
        ['@media (max-width : 600px)'] : {
            paddingLeft : '30px',
            paddingRight : '30px',
        }
    },
    emailContent : {
        ['@media (max-width : 1000px)'] : {
            display : 'flex',
            flexDirection : 'column !important',
            alignItems : 'center'
        }
    },
    title : {
        fontSize : '52px',
        fontWeight : 'bold',
        padding : '20px',
        ['@media (max-width : 1300px)'] : {
            fontSize : '36px'
        },
        ['@media (max-width : 600px)'] : {
            fontSize : '24px'
        }
    },
    text : {
        fontSize : '24px',
        padding : '20px',
        ['@media (max-width : 1300px)'] : {
            textAlign : 'center',
            fontSize : '20px'
        },
        ['@media (max-width : 600px)'] : {
            fontSize : '14px'
        }
    },
    emailButton : {
        background : 'black !important',
        color : 'white !important',
        textTransform : 'none',
        borderRadius : '50px !important',
        padding: '11px 39px',
    },
    subTitle : {
        fontSize : '18px',
        fontWeight : 'bold',
    },
    enigmaContent : {
        display : 'flex',
        justifyContent : 'flex-end',
        ['@media (max-width : 1000px)'] : {
            justifyContent : 'center'
        }
    },
    enigmaImage : {
        width : '280px',
        height : '400px',
        ['@media (max-width : 1300px)'] : {
            width : '200px',
            height : '300px',
        }
    },
    links : {
        marginTop : '50px !important',
        ['@media (max-width : 1000px)'] : {
            display : 'flex',
            justifyContent : 'center'
        }
    },
    divider : {
        marginTop : '100px',
        marginBottom : '50px',
        border : '1px solid white'
    },
    footer : {
        display : 'flex',
        justifyContent : 'space-between',
        marginBottom : '100px !important',
        ['@media (max-width : 1000px)'] : {
            display : 'block',
        }
    },
    socialContent : {
        display:'flex',
        alignItems : 'center',
        ['@media (max-width : 1000px)'] : {
            justifyContent : 'center'
        },
        ['@media (max-width : 600px)'] : {
            display : 'block',
            textAlign : 'center'
        }
    },
    itemList : {
        marginLeft : '70px',
        display : 'flex',
        ['@media (max-width : 600px)'] : {
            justifyContent : 'center',
            marginLeft : '0px',
            marginTop : '30px'
        }
    },
    item : {
        marginLeft : '16px',
        background : 'white',
        borderRadius : '50%', 
        width : '24px', 
        height : '24px', 
        display : 'flex', 
        alignItems : 'center', 
        justifyContent : 'center'
    },
    buttonGroup : {
        ['@media (max-width : 1000px)'] : {
            display : 'flex',
            justifyContent : 'center',
            marginTop : '50px'
        },
        ['@media (max-width : 400px)'] : {
            display : 'flex',
            flexDirection : 'column',
            alignItems : 'center',
        }
    },
    signInButton : {
        border : '1px solid white !important',
        borderRadius : '20px !important',
        color : 'white !important',
        textTransform : 'none !important',
        padding : '5px 26px !important',
        marginRight : '70px !important',
        ['@media (max-width : 400px)'] : {
            marginRight : '0px !important',
            marginBottom : '30px !important'
        }
    },
    contactButton : {
        background : 'white !important',
        borderRadius : '20px !important',
        color : 'black !important',
        textTransform : 'none !important',
        padding : '5px 26px !important',
    }
}));

const Footer = () => {

    const classes = useStyles () ;

    const match1 = useMediaQuery('(min-width : 1300px)');
    const match2 = useMediaQuery('(min-width : 1000px)');
    const match3 = useMediaQuery('(min-width : 700px)');

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={match2 ? 6 : 12} className={classes.emailContent}>
                    <Box className={classes.title}>
                        Let's Get Started
                    </Box>
                    <Box className={classes.text}>
                        Build and acclerate your online community today 
                    </Box>
                    <FormControl variant="outlined">
                        <OutlinedInput
                            type='text'
                            endAdornment={
                                <InputAdornment position='end'>
                                    <Button className={classes.emailButton}>
                                        Next
                                    </Button>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={match2 ? 6 : 12} className={classes.enigmaContent}>
                    <Box component={'img'} src={FOOTER_IMAGE} className={classes.enigmaImage}/>
                </Grid>
                <Grid item xs={match1 ? 8 : 12} className={classes.links}>
                    <Grid container spacing={5}>
                        <Grid item xs={match3 ? 4 : 12} sx={{width : '50%', textAlign : 'center'}}>
                            <Box className={classes.subTitle}>
                                Home
                            </Box>
                            <Box sx={{mt : 3}}> HOST </Box>
                            <Box sx={{mt : 1}}> SOLSCLOUD </Box>
                            <Box sx={{mt : 1}}> How it Works </Box>
                            <Box sx={{mt : 1}}> Integrations </Box>
                        </Grid>
                        <Grid item xs={match3 ? 4 : 12} sx={{width : '50%', textAlign : 'center'}}>
                            <Box className={classes.subTitle}>
                                Developers
                            </Box>
                            <Box sx={{mt : 3}}> What is SOLS </Box>
                            <Box sx={{mt : 1}}> SOLS API </Box>
                            <Box sx={{mt : 1}}> Publisher Connect </Box>
                            <Box sx={{mt : 1}}> Contact Us </Box>
                        </Grid>
                        <Grid item xs={match3 ? 4 : 12} sx={{width : '50%', textAlign : 'center'}}>
                            <Box className={classes.subTitle}>
                                Join the Mission
                            </Box>
                            <Box sx={{mt : 3}}> Our Mission </Box>
                            <Box sx={{mt : 1}}> Open Positions </Box>
                            <Box sx={{mt : 1}}> Join Our Mission </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box className={classes.divider} />
                </Grid>
                <Grid item xs={12} className={classes.footer}>
                    <Box className={classes.socialContent}>
                        Follow us
                        <Box className={classes.itemList}>
                            <Box className={classes.item}>
                                <Box component={'img'} src={FACEBOOK_IMAGE} sx={{width : '16px', height : '14px'}}/>
                            </Box>
                            <Box className={classes.item}>
                                <Box component={'img'} src={SOCIAL_IMAGE} sx={{width : '16px', height : '14px'}}/>
                            </Box>
                            <Box className={classes.item}>
                                <Box component={'img'} src={GITHUB_IMAGE} sx={{width : '16px', height : '14px'}}/>
                            </Box>
                            <Box className={classes.item}>
                                <Box component={'img'} src={TELEGRAM_IMAGE} sx={{mt : 2, mr : 0.3, width : '60px', height : '60px'}}/>
                            </Box>
                            <Box className={classes.item}>
                                <Box component={'img'} src={YOUTUBE_IMAGE} sx={{width : '16px', height : '14px'}}/>
                            </Box>
                            <Box className={classes.item}>
                                <Box component={'img'} src={FIGMA_IMAGE} sx={{mt : 2, width : '60px', height : '60px'}}/>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.buttonGroup}>
                        <Button className={classes.signInButton}>
                            Sign In
                        </Button>
                        <Button className={classes.contactButton}>
                            Contact Us
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Footer ;
import * as React from 'react' ;
import { useLocation } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { LoadingProfileLink, ProfileInfoByLink, InitLinkReducer } from '../../redux/actions/link';

import Loading from 'react-loading-components' ;
import NotFound from '../../components/Common/NotFound';
import ProfileLinkScreen from './ProfileLinkScreen.js';

import {
    Box
} from '@mui/material' ;

import  {makeStyles, useTheme} from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {

    },
    loadingDiv : {
        width : '100%' , height : '100vh',
        display : 'flex', justifyContent : 'center', alignItems : 'center', flexDirection : 'column', gap : '10px',
        background : theme.palette.blue.main
    }
})) ;

const ProfileLink = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;

    const location = useLocation() ;

    const {
        ProfileInfoByLink,
        LoadingProfileLink,
        InitLinkReducer,

        loadingProfileLink
    } = props ;

    const [isProfileLink, setIsProfileLink] = React.useState(false) ;

    React.useEffect(async () => {
        // console.log(validateInputValue("asdfa sdfdsf")) ;
        // console.log("https://solsapp.com" + location.pathname) ;

        await LoadingProfileLink(false) ;

        if( await ProfileInfoByLink("https://solsapp.com" + location.pathname) ){
            setIsProfileLink(true) ;
        } else setIsProfileLink(false);

        await LoadingProfileLink(true) ;

    }, [location]) ;

    React.useEffect(() => {
        return () => {
            InitLinkReducer() ;
        }
    }, []) ;

    return (
        <>
            {
                !loadingProfileLink ? <Box className={classes.loadingDiv}>
                    <Loading type='puff' width={100} height={100} fill='#43D9AD' />
                    <Box sx={{color : theme.palette.green.A200, fontSize : '30px', letterSpacing : '5px'}}>...Checking Link</Box>
                </Box> :
                (
                    !isProfileLink  ? <NotFound /> : <ProfileLinkScreen />
                )
            }
        </>
    )
}
ProfileLink.propTypes = {
    ProfileInfoByLink : PropTypes.func.isRequired,
    LoadingProfileLink : PropTypes.func.isRequired,
    InitLinkReducer : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    loadingProfileLink : state.link.loadingProfileLink
}) ;
const mapDispatchToProps = {
    ProfileInfoByLink,
    LoadingProfileLink,
    InitLinkReducer
} ;
export default connect(mapStateToProps, mapDispatchToProps)(ProfileLink) ;
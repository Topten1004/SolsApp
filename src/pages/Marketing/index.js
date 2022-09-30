import React,{ useEffect } from 'react' ;
import {Routes, Route, useNavigate} from 'react-router-dom';

import { connect } from 'react-redux' ;

import Template from './Template';
import WelcomeDiscord from './WelcomeDiscord';
import CalendlyDiscord from './CalendlyDiscord';
import SocialSync from './SocialSync';
import PamphletDiscord from './PamphletDiscord';

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles(() => ({
    root : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',

        height : '100vh',
    },
})) ;

const Marketing = (props) => {

    const classes = useStyles();
    const navigate = useNavigate() ;

    const {
    } = props ;

    return (
        <Routes>

            <Route path="/*" element={< Template />} />
            <Route path="/template" element={< Template />} />
            <Route path="/social-sync" element={< SocialSync />} />
            <Route path="/welcome-discord" element={<WelcomeDiscord />} />
            <Route path="/calendly-discord" element={<CalendlyDiscord />} />
            <Route path="/pamphlet-discord" element={<PamphletDiscord/>} />

        </Routes>
    )
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Marketing) ;


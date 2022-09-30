import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom' ;

import { getCookie } from '../../../../utils/Helper';
import Avatar1Img from '../../../../assets/avatars/avatar1.png';

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;

import { makeStyles } from '@mui/styles';

import SearchIcon from '@mui/icons-material/Search';

import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    useMediaQuery,
    Avatar,
    Button,
} from '@mui/material' ;

const useStyles = makeStyles((theme) => ({
    drawer: {
        zIndex : 10000,
        "& .MuiBackdrop-root": {
            display: "none"
        },
        "& a" : {
            textDecoration : "none",
            color : theme.palette.common.label + " !important",
            "& :hover" : {
                color : "white !important"
            }
        },
    },
    drawerPaper: {
        width : "100%",
        top : "60px !important",
        backgroundColor : theme.palette.common.lightBlack + " !important",
        color : theme.palette.common.label + " !important",
        '& ::-webkit-scrollbar': {
            display: 'none !important',
        },
    },
    inList : {
        "& .MuiListItem-root" : {
            paddingLeft : "30px",
        }
    },
    cancel : {
        width : '100%',
        textAlign : 'right',
        cursor : 'pointer'
    },
    avatar : {
        display : 'flex'
    },
    avatarLabel : {
        marginLeft: 30,
        display : 'flex',
        alignItems : 'center',

        fontSize : 20,
        fontWeight : 600
    }
})) ;

const MobileNavbar = (props) => {
  
    const classes = useStyles() ;
    
    const match1 = useMediaQuery('(min-width : 725px)') ;

    const navigate = useNavigate() ;

    const [ routine, setRoutine ] = useState('') ;

    const {
        isDrawMobileNavbar, handleDrawMobileNavbar,
    } = props ;

    const handleSignOut = () => {
        SignOutUser(navigate) ;
        handleDrawMobileNavbar() ;
    }

    return (
            <Drawer
                variant='persistent'
                anchor='right'
                open={isDrawMobileNavbar}
                className={classes.drawer}
                classes={{
                    paper : classes.drawerPaper
                }}
            >
            <List>
                <ListItem>
                    <Box className={classes.cancel}>
                        <Box onClick={handleDrawMobileNavbar} component={'span'} sx={{fontSize : 25}}>
                            &times;
                        </Box>
                    </Box>
                </ListItem>
                <Divider />
                {
                    getCookie('email') && <ListItem>
                        <Box className={classes.avatar} >
                            <Avatar src={Avatar1Img} />
                            <Box component={'span'} className={classes.avatarLabel}>
                                { getCookie('email').split("@")[0] }
                            </Box>
                        </Box>
                    </ListItem>
                }

                <Divider />
                
                <ListItem>
                    <Button variant={'outlined'} sx={{borderRadius : 20}}
                        onClick={handleSignOut}
                    >Sign Out</Button>
                </ListItem>
                <Divider />
            </List>
            </Drawer> 
    )  
}

MobileNavbar.propTypes = {
  
}
const mapStateToProps = state => ({
    
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(MobileNavbar) ;
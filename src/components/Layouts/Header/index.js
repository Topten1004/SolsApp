import React,{ useState, useRef, useEffect } from 'react' ;

import { Link, useNavigate } from 'react-router-dom';

import { connect } from 'react-redux' ;

import {
    Box,
    List,
    ListItem,
    Button,
    useMediaQuery
} from '@mui/material' ;


import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        height : theme.layout.headerHeight + "px !important",
        display : 'flex',
        alignItems : 'center',
        "& .MuiListItem-root" : {
            width : 'auto',
            fontWeight : 'bold',
            fontSize : '24px',
            padding : '20px !important',
            textAlign : 'center',
            ['@media (max-width : 800px)'] : {
                padding : '5px !important',
                width : '33%',
            }
        },
        "& a" : {
            textDecoration : 'none',
            color : 'white',
            fontWeight : 'bold',
            fontSize : '24px',
            "&:hover" : {
                borderBottom : '1px solid #FC9918'
            },
            ['@media (max-width : 1700px)'] : {
                fontSize : '20px',
            },
            ['@media (max-width : 1400px)'] : {
                fontSize : '16px',
            },
            ['@media (max-width : 1000px)'] : {
                fontSize : '20px',
            },
            ['@media (max-width : 800px)'] : {
                width : '100%'
            },
            ['@media (max-width : 600px)'] : {
                fontSize : '10px',
            }
        },
        "& .MuiButton-root" : {
            border : '1px solid black',
            color : '#1472FF',
            width : '230px',
            height : '45px',
            borderRadius : '15px',
        },
        ['@media (max-width : 1000px)'] : {
            paddingLeft : '40px',
            paddingRight : '40px',
        },
        ['@media (max-width : 800px)'] : {
            display : 'block',
            paddingLeft : '0px',
            paddingRight : '0px',
        }
    },
    menuList : {
        width : '100%',
        display : 'flex',
        justifyContent : 'flex-end',
        alignItems : 'center',
        ['@media (max-width : 1200px)'] : {
            display : 'none'
        },
        ['@media (max-width : 999px)'] : {
            display : 'flex',
            marginTop : '20px !important'
        },
        ['@media (max-width : 800px)'] : {
            justifyContent : 'center'
        }
    },
    logo : {
        fontSize : '65px',
        fontWeight : 'bold',
        color : 'white',
        cursor : 'pointer',
        ['@media (max-width : 1700px)'] : {
            fontSize : '50px',
        },
        ['@media (max-width : 1400px)'] : {
            fontSize : '40px',
        },
        ['@media (max-width : 800px)'] : {
            fontSize : '30px',
            textAlign : 'center',
            width : '100%',
            marginTop : '20px'
        }
    }
}));
const LandingHeader = (props) => {

    const classes = useStyles () ;

    const navigate = useNavigate();

    const {
    } = props ;

    const menuItems = [
        {
            label : 'Home',
            link : '/'
        },
        {
            label : 'Developer Docs',
            link : '/'
        },
        {
            label : `Join the Mission`,
            link : '/'
        },
    ];

    const handleLogoClick = () => {
        navigate('/');
    }
    return (
        <Box className={classes.root}>
            <Box className={classes.logo} onClick={() => handleLogoClick()}>
                SOLS
            </Box>
            <List className={classes.menuList}>
            {
                menuItems.map((element, index) => {
                    return(
                        <ListItem key={index}>
                            <Link to={element.link}>
                                {element.label}
                            </Link>
                        </ListItem>
                    );
                })
            }

            </List>
        </Box>
    )
}


const mapStateToProps = state => ({
    
})
const mapDispatchToProps  = {
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingHeader) ;
import React from 'react' ;
import { useNavigate } from 'react-router-dom';

import { useWalletInfo } from '../../../../contexts/WalletContext';

import LogOut_Icon from '../../../../assets/menu/Logout.svg' ;
import Union_Icon from '../../../../assets/menu/Union.svg' ;

import {
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Divider,
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {

    },
    drawer : {
    },
    drawerPaper : {
        width : '100vw',
        backgroundColor : '#031C30 !important', 

        "& .MuiListItemButton-root" : {
            margin : 10,
            borderRadius : '10px !important',
            "&:hover" : {
                backgroundColor : '#667A8A'
            }
        }
    },
    logoDiv : {
        paddingLeft : 10,
        fontSize : 25,
        color : 'white'
    },
    expandUnion : {
        borderRadius : '50%',
        width : 60,
        height : 60,
        backgroundColor : "#EFF2F4 !important",
    
        display: 'flex',
        alignItems : 'center',
        justifyContent : 'center',
    
        cursor : 'pointer'
    },
    expandUnionDiv : {
        marginTop : 30,
        marginBottom : 40,
        marginLeft : 20,
        
        display : 'flex',
        alignItems : 'center',
    },
}));

const MobileSideMenu = (props) => {

    const classes = useStyles() ;
    const navigate = useNavigate() ;
    const {
        open,
        handleClose,
        menuList
    } = props ;

    const {
        isConnected
    } = useWalletInfo() ;

    const handleGotoMenu = (link) => {
        handleClose() ;
        navigate(link) ;
    }
    return (
        <Drawer
            anchor="left"
            variant="persistent"
            onClose={handleClose}
            open={open}
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper
            }}
        >
           <Box className={classes.expandUnionDiv}>
                    <Box className={classes.expandUnion}  onClick={handleClose}>
                        <img src={Union_Icon} /> 
                    </Box>
                    <Box className={classes.logoDiv}>
                    SOLSTICE
                    </Box>
            </Box>
            <Divider />
            <List>
                {
                    menuList.map((menu, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={() => handleGotoMenu(menu.link)}
                            disabled={
                                (menu.label === 'SOLSCLOUD' && !isConnected) ||
                                (menu.label === 'Cart' && !isConnected) ||
                                (menu.label === 'Upload' && !isConnected)
                            }
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <img src={menu.icon} width={26} height={26}/>
                            </ListItemIcon>
                            <ListItemText primary={menu.label} sx={{ opacity: open ? 1 : 0, color : '#EFF2F4' }} />
                        </ListItemButton>
                    ))
                }
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        marginTop : '70px !important'
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={LogOut_Icon} width={26} height={26}/>
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0, color : '#EFF2F4' }} />
                </ListItemButton>
            </List> 
        </Drawer>
    )
}

export default MobileSideMenu ; 

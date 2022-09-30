import React, { useState } from 'react' ;

import { Link, useNavigate } from 'react-router-dom';

import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import {
   Popover,
   List,
   ListItem,
   Divider,
   Box,
   Button
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';
import WalletModal from '../../../WalletModal';
import WalletConnect from '../../../WalletConnect';

const useStyles = makeStyles((theme) => ({
    popover : {
        zIndex : "1500 !important",
        left : 'calc( 100% - 180px) !important',
        width : '150px',

        "& .MuiList-root" : {
            padding : "0px"
        },
        "& .MuiListItem-root" : {
            fontSize : "14px" ,
            color : theme.palette.primary.main
        },
        "& a" : {
            textDecoration : "none"
        }
    }
}))

const Setting = (props) => {

    const classes = useStyles() ;
    const navigate = useNavigate() ;

    const {
        open , anchorEl , handlePopOver , handleSignOut
    } = props ;

    const [openProfile, setOpenProfile] = useState(false) ;
    const [walletModalOpen, setWalletModalOpen] = useState(false) ;

    const handleOpenProfile = () => {
        setOpenProfile(true) ;
    }

    const handleCloseProfile = () => {
        setOpenProfile(false) ;
    }

    const handleClickProfile = () => {
        navigate('/public/profile') ;
        handlePopOver() ;
    }

    const handleWalletModal = () => {
        setWalletModalOpen(!walletModalOpen) ;
    }

    const handleCloseWalletModal = () => {
        setWalletModalOpen(false) ;
    }
    
    const handleClickWallet = () => {
        handlePopOver();
        handleWalletModal() ;
    }

    return (
        <>
            <Popover
                id="setting-popover"
                anchorEl={anchorEl}
                open={open}

                onClose={handlePopOver}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                classes={{
                    paper : classes.popover
                }}
            >
                <List>
                    <ListItem button onClick={handleClickProfile}>
                        <ManageAccountsOutlinedIcon sx={{ml : 1, mr : 1}} /> { `Profile` } 
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={handleClickWallet}>
                        <AccountBalanceWalletIcon sx={{ ml : 1, mr : 1 }}/> { `Wallet` } 
                        {/* <WalletConnect /> */}
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={handleSignOut} >
                        <ExitToAppRoundedIcon sx={{ ml : 1, mr : 1 }}/> { `Sign Out` } 
                    </ListItem>
                </List>
            </Popover>
            <WalletModal 
                open={walletModalOpen}
                handleClose={handleCloseWalletModal}
            />
        </>
    )
}

export default Setting ;
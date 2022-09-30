import React from 'react';

import { useNavigate } from 'react-router-dom';

import { eraseCookie } from '../../utils/Helper';

import GoogleImage from '../../assets/auth/Google.png' ;

import {
  ListItemText,
  ListItemIcon,
  ListItemButton
} from '@mui/material' ;

const GoogleLogOutButton = (props) => {
  const navigate = useNavigate() ;

  const { open } = props ;

  // const onLogoutSuccess = (res) => {
  //   eraseCookie('_SOLSTICE_AUTHUSER') ;
  //   navigate('/auth') ;
  // };

  // const onFailure = () => {
  //   console.log('Handle failure cases');
  // };

  // const { signOut } = useGoogleLogout({
  //   clientId,
  //   onLogoutSuccess,
  //   onFailure,
  // });

  const handleSignOut  = () => {
    eraseCookie('_SOLSTICE_AUTHUSER') ;
    navigate('/') ;
  }
 
  return (
    <ListItemButton
      sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          marginTop : '50px !important'
      }}
      onClick={handleSignOut}
    >
        <ListItemIcon
            sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
            }}
        >
            <img src={GoogleImage} width={26} height={26}/>
        </ListItemIcon>
        <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0, color : '#EFF2F4' }} />
    </ListItemButton>
  );
}

export default GoogleLogOutButton;
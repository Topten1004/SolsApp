import * as React from 'react' ;

import {connect} from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { UserAccountInfo } from '../../redux/actions/profile';

import Loading from 'react-loading-components' ;

import {
    Box, 
    Dialog,
    DialogContent,
    Button
} from "@mui/material" ;

import ConnectWallet from '../Common/ConnectWallet';

import SolLogoImage from '../../assets/modals/SolLogo.png' ;
import MetamaskImage from '../../assets/modals/Metamask.webp' ;

import { useTheme } from '@mui/material' ;
import { useStyles } from './StylesDiv/ConnectWalletModal.styles' ;

const ConnectWalletModal = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;

    const {
        open,
        handleClose,

        profilePictureUrl,
        accountName,
        walletUser,

        UserAccountInfo,

        web3Provider
    } = props ;

    React.useEffect(async () => {
        if(open) await UserAccountInfo(walletUser) ; 
    }, [open]) ; 

    React.useEffect(async () => {
        if(web3Provider) {
        }
    }, [web3Provider]) ;

    return (
        <Dialog
            open={open}
            fullWidth
            classes={{
                paper : classes.paper
            }}
            sx={{backdropFilter : 'blur(4px)'}}
        >
            <DialogContent>
                <Box className={classes.titleDiv}>
                    Connect <span style={{color : theme.palette.blue.A100,}}>SOLSTICE</span> App To Your Wallet.
                </Box>
                <Box sx={{display : 'flex', justifyContent : 'center', alignItems : 'center', gap: '40px',mt : '40px', mb : '20px'}}>
                    <img src={SolLogoImage} width={60}  />
                    <Loading type='three_dots' width={50} height={50} fill='#43D9AD' />
                    <img src={MetamaskImage} width={60} />
                </Box>
                <Box sx={{display :'flex', alignItems : 'center', justifyContent : 'center'}}>
                    <Box className={classes.userInfoDiv}>
                        {
                            ( accountName && profilePictureUrl ) ? <Box sx={{display : 'flex', gap: '10px', alignItems :'center'}}>
                                <img src={profilePictureUrl} width={30} height={30} />
                                {accountName}
                            </Box>  
                            : <Loading type='tail_spin' width={30} height={30} fill='#e83e8c' />
                        }
                    </Box>
                </Box>
                <Box className={classes.descriptionDiv}>
                    By connecting this application to your wallet, you can mint and purchase NFTs.
                </Box>
                <Box sx={{display : 'flex', justifyContent : 'flex-end', marginTop : '30px', gap : '20px', flexWrap : 'wrap'}}>
                    <ConnectWallet 
                        handleEvent={handleClose}
                        netType={'eth'}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    )
}
ConnectWalletModal.propTypes = {
    UserAccountInfo : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    web3Provider : state.wallet.web3Provider,
    profilePictureUrl : state.profile.profilePictureUrl,
    accountName : state.profile.accountName,
}) ;
const mapDispatchToProps = {
    UserAccountInfo
}
export default connect(mapStateToProps, mapDispatchToProps)(ConnectWalletModal) ;
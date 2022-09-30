import * as React from 'react' ;

import { useWalletInfo } from '../../contexts/WalletContext' ;

import {connect} from 'react-redux' ;
import PropTypes from 'prop-types' ;

import clsx from 'clsx' ;

import MetamaskConn from '../../components/Common/Wallets/MetamaskConn';

import WalletCancelImage from '../../assets/setting/WalletCancel.png' ;
import MetamaskImage from '../../assets/setting/Metamask.webp' ;
import AppleImage from '../../assets/setting/Apple.png' ;
import ConnectImage from '../../assets/links/Connect.png'
import DisconnectImage from '../../assets/links/Disconnect.png'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore' ;

import {
    Box ,
    Grid,
    useMediaQuery
} from '@mui/material' ;

import { useStyles } from './StylesDiv/Wallet.styles';

const ConnectWallet = (props) => {
    const classes = useStyles() ;
    const match880 = useMediaQuery('(min-width : 880px)') ;
    const match775 = useMediaQuery('(min-width : 775px)') ;
    const match330 = useMediaQuery('(min-width : 330px)') ;
    const match520 = useMediaQuery('(min-width : 520px)') ;

    
    const [selWallet, setSelWallet] = React.useState('metamask') ;
    const [expanded, setExpanded] = React.useState(false) ;

    const {
        provider ,
        web3Provider,
        walletAddress,
        chainData,
        isConnected,
    } = useWalletInfo() ;

    const handleExpanded = () => {
        setExpanded(!expanded) ;
    }

    React.useEffect(() => {
      
    }, [isConnected]) ;

    return (
        <Box className={expanded ? classes.rootExpand : classes.rootLess}>
            <Box className={classes.mainDiv}>
                <Box className={classes.hintDiv} onClick={handleExpanded}>
                    <Box className={classes.iconButton}>
                        {
                            isConnected ? <img src={ConnectImage}/> : <img src={DisconnectImage} />
                        }
                    </Box>
                </Box>
                <Box className={classes.descriptionDiv}>
                    In order to mint and purchase NFTs, you have to connect to your wallet.<br/>
                    You can select Metamask and Apple wallet.
                </Box>
                <Grid container sx={{mt :'20px'}}>
                    <Grid item xs={12} sx={{mb : '20px'}}>
                        <Box className={classes.animationDiv} sx={{width : !match880 ? 'auto !important' : '450px'}}>
                            <Box className={provider ? classes.walletVisibleDiv : classes.walletCancelDiv}>
                                {
                                    provider ? <>
                                        <Box className={classes.labelDiv}>Network</Box>
                                        <Box className={classes.valueDiv}>{chainData?.name}</Box>
                                        <Box className={classes.labelDiv}>Chain</Box>
                                        <Box className={classes.valueDiv}>{chainData?.chain}</Box>
                                        <Box className={classes.labelDiv}>Address</Box>
                                        <Box className={classes.valueDiv}>
                                            {
                                                match775 ? walletAddress 
                                                : match330 ? `${ walletAddress?.slice(0, 10) } ... ${ walletAddress?.slice(walletAddress.length - 10, walletAddress.length)  }`
                                                : `${ walletAddress?.slice(0, 5) } ... ${ walletAddress?.slice(walletAddress.length - 5, walletAddress.length)  }`
                                            }
                                        </Box>
                                    </> : 
                                        <img src={WalletCancelImage} width={95} height={100}/>
                                
                                }
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                    <Grid container>
                        <Grid item xs={match520 ? 6 : 12} >
                            <Box className={classes.buttonDiv} sx={{alignItems : !match520 && 'flex-start'}}>
                                <Box className={clsx(classes.walletDiv, selWallet === 'metamask' && classes.activeWalletDiv)} onClick={() => setSelWallet('metamask')}>
                                    <img src={MetamaskImage}  width={30} height={30}/>
                                    <Box>Metamask Wallet</Box>
                                </Box>
                                <Box className={clsx(classes.walletDiv, selWallet === 'apple' && classes.activeWalletDiv)} onClick={() => setSelWallet('apple')}>
                                    <img src={AppleImage} width={30} height={30}/>
                                    <Box>Apple Wallet</Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={match520 ? 6 : 12} sx={{display : 'flex',  justifyContent : match520 ? 'center' : 'flex-start',alignItems : 'flex-end',pb : '10px',}}>
                            {
                                selWallet === 'metamask' && <MetamaskConn />
                            }
                            {
                                selWallet === 'apple' && <MetamaskConn />
                            }
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
ConnectWallet.propTypes = {
}
const mapStateToProps = state => ({
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet) ;
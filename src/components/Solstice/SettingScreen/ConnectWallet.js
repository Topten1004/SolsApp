import * as React from 'react' ;

import { useWalletInfo } from '../../../contexts/WalletContext' ;

import {connect} from 'react-redux' ;
import { ExpandedItem } from '../../../redux/actions/setting';
import PropTypes from 'prop-types' ;

import clsx from 'clsx' ;

import MetamaskConn from '../../../components/Common/Wallets/MetamaskConn';

import WalletCancelImage from '../../../assets/setting/WalletCancel.png' ;
import MetamaskImage from '../../../assets/setting/Metamask.webp' ;
import AppleImage from '../../../assets/setting/Apple.png' ;

import ExpandMoreIcon from '@mui/icons-material/ExpandMore' ;

import {
    Box ,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Grid,
    useMediaQuery
} from '@mui/material' ;

import { useStyles } from './StylesDiv/Wallet.styles';

const ConnectWallet = (props) => {
    const classes = useStyles() ;
    const match1320 = useMediaQuery('(min-width : 1320px)') ;
    const match880 = useMediaQuery('(min-width : 880px)') ;
    const match775 = useMediaQuery('(min-width : 775px)') ;
    const match575 = useMediaQuery('(min-width : 575px)') ;
    const match545 = useMediaQuery('(min-width : 545px)') ;
    const match330 = useMediaQuery('(min-width : 330px)') ;
    
    const [selWallet, setSelWallet] = React.useState('metamask') ;
    const [expand, setExpand] = React.useState(false) ;

    const {
        ExpandedItem,
        expandedItem
    } = props ;

    const {
        provider ,
        web3Provider,
        walletAddress,
        chainData,
        isConnected,
    } = useWalletInfo() ;

    const TriggerExpandedItem = (e, expanded, itemIndex) => {
        ExpandedItem(itemIndex) ;
        setExpand(expanded) ;
    }
    
    React.useEffect(() => {
        if(expandedItem !== 1){
            setExpand(false) ;
        }
    }, [expandedItem]) ;

    return (
        <Box className={classes.root}>
            <Accordion
                expanded={expand}
                onChange={(e, expanded) => TriggerExpandedItem(e, expanded, 1)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{backgroundColor : 'rgba(51, 139, 239, 0.21) !important'}}
                >
                    <Box sx={{display : 'flex', justifyContent : 'flex-start', alignItems : 'center'}}>
                        <Box className={clsx(classes.circlePrefix, isConnected && classes.active)} /><Box>Connect your wallet</Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails
                    sx={{padding : '10px'}}
                >
                    <Box className={classes.descriptionDiv}>
                        In order to mint and purchase NFTs, you have to connect to your wallet.
                        You can select Metamask and Apple wallet.
                    </Box>
                    <Grid container sx={{mt :'20px'}}>
                        {
                            !match1320 && <Grid item xs={12} sx={{mb : '20px'}}>
                                <Box className={classes.animationDiv} sx={{overflowX : !match880 && 'scroll', width : !match880 ? 'auto !important' : '450px'}}>
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
                                                        : match575 ? `${ walletAddress?.slice(0, 10) } ... ${ walletAddress?.slice(walletAddress.length - 10, walletAddress.length)  }`
                                                        : match545 ? `${ walletAddress?.slice(0, 5) } ... ${ walletAddress?.slice(walletAddress.length - 5, walletAddress.length)  }`
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
                        }
                        <Grid item xs={match1320 ? 6 : 12} >
                            <Box className={classes.buttonDiv}>
                                <Box className={clsx(classes.walletDiv, selWallet === 'metamask' && classes.activeWalletDiv)} onClick={() => setSelWallet('metamask')}>
                                    <img src={MetamaskImage}  width={50} height={50}/>
                                    <Box>Metamask Wallet</Box>
                                </Box>
                                <Box className={clsx(classes.walletDiv, selWallet === 'apple' && classes.activeWalletDiv)} onClick={() => setSelWallet('apple')}>
                                    <img src={AppleImage} width={50} height={50}/>
                                    <Box>Apple Wallet</Box>
                                </Box>
                                {
                                    selWallet === 'metamask' && <MetamaskConn />
                                }
                                {
                                    selWallet === 'apple' && <MetamaskConn />
                                }
                            </Box>
                        </Grid>
                        {
                            match1320 && <Grid item xs={6} >
                                <Box className={classes.animationDiv}>
                                    <Box className={provider ? classes.walletVisibleDiv : classes.walletCancelDiv}>
                                        {
                                            provider ? <>
                                                <Box className={classes.labelDiv}>Network</Box>
                                                <Box className={classes.valueDiv}>{chainData?.name}</Box>
                                                <Box className={classes.labelDiv}>Chain</Box>
                                                <Box className={classes.valueDiv}>{chainData?.chain}</Box>
                                                <Box className={classes.labelDiv}>Address</Box>
                                                <Box className={classes.valueDiv}>{walletAddress}</Box>
                                            </> : 
                                                <img src={WalletCancelImage} width={95} height={100}/>
                                        
                                        }
                                    </Box>
                                </Box>
                            </Grid>
                        }
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
       
    )
}
ConnectWallet.propTypes = {
    ExpandedItem : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    expandedItem : state.setting.expandedItem
})
const mapDispatchToProps = {
    ExpandedItem
}
export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet) ;
import * as React from 'react' ;

import {connect} from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { UpdateWalletData } from '../../../redux/actions/wallet';

import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3Modal from 'web3modal';
import Web3 from 'web3' ;
import { ethers } from "ethers";
import { getAddressBalances } from "eth-balance-checker/lib/web3";

import swal from 'sweetalert';

import {
    Button,
} from '@mui/material' ;

import supportedChains from "../../../constants/chains";

const getChainData = async (chainId) => {
    if (!chainId) {
        return null;
    }

    const chainData = supportedChains.filter(chain => chain.chain_id === chainId)[0];

    if (!chainData) {
        throw new Error('ChainId missing or not supported');
    }

    const API_KEY = 'f957dcc0cb6c430f9d32c2c085762bdf';

    if (chainData.rpc_url.includes('infura.io') && chainData.rpc_url.includes('%API_KEY%') && API_KEY) {
        const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY);

        return {
            ...chainData,
            rpc_url: rpcUrl
        };
    }
    return chainData;
}

const INFURA_ID = 'f957dcc0cb6c430f9d32c2c085762bdf';

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: INFURA_ID
        },
    },
    'custom-walletlink': {
        display: {
            logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
            name: 'Coinbase',
            description: 'Connect to Coinbase Wallet (not Coinbase App)'
        },
        options: {
            appName: 'Coinbase',
            networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
            chainId: 1
        },
        package: WalletLink,
        connector: async (_, options) => {
            const { appName, networkUrl, chainId } = options;

            const walletLink = new WalletLink({
                appName
            });
            const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
            await provider.enable();

            return provider;
        }
    }
}

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    buttonCss : {
        //backgroundImage: 'linear-gradient(to right, #4CB8C4 0%, #3CD3AD  51%, #4CB8C4  100%)',
        backgroundImage: 'linear-gradient(to right, #f46b45 0%, #eea849  51%, #f46b45  100%)',
        marginTop : '20px !important',
        textAlign: 'center',
        textTransform: 'capitalize !important',
        transition: '0.5s !important',
        backgroundSize: '200% auto !important',
        color: 'white',          
        boxShadow: '0 0 15px #eee !important',
        borderRadius: '30px !important',
        height : '50px !important',
        padding : '25px 25px !important',
        fontSize : '17px !important', fontWeight : 'bold !important',
 
        "&:hover" : {
            backgroundPosition: 'right center',
            color: '#fff',
            textDecoration: 'none',
        }
        // backgroundImage: 'linear-gradient(to right, #f46b45 0%, #eea849  51%, #f46b45  100%)',
        // height: 45,
        // borderRadius : '30px !important',
        // margin: 10,
        // textAlign: 'center',
        // textTransform: 'uppercase',
        // transition: '0.5s !important',
        // backgroundSize: '200% auto !important',
        // color: 'white',            
        // boxShadow: '0 0 20px #eee !important',
        // "&:hover" : {
        //     backgroundPosition: 'right center !important', /* change the direction of the change here */
        //     color: '#fff !important',
        //     textDecoration: 'none !important',
        // }
    },
}))

const MetamaskConn = (props) => {
    const classes = useStyles() ;
    
    const {
        UpdateWalletData,

        provider ,
        web3Provider,
        walletAddress,
        chainData,

        isConnected
    } = props ;

    let web3Modal  ;

    const ercTokens = [
        "0x2d464Cb6138EB8B3c1C2E7fFAAfa3e1f9d8ad8c8"
    ]
    const ercSymbols = [
        "SOLT"
    ] ;
    const [balances, setBalances] = React.useState([]) ;

    const allowRopstenNetwork = async() => {
        try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${Number(3).toString(16)}` }],
            });
        } catch (e) {
            if (e.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: `0x${Number(3).toString(16)}`,
                                    chainName: 'Ethereum',
                                    nativeCurrency: {
                                        name: 'Ethereum',
                                        symbol: 'ETH', // 2-6 characters long
                                        decimals: 18
                                    },
                                    blockExplorerUrls: ['https://ropsten.etherscan.io'],
                                    rpcUrls: ['https://ropsten.infura.io/v3/'],
                                },
                            ],
                        });
                    } catch (addError) {
                    console.error(addError);
                }
            }
            if(e.code === 4001) {
               
            }
        }
    }

    const allowGanacheNetwork = async() => {
        try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${Number(1337).toString(16)}` }],
            });
        } catch (e) {
            if (e.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: `0x${Number(1337).toString(16)}`,
                                    chainName: 'Ethereum',
                                    nativeCurrency: {
                                        name: 'Ethereum',
                                        symbol: 'ETH', // 2-6 characters long
                                        decimals: 18
                                    },
                                    blockExplorerUrls: ['https://etherscan.io'],
                                    rpcUrls: ['https://mainnet.infura.io/v3/f957dcc0cb6c430f9d32c2c085762bdf'],
                                },
                            ],
                        });
                    } catch (addError) {
                    console.error(addError);
                }
            }
            if(e.code === 4001) {
               
            }
        }
    }

    const allowEthereumNetwork = async() => {
        try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${Number(1).toString(16)}` }],
            });
        } catch (e) {
            if (e.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: `0x${Number(1).toString(16)}`,
                                    chainName: 'Ethereum',
                                    nativeCurrency: {
                                        name: 'Ethereum',
                                        symbol: 'ETH', // 2-6 characters long
                                        decimals: 18
                                    },
                                    blockExplorerUrls: ['https://etherscan.io'],
                                    rpcUrls: ['https://mainnet.infura.io/v3/f957dcc0cb6c430f9d32c2c085762bdf'],
                                },
                            ],
                        });
                    } catch (addError) {
                    console.error(addError);
                }
            }
            if(e.code === 4001) {
             
            }
        }
    }

    const allowPolygonNetwork = async() => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${Number(137).toString(16)}`, }],
            });
        } catch (e) {
            if (e.code === 4902) {
                try {
                    await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: `0x${Number(137).toString(16)}`,
                            chainName: 'Matic',
                            nativeCurrency: {
                                name: 'Matic Mainnet',
                                symbol: 'MATIC', // 2-6 characters long
                                decimals: 18
                            },
                            blockExplorerUrls: ['https://explorer.matic.network/'],
                            rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
                        },
                    ],
                    });
                } catch (addError) {
                    console.error(addError);
                    console.log("bbbb");
                }
            }
            if(e.code === 4001) {
            }
        }
    }

    const connect = React.useCallback( async () => {
        web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
            providerOptions
        }) ;

        const provider = await web3Modal.connect();

        console.log("close dialog") ;

        const web3Provider = new ethers.providers.Web3Provider(provider);

        updateWallet(provider, web3Provider) ;
    }, []);

    const disconnect = React.useCallback( async () => {
        if (!await swal({
            title: "Are you sure?",
            text: "Are you sure that you want to disconnect?",
            icon: "warning",
            buttons: [
                'No, I am not sure!',
                'Yes, I am sure!'
            ],
        })) return;

        await web3Modal?.clearCachedProvider();

        if (provider?.disconnect && typeof provider.disconnect === 'function') {

            console.log("wallet dis connect");
            await provider.disconnect();
        }
        console.log("wallet disconnect");

        await UpdateWalletData({
            web3Provider: null,
            walletAddress: null,
            provider : null,
            chainData : null,
        }, false);
    }, [connect]) ;

    const updateWallet = async (provider, web3Provider) => {
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();

        const chainData = await getChainData(network.chainId) ;

        UpdateWalletData({
            provider : provider,
            web3Provider: web3Provider,
            walletAddress: address,
            chainData : chainData
        });
    }

    React.useEffect(() => {
        if (web3Modal?.cacheProvider) {
            connect();
        }
    }, [connect]);

    React.useEffect(async () => {
        if(chainData && walletAddress) {
            // const web3 = new Web3('http://localhost:8545') ;
            
            // console.log("asdfdsaf") ;

            // await getAddressBalances( web3 , walletAddress , ercTokens).then(balances => {
            //     setBalances(balances) ;
            // });
        }
    }, [chainData, walletAddress]) ;

    React.useEffect(() => {
        if (provider?.on) {
            const handleAccountsChanged = async (accounts) => {
                console.log(accounts) ;
                if(accounts.length) {
                    let account = await web3Provider?.getSigner()?.getAddress() ;

                    await UpdateWalletData({
                        provider : provider,
                        web3Provider: web3Provider,
                        walletAddress: account,
                        chainData : chainData
                    }) ;
                } else {
                    await UpdateWalletData({
                        provider : null,
                        web3Provider: null,
                        walletAddress: null,
                        chainData : null
                    }) ;
                }
            }

            const handleChainChanged = async () => {
                console.log('chainChanged');
                window.location.reload();
            }

            const handleDisconnect = (error) => {
                console.log('wallet disconnect', error);
                
                disconnect();
            }

            provider.on('accountsChanged', handleAccountsChanged);
            provider.on('chainChanged', handleChainChanged);
            provider.on('disconnect', handleDisconnect);

            return () => {
                if (provider.removeListener) {
                    console.log("wallet disconnect") ;

                    provider.removeListener('accountChanged', handleAccountsChanged);
                    provider.removeListener('chainChanged', handleChainChanged);
                    provider.removeListener('disconnect', handleDisconnect);
                }
            }
        }
    }, [provider, disconnect]);

    return (
           
        <Button variant={'contained'} className={classes.buttonCss} onClick={walletAddress ? disconnect : connect}>
            {
                walletAddress ? 'Disconnect Wallet' : 'Connect Wallet'
            }
        </Button>
    )
}
MetamaskConn.propTypes = {
    UpdateWalletData : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    provider : state.wallet.provider,
    web3Provider : state.wallet.web3Provider,
    walletAddress : state.wallet.walletAddress,
    chainData : state.wallet.chainData,
    isConnected : state.wallet.isConnected
})
const mapDispatchToProps = {
    UpdateWalletData,
}
export default connect(mapStateToProps, mapDispatchToProps)(MetamaskConn) ;
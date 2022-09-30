import React, { useCallback, useEffect, useState } from "react";

import { connect } from 'react-redux';
import { AccountChanged, ConnectAppToWallet } from "../../redux/actions/wallet";

import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3Modal from 'web3modal';
import Web3 from 'web3' ;
import { ethers } from "ethers";
import { isMobile } from 'react-device-detect';

import swal from "sweetalert";

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import supportedChains from "../../constants/chains";

import {
    Button
} from '@mui/material';

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {

    },
    connectButtonCss : {
        backgroundImage: 'linear-gradient(to right, #f46b45 0%, #eea849  51%, #f46b45  100%)',
        height: 45,
        borderRadius : '30px !important',
        margin: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        transition: '0.5s !important',
        backgroundSize: '200% auto !important',
        color: 'white',            
        boxShadow: '0 0 20px #eee !important',
        "&:hover" : {
            backgroundPosition: 'right center !important', /* change the direction of the change here */
            color: '#fff !important',
            textDecoration: 'none !important',
        }
         
    }
}))

const getChainData = (chainId) => {
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

let web3Modal;

if (typeof window !== 'undefined') {
    web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions
    })
}

const ConnectWallet = (props) => {
    const classes = useStyles() ;

    const [chainId, setChainId] = useState(null);

    const {
        handleEvent,
        netType,
        setNetType,
        web3Provider,
        provider,
        walletAddress,
        
        ConnectAppToWallet,
        AccountChanged
    } = props;

    const connect = useCallback(async () => {
        handleEvent() ;

        const provider = await web3Modal.connect();

        const web3Provider = new ethers.providers.Web3Provider(provider);

        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();

        ConnectAppToWallet({
            provider : provider,
            web3Provider: web3Provider,
            walletAddress: address
        });

    }, []);

    const disconnect = useCallback(async () => {
        if (!await swal({
            title: "Are you sure?",
            text: "Are you sure that you want to disconnect from your wallet?",
            icon: "warning",
            buttons: [
                'No, I am not sure!',
                'Yes, I am sure!'
            ],
        })) return;

        await web3Modal.clearCachedProvider();

        if (provider?.disconnect && typeof provider.disconnect === 'function') {
            await provider.disconnect();
        }
        setChainId(null);
        console.log("wallet disconnect");

        await ConnectAppToWallet({
            web3Provider: null,
            walletAddress: null
        });

    }, [connect]);

    useEffect(() => {
        if (web3Modal.cacheProvider) {
            connect();
        }
    }, [connect]);

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

    useEffect(() => {
        if (provider?.on) {
            const handleAccountsChanged = async (accounts) => {
                console.log(accounts) ;
                if(accounts.length) {
                    let account = await web3Provider?.getSigner()?.getAddress() ;

                    await AccountChanged(account) ;
                }
            }

            const handleChainChanged = () => {
                console.log('chainChanged');
                window.location.reload();
            }

            const handleDisconnect = (error) => {
                console.log('disconnect', error);
                
                disconnect();
            }

            provider.on('accountsChanged', handleAccountsChanged);
            provider.on('chainChanged', handleChainChanged);
            provider.on('disconnect', handleDisconnect);

            return () => {
                if (provider.removeListener) {
                    console.log("wallet disconnect") ;
                }
            }
        }
    }, [provider, disconnect]);

    return (
        <>
            <Button variant="contained" onClick={walletAddress ? disconnect : connect} className={classes.connectButtonCss}>
                <AccountBalanceWalletIcon /> &nbsp;
                {walletAddress ? ' ( ' + walletAddress.slice(0, 6) + "..." + walletAddress.slice(walletAddress.length - 4, walletAddress.length) + " )" : "  Connect"}
            </Button>
        </>
    )
}

const mapStateToProps = state => ({
    provider : state.wallet.provider,
    web3Provider: state.wallet.web3Provider,
    walletAddress: state.wallet.walletAddress
})
const mapDispatchToProps = {
    ConnectAppToWallet,
    AccountChanged
}
export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet);
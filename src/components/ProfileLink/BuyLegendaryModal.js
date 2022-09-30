import React, { useEffect, useState } from 'react' ;

import { useLocation } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { BuyLegendaryAsNFT, BuyLegendaryAsProduct } from '../../transactions/market';
import { LoadingProductsListByLink, UserAllNFTsByLink, UpdateWalletInfo, UpdateResellerCount , LoadingLegendaryTx, UserAllProductsByLink, ProfileInfoByLink, BuyerInfoById} from '../../redux/actions/link';
import { WriteNotify } from '../../redux/actions/notify';

import { getUnit,getCookie } from '../../utils/Helper';
import CloseIcon from '@mui/icons-material/Close';
import MetaMaskImage from '../../assets/links/white_metamask.png' ;

import Loading from 'react-loading-components' ;
import swal from 'sweetalert';

import { toast } from 'react-toastify/dist/react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import  {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Box,
    Button,
    Grid,
    Select,
    MenuItem,
    FormControl
} from '@mui/material' ;

import { useStyles } from './StylesDiv/BuyLegendary.styles';

const BuyLegendaryModal = (props) => {

    const classes = useStyles() ;

    const {
        open,
        handleClose,

        productInfo,

        web3Provider,
        loadingLegendaryTx,

        ProfileInfoByLink,
        UserAllNFTsByLink,
        UserAllProductsByLink,
        LoadingProductsListByLink,
        UpdateWalletInfo,
        UpdateResellerCount,
        LoadingLegendaryTx
    } = props ;


    const location = useLocation() ;

    const [role, setRole] = useState('reseller') ;
    const [resellAmount, setResellAmount] = useState(0) ;

    const handleBuyFromCreator = async () => {
        if(web3Provider) {
            handleClose() ;

            if(role === 'reseller') {
                if( await swal({
                    title : 'Confirm',
                    text : "Are you sure that you buy this nft?",
                    buttons: [
                        'No, I am not sure!',
                        'Yes, I am sure!'
                    ],
                    icon : 'info'
                })) {
                    const id = toast.loading("[Buy Legendary(NFT)] Tx is pending...");
                    
                    // LoadingLegendaryTx(true) ;
                    let txResult = await BuyLegendaryAsNFT(web3Provider, productInfo?.nft_id );

                    if( txResult === 200) {
                        toast.update(id, { render: "[Buy Legendary(NFT)] Tx is successful", type: "success", autoClose: 5000, isLoading: false });

                        let buyerInfo = await BuyerInfoById(getCookie('_SOLSTICE_BUYER')) ;

                        await WriteNotify({
                            buyer : {
                                email : buyerInfo.email,
                                profile_link : buyerInfo.profile_link,
                                account_name : buyerInfo.account_name ,
                                role : "reseller"
                            },
                            price : productInfo?.ticket_price,
                            product : productInfo?.name,
                            unit : productInfo?.ticket_unit,
                            purchased_at : new Date().toLocaleDateString(),
                            seller : getCookie('_SOLSTICE_SELLER'),
                            type : 'legendary'
                        }) ;
                        await UpdateResellerCount() ;
                        await UpdateWalletInfo(web3Provider) ;
                        await ProfileInfoByLink("https://solsapp.com" + location.pathname);
                        await UserAllNFTsByLink(web3Provider) ;
                        await LoadingProductsListByLink(false) ;
                    } else {
                        toast.update(id, { render: txResult , type: "error", autoClose: 5000, isLoading: false });
                        // swal({
                        //     title : 'Error',
                        //     text : txResult,
                        //     timer : 3000,
                        //     buttons: false,
                        //     icon : 'error'
                        // });
                    }
                    // LoadingLegendaryTx(false) ;
                }
               
            } else {
                if( await swal({
                    title : 'Confirm',
                    text : "Are you sure that you buy this product?",
                    buttons: [
                        'No, I am not sure!',
                        'Yes, I am sure!'
                    ],
                    icon : 'info'
                })) {
                    const id = toast.loading("[Buy Legendary(Product)] Tx is pending...");

                    // LoadingLegendaryTx(false) ;
                    let txResult = await BuyLegendaryAsProduct(web3Provider, productInfo?.nft_id, productInfo?.seller?.wallet) ;

                    if(txResult === 200 ) {
                        toast.update(id, { render: "[Buy Legendary(Product)] Tx is successful", type: "success", autoClose: 5000, isLoading: false });

                        let buyerInfo = await BuyerInfoById(getCookie('_SOLSTICE_BUYER')) ;

                        await WriteNotify({
                            buyer : {
                                email : buyerInfo.email,
                                profile_link : buyerInfo.profile_link,
                                account_name : buyerInfo.account_name ,
                                role : 'buyer'
                            },
                            price : productInfo?.product_price,
                            product : productInfo?.name,
                            unit : productInfo?.product_unit,
                            purchased_at : new Date().toLocaleDateString(),
                            seller : getCookie('_SOLSTICE_SELLER'),
                            type : 'legendary',
                        }) ;
                        
                        await UpdateWalletInfo(web3Provider);
                        await LoadingProductsListByLink(true) ;
                        await UserAllProductsByLink() ;
                        await LoadingProductsListByLink(false) ;
                        
                    } else {
                        toast.update(id, { render: txResult, type: "error", autoClose: 5000, isLoading: false });

                        // swal({
                        //     title : 'Error',
                        //     text : txResult,
                        //     timer : 3000,
                        //     buttons: false,
                        //     icon : 'error'
                        // });
                    }
                    // LoadingLegendaryTx(false) ;
                }
            }
        }
    }
    
    const handleBuyFromReseller = async () => {
        if(web3Provider) {
            handleClose() ;

            if( await swal({
                title : 'Confirm',
                text : "Are you sure that you buy this product?",
                buttons: [
                    'No, I am not sure!',
                    'Yes, I am sure!'
                ],
                icon : 'info'
            })) {
                const id = toast.loading("[Buy Legendary(Product)] Tx is pending...");
    
                // LoadingLegendaryTx(false) ;
                let txResult = await BuyLegendaryAsProduct(web3Provider, productInfo?.nft_id, productInfo?.seller?.wallet) ;
    
                if(txResult === 200 ) {
                    toast.update(id, { render: "[Buy Legendary(Product)] Tx is successful", type: "success", autoClose: 5000, isLoading: false });
                    let buyerInfo = await BuyerInfoById(getCookie('_SOLSTICE_BUYER')) ;

                    await WriteNotify({
                        buyer : {
                            email : buyerInfo.email,
                            profile_link : buyerInfo.profile_link,
                            account_name : buyerInfo.account_name ,
                            role : "buyer"
                        },
                        price : productInfo?.product_price,
                        product : productInfo?.name,
                        unit : productInfo?.product_unit,
                        purchased_at : new Date().toLocaleDateString(),
                        seller : getCookie('_SOLSTICE_SELLER'),
                        type : 'legendary'
                    }) ;

                    await UpdateWalletInfo(web3Provider);
                    await LoadingProductsListByLink(true) ;
                    await UserAllProductsByLink() ;
                    await LoadingProductsListByLink(false) ;
                } else {
                    toast.update(id, { render: txResult, type: "error", autoClose: 5000, isLoading: false });
                    // swal({
                    //     title : 'Error',
                    //     text : txResult,
                    //     timer : 3000,
                    //     buttons: false,
                    //     icon : 'error'
                    // });
                }
                // LoadingLegendaryTx(false) ;
            }
        }
    }

    useEffect(() => {
        if(productInfo) setResellAmount(productInfo?.ticket_available) ;
    }, [productInfo]) ;

    return (
        <Box className={classes.root}>
            <Dialog
                open={open}
                fullWidth
                classes ={{
                    paper : classes.paper
                }}
            >
                <DialogTitle>
                    <Box>
                        Legendary : { ` ${productInfo?.name} ` }
                    </Box>
                    {
                        !loadingLegendaryTx && <CloseIcon onClick={handleClose} sx={{cursor : 'pointer'}} className={classes.closeButtonCss} />
                    }
                </DialogTitle>
                <Box className={classes.dividerDiv} />
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Box sx={{mb : '10px'}}>Price per product</Box>
                            <Box sx={{fontSize: '20px'}}>
                                {productInfo?.product_price} { getUnit(productInfo?.product_unit) }
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{mb : '10px'}}>Royalty</Box>
                            <Box sx={{fontSize: '20px'}}>
                                {productInfo?.royalty} %
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{mb : '10px'}}>Price per ticket</Box>
                            <Box sx={{fontSize: '20px'}}>
                                {productInfo?.ticket_price} { getUnit(productInfo?.ticket_unit) }
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{mb : '10px'}}># of tickets available</Box>
                            <Box sx={{fontSize: '20px'}}>
                                { productInfo?.ticket_available }
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{mb : '10px'}}>Status</Box>
                            <Box sx={{fontSize: '15px'}}>
                                balance Of creator : { productInfo?.balanceOf }<br/>
                                # of sold nft : { productInfo?.ticket_available - productInfo?.balanceOf }
                            </Box>
                        </Grid>
                        {
                            ( productInfo?.seller?.isCreator && !productInfo?.buyer?.isCreator && !productInfo?.buyer?.isReseller ) && <Grid item xs={6}>
                                <Box sx={{mb : '10px'}}>Select Role</Box>
                                <FormControl
                                    fullWidth
                                >
                                    <Select
                                        value={role}
                                        MenuProps={{
                                            className : classes.selectDiv
                                        }}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        {
                                            !productInfo?.isBuyer.buyer && <MenuItem value={'buyer'}>Buyer</MenuItem>
                                        }
                                        <MenuItem value={'reseller'}>Reseller</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        }
                        {
                            productInfo?.buyer.isCreator && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    You are creator of this product.
                                </Box>
                            </Grid>
                        }
                        {
                            productInfo?.buyer.isReseller && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    You are reseller of this product. So you don't have to buy this product.
                                </Box>
                            </Grid>
                        }
                        {
                            productInfo?.isBuyer.buyer && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    You have already bought this product.
                                </Box>
                            </Grid>
                        }
                         {
                            productInfo?.isBuyer.seller && !productInfo?.seller.isReseller && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    Current user is not reseller.
                                </Box>
                            </Grid>
                        }
                        {
                            productInfo?.seller?.isReseller && !productInfo?.buyer?.isReseller && !productInfo?.buyer?.isCreator && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    Current user is reseller of this nft.
                                    So you can buy this nft as product.
                                </Box>
                            </Grid>
                        }
                        
                    </Grid>
                </DialogContent>
                <Box className={classes.dividerDiv} />
                <DialogActions>
                    {
                        ( productInfo?.seller?.isCreator && !productInfo?.buyer?.isCreator && !productInfo?.buyer?.isReseller ) ? <Button variant={'contained'} onClick={handleBuyFromCreator} 
                            disabled={loadingLegendaryTx}
                            startIcon={loadingLegendaryTx && <Loading type='tail_spin' width={30} height={30} fill='#43D9AD' />}
                        >
                            Buy {role == 'reseller' ? 'NFT' : 'Product'}
                        </Button>
                        : <Button variant={'contained'} onClick={handleBuyFromReseller} 
                            disabled={productInfo?.buyer.isReseller || productInfo?.buyer.isCreator || productInfo?.isBuyer.buyer || loadingLegendaryTx || ( productInfo?.isBuyer.seller && !productInfo?.seller.isReseller)}
                            startIcon={loadingLegendaryTx && <Loading type='tail_spin' width={30} height={30} fill='#43D9AD' />}
                        >Buy Product</Button>
                    }
                    
                </DialogActions>
            </Dialog>
        </Box>
    )
}
BuyLegendaryModal.propTypes = {
    ProfileInfoByLink : PropTypes.func.isRequired,
    LoadingProductsListByLink : PropTypes.func.isRequired,
    UserAllNFTsByLink : PropTypes.func.isRequired,
    UpdateWalletInfo : PropTypes.func.isRequired,
    UpdateResellerCount : PropTypes.func.isRequired,
    LoadingLegendaryTx : PropTypes.func.isRequired,
    UserAllProductsByLink : PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    web3Provider : state.wallet.web3Provider,
    walletAddress : state.wallet.walletAddress,
    loadingLegendaryTx : state.link.loadingLegendaryTx,
})
const mapDispatchToProps = {
    ProfileInfoByLink,
    UpdateWalletInfo,
    UpdateResellerCount,
    LoadingProductsListByLink,
    UserAllProductsByLink ,
    UserAllNFTsByLink,
    LoadingLegendaryTx
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyLegendaryModal) ;
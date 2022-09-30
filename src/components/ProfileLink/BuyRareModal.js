import React, { useEffect, useState } from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { LoadingBidTransaction, UpdateBidDB , LoadingProductsListByLink, UserAllNFTsByLink, BuyerInfoById} from '../../redux/actions/link' ;
import { WriteNotify } from '../../redux/actions/notify';
import { PlaceBid } from '../../transactions/market';

import swal from 'sweetalert';
import CloseIcon from '@mui/icons-material/Close';
import MetaMaskImage from '../../assets/links/white_metamask.png' ;

import Loading from 'react-loading-components' ;

import { getUnit, getCookie } from '../../utils/Helper';

import { toast } from 'react-toastify/dist/react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import  {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Box,
    Button,
    TextField,
    Grid,
} from '@mui/material' ;

import { useStyles } from './StylesDiv/BuyRare.styles';

const BuyRareModal = (props) => {

    const classes = useStyles() ;

    const {
        open,
        handleClose,

        productInfo,

        LoadingBidTransaction,
        UpdateBidDB,
        LoadingProductsListByLink,
        UserAllNFTsByLink,
        loadingBidTx,
        web3Provider
    } = props ;


    const [bidPrice, setBidPrice] = useState(0) ;
    const [bidAmount, setBidAmount] = useState(0) ;

    const handleChangeBidPrice = (bidPrice) => {
        setBidPrice(bidPrice) ;
    }

    const handleChangeBidAmount = (bidAmount) => {
        setBidAmount(bidAmount) ;
    }

    const handlePlaceBid = async  () => {
        if(Number(productInfo?.minimum_bidding) > bidPrice) {
            return swal({
                title : 'Warning',
                text : "Bid price is too low",
                buttons: false,
                timer : 3000,
                icon : 'warning'
            })
        }
        if(Number(productInfo?.balanceOf < bidAmount)) {
            return swal({
                title : 'Warning',
                text : "Overflow Bid Amount",
                buttons: false,
                timer : 3000,
                icon : 'warning'
            })
        }
        if( await swal({
            title : 'Confirm',
            text : "Are you sure that you place bid?",
            buttons: [
                'No, I am not sure!',
                'Yes, I am sure!'
            ],
            icon : 'info'
        })) {
            handleClose() ;

            const id = toast.loading("[Place Bid] Tx is pending...");

            // await LoadingBidTransaction(true) ;
            let txResult = await PlaceBid(web3Provider, Number(productInfo?.nft_id), Number(bidAmount), Number(bidPrice)) ;

            if(txResult === 200) {
                await UpdateBidDB();
                toast.update(id, { render: "[Place Bid] Tx is successful", type: "success", autoClose: 5000, isLoading: false });
                
                let buyerInfo = await BuyerInfoById(getCookie('_SOLSTICE_BUYER')) ;

                await WriteNotify({
                    buyer : {
                        email : buyerInfo.email,
                        profile_link : buyerInfo.profile_link,
                        account_name : buyerInfo.account_name 
                    },
                    price : bidPrice,
                    amount : bidAmount,
                    product : productInfo?.name,
                    unit : productInfo?.bid_unit,
                    purchased_at : new Date().toLocaleDateString(),
                    seller : getCookie('_SOLSTICE_SELLER'),
                    type : 'rare'
                }) ;

                await LoadingProductsListByLink(true) ;
                await UserAllNFTsByLink(web3Provider) ;
                await LoadingProductsListByLink(false) ;
            }
            else {
                toast.update(id, { render: txResult , type: "error", autoClose: 5000, isLoading: false });

                // swal({
                //     title : 'Inffucient',
                //     text : txResult,
                //     timer : 3000,
                //     buttons: false,
                //     icon : 'error'
                // });
            }
            // await LoadingBidTransaction(false) ;
        }
    }

    useEffect(() => {
        if(productInfo) {
            setBidPrice(productInfo.minimum_bidding);
            setBidAmount(productInfo?.balanceOf);
        }
    }, [productInfo]) ;

    return (
        <Box className={classes.root}>
            <Dialog
                open={open}
                fullWidth
                classes ={{
                    paper : classes.paper
                }}
                sx={{backdropFilter : 'blur(4px)'}}
            >
                <DialogTitle>
                    <Box>
                        Bid : { `[ ${productInfo?.name} ]` }
                    </Box>
                    {
                        !loadingBidTx && <CloseIcon onClick={handleClose} sx={{cursor : 'pointer'}} className={classes.closeButtonCss} />
                    }
                </DialogTitle>
                <Box className={classes.dividerDiv} />
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Box sx={{mb : '10px'}}>Minimum Bidding Price</Box>
                            <Box sx={{fontSize: '20px'}}>
                                { productInfo?.minimum_bidding } {getUnit(productInfo?.bid_unit)}
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{mb : '10px'}}>Available Items</Box>
                            <Box sx={{fontSize: '20px'}}>
                                { productInfo?.item_available }
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{mb : '10px'}}>Royalty</Box>
                            <Box sx={{fontSize: '20px'}}>
                                { productInfo?.royalty } %
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{mb : '10px'}}>Status</Box>
                            <Box sx={{fontSize: '15px'}}>
                                balance Of creator : { productInfo?.balanceOf }<br/>
                                # of sold nft : { productInfo?.item_available - productInfo?.balanceOf }
                            </Box>
                        </Grid>
                        {
                            productInfo?.buyer?.isCreator && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    Your are creator of this nft.
                                </Box>
                            </Grid>
                        }
                        {
                            productInfo?.buyer?.isReseller && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    You are reseller of this nft.
                                </Box>
                            </Grid>
                        }
                        {
                            productInfo?.seller?.isReseller && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    Current user is owner of this nft.
                                    Rare NFT can't be resold. 
                                </Box>
                            </Grid>
                        }
                        {
                            productInfo?.seller?.isCreator && productInfo?.sold && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    All these nfts have already been sold out.
                                </Box>
                            </Grid>
                        }
                        <Grid item xs={6}>
                            <Box sx={{mb : '10px'}}>Bid Price</Box>
                            <Box >
                                <TextField
                                    type={'number'}
                                    min={productInfo?.minimum_bidding || 0}
                                    value={bidPrice}
                                    onChange={(e) => handleChangeBidPrice(e.target.value)}
                                    disabled={
                                        productInfo?.buyer?.isCreator 
                                        || productInfo?.buyer?.isReseller 
                                        || productInfo?.seller?.isReseller
                                        || productInfo?.sold
                                        || loadingBidTx 
                                    }
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{mb : '10px'}}>Item Amount</Box>
                            <Box >
                                <TextField
                                    type={'number'}
                                    min={productInfo?.minimum_bidding || 0}
                                    value={bidAmount}
                                    onChange={(e) => handleChangeBidAmount(e.target.value)}
                                    disabled={
                                        productInfo?.buyer?.isCreator 
                                        || productInfo?.buyer?.isReseller 
                                        || productInfo?.seller?.isReseller
                                        || productInfo?.sold
                                        || loadingBidTx 
                                    }
                                />
                            </Box>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Box sx={{mb : '10px'}}>Select Wallet</Box>
                            <FormControl
                                fullWidth
                            >
                                <Select
                                    value={'metamask'}
                                    MenuProps={{
                                        className : classes.selectDiv
                                    }}
                                >
                                    <MenuItem value={'metamask'}><img src={MetaMaskImage} width={40} height={40} style={{borderRadius: '50%'}} />&nbsp;&nbsp;Metamask</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}
                    </Grid>
                </DialogContent>
                <Box className={classes.dividerDiv} />
                <DialogActions>
                    <Button variant={'contained'} onClick={handlePlaceBid} startIcon={loadingBidTx && <Loading type='puff' width={30} height={30} fill='#e83e8c' />} 
                        disabled={ 
                            productInfo?.buyer?.isCreator 
                            || productInfo?.buyer?.isReseller 
                            || productInfo?.seller?.isReseller
                            || productInfo?.sold
                            || loadingBidTx 
                            || Number(bidAmount) === 0 
                            || Number(bidPrice) === 0
                        }
                    >Place bid</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
BuyRareModal.propTypes = {
    LoadingBidTransaction : PropTypes.func.isRequired,
    UpdateBidDB : PropTypes.func.isRequired,
    LoadingProductsListByLink : PropTypes.func.isRequired,
    UserAllNFTsByLink : PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    loadingBidTx : state.link.loadingBidTx,
    web3Provider : state.wallet.web3Provider,
})
const mapDispatchToProps = {
    LoadingBidTransaction,
    UpdateBidDB,
    LoadingProductsListByLink,
    UserAllNFTsByLink,
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyRareModal) ;
import * as React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserAllProductsByLink, LoadingProductsListByLink, LoadingBundleTx, UpdateBundleInfo, BuyerInfoById } from '../../redux/actions/link';
import { WriteNotify } from '../../redux/actions/notify';
import { Payment } from '../../transactions/market';
import { getUnit, getCookie, getUuid } from '../../utils/Helper';

import swal from 'sweetalert';
import CloseIcon from '@mui/icons-material/Close';
import MetaMaskImage from '../../assets/links/white_metamask.png' ;
import Loading from 'react-loading-components' ;

import format from 'format-duration' ;

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
} from '@mui/material' ;

import { useStyles } from './StylesDiv/BuyBundle.styles';

const BuyBundleModal = (props) => {
    const classes = useStyles() ;

    const {
        open,
        handleClose,

        productInfo,
        LoadingBundleTx,
        UserAllProductsByLink,
        LoadingProductsListByLink,
        UpdateBundleInfo,
        loadingBundleTx,
        web3Provider
    } = props ;

    const [buyerInfo, setBuyerInfo] = React.useState(null) ;
    const [isReleased, setIsRelased] = React.useState(false) ;
    const [isPaid, setIsPaid] = React.useState(false) ;
    const [payableDate, setPayableDate] = React.useState(null) ;

    const handleBuyProduct = async () => {
        handleClose() ;
        if(await swal({
            title : "Confirm",
            text : "This product will be uploaded on your SOLSCloud",
            buttons: [
                'No, I am not sure!',
                'Yes, I am sure!'
            ],
            icon : 'info'
        })) {
            // await LoadingBundleTx(true) ;
            const id = toast.loading("[Buy Product] Tx is pending...");

            let txResult = await Payment(web3Provider, productInfo?.creator_wallet, productInfo?.subscription_price, productInfo?.bundle_unit) ;

            if( txResult === 200 ) {
                if(await UpdateBundleInfo(buyerInfo, productInfo?.product_id)) {
                    toast.update(id, { render: "[Buy Product] Tx is successful", type: "success", autoClose: 5000, isLoading: false });

                    let buyerInfo = await BuyerInfoById(getCookie('_SOLSTICE_BUYER')) ;

                    await WriteNotify({
                        buyer : {
                            email : buyerInfo.email,
                            profile_link : buyerInfo.profile_link,
                            account_name : buyerInfo.account_name 
                        },
                        price : productInfo?.subscription_price,
                        product : productInfo?.master_piece,
                        unit : productInfo?.bundle_unit,
                        purchased_at : new Date().toLocaleDateString(),
                        seller : getCookie('_SOLSTICE_SELLER'),
                        type : 'bundle'
                    }) ;
                } else {
                    toast.update(id, { render: "[Buy Product] Tx is failed" , type: "error", autoClose: 5000, isLoading: false });
                }
            } else {
                toast.update(id, { render: txResult , type: "error", autoClose: 5000, isLoading: false });
            }
            // await LoadingBundleTx(false) ;

            await LoadingProductsListByLink(true) ;
            await UserAllProductsByLink() ;
            await LoadingProductsListByLink(false) ;
        }
    }

    React.useEffect(() => {
        if(productInfo) {
            let isReleased = new Date().getTime() - new Date(productInfo?.release_date) >= 0 ;
            setIsRelased(isReleased) ;

            let info = productInfo.buyers[getCookie('_SOLSTICE_BUYER')] ;

            if(info) {
                setBuyerInfo(info) ;
                let isPaid = new Date().getTime() - new Date(info.paid_at).getTime() <  24 * 60 * 60 * 90 * 30 ;
                if(isPaid) {
                    setPayableDate(format(30 * 24 * 60 * 60 * 1000 - (new Date().getTime() - new Date(info.paid_at)))) ;
                }
                setIsPaid(isPaid) ;
            } else {
                setBuyerInfo(null) ;
                setIsPaid(false) ;
            }
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
            >
                <DialogTitle>
                    <Box>
                        Product : { `[ ${productInfo?.master_piece} ]` }
                    </Box>
                    {
                        !loadingBundleTx && <CloseIcon onClick={handleClose} sx={{cursor : 'pointer'}} className={classes.closeButtonCss} />
                    }
                </DialogTitle>
                <Box className={classes.dividerDiv} />
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Box sx={{mb : '10px'}}>Price Per Subscription</Box>
                            <Box sx={{fontSize: '20px'}}>
                                { productInfo?.subscription_price } {getUnit(productInfo?.bundle_unit)}
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{mb : '10px'}}>Payment</Box>
                            <Box sx={{fontSize: '20px'}}>
                                Monthly
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{mb : '10px'}}>Distribution Schedule</Box>
                            <Box sx={{fontSize: '20px'}}>
                                Weekly
                            </Box>
                        </Grid>
                        {
                            !buyerInfo && <Grid item xs={6}>
                                <Box sx={{mb : '10px'}}>Release Date</Box>
                                <Box sx={{fontSize: '20px'}}>
                                    { productInfo?.release_date }
                                </Box>
                            </Grid>
                        }
                        {
                            buyerInfo && <Grid item xs={6}>
                                <Box sx={{mb : '10px'}}>Paid At</Box>
                                <Box sx={{fontSize: '20px'}}>
                                    { buyerInfo.paid_at }
                                </Box>
                            </Grid>
                        }
                        {
                            productInfo?.creator_id === getCookie('_SOLSTICE_BUYER') && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    You are creator of this product.
                                </Box>
                            </Grid>
                        }
                        {
                            buyerInfo && (
                                !isPaid ? <Grid item xs={12}>
                                    <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                        You have to pay about this product again.
                                    </Box>
                                </Grid>
                                :<Grid item xs={12}>
                                    <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                        You have already paid about this product.<br/>
                                        You should pay after { payableDate  }.
                                    </Box>
                                </Grid>
                            )
                        }
                        {
                            !buyerInfo && !isReleased && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    You can buy about this product after {productInfo.release_date}.
                                </Box>
                            </Grid>
                        }
                    </Grid>
                </DialogContent>
                <Box className={classes.dividerDiv} />
                <DialogActions>
                    <Button variant={'contained'} onClick={handleBuyProduct} 
                        disabled={
                            ( (buyerInfo && !isPaid) || (!buyerInfo && isReleased) ) && productInfo?.creator_id !== getCookie('_SOLSTICE_BUYER') && !loadingBundleTx ? false : true
                        }
                        startIcon={loadingBundleTx && <Loading type='tail_spin' width={30} height={30} fill='#43D9AD' />}
                    >
                        Payment 
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
BuyBundleModal.propTypes = {
    LoadingBundleTx : PropTypes.func.isRequired,
    LoadingProductsListByLink : PropTypes.func.isRequired,
    UserAllProductsByLink : PropTypes.func.isRequired,
    UpdateBundleInfo : PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    web3Provider : state.wallet.web3Provider,
    loadingBundleTx : state.link.loadingBundleTx,
})
const mapDispatchToProps = {
    LoadingBundleTx,
    LoadingProductsListByLink,
    UserAllProductsByLink,
    UpdateBundleInfo,
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyBundleModal) ;
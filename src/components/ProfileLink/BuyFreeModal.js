import * as React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { LoadingFreeOffer, FreeOfferProduct, LoadingProductsListByLink, UserAllProductsByLink , BuyerInfoById} from '../../redux/actions/link';
import { WriteNotify } from '../../redux/actions/notify';
import { getCookie, getUuid } from '../../utils/Helper';

import CloseIcon from '@mui/icons-material/Close';

import swal from 'sweetalert' ;
import Loading from 'react-loading-components' ;


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

import { useStyles } from './StylesDiv/BuyFree.styles';

const BuyFreeModal = (props) => {
    const classes = useStyles() ;

    const {
        open,
        handleClose,

        loadingFreeOffer,
        LoadingFreeOffer,
        FreeOfferProduct,
        LoadingProductsListByLink,
        UserAllProductsByLink,
        productInfo
    } = props ;


    const handleFreeOffer = async () => {
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
            // await LoadingFreeOffer(true) ;
            const id = toast.loading("[Free Offer] Tx is pending...");

            if( await FreeOfferProduct(productInfo?.product_id) ) {
                toast.update(id, { render: "[Free Offer] Tx is successful", type: "success", autoClose: 5000, isLoading: false });
                
                let buyerInfo = await BuyerInfoById(getCookie('_SOLSTICE_BUYER')) ;

                await WriteNotify({
                    buyer : {
                        email : buyerInfo.email,
                        profile_link : buyerInfo.profile_link,
                        account_name : buyerInfo.account_name 
                    },
                    price : 0,
                    product : productInfo?.master_piece,
                    purchased_at : new Date().toLocaleDateString(),
                    seller : getCookie('_SOLSTICE_SELLER'),
                    type : 'free'
                }) ;

            } else {
                toast.update(id, { render: "[Free Offer] Tx is failed" , type: "error", autoClose: 5000, isLoading: false });
            }
            
            // await LoadingFreeOffer(false) ;

            await LoadingProductsListByLink(true);
            await UserAllProductsByLink() ;
            await LoadingProductsListByLink(false) ;
        }
    }

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
                    <CloseIcon onClick={handleClose} sx={{cursor : 'pointer'}} className={classes.closeButtonCss} />
                </DialogTitle>
                <Box className={classes.dividerDiv} />
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Box sx={{mb : '10px'}}>Release Date</Box>
                            <Box sx={{fontSize: '20px'}}>
                                {productInfo?.release_date}
                            </Box>
                        </Grid>
                        {
                            productInfo?.creator_id === getCookie('_SOLSTICE_BUYER') && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    You are creator of this product.
                                </Box>
                            </Grid>
                        }
                        {
                            productInfo?.buyers?.includes(getCookie('_SOLSTICE_BUYER')) && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    You have already bought this product.
                                </Box>
                            </Grid>
                        }
                        {
                            productInfo?.creator_id !== getCookie('_SOLSTICE_BUYER') && new Date().getTime() - new Date(productInfo?.release_date).getTime() < 0 && <Grid item xs={12}>
                                <Box sx={{color : '#13958f', fontSize : '15px'}}>
                                    You can offer this product at {productInfo?.release_date}
                                </Box>
                            </Grid>
                        }
                    </Grid>
                </DialogContent>
                <Box className={classes.dividerDiv} />
                <DialogActions>
                    <Button variant={'contained'} onClick={handleFreeOffer} 
                        disabled={
                            new Date().getTime() - new Date(productInfo?.release_date).getTime() < 0 ||
                            productInfo?.buyers?.includes(getCookie('_SOLSTICE_BUYER')) ||
                            productInfo?.creator_id === getCookie('_SOLSTICE_BUYER')
                        }
                        startIcon={loadingFreeOffer && <Loading type='tail_spin' width={30} height={30} fill='#43D9AD' />}
                    >Free Offer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
BuyFreeModal.propTypes = {
    LoadingFreeOffer : PropTypes.func.isRequired,
    FreeOfferProduct : PropTypes.func.isRequired,
    LoadingProductsListByLink : PropTypes.func.isRequired,
    UserAllProductsByLink : PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    loadingFreeOffer : state.link.loadingFreeOffer,
})
const mapDispatchToProps = {
    LoadingFreeOffer,
    FreeOfferProduct,
    LoadingProductsListByLink,
    UserAllProductsByLink,
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyFreeModal) ;
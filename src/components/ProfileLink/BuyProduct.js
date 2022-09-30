import * as React from 'react' ;

import { connect } from 'react-redux';

import {
    Button
} from '@mui/material' ;

import { convertObjToString, getUnit } from '../../utils/Helper';

import BuyRareModal from './BuyRareModal';
import BuyFreeModal from './BuyFreeModal';
import BuyBundleModal from './BuyBundleModal';
import BuyLegendaryModal from './BuyLegendaryModal';

import swal from 'sweetalert' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    buttonCss : {
        backgroundColor : '#338BEF !important',
        textTransform : 'none !important',
        marginRight : '10px !important', marginLeft : '10px !important',
        fontWeight : 'bold !important',
    },
})) ;

const BuyProduct = (props) => {
    const classes = useStyles() ;

    const {
        productInfo,
        web3Provider
    } = props ;

    const [openRareModal, setOpenRareModal] = React.useState(false) ;
    const [openLegendaryModal, setOpenLegendaryModal] = React.useState(false) ;
    const [openBundleModal, setOpenBundleModal] = React.useState(false) ;
    const [openFreeModal, setOpenFreeModal] = React.useState(false) ;

    const [disableButton, setDisableButton] = React.useState(true) ;

    const handleOpenLegendaryModal = () => {
        setOpenLegendaryModal(true) ;
    }
    const handleCloseLegendaryModal = () => {
        setOpenLegendaryModal(false) ;
    }

    const handleOpenRareModal = () => {
        setOpenRareModal(true) ;
    }
    const handleCloseRareModal = () => {
        setOpenRareModal(false) ;
    }

    const handleOpenFreeModal = () => {
        setOpenFreeModal(true) ;
    }
    const handleCloseFreeModal = () => {
        setOpenFreeModal(false) ;
    }

    const handleOpenBundleModal = () => {
        setOpenBundleModal(true) ;
    }
    const handleCloseBundleModal = () => {
        setOpenBundleModal(false) ;
    }

    const handleClickBuy = () => {
        if(web3Provider) {
            switch(productInfo?.price_id || productInfo?.price_type) {
                case 1 :
                    handleOpenLegendaryModal() ;
                    return ;
                case 2 : 
                    handleOpenRareModal() ;
                    return ;
                case 'bundle' : 
                    handleOpenBundleModal() ;
                    return ;
                case 'free' : 
                    handleOpenFreeModal() ;
                    return ;
                default :
                    return ;
            }
        } else {
            swal({
                title : 'Connect Wallet',
                text : 'If you purchase product, you have to connect to wallet',
                icon : 'warning',
                timer : 3000,
                buttons : false
            }) ;
        }
    }

    React.useEffect(() => {
        if(typeof productInfo === 'undefined') {
            setDisableButton(true) ;
            return ;
        }

        if(productInfo?.price_type === 'free') {
            if( new Date(convertObjToString(productInfo?.release_date)).getTime() - new Date().getTime() > 0 ) {
                setDisableButton(true) ;
                return ;
            }
        }
        if(productInfo?.price_type === 'bundle') {
            if( new Date(convertObjToString(productInfo?.release_date)).getTime() - new Date().getTime() > 0 ) {
                setDisableButton(true) ;
                return ;
            }
        }
        setDisableButton(false) ;
    }, [productInfo]) ;
    return (
        <>
            {
                typeof productInfo !== "undefined" && <Button variant={'contained'} className={classes.buttonCss} sx={{mb : '10px', width : 'auto'}} onClick={handleClickBuy} disabled={disableButton}>
                    {
                        productInfo?.price_id === 2 && `Buy for ${productInfo?.minimum_bidding} ${getUnit(productInfo?.bid_unit)}`
                    }
                    {
                        productInfo?.price_id === 1 && `Buy for ${productInfo?.product_price} ${getUnit(productInfo?.product_unit)}`
                    }
                    {
                        productInfo?.price_type === 'free' && `Free Offer`
                    }
                    {
                        productInfo?.price_type === 'bundle' && `Buy for ${productInfo?.subscription_price} ${getUnit(productInfo?.bundle_unit)}`
                    }
                </Button>
            }
            {
                productInfo?.price_id === 1 && <BuyLegendaryModal
                    open={openLegendaryModal}
                    handleClose={handleCloseLegendaryModal}

                    productInfo={productInfo}
                />
            }
            {
                productInfo?.price_id === 2 && <BuyRareModal
                    open={openRareModal}
                    handleClose={handleCloseRareModal}

                    productInfo={productInfo}
                />
            }
            {
                productInfo?.price_type === "free" && <BuyFreeModal
                    open={openFreeModal}
                    handleClose={handleCloseFreeModal}

                    productInfo={productInfo}
                />
            }
            {
                productInfo?.price_type === "bundle" && <BuyBundleModal
                    open={openBundleModal}
                    handleClose={handleCloseBundleModal}

                    productInfo={productInfo}
                />
            }
            
            
        </>
    )
}

const mapStateToProps = state => ({
    web3Provider : state.wallet.web3Provider
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(BuyProduct) ; 
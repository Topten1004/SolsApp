import React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { LoadingTransaction, UserBidsInfoList, UpdateResellerCount, UpdateBuyerWallets } from '../../../../redux/actions/cart' ;
import { AcceptBid, DenyBid } from '../../../../transactions/market' ;

import swal from 'sweetalert' ;

import { toast } from 'react-toastify/dist/react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {
   Popover,
   List,
   ListItem,
   Divider,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    popover : {
        zIndex : "1500 !important",
        "& .MuiList-root" : {
            padding : "0px",
            width : '120px',
            background : "#177a7abf !important"
        },
        "& .MuiListItem-root" : {
            padding : 10,
            display : 'flex', justifyContent : 'center',
            fontSize : "14px" , color : "white", fontWeight : 'bold'
        },
        "& a" : {
            textDecoration : "none"
        }
    }
}))

const ActionPopOver = (props) => {

    const classes = useStyles() ;

    const {
        open , anchorEl , id, handleClose,
        bidId, buyerId, buyerWallet,

        web3Provider,
        LoadingTransaction,
        UserBidsInfoList,
        UpdateResellerCount,
        UpdateBuyerWallets
    } = props ;

    const handleAccept = async () => {
        handleClose() ;
        if( await swal({
            title : 'Confirm',
            text : "Are you sure that you accept this bid?",
            buttons: [
                'No, I am not sure!',
                'Yes, I am sure!'
            ],
            icon : 'info'
        })) {
            // await LoadingTransaction(true) ;
            const id = toast.loading("[Accept Bid] Tx is pending...");

            let txResult = await AcceptBid(web3Provider, bidId) ;

            if(txResult === 200) {
                toast.update(id, { render: "[Accept Bid] Tx is successful", type: "success", autoClose: 5000, isLoading: false });

                await UpdateBuyerWallets(buyerId, buyerWallet) ;
                await UpdateResellerCount() ;
                await UserBidsInfoList(web3Provider, bidId) ;
            } else {
                toast.update(id, { render: txResult , type: "error", autoClose: 5000, isLoading: false });
                // swal({
                //     title : 'Error',
                //     text : txResult,
                //     timer : 50000,
                //     buttons: false,
                //     icon : 'error'
                // });
            }
            
            // await LoadingTransaction(false) ;
        }
    }

    const handleDeny = async () => {
        handleClose() ;
        if( await swal({
            title : 'Confirm',
            text : "Are you sure that you deny this bid?",
            buttons: [
                'No, I am not sure!',
                'Yes, I am sure!'
            ],
            icon : 'info'
        })) {
            // await LoadingTransaction(true) ;
            const id = toast.loading("[Deny Bid] Tx is pending...");
            
            let txResult = await DenyBid(web3Provider, bidId) ;

            if(txResult === 200) {
                toast.update(id, { render: "[Deny Bid] Tx is successful", type: "success", autoClose: 5000, isLoading: false });
                await UserBidsInfoList(web3Provider) ;
            } else {
                toast.update(id, { render: txResult , type: "error", autoClose: 5000, isLoading: false });

                // swal({
                //     title : 'Error',
                //     text : txResult,
                //     timer : 5000,
                //     buttons: false,
                //     icon : 'error'
                // });
            }

            // await LoadingTransaction(false) ;
        }
    }

    return (
        <Popover
            id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            classes={{
                paper : classes.popover
            }}
        >
            <List>
                <ListItem button  onClick={handleAccept}>
                    Accept
                </ListItem>
                <Divider />
                <ListItem button  onClick={handleDeny}>
                    Deny
                </ListItem>
            </List>
        </Popover>
    )
}
ActionPopOver.propTypes = {
    LoadingTransaction : PropTypes.func.isRequired,
    UserBidsInfoList : PropTypes.func.isRequired,
    UpdateResellerCount : PropTypes.func.isRequired,
    UpdateBuyerWallets : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    web3Provider : state.wallet.web3Provider
});
const mapDispatchToProps = {
    LoadingTransaction,
    UserBidsInfoList,
    UpdateResellerCount,
    UpdateBuyerWallets
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionPopOver) ;
import React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { LoadingTransaction, UserBidsInfoList } from '../../../../redux/actions/cart' ;
import { AcceptBid, DenyBid } from '../../../../transactions/market' ;

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
            background : "#7A7A7A !important"
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
        bidId,

        web3Provider,
        LoadingTransaction,
        UserBidsInfoList
    } = props ;

    const handleAccept = async () => {
        if( await swal({
            title : 'Confirm',
            text : "Are you sure that you accept this bid?",
            buttons: [
                'No, I am not sure!',
                'Yes, I am sure!'
            ],
            icon : 'info'
        })) {
            await LoadingTransaction(true) ;
            await AcceptBid(web3Provider, bidId) ;
            await UserBidsInfoList(web3Provider, bidId) ;
            await LoadingTransaction(false) ;
            handleClose() ;
        }
    }

    const handleDeny = async () => {
        if( await swal({
            title : 'Confirm',
            text : "Are you sure that you deny this bid?",
            buttons: [
                'No, I am not sure!',
                'Yes, I am sure!'
            ],
            icon : 'info'
        })) {
            await LoadingTransaction(true) ;
            await DenyBid(web3Provider, bidId) ;
            await UserBidsInfoList(web3Provider) ;
            await LoadingTransaction(false) ;
            handleClose() ;
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
    UserBidsInfoList : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    web3Provider : state.wallet.web3Provider
});
const mapDispatchToProps = {
    LoadingTransaction,
    UserBidsInfoList
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionPopOver) ;
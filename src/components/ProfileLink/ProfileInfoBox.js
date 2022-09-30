import React,{useRef, useEffect, useState} from 'react' ;
import { useMeasure } from 'react-use' ;
import { useWalletInfo } from '../../contexts/WalletContext';

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { UserAllNFTsByLink, UserAllProductsByLink,  LoadingProductsListByLink } from '../../redux/actions/link';

import MuscleImage from '../../assets/muscle.png' ;
import AvatarImage from '../../assets/avatar.png' ;
import UserImage from '../../assets/profile/User.svg' ;
import CoverImage from '../../assets/profile/Cover.png' ;
import ProductThumbImage from '../../assets/profile/product_thumb.svg' ;
import ProductDetailsImage from '../../assets/profile/product_details.svg' ;
import ReloadImage from '../../assets/profile/Reload.png' ;
import TickProductTypeImage from '../../assets/profile/TickProductType.svg' ;

import Loading from 'react-loading-components' ;

import { getCookie } from '../../utils/Helper';

import {
    Box,
    Button,
    Tooltip
} from '@mui/material';

import { useTheme } from '@mui/styles';
import { useStyles } from './StylesDiv/ProfileInfo.styles';

const ProfileInfoBox = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;
    
    const {
        isConnected,
        web3Provider
    } = useWalletInfo () ;

    const {
        listType,
        handleChangeListType,
        currentProductType,
        handleCurrentProductType,
        handleClickProfile,

        LoadingProductsListByLink,
        UserAllNFTsByLink,
        UserAllProductsByLink,
        loadingProductsList,
        
        coverPictureUrl,
        profilePictureUrl,
        accountName,
        productTypeList,
        platformCount,
        productCount,
        resellerCount,
    } = props ;

    const avatarCtrl = useRef() ;

    const [ setAvatarCtrl, {width, height} ] = useMeasure() ;
    
    const handleReload = async () => {
        await LoadingProductsListByLink(true) ;
        if(isConnected) await UserAllNFTsByLink(web3Provider) ;
        await UserAllProductsByLink() ;
        await LoadingProductsListByLink(false) ;
    }

    useEffect(() => {
        setAvatarCtrl(avatarCtrl.current) ;
    }, []) ;

    useEffect(() => {
    }, []) ;

    useEffect(() => {
        if(productTypeList.length) handleCurrentProductType(productTypeList[0]) ;
    }, [productTypeList]) ;

    return (
           <>
                <Box className={classes.avatarCtrlDiv} ref={avatarCtrl} >
                    {
                        coverPictureUrl ? <img src={coverPictureUrl} width={width} height={width / 4.12} alt='no image.' />:
                        <Box sx={{width : width + "px", height : (width / 4.12) + "px"}} className={classes.coverPictureDiv}>
                            <img src={CoverImage} />
                            <Box>Cover Photo</Box>
                        </Box>
                    }
                    <Box className={classes.avatarDiv} >
                        <Box className={classes.avatar}>
                            {
                                profilePictureUrl ? <img src={profilePictureUrl} width={width * 0.15} height={width * 0.15} alt='no image.' /> 
                                : <img src={UserImage} width={width * 0.15} height={width * 0.15} alt='no image.'  /> 
                            }
                            <Box className={classes.userNameDiv}>
                                {accountName && `@ ${accountName}`}
                            </Box>
                        </Box>
                        <Box className={classes.userInfoDiv}>
                            <Box className={classes.userInfoNumber}>
                                {productCount}
                            </Box>
                            <Box className={classes.userInfoLabel}>
                                Products
                            </Box>
                        </Box>
                        <Box className={classes.userInfoDiv}>
                            <Box className={classes.userInfoNumber}>
                                {platformCount}
                            </Box>
                            <Box className={classes.userInfoLabel}>
                                Platforms
                            </Box>
                        </Box>
                        <Box className={classes.userInfoDiv}>
                            <Box className={classes.userInfoNumber}>
                                {resellerCount}
                            </Box>
                            <Box className={classes.userInfoLabel}>
                                Resellers
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.productTypeDiv} sx={{marginTop : (width * 0.15 + (width > 372 ? 10 : 70)) + "px"}}>
                    {
                        productTypeList.map((item, index) => {
                            return (
                                <Box className={currentProductType === item ? classes.activeProductType : classes.productType} key={index} onClick={() => handleCurrentProductType(item)}>
                                    { currentProductType === item && <img src={TickProductTypeImage} width={20} />} 
                                    { currentProductType === item ? item.replaceAll("#", '') : item}
                                </Box>
                            )
                        })
                    }
                </Box>
                <Box>
                    <Box className={classes.productListConfigDiv}>
                        <img src={listType === 1 ? ProductDetailsImage : ProductThumbImage} width={27} height={27} className={classes.productListType} onClick={handleChangeListType}/>
                        {
                            !loadingProductsList ? <Tooltip title={'Reload'}>
                                <img src={ReloadImage} width={27} height={27} onClick={handleReload}/>
                            </Tooltip>
                            : <Loading type='oval' width={27} height={27} fill='#2eb6ec' />
                        }
                    </Box>
                    <Box className={classes.dividerDiv} />
                </Box>
           </>
    )
}
ProfileInfoBox.propTypes = {
    UserAllProductsByLink : PropTypes.func.isRequired,
    UserAllNFTsByLink : PropTypes.func.isRequired,
    LoadingProductsListByLink : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    coverPictureUrl : state.link.coverPictureUrl,
    profilePictureUrl : state.link.profilePictureUrl,
    productTypeList : state.link.productTypeList,
    accountName : state.link.accountName,
    jobTag : state.link.jobTag,

    platformCount : state.link.platformCount,
    productCount : state.link.productCount,
    resellerCount : state.link.resellerCount,
    loadingProductsList : state.link.loadingProductsList
})
const mapDispatchToProps = {
    UserAllNFTsByLink,
    UserAllProductsByLink,
    LoadingProductsListByLink
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoBox) ;
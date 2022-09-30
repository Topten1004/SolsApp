import React,{useRef, useEffect, useState} from 'react' ;

import { useMeasure } from 'react-use' ;
import { useWalletInfo } from '../../../contexts/WalletContext';

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { UserAccountInfo, UserAllNFTs, UserAllProducts, LoadingProductsList } from '../../../redux/actions/profile';

import { getCookie, getUuid } from '../../../utils/Helper';

import MuscleImage from '../../../assets/muscle.png' ;
import CoverImage from '../../../assets/profile/Cover.png' ;
import UserImage from '../../../assets/profile/User.svg' ;
import AvatarImage from '../../../assets/avatar.png' ;
import ProductThumbImage from '../../../assets/profile/product_thumb.svg' ;
import ProductDetailsImage from '../../../assets/profile/product_details.svg' ;
import ReloadImage from '../../../assets/profile/Reload.png' ;

import TickProductTypeImage from '../../../assets/profile/TickProductType.svg' ;

import Loading from 'react-loading-components' ;

import {
    Box,
    Tooltip
} from '@mui/material';

import { makeStyles, useTheme } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
    },
    avatarCtrlDiv : {
        display : 'flex',
        justifyContent : 'center',
        position : 'relative',

        borderRadius : 10
    },
    avatarDiv : {
        zIndex : 1000,
        position : 'absolute',
        
        top : '70%',

        display : 'flex',
        alignItems : 'flex-end',
        justifyContent : 'space-between',
        flexWrap : 'wrap',
        
        width  : '100%',

        padding : 10,
        paddingLeft : 30
    },
    avatar : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'column'
    },
    userNameDiv : {
        color : 'white',
        fontSize : 18
    },
    userInfoDiv : {
        color : 'white',

        marginLeft :  5 ,
        marginRight : 5
    },
    userInfoNumber : {
        textAlign : 'center',
        fontSize : 18
    },
    userInfoLabel  :{
        textAlign : 'center',
        fontSize : 15
    },
    coverPictureDiv : {
        border : '1px solid ' + theme.palette.blue.A100,
        borderRadius : 20,
        display : 'flex' , justifyContent : 'center', alignItems : 'center', flexDirection : 'column', gap : 20,
        color : theme.palette.green.A200,

        background : theme.palette.blue.A200,

    },
    productTypeDiv : {
        color : "#43D9AD",
        fontSize : 18,
        
        padding : 10,

        display : 'flex',
        alignItems : 'center',
        flexWrap : 'wrap',
        gap : '10px',
    },
    productType : {
        borderRadius : 20,
        cursor : 'pointer',
        paddingLeft : 15,
        paddingRight : 15,
        marginLeft : 5,
        marginRight : 5,

        zIndex : 1000,

        "&:hover" :{
            backgroundColor : 'rgba(51, 139, 239, 0.21)',
        }
    },
    activeProductType : {
        display : 'flex',
        alignItems : 'center',
        gap : '5px'
    },
    jobTagDiv : {
        marginRight : '30px !important',
        backgroundColor : "rgba(51, 139, 239, 0.21) !important",

        paddingTop : '0px !important',
        paddingBottom : '0px !important',
        paddingLeft :  '10px !important',
        paddingRight : '10px !important',
        borderRadius : '25px !important',

        textTransform : 'capitalize !important',

        width : 118,
        height : 27,

        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',

        fontFamily: 'Montserrat !important',
        color : '#338BEF !important',

        zIndex : 1000
    },
    productListConfigDiv : {
        display : 'flex', justifyContent : 'flex-end', gap : 20, alignItems : 'center',

        "& img" : {
            cursor :'pointer'
        },

        marginRight : 30
    },
    productListConfig : {
        display : 'flex',
        alignItems : 'flex-end'
    },
    productListType : {
        cursor : 'pointer',
    },
    dividerDiv : {
        borderBottom : '1px solid #EFF2F4',

        marginTop : 20,
        marginBottom : 20,
        marginLeft : 20,
        marginRight : 30
    },
}))

const SettingBox = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;

    const {
        web3Provider,
        isConnected
    } = useWalletInfo() ;

    const {
        listType,
        handleChangeListType,
        currentProductType,
        handleCurrentProductType,

        UserAccountInfo,
        UserAllNFTs,
        UserAllProducts,
        LoadingProductsList,

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
        await LoadingProductsList(true) ;
        if(isConnected) await UserAllNFTs(web3Provider) ;
        await UserAllProducts() ;
        await LoadingProductsList(false) ;
    }

    useEffect(() => {
        setAvatarCtrl(avatarCtrl.current) ;
    }, []) ;

    useEffect(() => {
        UserAccountInfo(getUuid(getCookie('_SOLSTICE_AUTHUSER'))) ;
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
                                {accountName ? `@ ${accountName}` : 'Username'}
                            </Box>
                        </Box>
                        <Box className={classes.userInfoDiv}>
                            <Box className={classes.userInfoNumber}>
                                {productCount || 0}
                            </Box>
                            <Box className={classes.userInfoLabel}>
                                Products
                            </Box>
                        </Box>
                        <Box className={classes.userInfoDiv}>
                            <Box className={classes.userInfoNumber}>
                                {platformCount || 0}
                            </Box>
                            <Box className={classes.userInfoLabel}>
                                Platforms
                            </Box>
                        </Box>
                        <Box className={classes.userInfoDiv}>
                            <Box className={classes.userInfoNumber}>
                                {resellerCount || 0}
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
SettingBox.propTypes = {
    LoadingProductsList : PropTypes.func.isRequired,
    UserAllNFTs : PropTypes.func.isRequired,
    UserAllProducts : PropTypes.func.isRequired,
    UserAccountInfo : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    coverPictureUrl : state.profile.coverPictureUrl,
    profilePictureUrl : state.profile.profilePictureUrl,
    productTypeList : state.profile.productTypeList,
    accountName : state.profile.accountName,

    platformCount : state.profile.platformCount,
    productCount : state.profile.productCount,
    resellerCount : state.profile.resellerCount,
    loadingProductsList : state.profile.loadingProductsList,

    urlFromLink : state.auth.urlFromLink
})
const mapDispatchToProps = {
    UserAccountInfo,
    LoadingProductsList,
    UserAllNFTs,
    UserAllProducts
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingBox) ;
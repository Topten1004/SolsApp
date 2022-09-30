import * as React from 'react' ;

import { useLocation } from 'react-use' ;
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoadingProductsListByLink, UserAllNFTsByLink, UserAllProductsByLink } from '../../redux/actions/link' ;
import  { ConnectLinkToAccount } from '../../redux/actions/auth' ;

import DetailListItem from '../../components/ProfileLink/DetailListItem.js';
import ProfileInfoBox from '../../components/ProfileLink/ProfileInfoBox';
import BuyProduct from '../../components/ProfileLink/BuyProduct';
import VideoToCanvas from '../../components/Common/VideoToCanvas';
import ConnectWallet from '../../components/ProfileLink/ConnectWallet';
import ImageToCanvas from '../../components/Common/ImageToCanvas';
import MessageModal from '../../components/Modals/MessageModal';
import PdfPreview from '../../components/Common/PdfPreview';
import DocxPreview from '../../components/Common/DocxPreview';

import EmptyTrashImage from '../../assets/profile/EmptyTrash.png';
import EmptyCartImage from '../../assets/profile/EmptyCart.png';
import EbookImage from '../../assets/common/Ebook.png' ;

import { convertObjToString, getCookie, getPriceType, getProductId, getUuid , getFileCategory} from '../../utils/Helper';

import { v4 as uuidv4 } from 'uuid' ;

import Loading from 'react-loading-components' ;

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { EffectCoverflow, Pagination } from "swiper";

import 'swiper/swiper.min.css';
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/thumbs/thumbs.min.css';

import {
    Box,
    Grid,
    Button,
    useMediaQuery
} from '@mui/material';

import { useTheme } from '@mui/styles';
import { useStyles } from './StylesDiv/ProfileLink.styles';


const ProfileLinkScreen = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;
    const location = useLocation() ;
    const navigate = useNavigate() ;

    const match1175 = useMediaQuery('(min-width : 1000px)') ;

    const {
        accountName,
        fullName,
        joinedDate,
        hostId,
        profileMessage,
        nftsListByLink,
        productsListByLink,
        loadingProductsList,

        ConnectLinkToAccount,
        UserAllNFTsByLink,
        UserAllProductsByLink,
        LoadingProductsListByLink,

        web3Provider
    } = props;

    const [swiperCtrl, setSwiperCtrl] = React.useState(null) ;

    const [currentProduct, setCurrentProduct] = React.useState(0);
    const [currentSol, setCurrentSol] = React.useState(0) ;
    const [currentProductType, setCurrentProductType] = React.useState(null) ;
    const [listType, setListType] = React.useState(1) ;
    const [filterListByType, setFilterListByType] = React.useState(null) ;
    
    const [openMessageModal, setOpenMessageModal] = React.useState(false) ;

    const handleOpenMessageModal = () => {
        setOpenMessageModal(true) ;
    }

    const handleCloseMessageModal = async () => {
        await ConnectLinkToAccount(location.pathname) ;
        setOpenMessageModal(false) ;
        navigate('/auth/') ;
    }

    const handleOpenProfilePhotoModal = () => {
        setOpenProfilePhotoModal(true) ;
    }
    const handleCloseProfilePhotoModal = () => {
        setOpenProfilePhotoModal(false) ;
    }

    const handleChangeListType = () => {
        if(listType === 1) setListType(2);
        else setListType(1);
    }

    React.useEffect(() => {
        swiperCtrl?.slideTo(currentSol) ;
    }, [currentSol]) ;

    React.useEffect(async () => {
        if(web3Provider) {
            await LoadingProductsListByLink(true) ;
            await UserAllNFTsByLink(web3Provider) ;
            await UserAllProductsByLink() ;
            await LoadingProductsListByLink(false) ;
        }
        
    }, [web3Provider]) ;

    React.useEffect(async () => {
        let temp0 = [...nftsListByLink.filter(nft => nft.product_id === getProductId(currentProductType))] ;
        let temp1 = [...productsListByLink.filter(product => product.product_type === currentProductType)] ;
        temp0 = temp0.concat(temp1);
        setFilterListByType(temp0) ;
    }, [nftsListByLink, currentProductType, productsListByLink]) ;


    React.useEffect(() => {
        if(!getCookie('_SOLSTICE_BUYER')) {
            handleOpenMessageModal(true) ;
        }
    }, []) ;

    React.useEffect(() => {
    }, [filterListByType]) ; 

    return (
        <Box className={classes.root}>
            <Grid container className={classes.container} >
                <ConnectWallet />
                <Box className={classes.rectBackground} />
                <Grid container>
                    <Grid item xs={ match1175 ?  6 : 11.9 } sx={{position : 'relative', height : match1175 ? '100%' : 'auto',display : 'flex', flexDirection : 'column !important', justifyContent : 'space-between'}}>
                        <ProfileInfoBox 
                            listType={listType}
                            handleChangeListType={handleChangeListType}

                            currentProductType={currentProductType}
                            handleCurrentProductType={setCurrentProductType}

                            handleClickProfile={handleOpenProfilePhotoModal}
                        />
                        <Box className={classes.greenBlur} />
                    </Grid>
                    {
                        match1175 && <Grid item xs={ 6 } sx={{height : match1175 ? '100%' : 'auto',  display : 'flex', flexDirection : 'column !important', justifyContent : 'space-around', pt:'30px', pb : '20px'}}>
                            <Box className={classes.messageDiv} sx={{marginLeft : '35px', marginRight:'50px',}}>
                                <pre className={classes.preDiv}>{profileMessage || ""}</pre>
                            </Box>
                            <Box>
                                <Box className={classes.slashDiv}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Box >// Host ID : <br/>{hostId}</Box>
                                        </Grid>
                                        <Grid item xs={6}>// Joined : <br/>{joinedDate}</Grid>
                                    </Grid>
                                </Box>
                                <Box className={classes.slashDiv}>
                                    <Grid container>
                                        <Grid item xs={6} >// {filterListByType?.[currentProduct]?.name || filterListByType?.[currentProduct]?.master_piece ||"Unknown"} : <br/>{filterListByType?.[currentProduct]?.sols[currentSol]?.name || "Unknown"}</Grid>
                                        <Grid item xs={6}>// Release Date : <br/>
                                            {
                                                filterListByType?.[currentProduct]?.price_type === 'free' && <>
                                                    { filterListByType?.[currentProduct]?.release_date }
                                                </>
                                            }
                                            {
                                                filterListByType?.[currentProduct]?.price_type === 'bundle' && <>
                                                    { filterListByType?.[currentProduct]?.release_date }
                                                </>
                                            }
                                            {
                                                filterListByType?.[currentProduct]?.price_id === 2 && <>
                                                    {filterListByType?.[currentProduct]?.created_at.toDate().toLocaleDateString()}
                                                </>
                                            }
                                            {
                                                filterListByType?.[currentProduct]?.price_id === 1 && <>
                                                    {filterListByType?.[currentProduct]?.created_at?.toDate().toLocaleDateString()}
                                                </>
                                            }
                                        </Grid>
                                    </Grid>
                                </Box>        
                            </Box>
                        </Grid>
                    }
                </Grid>
                <Grid container>
                    <Grid item xs={match1175 ? 6 : 12} sx={{position :'relative',height : '500px', display : 'flex', alignItems : 'center', justifyContent : 'center', borderRight : ( loadingProductsList || !filterListByType?.length ) && '1px solid lightgray'}}>
                        {
                           ( loadingProductsList || !filterListByType )? 
                            (
                                listType === 1 ? <Loading type='grid' width={50} height={50} fill='#43D9AD' />
                                : <Loading type='three_dots' width={50} height={50} fill='#43D9AD' />
                            )
                            : (

                                filterListByType.length ? <Box className={listType === 1 ? classes.productThumbDiv : classes.productDetailsDiv} sx={{height : '470px',}}>
                                    {
                                        listType === 1 && filterListByType.map((product, index) => {
                                            return (
                                                <Box className={classes.productItem}  key={index} onClick={() => setCurrentProduct(index)}>
                                                    {/* <video src={product.sols[0].type === '*' ? product.sols[0].url : product.sols[0].path } 
                                                    className={index === currentProduct ? classes.productThumbActive : classes.productThumb}
                                                    /> */}
                                                    <Box className={classes.hoveringDiv}>
                                                        {
                                                            getFileCategory(product.sols[0]?.type) === 'video' ?  <VideoToCanvas
                                                                videoInfo = {{
                                                                    videoUrl : product.sols[0]?.path,
                                                                    videoId : product.sols[0]?.id+"first"
                                                                }}

                                                                width={170}
                                                                height={140}

                                                                selected={index === currentProduct}
                                                                normalColor={theme.palette.green.A200}
                                                                selectedColor={'rgb(173 86 161 / 89%)'}
                                                                /> 
                                                            : getFileCategory(product.sols[0]?.type)  === 'image' ? <ImageToCanvas
                                                                    imageInfo = {{
                                                                        imageUrl : product.sols[0]?.path,
                                                                        imageId : product.sols[0]?.id+"first"
                                                                    }}

                                                                    width={170}
                                                                    height={140}

                                                                    selected={index === currentProduct}
                                                                    normalColor={theme.palette.green.A200}
                                                                    selectedColor={'rgb(173 86 161 / 89%)'}
                                                            /> 
                                                            : new String("application/pdf,application/doc,application/docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document").search(product.sols[0]?.type) >= 0  ? 
                                                                <Box className={classes.itemDiv} sx={{border : index === currentProduct && '3px solid #ad56a1e3 !important'}}>
                                                                    <img src={EbookImage} width={100} height={100} />
                                                                </Box>
                                                            : <></> 
                                                        }
                                                       
                                                    </Box>
                                                    <Box className={classes.productItemLabel}>
                                                        { product?.name || product?.master_piece }
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    }
                                    {
                                        listType === 2 && filterListByType.map((product, index) => {
                                            return (
                                                <DetailListItem
                                                    key={index}
                                                    masterPiece = {product?.name || product?.master_piece}
                                                    productSelected={currentProduct === index}
                                                    productIndex={index}
                                                    solIndex={currentSol}
                                                    sols={product.sols}
                                                    handleCurrentProduct={setCurrentProduct}
                                                    handleCurrentSol={setCurrentSol}
                                                />
                                            )
                                        })
                                    }
                                </Box>
                                : <Box className={classes.emptyDiv}>
                                    <Box><img src={EmptyCartImage} width={60} /></Box>
                                    <Box>Nothing Products</Box>
                                </Box>
                            )
                        }
                        <Box className={classes.blueBlur} />
                    </Grid>
                    {
                        !match1175 && <Grid item xs={ match1175 ? 6 : 12} sx={{height : match1175 ? '100%' : 'auto',  display : 'flex', flexDirection : 'column !important', justifyContent : 'space-around', pt:'30px', pb : '20px', borderTop : '1px solid lightgray', ml : '20px', mr : '20px'}}>
                            <Box>
                                <Box className={classes.slashDiv}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Box >// Host ID: <br/>{hostId}</Box>
                                        </Grid>
                                        <Grid item xs={6}>// Joined: <br/> {joinedDate}</Grid>
                                    </Grid>
                                </Box>
                                <Box className={classes.slashDiv}>
                                    <Grid container>
                                        <Grid item xs={6} >// {filterListByType?.[currentProduct]?.name || filterListByType?.[currentProduct]?.master_piece} : <br/>{filterListByType?.[currentProduct]?.sols[currentSol]?.name}</Grid>
                                        <Grid item xs={6}>// Release Date: <br/>
                                            {
                                                filterListByType?.[currentProduct]?.price_type === 'free' && <>
                                                    { filterListByType?.[currentProduct]?.release_date }
                                                </>
                                            }
                                            {
                                                filterListByType?.[currentProduct]?.price_type === 'bundle' && <>
                                                    { filterListByType?.[currentProduct]?.release_date }
                                                </>
                                            }
                                            {
                                                filterListByType?.[currentProduct]?.price_id === 1 && <>
                                                    {filterListByType?.[currentProduct]?.created_at.toDate().toLocaleDateString()}
                                                </>
                                            }
                                            {
                                                filterListByType?.[currentProduct]?.price_id === 2 && <>
                                                    {filterListByType?.[currentProduct]?.created_at.toDate().toLocaleDateString()}
                                                </>
                                            }
                                            {
                                                !filterListByType?.[currentProduct]?.price_id && "Unknown"
                                            }
                                        </Grid>
                                    </Grid>
                                </Box>        
                            </Box>
                        </Grid>
                    }
                    <Grid item xs={match1175 ? 6 : 12} sx={{overflowX : 'hidden', display : 'flex', flexDirection : 'column', justifyContent : 'space-between', }}>
                        <Box className={classes.productItemDescription}>
                            { loadingProductsList ? `. . . Loading [ ${ currentProductType } ] Sols` : filterListByType?.[currentProduct]?.name }
                        </Box>
                        <Box className={classes.swiperDiv}>
                            {
                                !loadingProductsList ? 
                                (
                                    filterListByType?.[currentProduct] ? <Box >
                                        <Swiper
                                            effect={"coverflow"}
                                            grabCursor={true}
                                            centeredSlides={true}
                                            slidesPerView={"auto"}
                                            coverflowEffect={{
                                                rotate: 50,
                                                stretch: 0,
                                                modifier: 1,
                                            }}
                                            modules={[EffectCoverflow, Pagination]}
                                            className="mySwiper"
                                            onSlideChange={(e) => setCurrentSol(e.activeIndex)}
                                            onSwiper={setSwiperCtrl}
                                            
                                        >
                                            {
                                                filterListByType?.[currentProduct]?.sols.map((sol, index) => {
                                                    return (
                                                        <SwiperSlide key={index}>
                                                            {
                                                                getFileCategory(sol?.type) === 'video' ? <VideoToCanvas

                                                                    videoInfo={{
                                                                        videoUrl : sol.path ,
                                                                        videoId : sol.id
                                                                    }}

                                                                    width={245}
                                                                    height={290}

                                                                    selected={false}
                                                                    normalColor={theme.palette.green.A200}
                                                                /> 
                                                                : getFileCategory(sol?.type) === 'image' ? <ImageToCanvas

                                                                    imageInfo={{
                                                                        imageUrl : sol.path ,
                                                                        imageId : sol.id
                                                                    }}

                                                                    width={245}
                                                                    height={290}

                                                                    selected={false}
                                                                    normalColor={theme.palette.green.A200}
                                                                />
                                                                : getFileCategory(sol.type) === 'pdf' ? <Box className={classes.slideDiv}>
                                                                        <PdfPreview
                                                                            previewUrl={sol.path}
                                                                            width={245}
                                                                            height={290}
                                                                        /> 
                                                                    </Box>
                                                                : new String("application/doc,application/docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document").search(sol.type) >=0 ?<Box className={classes.slideDiv} >
                                                                        <DocxPreview
                                                                            previewUrl={sol.path}
                                                                            width={241}
                                                                            height={286}
                                                                            key={uuidv4()}
                                                                            activeIndex={index}
                                                                            selfIndex={currentSol}
                                                                        />
                                                                    </Box>
                                                                : <></>
                                                            }
                                                        </SwiperSlide>
                                                    )
                                                })
                                            }
                                        </Swiper>
                                    </Box> : 
                                    <Box className={classes.emptyDiv}>
                                        <Box><img src={EmptyTrashImage} width={60} /></Box>
                                        <Box>Nothing sols</Box>
                                    </Box>
                                )
                                : <Box sx={{width : '100%', height : '100%', display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
                                      <Loading type='three_dots' width={50} height={50} fill='#43D9AD' />
                                </Box>
                            }
                        </Box>
                        <Box sx={{display : 'flex', justifyContent : 'center', marginTop : '20px'}}>
                            <Box className={classes.productFeatureDiv}>
                                Featuring&nbsp;
                                <Box className={classes.featureHighlight}>@{accountName || "Account name"}&nbsp;</Box>
                                <Box className={classes.featureHighlight} sx={{textTransform : 'capitalize', color : theme.palette.green.A200}}>
                                    @{getPriceType(filterListByType?.[currentProduct]?.price_id) || filterListByType?.[currentProduct]?.price_type || "Typedef" }&nbsp;
                                </Box>
                                <Box className={classes.featureHighlight}>@{fullName || 'Full name'}&nbsp;</Box>
                            </Box>
                        </Box>
                        <Box className={classes.buttonGroup}>
                            <BuyProduct 
                                productInfo={filterListByType?.[currentProduct]}
                            />
                            {
                                typeof filterListByType?.[currentProduct] !== "undefined" && <Button variant={'contained'} className={classes.productButtonCss} sx={{mb : '10px'}}>Product Page</Button>
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <MessageModal 
                title={'Please connect your SOLSTICE account'}
                type={'info'}
                message={'By connecting link to your SOLSTICE account, you can purchase NFTs.'}

                open={openMessageModal}
                handleClose={handleCloseMessageModal}
            />
        </Box>
    )
}
ProfileLinkScreen.propTypes = {
    LoadingProductsListByLink : PropTypes.func.isRequired,
    UserAllNFTsByLink : PropTypes.func.isRequired,
    ConnectLinkToAccount: PropTypes.func.isRequired,
    UserAllProductsByLink : PropTypes.func.isRequired
}
const mapStateToProps  = state => ({
    fullName : state.link.fullName,
    accountName : state.link.accountName,
    joinedDate : state.link.joinedDate,
    profilePictureUrl : state.link.profilePictureUrl,
    hostId : state.link.hostId,
    profileMessage : state.link.profileMessage,
    loadingProductsList : state.link.loadingProductsList,
    nftsListByLink : state.link.nftsListByLink,
    productsListByLink : state.link.productsListByLink,
    link : state.link,

    web3Provider : state.wallet.web3Provider
}) ;
const mapDispatchToProps = {
    LoadingProductsListByLink,
    UserAllNFTsByLink,
    UserAllProductsByLink,
    ConnectLinkToAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLinkScreen) ;
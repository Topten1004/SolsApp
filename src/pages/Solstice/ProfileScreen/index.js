import * as React from 'react' ;

import { useWalletInfo } from '../../../contexts/WalletContext' ;
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SaveNewMessage, LoadingProductsList, UserAllNFTs, UserAllProducts } from '../../../redux/actions/profile';

import { getPriceType,getProductId, getFileCategory } from '../../../utils/Helper';

import ProfilePhotoModal from '../../../components/Solstice/ProfileScreen/ProfilePhotoModal.js';
import DetailListItem from '../../../components/Solstice/ProfileScreen/DetailListItem.js';

import Loading from 'react-loading-components' ;

import EmptyTrashImage from '../../../assets/profile/EmptyTrash.png';
import EmptyCartImage from '../../../assets/profile/EmptyCart.png';
import LockImage from '../../../assets/profile/Lock.png';
import EbookImage from '../../../assets/common/Ebook.png' ;
import DownloadImage from '../../../assets/common/Download.png' ;


import SaveIcon from '@mui/icons-material/Save';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import SettingBox from '../../../components/Solstice/ProfileScreen/SettingBox.js';
import VideoToCanvas from '../../../components/Common/VideoToCanvas';
import ImageToCanvas from '../../../components/Common/ImageToCanvas';
import PdfPreview from '../../../components/Common/PdfPreview';
import DocxPreview from '../../../components/Common/DocxPreview';

import { v4 as uuidv4 } from 'uuid';
import FileSaver from 'file-saver';

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { EffectCoverflow, Pagination } from "swiper";

import 'swiper/swiper.min.css';
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/thumbs/thumbs.min.css';

import {
    Box,
    Grid,
    Button,
    TextField,
    Tooltip,
    useMediaQuery
} from '@mui/material';

import { useTheme } from '@mui/styles';
import { useStyles } from './StylesDiv/index.styles' ;

const ProfileScreen = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;
    
    const match1175 = useMediaQuery('(min-width : 1175px)') ;
    const match1445 = useMediaQuery('(min-width : 1445px)') ;

    const {
        web3Provider,

        accountName,
        fullName,
        profilePictureUrl,
        joinedDate,
        hostId,
        profileMessage,
        loadingProductsList,
        nftsList,
        productsList,

        SaveNewMessage,
        LoadingProductsList,
        UserAllNFTs,
        UserAllProducts
    } = props;

    const {
        isConnected
    } = useWalletInfo() ;

    const [swiperCtrl, setSwiperCtrl] = React.useState(null) ;
    const [openProfilePhotoModal, setOpenProfilePhotoModal] = React.useState(false) ;
    const [currentProduct, setCurrentProduct] = React.useState(0);
    const [currentSol, setCurrentSol] = React.useState(0) ;
    const [currentProductType, setCurrentProductType] = React.useState(null) ;
    const [newMessage, setNewMessage] = React.useState('') ;
    const [listType, setListType] = React.useState(1) ;
    const [filterList, setFilterList] = React.useState(null) ;
    
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

    const handleDownloadSol = (url, name) => {
        try {
            console.log(url, name) ;
            FileSaver.saveAs(url, name) ;
        } catch(err) {
            console.log(err) ;
            return false ;
        }
    }

    React.useEffect(() => {
        setNewMessage(profileMessage) ;
    }, [profileMessage]);

    React.useEffect(() => {
        swiperCtrl?.slideTo(currentSol) ;
    }, [currentSol]) ;

    React.useEffect(async () => {
        await LoadingProductsList(true) ;
        if(isConnected) await UserAllNFTs(web3Provider) ;
        await UserAllProducts() ;
        await LoadingProductsList(false) ;
    },[]) ;

    React.useEffect(async () => {
        let temp0 = [...nftsList.filter(nft => nft.product_id === getProductId(currentProductType))] ;
        let temp1 = [...productsList.filter(product => product.product_type === currentProductType)] ;
        
        temp0 = temp0.concat(temp1);

        setFilterList(temp0) ;
    }, [nftsList, currentProductType, productsList]) ;

    return (
        <Box className={classes.root}>
            <Grid container className={classes.container} >
                <Box className={classes.rectBackground} />
                <Grid container>
                    {
                        !match1175 && <Grid item xs={ match1175 ? 6 : 12} sx={{height : match1175 ? '100%' : 'auto',  display : 'flex', flexDirection : 'column !important', justifyContent : 'space-around', pt:'30px', pb : '20px'}}>
                            <Box className={classes.messageDiv} sx={{marginLeft : '10px', marginRight:'10px', marginBottom : '10px'}}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={7}
                                    placeholder="Hello, there.
                                    . 
                                    . 
                                    .  
                                    ...... You can leave message here."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                    <Tooltip title={!newMessage === profileMessage ? 'Save New Message' : 'Profile Message'}>
                                        <Box className={classes.messageIconCss} onClick={() => SaveNewMessage(newMessage)}>
                                            {
                                                newMessage === profileMessage ? <DoneAllIcon sx={{color : 'lightgreen', fontSize : '25px', cursor : 'pointer'}}/>
                                                :<SaveIcon sx={{color : "lightgreen", fontSize : '30px', cursor : 'pointer'}}/>
                                            }
                                        </Box>
                                    </Tooltip>

                            </Box>
                        </Grid>
                    }
                    <Grid item xs={ match1175 ?  6 : 11.9 } sx={{position : 'relative', height : match1175 ? '100%' : 'auto',display : 'flex', flexDirection : 'column !important', justifyContent : 'space-between'}}>
                        <SettingBox 
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
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={7}
                                    placeholder="Hello, there.
                                    . 
                                    . 
                                    .  
                                    ...... You can leave message here."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <Tooltip title={!newMessage === profileMessage ? 'Save New Message' : 'Profile Message'}>
                                    <Box className={classes.messageIconCss} onClick={() => SaveNewMessage(newMessage)}>
                                        {
                                            newMessage === profileMessage ? <DoneAllIcon sx={{color : 'lightgreen', fontSize : '25px', cursor : 'pointer'}}/>
                                            :<SaveIcon sx={{color : "lightgreen", fontSize : '30px', cursor : 'pointer'}}/>
                                        }
                                    </Box>
                                </Tooltip>

                            </Box>
                            <Box className={classes.slashDiv} sx={{marginLeft : '35px',}}>
                                <Grid container spacing={0.5}>
                                    <Grid item xs={match1445 ? 6 : 12}>
                                        <Box >// Host ID : {hostId} </Box>
                                    </Grid>
                                    <Grid item xs={match1445 ? 6 : 12}>
                                        <Box>// Joined : {joinedDate}</Box>
                                    </Grid>
                                    <Grid item xs={match1445 ? 6 : 12}>
                                        <Box>// Released : 
                                        {filterList?.[currentProduct]?.created_at?.toDate().toLocaleDateString()}</Box>
                                    </Grid>
                                    <Grid item xs={match1445 ? 6 : 12} >
                                        <Box>
                                            // {filterList?.[currentProduct]?.name || filterList?.[currentProduct]?.master_piece || "Name "} : 
                                            {filterList?.[currentProduct]?.sols[currentSol]?.name || "Unknown"}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    }
                </Grid>
                <Grid container>
                    <Grid item xs={match1175 ? 6 : 12} sx={{position :'relative',height : '500px', display : 'flex', alignItems : 'center', justifyContent : 'center', borderRight : (loadingProductsList || !filterList?.length) && '1px solid lightgray'}}>
                        {
                            (loadingProductsList || !filterList) ? 
                            (
                                listType === 1 ? <Loading type='grid' width={50} height={50} fill='#43D9AD' />
                                : <Loading type='ball_triangle' width={50} height={50} fill='#43D9AD' />
                            )
                            : (

                                filterList.length ? <Box className={listType === 1 ? classes.productThumbDiv : classes.productDetailsDiv} sx={{height : '470px',}}>
                                    {
                                        listType === 1 && filterList.map((product, index) => {
                                            return (
                                                <Box className={classes.productItem} key={index} >
                                                    <Box className={classes.hoveringDiv} onClick={() => setCurrentProduct(index)}>
                                                        {
                                                            ( product?.price_type === 'bundle' && product?.isBuyer && !product?.isPaid ) ? 
                                                            <>
                                                                {
                                                                    getFileCategory(product.sols[0]?.type) === 'video' &&
                                                                        <VideoToCanvas
                                                                            videoInfo = {{
                                                                                videoUrl : product.sols[0]?.path,
                                                                                videoId : product.sols[0]?.id+"first"
                                                                            }}

                                                                            width={164}
                                                                            height={125}

                                                                            selected={index === currentProduct}
                                                                            normalColor={'#ffffff00'}
                                                                            selectedColor={theme.palette.green.A200}
                                                                            backgroundColor={'linear-gradient(135deg, #e52d65 0%, #629df6 53.09%, #3c1d9d 100%) !important'}
                                                                        />
                                                                }
                                                                {
                                                                    getFileCategory(product.sols[0]?.type) === 'image' &&   <ImageToCanvas
                                                                        imageInfo={{
                                                                            imageUrl : product.sols[0]?.path ,
                                                                            imageId : product.sols[0]?.id+"first"
                                                                        }}

                                                                        width={164}
                                                                        height={125}

                                                                    
                                                                        selected={false}
                                                                        normalColor={theme.palette.green.A200}
                                                                        selectedColor={theme.palette.green.A200}
                                                                    />

                                                                }
                                                                {
                                                                     new String("application/pdf,application/doc,application/docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document").search(product.sols[0]?.type) >= 0  && 
                                                                     <Box className={index === currentProduct ? classes.productThumbActive : classes.productThumb}>
                                                                         <img src={EbookImage} width={64} height={64} />
                                                                     </Box>

                                                                }
                                                                <Box className={classes.lockDiv}>
                                                                    <img src={LockImage} width={30} />
                                                                </Box>
                                                            </>
                                                            : (
                                                                getFileCategory(product.sols[0]?.type) === 'video' ? <video src={product.sols[0]?.path} className={index === currentProduct ? classes.productThumbActive : classes.productThumb}/>
                                                                : getFileCategory(product.sols[0]?.type) === 'image' ? <Box className={index === currentProduct ? classes.productThumbActive : classes.productThumb}>
                                                                    <img src={product.sols[0]?.path} 
                                                                        width={162}
                                                                        height={122}
                                                                    />
                                                                </Box>
                                                                : new String("application/pdf,application/doc,application/docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document").search(product.sols[0]?.type) >= 0  ? 
                                                                    <Box className={index === currentProduct ? classes.productThumbActive : classes.productThumb}>
                                                                        <img src={EbookImage} width={64} height={64} />
                                                                    </Box>
                                                                : <></> 
                                                            )
                                                        }
                                                    </Box>
                                                    <Box className={classes.productItemLabel}>
                                                        { product.name || product.master_piece}
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    }
                                    {
                                        listType === 2 && filterList.map((product, index) => {
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
                                :  <Box className={classes.emptyDiv}>
                                    <Box><img src={EmptyCartImage} width={60} /></Box>
                                    <Box>Nothing Products</Box>
                                </Box>
                            )
                        }
                        <Box className={classes.blueBlur} />
                    </Grid>
                    {
                        !match1175 && <Grid item xs={ match1175 ? 6 : 12} sx={{height : match1175 ? '100%' : 'auto',  display : 'flex', flexDirection : 'column !important', justifyContent : 'space-around', pt:'30px', pb : '20px', borderTop : '1px solid lightgray'}}>
                            <Box className={classes.slashDiv}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Box >// Host ID : {hostId} </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box>// Joined : {joinedDate}</Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box>// Released : 
                                        {filterList?.[currentProduct]?.created_at?.toDate().toLocaleDateString()}</Box>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Box>
                                            // {filterList?.[currentProduct]?.name || filterList?.[currentProduct]?.master_piece || "Name "} : 
                                            {filterList?.[currentProduct]?.sols[currentSol]?.name || "Unknown"}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    }
                    <Grid item xs={match1175 ? 6 : 12} sx={{overflowX : 'hidden', display : 'flex', flexDirection : 'column', justifyContent : 'space-between', height : '500px', }}>
                        <Box className={classes.productItemDescription}>
                            { ( loadingProductsList && filterList?.length ) ? `. . . Loading < ${ currentProductType } > Sols` : filterList?.[currentProduct]?.master_piece }
                        </Box>
                        <Box className={classes.swiperDiv} >
                            {
                                !loadingProductsList ? 
                                (
                                    filterList?.[currentProduct] ? <Box sx={{position : 'absolute'}}>
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
                                                filterList?.[currentProduct]?.sols.map((sol, index) => {
                                                    return (
                                                        <SwiperSlide key={index}>
                                                            {
                                                                filterList?.[currentProduct].price_type === 'bundle' 
                                                                && filterList?.[currentProduct].isBuyer
                                                                && !filterList?.[currentProduct].isPaid 
                                                                ? (
                                                                    getFileCategory(sol.type) ===  'video' ? <VideoToCanvas
                                                                        videoInfo={{
                                                                            videoUrl : sol.path ,
                                                                            videoId : sol.id
                                                                        }}

                                                                        width={245}
                                                                        height={290}

                                                                    
                                                                        selected={false}
                                                                        normalColor={theme.palette.green.A200}
                                                                        selectedColor={theme.palette.green.A200}
                                                                    />
                                                                    : getFileCategory(sol.type) === 'image' ? <ImageToCanvas
                                                                        imageInfo={{
                                                                            imageUrl : sol.path ,
                                                                            imageId : sol.id
                                                                        }}

                                                                        width={245}
                                                                        height={290}

                                                                    
                                                                        selected={false}
                                                                        normalColor={theme.palette.green.A200}
                                                                        selectedColor={theme.palette.green.A200}
                                                                    /> 
                                                                    : getFileCategory(sol.type) === 'pdf' ? <Box className={classes.slideDiv}>
                                                                            <PdfPreview
                                                                                previewUrl={sol.path}
                                                                                width={246}
                                                                                height={296}
                                                                            /> 
                                                                        </Box>
                                                                    : new String("application/doc,application/docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document").search(sol.type) >=0 ?<Box className={classes.slideDiv} >
                                                                            <DocxPreview
                                                                                previewUrl={sol.path}
                                                                                width={246}
                                                                                height={296}
                                                                                key={uuidv4()}
                                                                                activeIndex={index}
                                                                                selfIndex={currentSol}
                                                                            />
                                                                        </Box>
                                                                    : <></>
                                                                )
                                                                : (
                                                                    getFileCategory(sol.type) === 'video' ? <video src={sol.path} controls/>
                                                                    : getFileCategory(sol.type) === 'image' ? <Box className={classes.slideDiv}>
                                                                        <img src={sol.path} width={'100%'} height={'100%'} />
                                                                    </Box>
                                                                    : getFileCategory(sol.type) === 'pdf' ? <Box className={classes.slideDiv}>
                                                                        <PdfPreview
                                                                            previewUrl={sol.path}
                                                                            width={246}
                                                                            height={296}
                                                                        /> 
                                                                        <Tooltip title={"Download " + sol.name}>
                                                                            <Box className={classes.downloadDiv} onClick={() => handleDownloadSol(sol.path, sol.name+".pdf")}>
                                                                                <img src={DownloadImage} width={40} height={40} />
                                                                            </Box>
                                                                        </Tooltip>
                                                                    </Box>
                                                                    : new String("application/doc,application/docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document").search(sol.type) >=0 ?<Box className={classes.slideDiv} >
                                                                        <DocxPreview
                                                                            previewUrl={sol.path}
                                                                            width={246}
                                                                            height={296}
                                                                            key={uuidv4()}
                                                                            activeIndex={index}
                                                                            selfIndex={currentSol}
                                                                        />
                                                                        <Tooltip title={"Download " + sol.name}>
                                                                            <Box className={classes.downloadDiv} onClick={() => handleDownloadSol(sol.path, sol.name+".docx")}>
                                                                                <img src={DownloadImage} width={40} height={40} />
                                                                            </Box>
                                                                        </Tooltip>
                                                                    </Box>
                                                                    : <></>

                                                                )
                                                            }
                                                        </SwiperSlide>
                                                    )
                                                })
                                            }
                                        </Swiper>
                                    </Box> : 
                                    <Box className={classes.emptyDiv}>
                                        <Box><img src={EmptyTrashImage} width={40} /></Box>
                                        <Box>Nothing Sols</Box>
                                    </Box>
                                )
                                : <Box>
                                      <Loading type='three_dots' width={50} height={50} fill='#43D9AD' />
                                </Box>
                            }
                        </Box>
                        <Box sx={{display : 'flex', justifyContent : 'center', marginTop : '20px'}}>
                            <Box className={classes.productFeatureDiv}>
                                Featuring&nbsp;
                                <Box className={classes.featureHighlight}>@{accountName || "Account name"}&nbsp;</Box>
                                <Box className={classes.featureHighlight} sx={{textTransform : 'capitalize'}}>
                                    @{getPriceType(filterList?.[currentProduct]?.price_id) || filterList?.[currentProduct]?.price_type ||  "Typedef"}&nbsp;
                                </Box>
                                <Box className={classes.featureHighlight}>
                                    @{fullName || 'Full name'}&nbsp;
                                </Box>
                            </Box>
                        </Box>
                        <Box className={classes.buttonGroup}>
                            {/* <Button variant={'contained'} className={classes.buyButtonCss} sx={{mb : '10px', width: width > 303 ? '300px' : 'auto'}}>Buy for $4.51</Button> */}
                            <Button variant={'contained'} className={classes.productButtonCss} sx={{mb : '10px'}}>Product Page</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <ProfilePhotoModal
                open={openProfilePhotoModal}
                handleClose={handleCloseProfilePhotoModal}

                photoUrl={profilePictureUrl}
            />
            {/* <ImageEditorModal
                open={openImageEditorModal}
                handleClose={handleCloseImageEditorModal}

                path={profilePictureUrl}
            /> */}
        </Box>
    )
}
ProfileScreen.propTypes = {
    SaveNewMessage : PropTypes.func.isRequired,
    LoadingProductsList : PropTypes.func.isRequired,
    UserAllNFTs : PropTypes.func.isRequired,
    UserAllProducts : PropTypes.func.isRequired
}

const mapStateToProps  = state => ({
    web3Provider : state.wallet.web3Provider,

    fullName : state.profile.fullName,
    accountName : state.profile.accountName,
    joinedDate : state.profile.joinedDate,
    profilePictureUrl : state.profile.profilePictureUrl,
    hostId : state.profile.hostId,
    profileMessage : state.profile.profileMessage,
    loadingProductsList : state.profile.loadingProductsList,
    nftsList : state.profile.nftsList,
    productsList : state.profile.productsList
}) ;

const mapDispatchToProps = {
    SaveNewMessage,
    LoadingProductsList,
    UserAllNFTs,
    UserAllProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen) ;
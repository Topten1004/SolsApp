import React,{ useEffect, useState, useRef} from 'react' ;

import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserAccountInfo } from '../../../redux/actions/profile';
import { UploadFinalLegendary, UploadFinalRare, UploadFinalBundle, UploadFinalFree, UploadLoading, MintLegendaryNFT, MintRareNFT } from '../../../redux/actions/upload';
import  { UserAllNFTs, LoadingProductsList } from '../../../redux/actions/profile' ;

import { getYoutubeId, isYoutubeUrl, fileNameFormat, getUnit, getCookie, getUuid, getFileCategory, getFileExtension } from '../../../utils/Helper';

import YouTube from 'react-youtube';
import Loading from 'react-loading-components';
import { ProgressBar } from "react-progressbar-fancy";
import StepperControl from '../../../components/Solstice/UploadScreen/StepperControl.js';
import PdfPreview from '../../../components/Common/PdfPreview';
import DocxPreview from '../../../components/Common/DocxPreview' ;
import SwipeableViews from 'react-swipeable-views';

import { v4 as uuidv4 } from 'uuid' ;

import Avatar1Image from '../../../assets/minting/1.png';
import Avatar2Image from '../../../assets/minting/2.png';
import Avatar3Image from '../../../assets/minting/3.png';

import {  toast } from 'react-toastify/dist/react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { EffectCube, Pagination } from "swiper";
import 'swiper/swiper.min.css';
import 'swiper/modules/effect-cube/effect-cube.min.css' ;

import {
    Box,
    Grid,
    Tabs,
    Tab,
    Tooltip,
    useMediaQuery
} from '@mui/material';

import { useStyles } from './StylesDiv/UploadCheckOut.styles' ;
import { useTheme } from '@mui/material';

const UploadCheckOut = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;
    
    const match980 = useMediaQuery('(min-width : 980px)') ;
    const match930 = useMediaQuery('(min-width : 930px)') ;
    const match760 = useMediaQuery('(min-width : 760px)') ;
    const match420 = useMediaQuery('(min-width : 420px)') ;

    const {
        handleChangeUploadStep,
        UserAccountInfo,

        UploadFinalLegendary,
        UploadFinalRare,
        UploadFinalBundle,
        UploadFinalFree,
        UploadLoading,

        MintLegendaryNFT,
        MintRareNFT,

        LoadingProductsList,
        UserAllNFTs,

        hostId,
        joinedDate,
        
        masterPiece,
        solsResellTick,
        solsFilesForUpload,
        externalLinksForUpload,
        solsPriceType,
        solsProductType,
        solsProductDescription,
    
        legendaryProductPrice,
        legendaryResellPrice,
        legendaryPriceUnit,
        legendaryResellUnit,
        legendaryResellCount,
        legendaryRoyaltyFee,
        legendaryPaymentAccount,
    
        rareBiddingPrice,
        rareBiddingUnit,
        rareAvailableItems,
        rareRoyaltyFee ,
        rarePaymentAccount ,
        rareListingTime,
        rareUnlimited,

        bundleSubscriptionPrice,
        bundlePriceUnit,
        bundleReleaseDate,
    
        freeSubscriptionPrice,
        freePriceUnit,
        freeReleaseDate,

        uploadedProduct,
        uploadedCount,
        totalProgress,

        uploadLoading,

        upload,

        web3Provider
    } = props;

    const navigate = useNavigate() ;

    const [curSolsIndex, setCurSolsIndex] = useState(0);
    const [activeStep, setActiveStep] = useState(3) ;
    // const [active, setActive] = useState(false) ;

    // const [value, setValue] = useState(0);

    // const a11yProps = (index) => {
    //     return {
    //         id: `full-width-tab-${index}`,
    //         'aria-controls': `full-width-tabpanel-${index}`,
    //     };
    // }
  
    // const TabPanel = (props) => {
    //     const { children, value, index, ...other } = props;
    
    //     return (
    //         <div
    //             role="tabpanel"
    //             hidden={value !== index}
    //             id={`full-width-tabpanel-${index}`}
    //             aria-labelledby={`full-width-tab-${index}`}
    //             {...other}
    //         >
    //         {
    //             value === index && (
    //                 <Box sx={{ p: match420 ? 3 : '10px' }}>
    //                     {children}
    //                 </Box>
    //             )
    //         }
    //         </div>
    //     );
    // }

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    // const handleChangeIndex = (index) => {
    //     setValue(index);
    // };

    const handleBack = () => {
        if(solsPriceType === "legendary") handleChangeUploadStep('legendary-price') ;
        if(solsPriceType === "rare") handleChangeUploadStep('rare-price') ;
        if(solsPriceType === "bundle") handleChangeUploadStep('bundle-price') ;
        if(solsPriceType === "free") handleChangeUploadStep('free-price') ;
    }
    
    const handleContinue = async () => {
        setActiveStep(4) ;

        UploadLoading(true) ;

        if(solsPriceType === "legendary") {
            if(!await UploadFinalLegendary(
                masterPiece ,
                solsResellTick ,

                solsFilesForUpload ,
                externalLinksForUpload ,
                solsPriceType ,
                solsProductType ,
                solsProductDescription,

                legendaryProductPrice ,
                legendaryResellPrice ,
                legendaryPriceUnit ,
                legendaryResellUnit ,
                legendaryResellCount ,
                legendaryRoyaltyFee ,
                legendaryPaymentAccount,
            )) {
                UploadLoading(false) ;
            }
        }
        if(solsPriceType === 'rare') {
            if(!await UploadFinalRare(
                masterPiece ,
                solsResellTick ,

                solsFilesForUpload ,
                externalLinksForUpload ,
                solsPriceType ,
                solsProductType ,
                solsProductDescription,

                rareBiddingPrice ,
                rareBiddingUnit,
                rareAvailableItems ,
                rareRoyaltyFee ,
                rarePaymentAccount ,
                rareListingTime ,
                rareUnlimited ,
            )) {
                UploadLoading(false) ;
            } 
        }
        if(solsPriceType === 'bundle') {
            if(!await UploadFinalBundle(
                web3Provider,
                
                masterPiece ,
                solsResellTick ,

                solsFilesForUpload ,
                externalLinksForUpload ,
                solsPriceType ,
                solsProductType ,
                solsProductDescription,

                bundleSubscriptionPrice,
                bundlePriceUnit,
                bundleReleaseDate
            )) {
                UploadLoading(false) ;
            }
        }

        if(solsPriceType === 'free') {
            if(!await UploadFinalFree(
                web3Provider,

                masterPiece ,
                solsResellTick ,

                solsFilesForUpload ,
                externalLinksForUpload ,
                solsPriceType ,
                solsProductType ,
                solsProductDescription,

                freeSubscriptionPrice,
                freePriceUnit,
                freeReleaseDate
            )) {
                UploadLoading(false) ;
            }
        }
    }

    useEffect(async () => {
        if(uploadedCount === (solsFilesForUpload.length + externalLinksForUpload.length) && uploadedCount != 0) {
            UploadLoading(false) ;
            if(solsPriceType === 'free' && solsPriceType === 'bundle') {
                swal({
                    title: 'Upload Successfully!',
                    text: 'Products upload is successful',
                    buttons: false,
                    timer : 3000,
                    icon : 'info'
                });
            }
            if(solsPriceType === 'legendary' && solsPriceType === 'rare') {
                swal({
                    title: 'Upload Successfully!',
                    text: 'You can mint NFT',
                    buttons: false,
                    timer : 3000,
                    icon : 'info'
                });
            }

            navigate('/solstice/profile-screen') ;

            if(solsPriceType === 'legendary'){
                const id = toast.loading("Mint Legendary Tx is pending...");

                if(
                    await MintLegendaryNFT(
                        web3Provider, 
                        solsProductType, 
                        legendaryProductPrice, 
                        legendaryPriceUnit, 
                        legendaryResellPrice, 
                        legendaryResellUnit, 
                        legendaryResellCount, 
                        legendaryRoyaltyFee, 
                        masterPiece, 
                        solsProductDescription, 
                        uploadedProduct
                    )
                ) {
                    toast.update(id, { render: "Mint Legendary Tx is successful", type: "success", autoClose: 5000, isLoading: false });

                    await LoadingProductsList(true) ;
                    await UserAllNFTs(web3Provider) ;
                    await LoadingProductsList(false) ;

                } else {
                    toast.update(id, { render: "Mint Legendary Tx is failed", type: "error", autoClose: 5000, isLoading: false });
                }
            }
            if(solsPriceType === 'rare'){
                const id = toast.loading("Mint Rare Tx is pending...");

                if(
                    await MintRareNFT(
                        web3Provider, 
                        solsProductType, 
                        rareBiddingPrice, 
                        rareBiddingUnit, 
                        rareAvailableItems, 
                        rareRoyaltyFee, 
                        masterPiece, 
                        solsProductDescription, 
                        uploadedProduct
                    )
                ){
                    toast.update(id, { render: "Mint Rare Tx is successful", type: "success", autoClose: 5000, isLoading: false });

                    await LoadingProductsList(true) ;
                    await UserAllNFTs(web3Provider) ;
                    await LoadingProductsList(false) ;

                } else {
                    toast.update(id, { render: "Mint Rare Tx is failed", type: "error", autoClose: 5000, isLoading: false });
                }
            }
        }
    }, [uploadedCount]) ;

    useEffect(() => {
        UserAccountInfo(getUuid(getCookie('_SOLSTICE_AUTHUSER'))) ;
    }, []) ;

    return (
        <Box className={classes.root}>
            <Box className={classes.greenBlur} />
            <Box className={classes.blueBlur} />
            {
                uploadLoading && <Box className={classes.loadingDiv} >
                    <Box sx={{display : 'flex', flexDirection : 'column', justifyContent: 'center', alignItems : 'center', gap : '10px', width : '80%'}}>
                        <Loading type='oval' width={50} height={50} fill='#43D9AD' />
                        <Box sx={{width : '100%'}}>
                            <ProgressBar
                                className="space"
                                label={`${uploadedCount} / ${solsFilesForUpload.length + externalLinksForUpload.length}`}
                                progressColor={"green"}
                                darkTheme
                                score={totalProgress}
                            />
                        </Box>
                        <Box sx={{color : theme.palette.green.A200, fontSize : '25px', textAlign : 'center'}}>
                          While uploading product... <br/>
                          {
                              (solsPriceType === 'legendary' || solsPriceType === 'rare') && 'After uploading products, your product is minted automatically.'
                          }
                        </Box>
                    </Box>
                </Box>
            }
            <Box className={classes.pageTitleDiv}>
                Minting Press
            </Box>
            <Box className={classes.productCountDiv}>
                Total Products {`(${solsFilesForUpload.length + externalLinksForUpload.length})`}
            </Box>
        
            <Box sx={{display : 'flex',justifyContent : 'center' , mt : '50px'}}>
                <Box className={classes.productInfoCard}>
                    <Box className={classes.avatarDiv}>
                        <Box sx={{mt : match420 ? '30px' : '10px' ,color  :'white', fontSize : 25, fontWeight : 'bold'}}>
                            <Box >
                                {
                                    getFileExtension(curSolsIndex < externalLinksForUpload.length ? externalLinksForUpload[curSolsIndex]?.type : solsFilesForUpload[curSolsIndex - externalLinksForUpload.length]?.type)
                                }
                            </Box>
                            <Box >{curSolsIndex + 1}/{solsFilesForUpload.length + externalLinksForUpload.length}</Box>
                        </Box>
                        <Box sx={{mb : '20px', display : 'flex', flexWrap : 'wrap', flexDirection :'row-reverse', gap : match930 ? '20px' : '5px', transform : 'rotate(180deg)'}}>
                            <img src={Avatar1Image} width={match930 ? 60 : 40} style={{transform : 'rotate(180deg)'}} />
                            <img src={Avatar2Image} width={match930 ? 60 : 40} style={{transform : 'rotate(180deg)'}}/>
                            <img src={Avatar3Image} width={match930 ? 60 : 40} style={{transform : 'rotate(180deg)'}}/>
                        </Box>
                    </Box>
                    <Box className={classes.productInfoDiv}>
                        <Box sx={{fontSize : 25, color : 'white', fontWeight : 'bold', fontFamily : 'Montserrat'}}>
                            {masterPiece}
                        </Box>
                        <Box className={classes.slashDiv}>
                            <Grid container>
                                <Grid item xs={match980 ? 6 : 12}>
                                    <Box sx={{color : '#111615', fontWeight : 'bold', fontSize: 14}}>//HOST ID : <br/>{hostId}</Box>
                                </Grid>
                                <Grid item xs={match980 ? 6 : 12}>
                                    <Box sx={{color : '#111615', fontWeight : 'bold', fontSize: 14}}>//Released: June 2022</Box>
                                </Grid>
                                <Grid item xs={match980 ? 6 : 12}>
                                    <Box sx={{color : '#111615', fontWeight : 'bold', fontSize: 14}}>//Joined: {joinedDate}</Box>
                                </Grid>
                                <Grid item xs={match980 ? 6 : 12}>
                                    <Tooltip title={curSolsIndex < externalLinksForUpload.length ? externalLinksForUpload[curSolsIndex]?.name || "Unknown" : solsFilesForUpload[curSolsIndex - externalLinksForUpload.length]?.name || "Unknown"}>
                                        <Box sx={{color : '#111615', fontWeight : 'bold', fontSize: 14}}>
                                            // { fileNameFormat( curSolsIndex < externalLinksForUpload.length ? externalLinksForUpload[curSolsIndex]?.name : solsFilesForUpload[curSolsIndex - externalLinksForUpload.length]?.name ) }
                                        </Box>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Box>
                        <Grid container sx={{mt : '20px'}}>
                            <Grid item xs={match980 ? 7 : 12} sx={{display : 'flex', flexDirection : 'column', justifyContent : 'space-between'}}>
                                <Box sx={{color :'#43D9AD', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', fontSize : 25, fontFamily : 'Bruno Ace'}}>
                                    {solsFilesForUpload.length + externalLinksForUpload.length} SOLS
                                </Box>
                                <Box>
                                    <Box sx={{fontFamily : 'Montserrat', fontWeight : 'bold'}}>
                                        {
                                            solsPriceType === 'legendary' && `${legendaryProductPrice}${getUnit(legendaryPriceUnit)}/product x unlimited`
                                        }
                                        {
                                            solsPriceType === 'rare' && `${rareBiddingPrice}${getUnit(rareBiddingUnit)}/minimum x ${rareAvailableItems}`
                                            // ${rareUnlimited ? `unlimited` : `${months[rareListingTime?.from?.month-1]} ${rareListingTime?.from?.day} - ${months[rareListingTime?.to?.month-1]} ${rareListingTime?.to?.day}`}
                                        }
                                        {
                                            solsPriceType === 'bundle' && `${bundleSubscriptionPrice}${getUnit(bundlePriceUnit)}/subscription`
                                        }
                                        {
                                            solsPriceType === 'free' && `${freeSubscriptionPrice}${getUnit(freePriceUnit)}/subscription`
                                        }
                                    </Box>
                                    <Box sx={{fontFamily : 'Montserrat', fontWeight : 'bold'}}>
                                        {
                                            solsPriceType === 'legendary' && solsResellTick === "YES" && `${legendaryResellPrice}${getUnit(legendaryResellUnit)}/ticket x ${legendaryResellCount}`
                                        }
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={5} sx={{mt : '20px'}}>
                                <Swiper
                                    effect={"cube"}
                                    grabCursor={true}
                                    cubeEffect={{
                                    slideShadows: true,
                                    }}
                                    pagination={true}
                                    modules={[EffectCube, Pagination]}
                                    onSlideChange={(e) => setCurSolsIndex(e.activeIndex)}
                                >
                                    {
                                        externalLinksForUpload.map((item, index) => {
                                            return  <SwiperSlide key={index}>
                                                <Box sx={{position : 'relative'}}>
                                                    <Box sx={{zIndex : -100}}>
                                                        {
                                                            isYoutubeUrl(item.url) ? <YouTube videoId={getYoutubeId(item.url)} opts={{
                                                                height: 150,
                                                                width: 200,
                                                                playerVars: {
                                                                    // https://developers.google.com/youtube/player_parameters
                                                                    autoplay: 1,
                                                                }
                                                            }}/> :
                                                            <video src={item.url} width={150} height={200} style={{zIndex : -120}} controls/>
                                                        }
                                                    </Box>
                                                </Box>
                                            </SwiperSlide>
                                        })
                                    }
                                    {
                                        solsFilesForUpload.map((item, index) => {
                                            return <SwiperSlide key={index}>
                                                {
                                                    getFileCategory(item.type) === 'video' &&  <video src={item.preview} width={150} height={200} controls/>
                                                }
                                                {
                                                    getFileCategory(item.type) === 'image' && <Box sx={{display : 'flex', alignItems : 'center', justifyContent : 'center', 
                                                    width : '150px', height : '200px'}}>
                                                        <img src={item.preview} 
                                                            width={148}
                                                            height={198}
                                                            style={{borderRadius : '10px'}}
                                                        />
                                                    </Box>
                                                }
                                                {
                                                    getFileCategory(item.type) === 'pdf' && <PdfPreview
                                                        previewUrl={item.preview}
                                                        width={150}
                                                        height={200}
                                                    />
                                                }
                                                 {
                                                    getFileCategory(item.type) === 'vnd.openxmlformats-officedocument.wordprocessingml.document' && <DocxPreview
                                                        previewUrl={item.preview}
                                                        width={150}
                                                        height={200}
                                                        key={uuidv4()}
                                                        activeIndex={curSolsIndex}
                                                        selfIndex={index}
                                                    />
                                                }
                                            </SwiperSlide>
                                        })
                                    }
                                </Swiper>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
               
            <Grid container>
                <Grid item xs={12} sx={{padding : '20px'}}>
                    <StepperControl 
                        activeStep={activeStep}
                        handleBack={handleBack}
                        handleContinue={handleContinue}

                        disableContinue={false}
                        finalStep={true}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
UploadCheckOut.propTypes = {
    UserAccountInfo : PropTypes.func.isRequired,
    UploadFinalLegendary : PropTypes.func.isRequired,
    UploadFinalRare : PropTypes.func.isRequired,
    UploadFinalBundle : PropTypes.func.isRequired,
    UploadFinalFree : PropTypes.func.isRequired,
    UploadLoading : PropTypes.func.isRequired,
    MintLegendaryNFT : PropTypes.func.isRequired,
    MintRareNFT : PropTypes.func.isRequired,

    LoadingProductsList : PropTypes.func.isRequired,
    UserAllNFTs : PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    web3Provider : state.wallet.web3Provider,

    hostId : state.profile.hostId,
    joinedDate : state.profile.joinedDate,

    masterPiece : state.upload.masterPiece,
    solsResellTick : state.upload.solsResellTick,

    solsFilesForUpload : state.upload.solsFilesForUpload,
    externalLinksForUpload : state.upload.externalLinksForUpload,
    solsPriceType : state.upload.solsPriceType,
    solsProductType : state.upload.solsProductType,
    solsProductDescription : state.upload.solsProductDescription,

    legendaryProductPrice : state.upload.legendaryProductPrice,
    legendaryResellPrice : state.upload.legendaryResellPrice,
    legendaryPriceUnit : state.upload.legendaryPriceUnit,
    legendaryResellUnit : state.upload.legendaryResellUnit,
    legendaryResellCount : state.upload.legendaryResellCount,
    legendaryRoyaltyFee : state.upload.legendaryRoyaltyFee,
    legendaryPaymentAccount : state.upload.legendaryPaymentAccount,

    rareBiddingPrice : state.upload.rareBiddingPrice,
    rareBiddingUnit : state.upload.rareBiddingUnit,
    rareAvailableItems : state.upload.rareAvailableItems,
    rareRoyaltyFee : state.upload.rareRoyaltyFee,
    rarePaymentAccount : state.upload.rarePaymentAccount,
    rareListingTime : state.upload.rareListingTime,
    rareUnlimited : state.upload.rareUnlimited,

    bundleSubscriptionPrice: state.upload.bundleSubscriptionPrice,
    bundlePriceUnit : state.upload.bundlePriceUnit,
    bundleReleaseDate : state.upload.bundleReleaseDate,

    freeSubscriptionPrice : state.upload.freeSubscriptionPrice,
    freePriceUnit : state.upload.freePriceUnit,
    freeReleaseDate : state.upload.freeReleaseDate,

    uploadedProduct : state.upload.uploadedProduct,
    uploadedCount : state.upload.uploadedCount,
    totalProgress: state.upload.totalProgress,
    uploadLoading : state.upload.uploadLoading,

    upload : state.upload,
})
const mapDispatchToProps = {
    UserAccountInfo,
    UploadFinalLegendary,
    UploadFinalRare,
    UploadFinalBundle,
    UploadFinalFree,
    UploadLoading,
    MintLegendaryNFT,
    MintRareNFT,

    LoadingProductsList,
    UserAllNFTs
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadCheckOut) ;     
import React,{useRef, useEffect, useState} from 'react' ;
import { useMeasure } from 'react-use';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputUploadFiles, InputMasterPiece, InputExternalLinks, InputProductType } from '../../../redux/actions/upload';
import { UserAccountInfo } from '../../../redux/actions/profile';

import validator from 'validator';
import YouTube from 'react-youtube';
import { getYoutubeId, isYoutubeUrl, getFileCategory, removeExtension , getUuid, getCookie, fileNameFormat} from '../../../utils/Helper';

import UploadImage from '../../../assets/menu/Upload.svg';
import TickImage from '../../../assets/common/tick.png' ;
import LinkImage from '../../../assets/common/union.png' ;
import EmptyListImage from '../../../assets/upload/EmptyList.png' ;
import TickProductImage from '../../../assets/profile/TickProductType.svg';

import VideoPlayerModal from '../../../components/Solstice/UploadScreen/VideoPlayerModal.js';
import ExternalLinkModal from '../../../components/Solstice/UploadScreen/ExternalLinkModal.js';
import StepperControl from '../../../components/Solstice/UploadScreen/StepperControl.js' ;
import VideoControl from '../../../components/Solstice/UploadScreen/VideoControl.js';
import PdfPreview from '../../../components/Common/PdfPreview';
import DocxPreview from '../../../components/Common/DocxPreview';

import swal from 'sweetalert';
import { v4 as uuidv4 } from 'uuid';

// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

import {
    Box,
    Grid,
    List,
    ListItem,
    InputLabel,
    TextField,
    useMediaQuery
} from '@mui/material';

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { EffectCube, Pagination } from "swiper";

import 'swiper/swiper.min.css';
import 'swiper/modules/effect-cube/effect-cube.min.css' ;

import { useTheme } from '@mui/styles';
import { useStyles } from './StylesDiv/UploadSolsVideo.styles' ;

const UploadSolsVideo = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;

    const {
        handleChangeUploadStep,
        InputUploadFiles,
        InputProductType,
        InputMasterPiece,
        InputExternalLinks,
        UserAccountInfo,

        externalLinksForUpload,
        masterPiece,
        solsFilesForUpload,
        productTypeList,
        solsProductType
    } = props;

    const match1195 = useMediaQuery('(min-width : 1195px)') ;
    const topCtrl = useRef() ;

    const [setTopCtrl, {width, height}] = useMeasure() ;

    const acceptList = {
        "#Ebook" : 'application/pdf,application/doc,application/docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        "#Video" : 'video/*',
        "#Image" : 'image/*',
        "#Music" : 'audio/*'
    };

    const [productTitle, setProductTitle] = useState('') ;
    const [productType, setProductType] = useState(null);
    const [solsForUpload, setSolsForUpload] = useState([]) ;
    const [linksForUpload, setLinksForUpload] = useState([]) ;
    const [disableContinue, setDisableContinue] = useState(true) ;

    const [activeSol, setActiveSol] = useState(0) ;

    const [openPlayerModal, setOpenPlayerModal] = useState(false) ;
    const [openLinkModal, setOpenLinkModal] = useState(false) ;
    const [videoPreview, setVideoPreview] = useState(null) ;

    const handleChangeSwiperSlide = (e) => {
        setActiveSol(e.activeIndex) ;
    }

    const handleOpenPlayerModal = () => {
        if(activeSol < externalLinksForUpload.length) setVideoPreview(linksForUpload[activeSol].url) ;
        else setVideoPreview(solsForUpload[activeSol].preview) ;
        setOpenPlayerModal(true) ;
    }
    
    const handleClosePlayerModal = () => {
        setOpenPlayerModal(false) ;
    }

    const handleOpenLinkModal = () => {
        return swal({
            title : "Comming Soon",
            text : "We're launching soon, follow us for update...",
            icon : 'success',
            buttons : false,
            timer : 5000
        }) ;

        setOpenLinkModal(true) ;
    }

    const handleCloseLinkModal = () => {
        setOpenLinkModal(false) ;
    }
    
    const handleChangeDuration = (videoIndex, format_duration, duration, file_type) => {
        if(file_type === 'local') {
            let temp = [...solsForUpload] ;

            temp[videoIndex] = {
                ...temp[videoIndex],
                format_duration : format_duration,
                duration : duration
            };

            setSolsForUpload(temp) ;
        }
        if(file_type === 'link') {
            let temp = [...linksForUpload] ;

            temp[videoIndex] = {
                ...temp[videoIndex],
                format_duration : format_duration,
                duration : duration
            };

            setLinksForUpload(temp) ;
        }        

    }

    const handleChangeSolName = (name, videoIndex, file_type) => {
        if(file_type === 'link') {
            let temp = [...linksForUpload] ;

            temp[videoIndex] = {
                ...temp[videoIndex],
                name : name
            } ;

            setLinksForUpload(temp) ;
        }
        if(file_type === 'local') {
            let temp = [...solsForUpload] ;

            temp[videoIndex] = {
                ...temp[videoIndex],
                name : name
            } ;

            setSolsForUpload(temp) ;
        }
    } 

    const handleChangeUploadSols = async (e) => {
        let temp = [] ;
        // console.log(getFileCategory(e.target.files[0].type))
        for(let i = 0 ; i < e.target.files.length ; i++) {
            // console.log(e.target.files[i].type) ;
            temp.push({
                preview : URL.createObjectURL(e.target.files[i]),
                name : removeExtension( e.target.files[i].name ),
                raw : e.target.files[i],
                format_duration : null,
                duration : null,
                type : e.target.files[i].type,
                category : getFileCategory(e.target.files[i].type),
                size : e.target.files[i].size
            }) ;
        }

        setSolsForUpload(temp);
    }

    const handleContinue = () => {
        InputUploadFiles(solsForUpload) ;
        InputExternalLinks(linksForUpload.filter(item => item.url !== '')) ;
        InputMasterPiece(productTitle) ;
        InputProductType(productType) ;

        handleChangeUploadStep('price-config') ;
    }

    useEffect(() => {
        setTopCtrl(topCtrl.current) ;
    }, []) ;

    useEffect(() => {
    }, [height]) ;

    useEffect(() => {
        setProductTitle(masterPiece) ;
    }, [masterPiece]) ;

    useEffect(() => {
        UserAccountInfo(getUuid(getCookie('_SOLSTICE_AUTHUSER'))) ;
    }, []) ;

    useEffect(async () => {
        if(productTitle !== '' && (solsForUpload.length || linksForUpload.length ) && productType ) {
            let disableTemp = false ;
            await Promise.all(
                solsForUpload.map((item, index) => {
                    if(item.name === '') {
                        disableTemp=true;
                        return ;
                    }
                })
            );
            await Promise.all(
                linksForUpload.map((item, index) => {
                    if(item.name === '') {
                        disableTemp=true;
                        return ;
                    }
                })
            );

            setDisableContinue(disableTemp) ;
        } 
        else setDisableContinue(true) ;
    }, [productTitle, solsForUpload, linksForUpload, productType]) ;

    useEffect(() => {
        setProductType(solsProductType) ;
    }, [solsProductType]) ;
    useEffect(() => {
        setSolsForUpload(solsFilesForUpload);
    }, [solsFilesForUpload]) ;

    useEffect(() => {
        setLinksForUpload(externalLinksForUpload) ;
    }, [externalLinksForUpload]) ;

    return (
        <Box className={classes.root}>
            <Box className={classes.greenBlur} />
            <Box className={classes.blueBlur} />
            <Grid container  ref={topCtrl}>
                <Grid item xs={12} sx={{display : 'flex', justifyContent : 'flex-end', pr : '20px', pt : '20px'}}>
                    <Box sx={{color : 'white', display : 'flex', alignItems : 'center', gap : '10px'}}>Connect External Drive <img src={UploadImage} width={30}/> </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} >
                    <Box className={classes.zeroToOneDiv}>
                        Select Product
                    </Box>
                    <Box className={classes.productTypeDiv}>
                        {
                            productTypeList?.map((item, index) => {
                                return (
                                    <Box className={classes.linkItemDiv} key={index} onClick={() => setProductType(item)} 
                                        sx={{background : productType === item && '#375068'}}
                                    >
                                        {productType === item && <><img src={TickProductImage} width={20}/>&nbsp;</>}
                                        {productType === item ? item.replace('#','') : item}
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Grid>
            </Grid>
            <Grid container sx={{height : match1195 ? `calc(100vh - ${height}px - 230px)` : 'auto', mt : '20px'}}>
                <Grid item xs={match1195 ? 6 : 12} className={classes.uploadSettingDiv}>
                    <Box className={classes.selectCtrlCss}>
                        <InputLabel htmlFor="upload-sols" sx={{color : 'white', fontSize : '20px' ,fontFamily : 'Montserrat', display : 'flex',alignItems : 'center', gap : '10px'}}>
                            <Box sx={{cursor : 'pointer'}}>
                                Upload More Files
                            </Box>
                            <Box>
                                <img src={UploadImage} width={35}/>
                            </Box>
                        </InputLabel>
                        <input
                            multiple
                            accept={acceptList[productType]}
                            type="file"
                            id="upload-sols"
                            name="sel_sols"
                            style={{ display: "none" }}
                            onChange={handleChangeUploadSols}
                            disabled={productType === '#Music'}
                            onClick={() => {
                            }}
                        />
                    </Box>
                    <Box className={classes.addLinkCss} sx={{mt : '30px', cursor : 'pointer'}} onClick={handleOpenLinkModal}>
                        Add Your External link
                    </Box>
                    <Box className={classes.videoSlideDiv}>
                        {
                            solsForUpload.length || linksForUpload.length ? <>
                                <Swiper
                                    effect={"cube"}
                                    grabCursor={true}
                                    cubeEffect={{
                                    slideShadows: true,
                                    }}
                                    pagination={true}
                                    modules={[EffectCube, Pagination]}
                                    onSlideChange={handleChangeSwiperSlide}
                                >
                                    {
                                        linksForUpload.map((item, index) => {
                                            return  validator.isURL(item.url) && <SwiperSlide key={index}>
                                                <Box sx={{position : 'relative'}}>
                                                    <Box sx={{zIndex : -100}}>
                                                        {
                                                            getFileCategory(item.type) === 'video' && (
                                                                isYoutubeUrl(item.url) ? <YouTube videoId={getYoutubeId(item.url)} opts={{
                                                                    height: 248,
                                                                    width: 370,
                                                                    playerVars: {
                                                                        // https://developers.google.com/youtube/player_parameters
                                                                        autoplay: 1,
                                                                    }
                                                                }}/> :
                                                                <VideoControl
                                                                    videoIndex={index}
                                                                    videoPreview={item.url}
                                                                    handleChangeDuration={handleChangeDuration}
                                                                    fileType = {'link'}
                                                                />
                                                            )
                                                        }
                                                        
                                                        {/* <VideoControl
                                                            videoIndex={index}
                                                            videoPreview={item.preview}
                                                            handleChangeDuration={handleChangeDuration}
                                                        /> */}
                                                    </Box>
                                                </Box>
                                            </SwiperSlide>
                                        })
                                    }
                                    {
                                        solsForUpload.map((item, index) => {
                                            return <SwiperSlide key={index}
                                            >
                                                {
                                                    getFileCategory(item.type) === 'video' && (
                                                        <VideoControl
                                                            videoIndex={index}
                                                            videoPreview={item.preview}
                                                            handleChangeDuration={handleChangeDuration}
                                                            fileType = {'local'}
                                                        />
                                                    )
                                                }
                                                {
                                                    getFileCategory(item.type) === 'image' && <Box sx={{display : 'flex', alignItems : 'center', justifyContent : 'center', 
                                                    width : '270px', height : '400px'}}>
                                                        <img src={item.preview} 
                                                            width={269}
                                                            height={398}
                                                            style={{borderRadius : '10px'}}
                                                        />
                                                    </Box>
                                                }
                                                {
                                                    getFileCategory(item.type) === 'pdf' && <PdfPreview
                                                        previewUrl={item.preview}
                                                        width={270}
                                                        height={400}
                                                    />
                                                }
                                                {
                                                    getFileCategory(item.type) === 'vnd.openxmlformats-officedocument.wordprocessingml.document' && <DocxPreview
                                                        previewUrl={item.preview}
                                                        width={270}
                                                        height={400}
                                                        key={uuidv4()}
                                                        activeIndex={activeSol}
                                                        selfIndex={index}
                                                    />
                                                }
                                            </SwiperSlide>
                                        })
                                    }
                                    
                                </Swiper>
                                {/* <Box sx={{position : 'absolute', top : 'calc(50% - 15px)', left : 'calc(50% - 15px)', zIndex : 1000, cursor : 'pointer'}} onClick={() => handleOpenPlayerModal()}>
                                    <img src={PlayImage} width={40} style={{zIndex : 1200, color : 'red !important'}}/>
                                </Box> */}
                            </>
                            : <Box sx={{width : '100%', textAlign : 'center', pl:'20px', pr:'20px'}}>
                                Please, Click "Upload More Files" button to Upload Sols.
                            </Box>
                        }
                    </Box>
                </Grid>
                
                <Grid item xs={match1195 ? 6 : 12} sx={{mt : '20px'}}>
                    <Box className={classes.rightTopTitleDiv} >
                        <TextField
                            fullWidth
                            placeholder='Title your masterpiece...'
                            value={productTitle}
                            onChange={(e) => setProductTitle(e.target.value)}
                        />
                    </Box>
                    {
                        !linksForUpload.length && !solsForUpload.length ? <Box className={classes.solListEmpytyDiv} sx={{height :  `calc(100vh - ${height}px - 300px)`}}>
                            <Box className={classes.solEmtpyImgDiv}>
                                <img src={EmptyListImage} width={120} height={120}/>
                            </Box>
                        </Box>
                        : <List className={classes.solListDiv} sx={{height :  `calc(100vh - ${height}px - 300px)`}}>
                            {
                                linksForUpload.map((item, index) => {
                                    return validator.isURL(item.url) && <ListItem key={index} className={classes.solItemDiv}>
                                        <Box className={classes.solName}>
                                            <TextField
                                                fullWidth
                                                value={linksForUpload[index]?.name}
                                                onChange={(e) => handleChangeSolName(e.target.value, index, "link")}
                                                placeholder={'Enter your text.'}
                                            />
                                        </Box>
                                        <Box className={classes.solTime}>
                                            <img src={LinkImage} />&nbsp;{item?.format_duration}
                                        </Box>
                                    </ListItem>
                                })
                            }
                            {
                                solsForUpload.map((item, index) => {
                                    return <ListItem key={index} className={classes.solItemDiv}>
                                        <Box className={classes.solName}>
                                            <TextField
                                                fullWidth
                                                value={fileNameFormat(removeExtension(solsForUpload[index]?.name))}
                                                onChange={(e) => handleChangeSolName(e.target.value, index, "local")}
                                                placeholder={'Enter your text.'}
                                            />
                                        </Box>
                                        <Box className={classes.solTime}>
                                            <img src={TickImage} />&nbsp;{item.format_duration}
                                            {
                                                productType === '#Ebook' && (
                                                    getFileCategory(item.type) === 'vnd.openxmlformats-officedocument.wordprocessingml.document' ? "Docx" :
                                                    getFileCategory(item.type) 
                                                )
                                            }
                                        </Box>
                                    </ListItem>
                                })
                            }
                        </List>
                    }
                    
                </Grid>
                <Grid item xs={12}>
                    <StepperControl 
                        handleContinue={handleContinue}
                        disableContinue={disableContinue}
                        activeStep={0}
                    />
                </Grid>
            </Grid>

            <VideoPlayerModal 
                open={openPlayerModal}
                handleClose={handleClosePlayerModal}
                videoPreview={videoPreview}
            />

            <ExternalLinkModal
                open={openLinkModal}
                handleClose={handleCloseLinkModal}
                linksForUpload={linksForUpload}
                setLinksForUpload={setLinksForUpload}
            />
        </Box>
    )
}
UploadSolsVideo.propTypes = {
    InputUploadFiles : PropTypes.func.isRequired,
    InputMasterPiece : PropTypes.func.isRequired,
    InputExternalLinks : PropTypes.func.isRequired,
    InputProductType : PropTypes.func.isRequired,
    UserAccountInfo : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    masterPiece : state.upload.masterPiece,
    solsFilesForUpload : state.upload.solsFilesForUpload,
    externalLinksForUpload : state.upload.externalLinksForUpload,
    solsProductType : state.upload.solsProductType,
    productTypeList : state.profile.productTypeList,
})
const mapDispatchToProps = {
    InputProductType,
    InputUploadFiles,
    InputMasterPiece,
    InputExternalLinks,
    UserAccountInfo
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadSolsVideo) ;
import * as React from 'react';

import { connect } from 'react-redux';
import { CloudUploadFiles } from '../../../../redux/actions/cloud';
import PropTypes from 'prop-types' ;

import clsx from 'clsx';

import { bytesToSize } from '../../../../utils/Helper';

import BlueFolder from '../../../../assets/folders/BlueFolder.svg' ;
import GreenFolder from '../../../../assets/folders/GreenFolder.svg' ;
import YellowFolder from '../../../../assets/folders/YellowFolder.svg' ;
import OrangeFolder from '../../../../assets/folders/OrangeFolder.svg' ;
import ThreeDots from '../../../../assets/folders/ThreeDots.svg' ;

import {
    Box 
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {

    },
    folderDiv : {
        width : 250,
        height : 200,
        boxSizing : 'border-box',
        borderRadius : 20,
        padding : 20,
        margin : 10,
        cursor : 'pointer',
        transition : '0.1s',

        "&:hover" : {
            border : '5px solid ' + theme.palette.green.A200,
            padding : 20,
        }
    },
    folderSelectedDiv: {
        border : '5px solid ' + theme.palette.green.A200,
        padding : 20,
    }
}));

const FolderList = (props) => {
    const classes = useStyles();

    const {
        CloudUploadFiles,

        videoFiles,
        audioFiles,
        imageFiles,
        documentFiles,
        videoTotalSize,
        imageTotalSize,
        audioTotalSize,
        documentTotalSize,

        handleSelectedFolder,
        selectedFolder,
        cloud
    } = props ;

    React.useEffect(() => {
        CloudUploadFiles() ;
    }, []) ;

    return (
        <Box className={classes.root}>
            <Box sx={{display : 'flex', flexWrap : 'wrap'}}>
                <Box className={clsx(classes.folderDiv, selectedFolder === 'document' && classes.folderSelectedDiv)} sx={{background: '#F6F5FF', boxShadow: '0px 100px 80px rgba(158, 160, 249, 0.07), 0px 64.8148px 46.8519px rgba(158, 160, 249, 0.0531481), 0px 38.5185px 25.4815px rgba(158, 160, 249, 0.0425185), 0px 20px 13px rgba(158, 160, 249, 0.035), 0px 8.14815px 6.51852px rgba(158, 160, 249, 0.0274815), 0px 1.85185px 3.14815px rgba(158, 160, 249, 0.0168519)'}}
                    onClick={() => handleSelectedFolder('document')}
                >
                    <Box sx={{display : 'flex', justifyContent : 'space-between', mb : '20px'}}>
                        <img src={BlueFolder} />
                        <img src={ThreeDots} />
                    </Box>
                    <Box sx={{fontFamily : 'Montserrat', pt : '20px !important', fontSize: '20px', fontWeight : 'bold'}}>Documents</Box>
                    <Box sx={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between', mt: '20px'}}>
                        <Box sx={{color : '#718EBF'}}>{documentFiles?.length} files</Box>
                        <Box sx={{color : '#718EBF'}}>{bytesToSize(documentTotalSize)}</Box>
                    </Box>
                </Box>

                <Box className={clsx(classes.folderDiv, selectedFolder === 'video' && classes.folderSelectedDiv)} sx={{background: '#F5FFFC', boxShadow: '0px 100px 80px rgba(103, 207, 236, 0.07), 0px 64.8148px 46.8519px rgba(103, 207, 236, 0.0531481), 0px 38.5185px 25.4815px rgba(103, 207, 236, 0.0425185), 0px 20px 13px rgba(103, 207, 236, 0.035), 0px 8.14815px 6.51852px rgba(103, 207, 236, 0.0274815), 0px 1.85185px 3.14815px rgba(103, 207, 236, 0.0168519)'}}
                    onClick={() => handleSelectedFolder('video')}
                >
                    <Box sx={{display : 'flex', justifyContent : 'space-between', mb : '20px'}}>
                        <img src={GreenFolder} />
                        <img src={ThreeDots} />
                    </Box>
                    <Box sx={{fontFamily : 'Montserrat', pt : '20px !important', fontSize: '20px', fontWeight : 'bold'}}>Video</Box>
                    <Box sx={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between', mt: '20px'}}>
                        <Box sx={{color : '#718EBF'}}>{videoFiles?.length} files</Box>
                        <Box sx={{color : '#718EBF'}}>{bytesToSize(videoTotalSize)}</Box>
                    </Box>
                </Box>

                <Box className={clsx(classes.folderDiv, selectedFolder === 'audio' && classes.folderSelectedDiv)} sx={{background: '#FFF9F0', boxShadow: '0px 100px 80px rgba(253, 131, 66, 0.04), 0px 64.8148px 46.8519px rgba(253, 131, 66, 0.0303704), 0px 38.5185px 25.4815px rgba(253, 131, 66, 0.0242963), 0px 20px 13px rgba(253, 131, 66, 0.02), 0px 8.14815px 6.51852px rgba(253, 131, 66, 0.0157037), 0px 1.85185px 3.14815px rgba(253, 131, 66, 0.00962963)'}}
                    onClick={() => handleSelectedFolder('audio')}
                >
                    <Box sx={{display : 'flex', justifyContent : 'space-between', mb : '20px'}}>
                        <img src={YellowFolder} />
                        <img src={ThreeDots} />
                    </Box>
                    <Box sx={{fontFamily : 'Montserrat', pt : '20px !important', fontSize: '20px', fontWeight : 'bold'}}>Music</Box>
                    <Box sx={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between', mt: '20px'}}>
                        <Box sx={{color : '#718EBF'}}>{audioFiles?.length} files</Box>
                        <Box sx={{color : '#718EBF'}}>{bytesToSize(audioTotalSize)}</Box>
                    </Box>
                </Box>

                <Box className={clsx(classes.folderDiv, selectedFolder === 'image' && classes.folderSelectedDiv)} sx={{background: '#FFF5F5', boxShadow: '0px 100px 80px rgba(255, 125, 125, 0.07), 0px 64.8148px 46.8519px rgba(255, 125, 125, 0.0531481), 0px 38.5185px 25.4815px rgba(255, 125, 125, 0.0425185), 0px 20px 13px rgba(255, 125, 125, 0.035), 0px 8.14815px 6.51852px rgba(255, 125, 125, 0.0274815), 0px 1.85185px 3.14815px rgba(255, 125, 125, 0.0168519)'}}
                    onClick={() => handleSelectedFolder('image')}
                >
                    <Box sx={{display : 'flex', justifyContent : 'space-between', mb : '20px'}}>
                        <img src={OrangeFolder} />
                        <img src={ThreeDots} />
                    </Box>
                    <Box sx={{fontFamily : 'Montserrat', pt : '20px !important', fontSize: '20px', fontWeight : 'bold'}}>Images</Box>
                    <Box sx={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between', mt: '20px'}}>
                        <Box sx={{color : '#718EBF'}}>{imageFiles?.length} files</Box>
                        <Box sx={{color : '#718EBF'}}>{bytesToSize(imageTotalSize)}</Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
FolderList.propTypes = {
    CloudUploadFiles : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    videoFiles : state.cloud.upload.videoFiles,
    imageFiles : state.cloud.upload.imageFiles,
    audioFiles: state.cloud.upload.audioFiles,
    documentFiles : state.cloud.upload.documentFiles,

    videoTotalSize : state.cloud.upload.videoTotalSize,
    imageTotalSize : state.cloud.upload.imageTotalSize,
    audioTotalSize : state.cloud.upload.audioTotalSize,
    documentTotalSize : state.cloud.upload.documentTotalSize,
    
    cloud : state.cloud
});
const mapDispatchToProps = {
    CloudUploadFiles
}
export default connect(mapStateToProps, mapDispatchToProps)(FolderList) ;
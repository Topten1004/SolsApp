import * as React from 'react' ;

import FileDetail from './FileDetail.js';

import { bytesToSize, getFileCategory } from '../../../../utils/Helper.js';
import VideoImage from '../../../../assets/cloud/Video.jpg' ;

import PdfPreview from '../../../Common/PdfPreview.js';
import DocxPreview from '../../../Common/DocxPreview.js';

import { v4 as uuidv4 } from 'uuid' ;

import { makeStyles, useTheme } from '@mui/styles';

import {
    Box,
    Tooltip
} from '@mui/material' ;

const useStyles = makeStyles(() => ({
    preDiv : {
        paddingLeft : '10px !important',
        marginTop : '10px !important', marginBottom : '0px !important',
        whiteSpace: 'pre-wrap !important',
        fontFamily : 'Montserrat !important'
    },
    previewDiv : {
        display : 'flex', 
        width : '250px', height : '230px', 
        overflow : 'hidden', 
        background : 'linear-gradient(135deg, #e52d65 0%, #629df6 53.09%, #3c1d9d 100%) !important', 
        borderRadius : '10px'
    }
}))
const FileInformation = (props) => {
    const classes = useStyles() ;
    const {
        fileInfo
    } = props ;

    const theme = useTheme() ;

    return (
        <>
            <Box sx={{fontSize : '20px', borderBottom : '1px solid gray'}}>
                File Preview
            </Box>
            <Box sx={{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center', mt : '20px'}}>
                <Box className={classes.previewDiv}> 
                    {
                        fileInfo && (
                            fileInfo.category === 'video' ? <video src={fileInfo?.path} width={250} height={230} style={{background : theme.palette.blue.A300, borderRadius : '10px'}} controls/>
                            : fileInfo.category === 'image' ? <img src={fileInfo?.path} width={250} height={230} style={{background : theme.palette.blue.A300, borderRadius : '10px'}} />
                            : fileInfo.category === 'pdf' ? <PdfPreview
                                previewUrl={fileInfo.path}
                                width={250}
                                height={230}
                            /> 
                            : fileInfo.category === 'vnd.openxmlformats-officedocument.wordprocessingml.document' ?  <Box sx={{display : 'flex', justifyContent : 'center', height:'230px', width:'250px'}}>
                                        <DocxPreview
                                        previewUrl={fileInfo.path}
                                        width={250}
                                        height={230}
                                        key={uuidv4()}
                                        activeIndex={0}
                                        selfIndex={0}
                                    />
                                </Box>
                            :<></>
                        )
                    }
                </Box>
                <Box sx={{mt : '20px', width : '100%', color : 'gray', paddingLeft : '10px'}}>
                    Name: {fileInfo?.name || "Unknown"}
                </Box>
                <Box sx={{width : '100%', color : 'gray', paddingLeft : '10px'}}>
                    Size : {fileInfo && bytesToSize(fileInfo?.size) || "Unknown" }
                </Box>
                <Box sx={{width : '100%', color : 'gray', paddingLeft : '10px'}}>
                    Created : {fileInfo?.created_at?.toDate().toLocaleDateString() || "Unknown"}
                </Box>
            </Box>
            <Box sx={{fontSize : '20px', borderBottom : '1px solid gray', mt : '20px'}}>
                File Detail
            </Box>
            <Box sx={{color : 'gray', paddingLeft : '10px', paddingTop : '10px', display : 'flex', flexDirection : 'column', gap : '10px'}}>
                <Box>
                    Product Description: <pre className={classes.preDiv}>{fileInfo?.product?.product_description || "Unknown"}</pre>
                </Box>
                <Box>
                    Product Type: {fileInfo?.product?.product_type || "Unknown"}
                </Box>
                <Box sx={{textTransform : 'capitalize'}}>
                    Price Type: {fileInfo?.product?.price_type || "Unknown"}
                </Box>
                <FileDetail
                    fileDetailInfo={fileInfo?.product}
                />
            </Box>
        </>
    )
}

export default FileInformation ;
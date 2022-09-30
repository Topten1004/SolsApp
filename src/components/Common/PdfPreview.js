import React,{ useEffect, useState } from 'react' ;

// Core viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';

import {
    Box,
    Avatar
} from '@mui/material' ;

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        display : 'flex',
        justifyContent : 'center',

        borderRadius : '10px !important',

        width : props => props.width ,
        height : props => props.height ,
        boxSizing : 'border-box',

        padding : 5,

        "& .MuiSvgIcon-root" : {
            marginRight : 10
        }
    }
})) ;

const PdfPreview = (props) => {

    // npm install pdfjs-dist@2.6.347
    // npm install react-pdf-viewer@3.1.2
    const {
        width,
        height
    } = props ;

    const classes = useStyles(props) ;

    const {
        previewUrl
    } = props ;

    return (
        <Box className={classes.root}>
            
            {
                previewUrl ? 
                <Worker workerUrl={pdfjsWorker}>
                    <Viewer
                        fileUrl={previewUrl}
                    />
                </Worker>
                : <>
                    <CloudUploadIcon /> Upload WhitePaper.
                </> 
            }
            
        </Box>
    )
}

export default PdfPreview ;
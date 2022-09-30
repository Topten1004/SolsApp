import * as React from 'react' ;

import { bytesToSize, getFileCategory } from '../../../../utils/Helper';

import Loading from 'react-loading-components' ;
import FileInformation from './FileInformation';
import EmptyFolderImage from '../../../../assets/cloud/EmptyFolder.png' ;

import {
    Box,
    Grid,
    Tooltip,
    useMediaQuery
} from '@mui/material' ;

import { makeStyles, useTheme } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        maxHeight : 900,
        ['@media (max-width : 1190px)'] : {
            height : 'auto',
            marginBottom : '20px !important'
        },
        overflowY : 'scroll',
        color : theme.palette.green.A200,
        display : 'flex', gap : '20px', flexWrap : 'wrap',
        borderRight : '1px solid gray',
        "&:hover" : {
            cursor : 'pointer',
        }
    },
    fileItemDiv : {
        border : '1px solid ' + theme.palette.blue.A100,
        borderRadius : '10px',
        width : 270, maxHeight : 400,
        padding : 20,
        "&:hover" : {
            background : theme.palette.blue.A300
        }
    },
    fileNameDiv : {
        borderBottom : '1px solid gray',
        paddingBottom : 10,
        textAlign : 'center',
        fontSize : '20px'
    }
}))

const FileThumbList = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;
    const match1190 = useMediaQuery('(min-width : 1190px)') ;

    const {
        fileList,
        searchStr,
        viewFileList
    } = props ;

    const [fileIndex, setFileIndex] = React.useState(0) ;

    const handleSelectFile = (fileIndex) => {
        setFileIndex(fileIndex) ;
    }
    return (
        <Grid container>
            <Grid item xs={match1190 ? 8 : 12} className={classes.root} sx={{justifyContent : fileList ? 'flex-start' : 'center'}}>
            {
                fileList ? (
                    fileList.length ? 
                        fileList?.filter(file => file.name.toLowerCase().search(searchStr.toLowerCase()) >= 0 && (viewFileList === 'recent' ? new Date().getTime() - file.created_at.toDate().getTime() < 24*60*60*1000*2 : true) ).map((file, index) => {
                            return (
                                <Box key={index} className={classes.fileItemDiv} onClick={() => handleSelectFile(index) } sx={{background : index === fileIndex ? theme.palette.blue.A200 : 'transparent'}}>
                                    <Tooltip title={file?.name}>
                                        <Box sx={{fontSize : '20px'}}>
                                            Name : {file.name?.slice(0, 10)}{file.name.length > 10 && "..."}
                                        </Box>
                                    </Tooltip>
                                    <Box sx={{mt : '10px', }}>
                                        {
                                            getFileCategory(file?.type) === 'video' ? <video src={file?.path} width={230} height={200} style={{background : theme.palette.blue.A300, borderRadius : '10px'}} controls/>
                                            : getFileCategory(file?.type) === 'image' ? <img src={file?.path} width={230} height={200} style={{borderRadius : '10px'}} />
                                            : <></>
                                        }
                                    </Box>
                                    <Box className={classes.fileNameDiv}>{file.product.master_piece}</Box>
                                    <Box sx={{display : 'flex', justifyContent : 'space-between', alignItems : 'center', mt : '20px'}}>
                                        <Box >
                                            File Size :
                                            <Box>{bytesToSize(file.size)}</Box>
                                        </Box>
                                        <Box>
                                            Created :
                                            <Box>{file.created_at.toDate().toLocaleDateString()}</Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        }) 
                    : <Box sx={{fontSize : '22px', display : 'flex' , alignItems:'center', gap : '20px', justifyContent : 'center', width : '100%'}}>
                        <img src={EmptyFolderImage} width={50}/> Empty Folder
                    </Box>
                )
                :  <Loading type='bars' width={50} height={50} fill='#43D9AD' />
            }
            </Grid>
            <Grid item xs={match1190 ? 4 : 12} sx={{color : theme.palette.blue.A100, padding : match1190 ? '20px' : '5px', display : !fileList?.length && 'none'}}>
                <FileInformation
                    fileInfo={fileList && fileList?.filter(file => file.name.toLowerCase().search(searchStr.toLowerCase()) >= 0 && (viewFileList === 'recent' ? new Date().getTime() - file.created_at.toDate().getTime() < 24*60*60*1000 : true) )?.[fileIndex]}
                />
            </Grid>
        </Grid>
    )
}

export default FileThumbList ;
import * as React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;

import FileDetailList from '../../../components/Solstice/CloudScreen/CloudPurchase/FileDetailList';
import FileThumbList from '../../../components/Solstice/CloudScreen/CloudPurchase/FileThumbList';
import FolderList from '../../../components/Solstice/CloudScreen/CloudPurchase/FolderList';

import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import clsx from 'clsx';

import {
    Box, 
    TextField,
    Grid,
    Select,
    FormControl,
    MenuItem,
    Tooltip,
    InputAdornment
} from '@mui/material' ;

import { useStyles } from './StylesDiv/CloudPurchase.styles' ;

const CloudPurchase = (props) => {

    const classes = useStyles() ;

    const {
        videoFiles,
        imageFiles,
        documentFiles,
        audioFiles
    } = props ;

    const [fileViewType, setFileViewType] = React.useState(1) ;
    const [selectedFolder, setSelectedFolder] = React.useState('document') ;
    const [searchStr, setSearchStr] = React.useState('') ;
    const [viewFileList, setViewFileList] = React.useState('all') ;

    const handleChangeViewFileList = (viewFileList) => {
        setViewFileList(viewFileList) ;
    } 

    const handleSelectedFolder = (selectedFolder) => {
        setSelectedFolder(selectedFolder) ;
    }
    
    const handleChangeSearchStr = (searchStr) => {
        setSearchStr(searchStr) ;
    }

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <FolderList 
                        selectedFolder={selectedFolder}
                        handleSelectedFolder={handleSelectedFolder}
                    />
                </Grid>
                <Grid item xs={12} className={classes.optionDiv}>
                    <Box className={classes.fileViewTypeDiv} sx={{width : '170px !important', flexDirection : 'row !important', alignItems : 'center'}}>
                        <FormControl>
                            <Select
                                name={"file"}
                                value={viewFileList}
                                size={'small'}
                                MenuProps={{
                                    className : classes.paper
                                }}
                                onChange={(e) => handleChangeViewFileList(e.target.value)}
                            >
                                <MenuItem value={'all'}>All</MenuItem>
                                <MenuItem value={'recent'}>Recent</MenuItem>
                            </Select>
                        </FormControl> Files
                    </Box>
                    <Box className={classes.fileViewTypeDiv}>
                        <TextField 
                            size='small'
                            placeholder='Search your files'
                            fullWidth
                            value={searchStr}
                            onChange={(e) => handleChangeSearchStr(e.target.value)}

                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <ManageSearchIcon/>
                                </InputAdornment>,
                            }}
                        />
                        <Box sx={{display : 'flex', gap : '10px'}}>
                            <Tooltip title={'List'}>
                                <Box className={clsx( classes.fileViewTypeItem, fileViewType === 1 && classes.fileViewTypeSelected)} onClick={() => setFileViewType(1)}>
                                    <FormatListBulletedOutlinedIcon />
                                </Box>
                            </Tooltip>
                            <Tooltip title={'Content'}>
                                <Box className={clsx( classes.fileViewTypeItem, fileViewType === 2 && classes.fileViewTypeSelected)} onClick={() => setFileViewType(2)}>
                                    <GridViewOutlinedIcon />
                                </Box>
                            </Tooltip>
                        </Box>
                    </Box>
                </Grid>
                <Grid container sx={{mt : '20px'}}>
                    <Grid item xs={12}  sx={{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                        {
                            fileViewType === 2 &&  <FileThumbList
                                fileList={
                                    ( selectedFolder === "document" && documentFiles ) ||
                                    ( selectedFolder === "video" && videoFiles ) ||
                                    ( selectedFolder === "audio" && audioFiles ) ||
                                    ( selectedFolder === "image" && imageFiles ) 
                                }

                                viewFileList={viewFileList}
                                searchStr={searchStr}
                            /> 
                           
                        }
                        {
                            fileViewType === 1 && <FileDetailList 
                                fileList={
                                    ( selectedFolder === "document" && documentFiles ) ||
                                    ( selectedFolder === "video" && videoFiles ) ||
                                    ( selectedFolder === "audio" && audioFiles ) ||
                                    ( selectedFolder === "image" && imageFiles ) 
                                }
                                searchStr={searchStr}
                                viewFileList={viewFileList}
                            />
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = state => ({
    videoFiles : state.cloud.purchase.videoFiles,
    imageFiles : state.cloud.purchase.imageFiles,
    documentFiles : state.cloud.purchase.documentFiles,
    audioFiles: state.cloud.purchase.audioFiles
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(CloudPurchase) ;
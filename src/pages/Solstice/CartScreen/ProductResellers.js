import * as React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;

import ResellersList from '../../../components/Solstice/CartScreen/Resellers/ResellersList.js';

import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

import clsx from 'clsx';

import {
    Box, 
    TextField,
    Grid,
    Select,
    FormControl,
    MenuItem,
    Tooltip
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        "& .MuiFormControl-root" : {
            borderRadius : 5,
            color : '#43D9AD',
            "& svg" :{
                color : 'white'
            },
        },
        '& .MuiOutlinedInput-root': {
            minWidth : '100px !important',
            '& fieldset': {
                borderColor: '#C3C7E5 !important',
            },
            '&:hover fieldset': {
                borderColor: '#C3C7E5 !important',
            },
            '&.Mui-focused fieldset': {
                border : '1px solid #C3C7E5 !important'
            },
        },
        "& .MuiInputBase-input" :{
            color : '#43D9AD !important',
        },
    },
    paper : {
        "& .MuiPaper-root" : {
            backgroundColor : 'transparent !important'
        },
        "& .MuiList-root" : {
            padding : '0px !important',
            border : '1px solid gray',
        },
        "& .MuiMenuItem-root" : {
            borderBottom : '1px solid gray !important',
            "&:last-child" : {
                borderBottom : 'none !important',
            },
            background : theme.palette.blue.A200 + " !important",
            color : theme.palette.green.A200 + " !important",
        },
    },
    createButtonCss  : {
        borderTopRightRadius : '15px !important',
        borderBottomRightRadius : '15px !important',

        background : '#3772FF !important',
        textTransform : 'capitalize !important',
        width : 300,

        border : '2px solid #3772FF !important'
    },
    fileViewTypeDiv : {
        color : theme.palette.green.A200,
        display : 'flex', justifyContent : 'center' , alignItems : 'center', gap : '20px',
        background : theme.palette.blue.A200,
        padding : 10, paddingLeft : 10, paddingRight : 10,
        marginBottom : 20,
        borderRadius : theme.border.borderRadius.tiny,
        width : 500 
    },
    fileViewTypeItem : {
        display : 'flex', justifyContent : 'center', alignItems : 'center',
        borderRadius : theme.border.borderRadius.small,
        padding : 5,
        cursor : 'pointer',
        color : theme.palette.blue.A100,
        boxSizing : 'border-box',
        "&:hover" : {
            background : theme.palette.blue.A300
        }
    },
    fileViewTypeSelected : {
        background : theme.palette.blue.A300
    },
})) ;

const ProductResellers = (props) => {

    const classes = useStyles() ;

    const {
      
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
                <Grid item xs={12} sx={{display : 'flex', alignItems : 'center', justifyContent : 'space-between',  mt : '30px', mb : '30px'}}>
                    <Box className={classes.fileViewTypeDiv}>
                        <TextField 
                            size='small'
                            placeholder='Search your files'
                            fullWidth
                            value={searchStr}
                            onChange={(e) => handleChangeSearchStr(e.target.value)}
                        />
                    </Box>
                </Grid>
                <Grid container sx={{mt : '20px'}}>
                    <Grid item xs={12}  sx={{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                         <ResellersList
                            searchStr={searchStr}
                            viewFileList={viewFileList}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = state => ({
    
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(ProductResellers) ;
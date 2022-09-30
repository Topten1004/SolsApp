import React from 'react' ;

import { connect } from 'react-redux';
import { InputAccountType } from '../../redux/actions/auth';

import CloseIcon from '@mui/icons-material/Close';

import  {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Select,
    FormControl,
    MenuItem,
    Box,
    Button,
    Autocomplete,
    TextField
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles(() => ({
    root : {

    },
    paper : {
        backgroundColor : '#011627 !important',
        border : '1px solid gray !important',
        borderRadius : '10px !important',

        "& .MuiDialogTitle-root" : {
            color : 'white',
            display : 'flex',
            alignItems: 'center',
            justifyContent : 'space-between'
        },


        // form control background style
        "& .MuiFormControl-root" : {
            borderRadius : 5,
            color : '#43D9AD',
            "& svg" :{
                color : 'white'
            },

            marginBottom : 30
        },

        // when hover border color style
        '& .MuiOutlinedInput-root': {
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
        "& .MuiButtonBase-root.Mui-disabled": {
            WebkitTextFillColor: 'red',
        },
        // // textfield color style or disabled color style
        "& .MuiInputBase-input" :{
            color : '#43D9AD !important',
        },
        // "& .MuiInputBase-input.Mui-disabled": {
        //     WebkitTextFillColor: 'red',
        // },
        // "& .MuiFormHelperText-root" : {
        //     background : 'white !important',
        //     margin : '0px !important'
        // },

        "& .MuiMenuItem-root" : {
            border : '1px solid red !important'
        },

        "& .MuiChip-root" : {
            color : "#43D9AD !important",
            backgroundColor : '#4D5BCE'
        }
    },
    lineDiv : {
        borderBottom : '2px solid #1E2D3D',
    },
    descriptionDiv : {
        color : "#43D9AD"
    },
    labelDiv : {
        color : 'white',
        padding : 5
    },
    nextButtonCss : {
        color : '#C3C7E5 !important',
        textTransform : 'capitalize !important',
        width : 100,
        fontSize: '15px !important',
        borderRadius : '20px !important',
        border : '1px solid gray !important'
    }
})) ;

const AccountTypeModal = (props) => {

    const classes = useStyles() ;

    const {
        open,
        handleClose,
        generalAccountTypeList,
        handleGeneralAccountTypeList,
        productTypeList,
        handleProductTypeList,
        jobTag,
        handleJobTag,
        handleUpdatedType,
        InputAccountType,
    } = props ;

    const allAccountTypeList = [
        "Single Admin",
        "Business",
        "Developer"
    ]

    const allProductTypeList = [
        "#Ebook",
        "#Video",
        "#Image",
        "#Music",
    ]

    const jobTagList = [
        "Fitness Pro"
    ]

    const handleNext = async () => {
        await InputAccountType(generalAccountTypeList, productTypeList, jobTag) ;
        handleUpdatedType(true);
        handleClose();
    }

    return (
        <Box className={classes.root}>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                classes ={{
                    paper : classes.paper
                }}
            >
                <DialogTitle>
                    Account Type
                    <CloseIcon onClick={handleClose} sx={{cursor : 'pointer'}} />
                </DialogTitle>
                <Box className={classes.lineDiv}/>
                <DialogContent>
                    <Box className={classes.labelDiv}>Account Type</Box>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={allAccountTypeList}
                        getOptionLabel={(option) => option}
                        value={generalAccountTypeList}
                        onChange={(e, value) => handleGeneralAccountTypeList(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Account Type"
                                
                            />
                        )}
                    />
                    
                    <Box className={classes.labelDiv}>Product Type</Box>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={allProductTypeList}
                        getOptionLabel={(option) => option}
                        value={productTypeList}
                        onChange={(e, value) => handleProductTypeList(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Product Type"
                                
                            />
                        )}
                    />

                    <Box className={classes.labelDiv}>Job Title/Tag</Box>
                    <FormControl fullWidth>
                        <Select
                            name={"type"}
                            value={jobTag}
                            onChange={handleJobTag}
                        >
                            {
                                jobTagList.map( (type , index) => {
                                    return (
                                        <MenuItem value={type} key={index}>{type}</MenuItem>
                                    )
                                } )
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <Box className={classes.lineDiv}/>
                <DialogActions>
                    <Button variant={'outlined'} className={classes.nextButtonCss} onClick={handleNext} disabled={!productTypeList.length || !generalAccountTypeList.length}>Next</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = {
    InputAccountType
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountTypeModal) ;
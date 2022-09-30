import React, { useEffect, useState } from 'react' ;

import { connect } from 'react-redux';
import { InputExternalLinks } from '../../../redux/actions/upload' ;

import validator from 'validator';
import swal from 'sweetalert' ;
import { v4 as uuidv4 } from 'uuid';

import  {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Box,
    Button,
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
            color : 'white'
        },

        "& .MuiButtonBase-root" : {
            textTransform : 'capitalize !important',
            color : '#C3C7E5',
            border : '1px solid #C3C7E5',
            borderRadius : 20,
            width : 150
        },

        // form control background style
        "& .MuiFormControl-root" : {
            borderRadius : 5,
            color : '#43D9AD',
            "& svg" :{
                color : 'white'
            }
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

        // textfield color style or disabled color style
        "& .MuiInputBase-input" :{
            color : '#43D9AD !important',
        },

        "& .MuiFormHelperText-root" : {
            color : 'yellow !important',
            fontSize : '15px !important',
            fontWeight : 'bold !important',
            marginTop : '5px !important'
        }
    },
    lineDiv : {
        borderBottom : '2px solid #1E2D3D',
    },
    descriptionDiv : {
        color : "#43D9AD"
    },
    addNewLinkDiv : {
        textAlign : 'right',
        marginTop : '20px',
        color : 'white',
        cursor : 'pointer',
        "&:hover" : {
            color : "#43D9AD" 
        }
    }
})) ;

const ExternalLinkModal = (props) => {

    const classes = useStyles() ;

    const {
        open,
        handleClose,
        linksForUpload,
        setLinksForUpload,

        InputExternalLinks,
        externalLinksForUpload
    } = props ;

    const handleChangeLinks = (value, index) => {
        let temp = [...linksForUpload] ;

        if(value === '' && index < linksForUpload.length - 1) {
            temp.splice(index, 1) ;
            // console.log(temp) ;           
        } else {
            temp[index] = {
                ...temp[index],
                url : value,
                name : uuidv4()
            } ;
        }
        setLinksForUpload(temp) ;
    }

    const handleNewLink = async () => {
        let temp = [...linksForUpload] ;

        if(temp[temp.length-1]?.url === "") {
            return ;
        }
        temp.push({
            url : "",
            format_duration : "",
            duration : "",
            name : uuidv4(),
            type : 'unknown',
            category : 'unknown',
            size : 'unknwon',
        }) ;

        setLinksForUpload(temp);
    }

    const handleExternalLinks = async () => {
        for(let i = 0 ; i < linksForUpload.length ; i++) {
            if(!validator.isURL(linksForUpload[i].url)) {
                return swal({
                    title : 'Invalid Url',
                    text : 'Input all url correctly.',
                    icon : 'warning',
                    buttons : false,
                    timer : 3000
                }) ;
            }
        }
        handleClose() ;
    }

    return (
        <Box className={classes.root}>
            <Dialog
                open={open}
                fullWidth
                classes ={{
                    paper : classes.paper
                }}
            >
                <DialogTitle>
                    External Link
                </DialogTitle>
                <Box className={classes.lineDiv}/>
                <DialogContent>
                    {
                        linksForUpload.map((item, index) => {
                            return (
                                <Box key={index} sx={{marginBottom : '10px'}}>
                                    <Box sx={{color : '#43D9AD', pl : '10px', pb : '5px'}}>{`Link ${index+1}`}</Box>
                                    <TextField 
                                        fullWidth
                                        placeholder='Enter your external link.'
                                        value={item.url}
                                        onChange={(e) => handleChangeLinks(e.target.value, index)}
                                        helperText={validator.isURL(item.url) ? null : item.url === '' ? 'Enter Url.' : 'Invalid Url.'}
                                    />
                                </Box>
                            )
                        })
                    }
                    <Box className={classes.addNewLinkDiv} onClick={handleNewLink}><u>+ Add New External Link</u></Box>
                </DialogContent>
                <Box className={classes.lineDiv}/>
                <DialogActions>
                    <Button variant='contained' onClick={handleExternalLinks}>Add Link</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

const mapStateToProps = state => ({
    externalLinksForUpload : state.upload.externalLinksForUpload
})
const mapDispatchToProps = {
   InputExternalLinks
}
export default connect(mapStateToProps, mapDispatchToProps)(ExternalLinkModal) ;
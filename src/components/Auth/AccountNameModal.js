import * as React from 'react' ;

import { connect } from 'react-redux';
import { CheckAccountName, InputAccountName } from '../../redux/actions/auth';
import { validateInputValue } from '../../utils/Helper';

import swal from 'sweetalert';
import CloseIcon from '@mui/icons-material/Close';

import TickImage from '../../assets/common/tick.png';
import CloseImage from '../../assets/Close.png';

import Loading from 'react-loading-components' ;

import  {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Autocomplete,
    Box,
    Button,
    TextField,
    InputAdornment
} from '@mui/material' ;

import { makeStyles,useTheme } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {

    },
    paper : {
        backgroundColor : '#011627 !important',
        border : '1px solid gray !important',
        borderRadius : '10px !important',

        "& .MuiDialogTitle-root" : {
            color : '#43D9AD',
            display : 'flex',
            alignItems: 'center',
            justifyContent : 'space-between'
        },
        "& .MuiFormControl-root" : {
            borderRadius : 5,
            color : '#43D9AD',
            "& svg" :{
                color : '#43D9AD'
            },

            marginBottom : 30
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'gray !important',
            },
            '&:hover fieldset': {
                borderColor: 'gray !important',
            },
            '&.Mui-focused fieldset': {
                border : '1px solid gray !important'
            },
        },
        "& .MuiButtonBase-root.Mui-disabled": {
            WebkitTextFillColor: '#283646',
        },
        "& .MuiInputBase-input" :{
            color : '#43D9AD !important',
        },
        "& .MuiFormHelperText-root" : {
            background : '#011627 !important',
            marginTop : '10px !important',
            color : 'red'
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
        color : theme.palette.green.A200 + " !important",
        padding : 5
    },
    nextButtonCss : {
        color : '#C3C7E5 !important',
        textTransform : 'capitalize !important',
        minWidth : '150px !important',
        fontSize: '15px !important',
        borderRadius : '20px !important',
        border : '1px solid gray !important'
    }
})) ;

const AccountNameModal = (props) => {

    const classes = useStyles() ;
    const theme = useTheme() ;

    const {
        open,
        handleClose,
        handleUpdatedName,
        CheckAccountName,
        accountName,
        handleChangeAccountName,
        detailAccountTypeList,
        handleDetailAccountTypeList,
        InputAccountName
    } = props ;

    const allTypeList = [
       "Creator",
       "Reseller",
       "Developer",
       "Miner(coming soon)",
       "IP Innovator"
    ];

    const [checkingName, setChekingName] = React.useState(false) ;

    const handleNext = async () => {
        setChekingName(true) ;
        if(await CheckAccountName(accountName)) {
            await InputAccountName(accountName, detailAccountTypeList) ;
        } else {
            return swal({
                title : 'Warning',
                text : "Duplicate Account Name",
                buttons : false,
                timer : 3000,
                icon : 'warning'
            }) ;
        }
        setChekingName(false) ;
        handleUpdatedName(true);
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
                    Account Name
                    {
                        !checkingName && <CloseIcon onClick={handleClose} sx={{cursor : 'pointer'}} />
                    }
                </DialogTitle>
                <Box className={classes.lineDiv}/>
                <DialogContent>
                    <Box className={classes.labelDiv}>Account Name</Box>
                    <TextField
                        placeholder='Name'
                        focused
                        size='medium'
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <Box component={'img'} src={accountName !== '' ? TickImage : CloseImage} sx={{width : '16px', height : '12px'}}/>
                            </InputAdornment>,
                        }}

                        helperText={(accountName !== null && accountName !== '' && !validateInputValue(accountName)) ? "Please, Dont't input any symbol." : null}
                        value={accountName}
                        onChange={handleChangeAccountName}
                    />
                    <Box className={classes.labelDiv}>Account Type</Box>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={allTypeList}
                        getOptionLabel={(option) => option}
                        value={detailAccountTypeList}
                        onChange={(e, value) => handleDetailAccountTypeList(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Type"
                                
                            />
                        )}
                    />
                </DialogContent>
                <Box className={classes.lineDiv}/>
                <DialogActions>
                    <Button variant={'outlined'} className={classes.nextButtonCss} onClick={handleNext} disabled={ checkingName || !detailAccountTypeList.length || accountName===''}
                        startIcon={checkingName && <Loading type='tail_spin' width={30} height={30} fill={theme.palette.green.A200} />}
                    >
                        {
                            checkingName ? "...Checking Name" : "Next"
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = {
    CheckAccountName,
    InputAccountName
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountNameModal) ;
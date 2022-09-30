import { makeStyles } from '@mui/styles' ;

export const useStyles = makeStyles((theme) => ({
    root : {
        
    },
    paper : {
        backgroundColor : theme.palette.blue.main + ' !important',
        borderRadius : '5px !important', border : '1px solid ' + theme.palette.blue.A100 + " !important",
        boxShadow : "5px -4px 10px 0px rgb(59 77 219 / 68%), 5px 4px 12px 6px rgb(48 175 70 / 67%) !important",
        
        "& .MuiDialogTitle-root" : {
            color : theme.palette.green.A200,
            display : 'flex', justifyContent : 'space-between', alignItems : 'center'
        },

        "& .MuiDialogContent-root" : {
            color : theme.palette.green.A200, fontSize : 20
        },

        "& .MuiButtonBase-root" : {
            textTransform : 'capitalize !important',
            color : theme.palette.green.A200, fontSize : 20,
            minWidth : '150px !important',
            borderRadius : 25,
            backgroundColor : theme.palette.blue.A300 + ' !important'
        },

        "& .MuiInputAdornment-root" : {
            "& p" :{
                color : '#43D9AD !important'
            } 
        },
        "& .MuiInputLabel-root" : {
            color : "#43D9AD !important",
        },

        "& .MuiFormControl-root" : {
            borderRadius : 5,
            padding : '0px !important',
            color : '#43D9AD',
            "& svg" :{
                color : 'white'
            }
        },

        '& .MuiOutlinedInput-root': {
            fontSize : '20px !important',
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
            padding : '10px !important',
            display : 'flex !important', alignItems : 'center !important',
            paddingLeft : '10px !important',
            color : '#43D9AD !important',
        },
        "& .MuiButtonBase-root.Mui-disabled": {
            WebkitTextFillColor: 'gray',
            cursor : 'not-allowed'
        },
        "& .MuiFormHelperText-root" : {
            background : '#010C15 !important',
            color : 'red !important',
            marginTop : '10px !important'
        },
        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
        {
            display: 'none',
        },
    },
    dividerDiv : {
        borderBottom : '1px solid gray',
    },
    selectDiv : {
        "& .MuiList-root" : {
            backgroundColor : theme.palette.blue.main + ' !important',
            padding : '0px !important',
        },
        "& .MuiMenuItem-root" : {
            borderBottom : '1px solid gray !important',
            "&:last-child" : {
                borderBottom : 'none !important',
            },
            background : theme.palette.blue.A300 + " !important",
            color : theme.palette.green.A200 + " !important",
            fontSize : 20,
        },
       "& .MuiBackdrop-root" : {
           background : 'transparent !important'
       }
    },
    closeButtonCss : {
        border  :'2px solid gray', borderRadius : '50%',
        padding : 2,
        "&:hover" : {
            color : theme.palette.green.A100
        }
    }
})) ;
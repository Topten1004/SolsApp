import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
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
            border : '1px solid ' + theme.palette.blue.A100,
            borderRadius : 5,
        },
        "& .MuiMenuItem-root" : {
            borderBottom : '1px solid '+ theme.palette.blue.A200 +' !important',
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
    optionDiv : {
        display : 'flex', alignItems : 'center', justifyContent : 'space-between',
        marginTop : '30px !important', marginBottom : '30px !important',
        ['@media (max-width: 1090px)'] : {
            flexDirection : 'column !important',
            alignItems : 'flex-start',
        },
    },
    fileViewTypeDiv : {
        color : theme.palette.green.A200,
        display : 'flex', justifyContent : 'center' , alignItems : 'center', gap : '20px',
        background : theme.palette.blue.A200,
        padding : 10, paddingLeft : 10, paddingRight : 10,
        marginBottom : 20,
        borderRadius : theme.border.borderRadius.tiny,
        width : 500 ,
        ['@media (max-width: 800px)'] : {
            flexDirection : 'column !important',
            alignItems : 'flex-start',
            width : '100%'
        },

        '& .MuiOutlinedInput-root': {
            minWidth : '100px !important',
            '& fieldset': {
                border: "1px solid " + theme.palette.blue.A200 + ' !important',
            },
            '&:hover fieldset': {
                border: "1px solid " + theme.palette.blue.A100 + ' !important',
            },
            '&.Mui-focused fieldset': {
                border : "1px solid " + theme.palette.blue.A100 + ' !important'
            },
        },
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

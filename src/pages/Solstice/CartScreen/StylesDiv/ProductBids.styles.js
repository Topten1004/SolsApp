import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    root : {
        minHeight : 500,
        "& .MuiFormControl-root" : {
            borderRadius : 5,    background: '#2A2B31 !important',
            paddingTop : 10, paddingBottom : 10,
            boxShadow: '0 5px 5px #2A2B31',
            color : '#43D9AD',
            "& svg" :{
                color : 'white'
            },
        },
        '& .MuiOutlinedInput-root': {
            minWidth : '100px !important',
            '& fieldset': {
                borderColor: '#2A2B31 !important',
            },
            '&:hover fieldset': {
                borderColor: '#2A2B31 !important',
            },
            '&.Mui-focused fieldset': {
                border : '1px solid #2A2B31 !important'
            },
        },
        "& .MuiInputBase-input" :{
            padding : 0,
            color : 'white !important',
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
    searchDiv : {
        color : theme.palette.green.A200,
        display : 'flex', justifyContent : 'center' , alignItems : 'center', gap : '20px',
        padding : 10, paddingLeft : 10, paddingRight : 10,
        marginBottom : 20,
        borderRadius : theme.border.borderRadius.tiny,
        width : 500 
    },
    calendarDiv : {
        color : theme.palette.green.A200,
        display : 'flex', justifyContent : 'center' , alignItems : 'center', gap : '20px',
        padding : 10, paddingLeft : 10, paddingRight : 10,
        marginBottom : 20,
        borderRadius : theme.border.borderRadius.tiny,
        width : 450 
    },
})) ;
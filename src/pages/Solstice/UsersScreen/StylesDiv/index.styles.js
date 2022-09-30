import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : "#011627",
        minHeight : '100vh',
        position : 'relative',
    },
    greenBlur : {
        position : 'absolute',
        width: 200,
        height: 150,
        left: 45,
        top: 170,

        background: '#43D9AD',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    blueBlur : {
        position : 'absolute',
        width: 200,
        height: 150,
        right: 45,
        top: 400,

        background: '#4D5BCE',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    pageTitleDiv : {
        paddingLeft : 30,
        paddingTop : 30,
        paddingBottom : 10,
        color : theme.palette.green.A200, fontSize : 35, fontWeight : 'bold',

        borderBottom : '1px solid gray' 
    },
    searchDiv : {
        color : theme.palette.green.A200,
        display : 'flex', justifyContent : 'center' , alignItems : 'center', gap : '20px',
        background : theme.palette.blue.A200,
        padding : 10, paddingLeft : 10, paddingRight : 10,
        marginBottom : 20,
        marginLeft : 30, marginTop : 20,
        borderRadius : theme.border.borderRadius.tiny,
        width : 400 ,
        
        "& svg" : {
            color : theme.palette.green.A200 + " !important"
        },

        ['@media (max-width: 800px)'] : {
            flexDirection : 'column !important',
            alignItems : 'flex-start',
            width : '100%'
        },

        "& .MuiFormControl-root" : {
            borderRadius : 5,
            color : '#43D9AD',
            "& svg" :{
                color : 'white'
            },
        },
        "& .MuiInputBase-input" :{
            color : '#43D9AD !important',
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
}));
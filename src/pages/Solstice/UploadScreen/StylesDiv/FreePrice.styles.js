import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : "#011627",
        minHeight : '100vh',
        position : 'relative',
        paddingLeft : '100px', paddingRight : '100px',
        color  : theme.palette.green.A200,
        ['@media (max-width : 1365px)'] : {
            padding : 20,
        },
        "& .swiper" : {
            width : '270px !important', height : '400px !important',
        },
        "& .swiper-slide" : {
            background : 'rgba(51, 139, 239, 0.21) !important',
            borderRadius : '10px',
            width : '270px !important', height : '400px !important', 
            background : 'linear-gradient(135deg, #e52d65 0%, #629df6 53.09%, #3c1d9d 100%) !important',
            "& video" : {
                background : 'linear-gradient(135deg, #e52d65 0%, #629df6 53.09%, #3c1d9d 100%) !important',
            }
        },
        '& .MuiOutlinedInput-root': {
            padding : '0px !important',
            '& fieldset': {
                border : 'none !important'
            },
            '&:hover fieldset': {
                border : 'none !important'
            },
            '&.Mui-focused fieldset': {
                border : 'none !important'
            },
        },

        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
        {
            display: 'none',
        },
    },
    pageTitleDiv : {
        color :'white', fontSize : 30, fontWeight : 'bold',
        height : 80,
        display : 'flex', alignItems : 'flex-end', justifyContent : 'flex-start'
    },
    typeDiv : {
        background : '#253341',
        cursor : 'pointer',
        borderRadius : 10,
        color : '#43D9AD',  fontSize : 18,
        padding : 10,
        marginTop : 10,
        width : 400,
        display : 'flex', justifyContent : 'flex-start', alignItems : 'center',
        ['@media (max-width : 730px)'] : {
            flexDirection : 'column',
            height : 'auto', width : '100%'
        },
    },
    priceCard  :{
        background: 'rgba(51, 139, 239, 0.21)',
        borderRadius : 30,
        width : 270, height : 200,
        ['@media (max-width : 925px)'] : {
            width : '100%'
        },
        display : 'flex', alignItems : 'center', justifyContent : 'center',
        "& .MuiFormControl-root" : {
            borderBottom : '1px solid gray !important',
        },
        "& .MuiInputBase-input" :{
            color : '#43D9AD !important',
            border : 'none !important',
            fontFamily : 'Montserrat !important',
            padding : '0px !important',
            fontSize : 35,
            width : '100px !important',
            textAlign : 'right'
        },
        "& .MuiInputAdornment-root" : {
            "& .MuiFormControl-root" : {
                borderBottom : 'none !important',
            },
            "& .MuiInputBase-input" :{
                border : 'none !important',
                color : '#43D9AD !important', fontFamily : 'Montserrat !important', fontSize : 15, fontWeight : 'bold !important',
                width : '100px !important',
                display  : 'flex !important', alignItems : 'flex-end !important', gap : '5px !important'
            },
            "& svg" :{
                color : 'white'
            }
        },
    },
    calendarDiv : {
        width : 100, height : 100,
        border : '2px solid #43D9AD', borderTop : '10px solid #43D9AD', 
        display : 'flex', justifyContent : 'center', alignItems : 'center',
        alignSelf : 'center',
        color : '#43D9AD', fontSize : 35, fontFamily : 'Montserrat', fontWeight : 'bold',
        cursor : 'pointer'
    },
    greenBlur : {
        background: '#43D9AD',
        width: 200, height: 150,
        position : 'absolute', left: 45, top: 170,
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    blueBlur : {
        background: '#4D5BCE',
        width: 200, height: 150,
        position : 'absolute', right: 45, top: 400,
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    selectDiv : {
        "& .MuiPaper-root" : {
            backgroundColor : 'transparent !important'
        },
        "& .MuiList-root" : {
            padding : '0px !important',
        },
        "& .MuiMenuItem-root" : {
            borderBottom : '1px solid '+ theme.palette.blue.A200 +' !important',
            "&:last-child" : {
                borderBottom : 'none !important',
            },
            background : "#1d6c7e !important",
            color : theme.palette.green.A200 + " !important",
        },
    },
}))
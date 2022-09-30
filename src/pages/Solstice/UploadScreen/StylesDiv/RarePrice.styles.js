import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : "#011627",
        minHeight : '100vh',
        position : 'relative',
        paddingLeft : '100px',
        ['@media (max-width : 1385px)'] : {
            paddingLeft : '20px'
        },
        '& .MuiSlider-thumb': {
            backgroundColor: '#11A3F4',
        },
        '& .MuiSlider-track': {
            backgroundColor: '#11A3F4',
        },
        '& .MuiSlider-rail': {
            opacity: 0.5,
            backgroundColor: '#bfbfbf',
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
        width : 450, height : 30,
        display : 'flex', justifyContent : 'flex-start',  alignItems : 'center',
        ['@media (max-width : 730px)'] : {
            flexDirection : 'column',
            height : 'auto',
            width : '90%'
        },
    },
    priceCard  :{
        background: 'rgba(51, 139, 239, 0.21)',
        borderRadius : 30,
        width : 270, height : 200,
        ['@media (max-width : 855px)'] : {
            width : '100%',
            textAlign : 'left'
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
    availableCount : {
        background: 'rgba(51, 139, 239, 0.21)',
        borderRadius : 30,
        width : 270, height : 200,
        ['@media (max-width : 855px)'] : {
            width : '90%',
            textAlign : 'left'
        },
        display : 'flex', alignItems : 'center', justifyContent : 'center',
        "& .MuiFormControl-root" : {
            borderBottom : '1px solid gray !important',
        },
        "& .MuiInputBase-input" :{
            border : 'none !important',
            color : '#43D9AD !important', fontSize : '35px !important', fontFamily : 'Montserrat !important',
            padding : '0px !important',
            width : '100px !important',
            textAlign : 'center'
        },
    },
    priceCardTitle : {
        fontSize : 20, fontFamily : 'Montserrat',
        textAlign : 'center',
        width : 270,
        ['@media (max-width : 855px)'] : {
            width : '100%',
            textAlign : 'left'
        },
        marginTop : 10, marginBottom : 10
    },
    paymentCard : {
        cursor : 'pointer',
        borderRadius : '5px !important',
        "&:hover" : {
            border : '2px solid white !important',
            borderRadius : '5px !important',
        }
    },
    activePaymentCard : {
        border : '3px solid #43D9AD !important',
        borderRadius : '5px !important',
    },
    royaltyFeeDiv :{
        width : 400, 
        ['@media (max-width : 855px)'] : {
            width : '100%',
            textAlign : 'left'
        },
        color : '#43D9AD', fontSize: 20, fontFamily : 'Montserrat',
        height : 40,
        display : 'flex',  alignItems : 'center',
    },
    royaltyCardDiv : {
        background: 'rgba(51, 139, 239, 0.21)',
        borderRadius : 30,
        padding : 10, paddingLeft : 30,
        width : 500,  height : 100,
        ['@media (max-width : 855px)'] : {
            width : '100%',
        },
        display : 'flex',  alignItems : 'flex-end',
    },
    percentTipDiv : {
        color : '#43D9AD', fontSize: 20,  fontFamily : 'Montserrat', 
        width : '150px',
        textAlign : 'center'
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
    bankAccountDiv : {
        backgroundColor : '#23262F',
        color : 'white', fontSize: 20, fontFamily : 'Montserrat',
        padding : 20,
        borderRadius : 15,
        width : 400, 
        ['@media (max-width : 1280px)'] : {
            width : '90%'
        }
    },
    timeFrameCardDiv : {
        backgroundColor : 'rgba(51, 139, 239, 0.21)',
        borderRadius  :30,
        padding : '25px',
        fontFamily : 'Montserrat', fontSize : '50px', color : '#43D9AD !important',
        width : 500, height : 200,
        ['@media (max-width : 1280px)'] : {
            width : '90%'
        },
        display  :'flex', justifyContent : 'center', alignItems : 'center',
        cursor : 'pointer'
    },
    radioBoxCss: {
        color: '#3772FF !important',
        '&.Mui-checked': {
            color: '#3772FF !important',
        },
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
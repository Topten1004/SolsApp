import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : "#011627",
        minHeight : '100vh',
        position : 'relative',
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
        display : 'flex',  alignItems : 'flex-end', justifyContent : 'flex-start',
        color :'white', fontSize : 30, fontWeight : 'bold',
        paddingLeft : 100,
        height : 80,
        ['@media (max-width : 830px)']  :{
            width : '90%',
            paddingLeft : 10
        },
    },
    typeDiv : {
        background : '#253341',
        cursor : 'pointer',
        width : 450, height : 30,
        borderRadius : 10,
        color : '#43D9AD',  fontSize : 18,
        padding : 10,
        marginTop : 10, marginLeft : 100,
        display : 'flex',  justifyContent : 'flex-start',  alignItems : 'center',
        ['@media (max-width : 830px)']  :{
            width : '90%',
            margin : 10,
        },
        ['@media (max-width : 680px)']  :{
            flexDirection : 'column',
            height : 'auto',
        },
    },
    resellCountDiv : {
        background: 'rgba(51, 139, 239, 0.21)',
        borderRadius : 30,
        width : 250,  height : 150,
        ['@media (max-width : 1170px)']  :{
            width : '100%'
        },
        display : 'flex',  alignItems : 'center', justifyContent : 'center',
        "& .MuiFormControl-root" : {
            borderBottom : '1px solid gray !important',
        },
        "& .MuiInputBase-input" :{
            color : '#43D9AD !important',
            border : 'none !important',
            fontSize : '20px !important',
            fontFamily : 'Montserrat !important',
            padding : '0px !important',
            fontSize : 35,
            width : '100px !important',
            textAlign : 'center'
        },
    },
    symbolDiv : {
        borderLeft : '1px solid gray !important',
        paddingLeft : '5px !important'
    },
    gridDivForCard : {
        display : 'flex', flexDirection : 'column', alignItems : 'center', justifyContent : 'space-around', 
        height : 300,
        ['@media (max-width : 1170px)']  :{
            height : 200,
            marginTop : '20px !important',
        },
    },
    priceCard  :{
        background: 'rgba(51, 139, 239, 0.21)',
        borderRadius : 30,
        width : 250, height : 150,
        ['@media (max-width : 1170px)']  :{
            width : '100%'
        },
        display : 'flex', alignItems : 'center', justifyContent : 'center',
        "& .MuiFormControl-root" : {
            borderBottom : '1px solid gray !important',
        },
        "& .MuiInputBase-input" :{
            color : '#43D9AD !important',
            border : 'none !important',
            fontSize : '20px !important',
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
    cardDiv : {
        color: '#43D9AD',
        ['@media (max-width : 1170px)']  :{
            width : '90%'
        }
    },
    priceCardTitle : {
        fontSize : 20, fontFamily : 'Montserrat',
        textAlign : 'center',
        marginTop : 10, marginBottom : 10,
        ['@media (max-width : 1170px)']  :{
            textAlign : 'left'
        }
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
        color : '#43D9AD', fontFamily : 'Montserrat',fontSize: 20,
        height : 40,
        display : 'flex',alignItems : 'center',
        ['@media (max-width : 1280px)'] : {
            width : '100%'
        },
    },
    royaltyCardDiv : {
        background: 'rgba(51, 139, 239, 0.21)',
        borderRadius : 20,
        padding : 10, paddingLeft : 30,
        width : 500,  height : 100,
        ['@media (max-width : 1280px)'] : {
            width : '100%'
        },
        display : 'flex', alignItems : 'flex-end',
    },
    percentTipDiv : {
        color : '#43D9AD', 
        fontSize: 20, 
        fontFamily : 'Montserrat', 
        width : '150px',

        textAlign : 'center'
    },
    royaltyDiv : {
        ['@media (max-width : 1280px)'] : {
            width : '90%'
        },
    },
    feeDetailDiv : {
        background: 'rgba(51, 139, 239, 0.21)',
        borderRadius : 20,
        color : '#43D9AD', fontFamily : 'Montserrat',  fontSize: 20, 
        padding : 10, paddingLeft : 30,
        width : 500,  height : 100,
        ['@media (max-width : 1280px)'] : {
            width : '90%'
        },
        display : 'flex', flexDirection : 'column', justifyContent : 'space-around',
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
        },
    },
    addTimeZoneDiv : {
        backgroundColor : 'rgba(51, 139, 239, 0.21)',
        borderRadius  :'20px',
        padding : '25px',
        fontFamily : 'Montserrat',
        width : 500,  height : 200,
        ['@media (max-width : 1280px)'] : {
            width : '90%'
        },
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
}));
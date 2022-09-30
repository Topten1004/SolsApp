import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : "#011627",
        minHeight : '100vh',
        position : 'relative',
         "& .MuiFormControl-root" : {
            border : 'none !important',
            color : '#43D9AD',
            "& svg" :{
                color : 'white'
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
        "& .MuiInputBase-input" :{
            color : '#43D9AD !important',
            border : 'none !important',
            fontSize : '20px !important',
            fontFamily : 'Montserrat !important',
            padding : '0px !important',
        },
    },
    zeroToOneDiv : {
        fontSize : 30, fontWeight : 'bold', color :'white',
        paddingLeft : 100,
        height : 120,
        display : 'flex', alignItems : 'center', justifyContent : 'flex-start'
    },
    messageDiv : {
        borderRadius : 30,
        background : 'rgba(51, 139, 239, 0.21)',
        padding : 30, paddingLeft : 50,
        display : 'flex', flexDirection : 'column !important',
        width : 450,
        ['@media (max-width : 1220px)'] : {
            width : '90%'
        },
    },
    chatDiv : {
         fontSize : 20, color : '#43D9AD',
        display : 'flex', flexWrap : 'wrap'
    },
    settingDiv : {
        background : 'rgba(51, 139, 239, 0.21)',
        "&:hover" : {
            background : 'rgb(130 182 241 / 21%)'
        },
        borderRadius : 30,
        paddingTop : 20, paddingBottom : 20,
        width : 300,
        ['@media (max-width : 1220px)'] : {
            width : '90%'
        },
        display : 'flex', justifyContent : 'space-around', alignItems : 'center',
        cursor : 'pointer',
    },
    linkDiv : {
        marginTop : '50px',
        marginBottom : '40px',
    },
    linkItemDiv : {
        borderRadius : 10,
        background : '#253341',
        color : '#43D9AD',  fontSize : 18,
        display : 'flex', justifyContent : 'center', alignItems : 'center',
        paddingLeft : 20, paddingRight : 20,
        height : 45,
        cursor : 'pointer'
    },
    productTypeDiv : {
        fontFamily : 'Montserrat',
        height : 350,
        ['@media (max-width : 1220px)'] : {
            height : 'auto',
        },
    },
    productTypeLabel : {
        color : 'white',  fontWeight : 'bold', fontSize : 30,
        display : 'flex', justifyContent : 'flex-start', alignItems : 'center',
        width : 450, height : 80,
        ['@media (max-width : 720px)'] : {
            width : '90%',
        },
    },
    typeDiv : {
        cursor : 'pointer',
        borderRadius : 10,
        "&:hover" : {
            background : '#375068 !important',
        },
        color : '#43D9AD',  fontSize : 18,
        padding : 30,
        display : 'flex', justifyContent : 'flex-start', alignItems : 'center',
        ['@media (max-width : 720px)'] : {
            flexDirection : 'column', 
            height : 'auto',
            padding : 10,
            width : '90%',
            "& div" : {
                textAlign : 'center'
            }
        },
        width : 450, height : 30,
    },
    typeDescriptionDiv : {
        width : '100%',
    },
    typeDetailDiv : {
        borderRadius : 10,
        background : '#253341',
        color : '#43D9AD',  fontSize : 20,
        padding : 30,
        display : 'flex', flexDirection : 'column !important', justifyContent : 'flex-start', alignItems : 'center',
        width : 450, height : '100%',
        ['@media (max-width : 720px)'] : {
            textAlign : 'center',
            width  : '90%'
        },
    },
    typeTitleDiv : {
        fontSize : 30, fontWeight : 'bold',
        marginBottom : 10
    },
    greenBlur : {
        width: 200, height: 150,
        position : 'absolute', left: 45, top: 170,
        background: '#43D9AD',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    blueBlur : {
        width: 200, height: 150,
        position : 'absolute', right: 45, top: 400,
        background: '#4D5BCE',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    }
})) ;
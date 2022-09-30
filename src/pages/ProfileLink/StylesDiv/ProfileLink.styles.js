import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    root : {
        "& .swiper" : {
            marginLeft : '30px', marginRight : '30px',
        },
        "& .swiper-slide" : {
            width : '260px !important', height: '300px !important',
            display : 'flex !important', alignItems : 'center !important', justifyContent : 'center',
        },
        "& .swiper-slide-shadow-left" : {
            borderRadius : '20px !important'
        },
        "& .swiper-slide-shadow-right" : {
            borderRadius : '20px !important'
        },
    },
    container : {
        backgroundColor : "#010C15",
        position : 'relative',
        minHeight: '100vh',
        overflowX : 'hidden',
        "& .MuiGrid-item" : {
            zIndex: 1000
        },
    },
    rectBackground : {
        background : "#011627",
        border : "1px solid #1E2D3D", borderRadius : 20,
        position : 'absolute', left : 30, bottom : 20, top : 0,
        width : '100%',
    },
    productThumbDiv : {
        display : 'flex', flexWrap : 'wrap', gap : '10px',
        marginLeft : 20,
        paddingTop : 10,
        overflowY : 'scroll', overflowX : 'hidden',
        width : '100%',
    },
    productDetailsDiv : {
        display : 'flex', flexDirection  :'column',
        marginLeft : 20,
        overflowY : 'scroll', overflowX : 'hidden',
        width : '100%',
    },
    productItem  : {
        display : 'flex', flexDirection : 'column', alignItems : 'center', justifyContent : 'space-between',
        width : 200, height : 230,
        transition: 'all .2s ease',
        "&:hover" : {
            // marginTop : -20,
        }
    },
    itemDiv : {
        cursor : 'pointer',
        border  : '3px solid ' + theme.palette.green.A200,
        display : 'flex', alignItems : 'center', justifyContent : 'center',
        borderRadius : 20,
        boxSizing : 'border-box',
        width : 170,
        height: 140
    },
    slideDiv : {
        position : 'relative',
        display : 'flex', alignItems : 'center', justifyContent : 'center',
        background : theme.palette.blue.main + ' !important',
        width : '245px !important', height : '290px !important',
        border : '2px solid ' + theme.palette.green.A200,
        borderRadius : '5px !important',
        overflow : 'hidden',
        "& img" : {
            borderRadius : 5
        },
        "& div" : {
            color : theme.palette.green.A200 + ' !important',
            overflow : 'hidden !important'
        }
    },
    productItemLabel : {
        paddingTop : 20, paddingBottom : 20,
        textAlign : 'center', color : 'white',
    },
    productThumb : {
        borderRadius : 10,
        zIndex : 1000,
        boxSizing : 'border-box !important',
        background  : 'rgba(51, 139, 239, 0.21) !important',
        width : 170, height : 140,
        "&:hover" : {
            border : '5px solid #43D9AD'
        }
    },
    productThumbActive : {
        border : '5px solid #43D9AD',
        background  : 'rgba(51, 139, 239, 0.21) !important',
        borderRadius : 10,
        zIndex : 1000,
        boxSizing : 'border-box !important',
        width : 170, height : 130,
    },
    greenBlur : {
        background: '#43D9AD',
        position : 'absolute', left: 45, bottom : 0,
        width: 200, height: 150,
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    blueBlur : {
        background: '#4D5BCE',
        width: 200, height: 150,
        position : 'absolute', right: 45, top: 0,
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    messageDiv : {
        display : 'flex', flexDirection : 'column', justifyContent : 'flex-start',
        marginBottom : 30,
        zIndex : 1,
        color : theme.palette.green.A200, fontSize : '20px !important', fontFamily : 'Montserrat !important',
        background: 'rgba(51, 139, 239, 0.21) !important',
        borderRadius : '30px !important',
        letterSpacing : 1,
        padding : 20,
        minHeight : 150,
        overflowY : 'scroll'
    },
    slashDiv : {
        color : '#A3AFBD', 
        marginBottom : 10, marginLeft : 60,  marginRight : 60,
        display : 'flex', justifyContent : 'space-between', flexWrap : 'wrap',
        zIndex : '-1000 !important',
    },
    productItemDescription  : {
         fontWeight : 'bold',  color : 'white',
        textAlign : 'center',
        marginTop : 20, marginBottom : 20,
        zIndex : 200,
    },
    swiperDiv : {
        display : 'flex', justifyContent : 'center', alignItems : 'center',
        position : 'relative',
        overflowX : 'hidden',
        overflowY : 'hidden',
        height: '330px !important',
    },
    productFeatureDiv : {
        background: 'rgba(51, 139, 239, 0.21)',
        color : 'white',
        borderRadius : 20,
        paddingTop : 3, paddingBottom : 3, paddingRight : 20, paddingLeft : 20,
        width : 'auto',
        marginLeft : 10, marginRight : 10,
        display : 'flex', alignItems : 'center', justifyContent : 'flex-start', flexWrap : 'wrap',
        zIndex : 100
    },
    featureHighlight : {
        color : theme.palette.blue.A100,
        cursor : 'pointer'
    },
    productButtonCss  :{
        backgroundColor : '#4BFF2E !important',
        color : 'black !important',
        textTransform : 'none !important',
        fontWeight : 'bold !important',
        marginLeft : '10px !important', marginRight : '10px !important'
    },
    buttonGroup : {
        marginTop : '20px !important',
        display : 'flex', flexWrap : 'wrap', justifyContent : 'center'
    },
    preDiv : {
        paddingLeft : '10px !important',
        marginTop : '10px !important', marginBottom : '0px !important',
        whiteSpace: 'pre-wrap !important',
        fontFamily : 'Montserrat !important'
    },
    emptyDiv : {
        width : 250,
        color : '#43D9AD', fontFamily : 'Montserrat', fontSize : '18px',
        display : 'flex', flexDirection : 'column', alignItems : 'center',
        background : theme.palette.blue.A200,
        padding : 30,
        borderRadius : 20,
        boxShadow : "1px 1px 7px 0px rgb(243 101 147 / 68%), 0px -2px 12px 4px rgb(108 101 243 / 49%)"
    },
    hoveringDiv : {
        "&:hover" : {
            boxShadow : '0px 12px 20px ' + theme.palette.blue.A300,
            marginTop : -10,
        },
        borderRadius : 20,
        transition: 'all .2s ease'
    }
}))
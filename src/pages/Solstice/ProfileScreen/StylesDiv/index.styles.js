import { makeStyles, useTheme } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    root : {
        "& .swiper" : {
            marginLeft : '30px', marginRight : '30px',
        },
        "& .swiper-slide" : {
            width : '250px !important', height: '300px !important'
        },
        "& .swiper-slide video" : {
            background : 'rgba(51, 139, 239, 0.21) !important',
            width : '246px !important', height : '296px !important',
            border : '2px solid ' + theme.palette.green.A200,
            borderRadius : '5px !important',
            background : 'linear-gradient(135deg, #e52d65 0%, #629df6 53.09%, #3c1d9d 100%) !important',
            "& video" : {
                background : 'linear-gradient(135deg, #e52d65 0%, #629df6 53.09%, #3c1d9d 100%) !important',
            }
        },
    },
    slideDiv : {
        position : 'relative',
        display : 'flex', alignItems : 'center', justifyContent : 'center',
        background : 'rgba(51, 139, 239, 0.21) !important',
        width : '246px !important', height : '296px !important',
        border : '2px solid ' + theme.palette.green.A200,
        borderRadius : '5px !important',
        background : 'linear-gradient(135deg, #e52d65 0%, #629df6 53.09%, #3c1d9d 100%) !important',
        overflow : 'hidden',
        "& img" : {
            borderRadius : 5
        }
    },
    downloadDiv : {
        position : 'absolute',
        "& img" : {
            cursor : 'pointer'
        },
        padding : 5,
        borderRadius : '50%',
        bottom : 10, right : 10,
        display : 'flex', alignItems :'center', justifyContent : 'center',
    },
    container : {
        backgroundColor : "#010C15",
        position : 'relative',
        minHeight: '100vh',
        overflowX : 'hidden',
        "& .MuiGrid-item" : {
            zIndex: 2
        }
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
        overflowY : 'scroll', overflowX : 'hidden',
        width : '100%',
        paddingTop : 10
    },
    productDetailsDiv : {
        display : 'flex', flexDirection  :'column',
        marginLeft : 20,
        overflowY : 'scroll', overflowX : 'hidden',
        width : '100%',
    },
    productItem : {
        width : 200, height : 210,
        display : 'flex', flexDirection : 'column', alignItems : 'center', justifyContent : 'space-between',
        cursor : 'pointer', 
        zIndex : 1000,
    },
    productItemLabel : {
        paddingTop : 20, paddingBottom : 20,
        textAlign : 'center', color : 'white',
        
    },
    productThumb : {
        display : 'flex' , alignItems: 'center', justifyContent: 'center',
        borderRadius : 10,
        zIndex : 1000,
        boxSizing : 'border-box !important',
        background : 'linear-gradient(135deg, #e52d65 0%, #629df6 53.09%, #3c1d9d 100%) !important',
        width : 170, height : 130,
        overflow : 'hidden',
        "& img" : {
            borderRadius : 10
        },
        "&:hover" : {
            border : '4px solid #43D9AD'
        }
    },
    productThumbActive : {
        display : 'flex' , alignItems: 'center', justifyContent: 'center',
        background : 'linear-gradient(135deg, #e52d65 0%, #629df6 53.09%, #3c1d9d 100%) !important',
        border : '4px solid #43D9AD',
        borderRadius : 10,
        zIndex : 1000,
        boxSizing : 'border-box !important',
        width : 170, height : 130,
        "& img" : {
            borderRadius : 10
        }
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
        display : 'flex', flexDirection : 'column', justifyContent : 'center',
        position : 'relative',
        marginBottom : 30,
        borderRadius : 20,
        zIndex : 100,
        // boxShadow : "-2px -2px 10px 5px rgb(104 223 162 / 38%), 2px 2px 17px 5px rgb(103 101 243 / 61%)",

        "& .MuiFormControl-root" : {
            background: 'rgba(51, 139, 239, 0.21) !important',
            borderRadius : '20px !important',
            color : '#43D9AD',
            "& svg" :{
                color : 'white'
            }
        },
        '& .MuiOutlinedInput-root': {
            borderRadius : '20px !important',
            '& fieldset': {
                borderColor: 'none !important', borderRadius : '20px !important',
            },
            '&:hover fieldset': {
                borderColor: 'none !important',
            },
            '&.Mui-focused fieldset': {
                border : 'none !important'
            },
        },
        "& .MuiInputBase-input" :{
            borderRadius : '20px !important',
            color : '#43D9AD !important', fontSize : '20px !important', fontFamily : 'Montserrat !important',
            letterSpacing : 1,
            paddingLeft : '20px !important', paddingRight : '20px !important',
        },
    },
    slashDiv : {
        color : '#A3AFBD', 
        marginBottom : 10, marginLeft : 20,  marginRight : 20,
        display : 'flex', justifyContent : 'space-between', flexWrap : 'wrap',
        zIndex : '1000 !important',
        "& .MuiGrid-item" : {
            display : 'flex', flexWrap : 'wrap'
        }
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
        height: '300px !important'
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
    buyButtonCss : {
        backgroundColor : '#338BEF !important',
        textTransform : 'none !important',
        marginRight : '10px !important', marginLeft : '10px !important',
        fontWeight : 'bold !important',
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
    messageIconCss :{
        position : 'absolute', right : '20px', bottom : '10px', 
        background : "rgb(95 199 175 / 57%)", 
        borderRadius : '50%', 
        padding : '5px', 
        display : 'flex', alignItems : 'center',
        transition : 'box-shadow 0.5s',
        "&:hover" : {
            boxShadow : "1px 1px 7px 0px rgb(101 158 243 / 81%), 0px -3px 12px 4px rgb(108 101 243 / 49%)",
        }
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
        transition: 'all .2s ease',
        position : 'relative'
    },
    lockDiv : {
        position : 'absolute' ,
        width : '100%', height : '100%',
        left : 0, top : 0,
        padding : 10,
        borderRadius : 20,
        border : '1px soild red',
        display : 'flex', alignItems : 'flex-start', justifyContent : 'flex-end',
        zIndex : 10000,
        backdropFilter : 'blur(3px)'
    }
}))
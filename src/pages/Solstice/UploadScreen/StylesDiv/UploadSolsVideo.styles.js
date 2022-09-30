import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : "#011627",
        minHeight : '100vh',
        position : 'relative',
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
                borderRadius : '10px',
            }
        },
        "& .MuiFormControl-root" : {
            border : 'none !important',
            borderRadius : 5,
            color : '#43D9AD',
            "& svg" :{
                color : 'white'
            }
        },
        '& .MuiOutlinedInput-root': {
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
            color : '#43D9AD !important', fontSize : '25px !important',
            border : 'none !important',
            padding : '0px !important',
            textAlign : 'center !important'
        },
    },
    linkItemDiv : {
        borderRadius : 10,
        background : '#253341',
        transition : '0.2s',
        "&:hover" : {
            background : '#375068 !important',
        },
        color : '#43D9AD',  fontSize : 18,
        display : 'flex', justifyContent : 'center', alignItems : 'center',
        paddingLeft : 20, paddingRight : 20,
        height : 45,
        cursor : 'pointer',
        position : 'relative',
        zIndex : 1000
    },
    zeroToOneDiv : {
        fontSize : 30, fontWeight : 'bold', color :'white',
        paddingLeft : 70,
        height : 70,
        display : 'flex', alignItems : 'center', justifyContent : 'flex-start',
        marginBottom : 10
    },
    productTypeDiv : {
        display : 'flex', justifyContent : 'flex-start', alignItems : 'center', gap : '20px', flexWrap : 'wrap',
        paddingLeft : 70,
    },
    rightTopTitleDiv : {
        display : 'flex', justifyContent : 'center', alignItems : 'flex-end',
        color : 'white', fontSize : 30,
        paddingLeft : 30, paddingRight : 30
    },
    uploadSettingDiv : {
        display : 'flex', flexDirection : 'column !important',
        height : '100%',
        paddingTop : 30,
        overflowY: 'scroll',
    },
    selectCtrlCss : {
        transition : '0.2s',
        background : theme.palette.blue.A200,
        "&:hover" : {
            background : '#184b85',
            boxShadow : '2px 2px 15px #184b85',
        },
        "& img" : {
            cursor : 'pointer'
        },
        cursor : 'pointer',
        borderRadius : '10px',
        width : 350, height : 70,
        ['@media (max-width : 650px)'] : {
            width : 250
        },
        alignSelf : 'center',
        display : 'flex',  alignItems : 'center',  justifyContent : 'center',
        position : 'relative',
        zIndex : 2000
    },
    addLinkCss : {
        transition : '0.2s',
        background : '#1b8767',
        "&:hover" : {
            background : '#44a387',
            boxShadow : '2px 2px 15px ' + theme.palette.green.A200,
        },
        width : 350, height : 70,
        ['@media (max-width : 650px)'] : {
            width : 250
        },
        "& svg" : {
            cursor : 'pointer'
        },
        color : 'white', fontFamily : 'Montserrat', fontSize : '20px',
        display : 'flex', alignItems : 'center', justifyContent : 'center',
        alignSelf : 'center',
        borderRadius : '10px',
        position : 'relative',
        zIndex : 2000
    },
    videoSlideDiv : {
        marginTop : '50px',
        height : '370px',
        position : 'relative',
        display : 'flex', justifyContent : 'center', alignItems : 'center',
        color : 'white', fontFamily : 'Montserrat', fontSize : 18,
    },
    solListDiv : {
        paddingTop : '30px !important', paddingLeft : '20px !important', paddingRight : '20px !important',
        height : '70%',
        overflowY : 'scroll',
        // padding : '0px !important', paddingRight : '20px !important', 
        background : theme.palette.blue.main,
    },
    solListEmpytyDiv : {
        minHeight : '500px',
        paddingTop : '30px !important', paddingLeft : '20px !important', paddingRight : '20px !important',
        height : '70%',
        overflowY : 'scroll',
        // padding : '0px !important', paddingRight : '20px !important', 
        background : theme.palette.blue.main,
        display : 'flex', alignItems : 'center', justifyContent : 'center',
        animationDuration : '7s' ,
    },
    solEmtpyImgDiv  :{
        borderRadius : 20,
        width : '100%', height : 'calc(100% - 50px)',
        minHeight : '300px',
        display : 'flex', justifyContent : 'center', alignItems : 'center',
        background : theme.palette.blue.A200,
        // animation: `$empty-list-animation linear infinite running` ,
        animation: `$empty-list-animation 2000ms linear infinite running` ,
    },
    solItemDiv : {
        borderBottom : '1px solid #EFEFEF',
        display : 'flex !important', justifyContent : 'space-between !important',
        paddingTop : '10px !important',  paddingBottom : '10px !important'
    },
    solName  :{
         "& .MuiFormControl-root" : {
            border : 'none !important',
        },
        "& .MuiInputBase-input" :{
            color : 'white !important', fontSize : '17px !important', fontWeight : '300 !important',
            textAlign : 'left !important'
        },
    },
    solTime : {
        width : 70, 
        display : 'flex', alignItems: 'center', justifyContent : 'space-between',
        color : 'white',
        textTransform : 'capitalize'
    },
    greenBlur : {
        background: '#43D9AD',
        width: 200,  height: 150,
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
    "@keyframes empty-list-animation" : {
        "0%" : {
            boxShadow : "2px 2px 5px 0px rgb(101 158 243 / 81%), 2px 2px 5px 4px rgb(108 101 243 / 49%)",
        },
        "25%" : {
            boxShadow : "1px 1px 7px 0px rgb(101 158 243 / 81%), 0px -3px 12px 4px rgb(108 101 243 / 49%)",
        },
        "50%" : {
            boxShadow : "5px 5px 10px 0px rgb(101 158 243 / 81%), -5px -5px 15px 8px rgb(108 101 243 / 49%)",
        },
        "75%" : {
            boxShadow : "1px 1px 7px 0px rgb(101 158 243 / 81%), 0px -3px 12px 4px rgb(108 101 243 / 49%)",
        },
        "100%" : {
            boxShadow : "0px 0px 5px 0px rgb(101 158 243 / 81%), 0px 0px 5px 4px rgb(108 101 243 / 49%)",
        }
    },
}));
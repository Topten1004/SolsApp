import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : "#011627",
        minHeight : '100vh',
        position : 'relative',
        color : theme.palette.green.A200, fontFamily : "Montserrat", fontSize : 20,
        "& .swiper" : {
            width : '150px !important', height : '200px !important'
        },
        "& .swiper-slide" : {
            background : '#253341 !important',
            borderRadius : '10px',
            width : '150px !important', height : '200px !important',
            background : 'linear-gradient(135deg, #e52d65 0%, #629df6 53.09%, #3c1d9d 100%) !important',
            "& video" : {
                background : 'linear-gradient(135deg, #e52d65 0%, #629df6 53.09%, #3c1d9d 100%) !important',
            }
        },
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',

            border  :'1px solid #43D9AD'
        },
        "& .MuiTab-root" : {
            color : 'white',
            textTransform : 'capitalize',
            fontFamily : 'Montserrat',
            fontSize : 15,
        },
        '& .Mui-selected': {
            color: '#43D9AD !important',
        },
    },
    pageTitleDiv : {
        color :'white', fontSize : 30, fontWeight : 'bold',
        display : 'flex', justifyContent : 'flex-start', alignItems : 'flex-end',
        padding : 30
    },
    productCountDiv : {
        backgroundColor : '#253341',
        borderRadius : 15,
        width : 200,
        padding : 15,
        marginLeft : 30,
    },
    productInfoCard : {
        border : '5px solid white', borderRadius : 25,
        marginTop : '20px',  marginBottom : '20px',
        display : 'flex',
        ['@media (max-width : 930px)'] : {
            flexDirection : 'column',
        }
    },
    avatarDiv : {
        backgroundColor : '#404040',
        width : 200,
        borderTopLeftRadius : 20, borderBottomLeftRadius : 20,
        display : 'flex', flexDirection : 'column', justifyContent : 'space-between', alignItems : 'center',
        padding : 10,
        ['@media (max-width : 930px)'] : {
           borderBottomLeftRadius : 0,
           borderTopRightRadius : 20,
           width : '100%',
           gap : 20,
           alignItems : 'flex-start'
        }
    },
    productInfoDiv : {
        backgroundColor : 'rgba(250, 250, 250, 0.3)',
        height : '100%',
        borderTopRightRadius : 20, borderBottomRightRadius : 20,
        padding : 10,
        display : 'flex', flexDirection : 'column', alignItems : 'center',
        ['@media (max-width : 930px)'] : {
            borderTopRightRadius : 0,
            width : '100%',
            gap : 20
         }
    },
    slashDiv : {
        background : 'rgba(51, 139, 239, 0.21)',
        borderRadius : 20,
        marginTop : 20,
        padding : 20,
    },
    onlineTitleDiv : {
        color : 'white', fontWeight : 'bold', fontSize : 25,
        ['@media (max-width : 690px)'] : {
            fontSize : 20
        },
        ['@media (max-width : 620px)'] : {
            fontSize : 15
        }
    },
    onlineListDiv : {
        marginTop:'30px', 
        paddingRight:'50px',
        display : 'flex', flexDirection : 'column', color : '#43D9AD', alignItems :'flex-end', justifyContent:'space-between', 
        height : 200, fontSize : 20,
        ['@media (max-width : 620px)'] : {
            paddingRight : 10
        }
    },
    onlineCardDiv : {
        background: 'linear-gradient(to left, #003300 0%, gray 100%)',
        borderRadius : 25,
        width : 700,  minHeight : 400,
        marginTop : '20px', marginBottom : '20px',
        display : 'flex',
        padding : 5
    },
    onlineCardContent : {
        background : 'linear-gradient(to left, #444444 0%, #aaaaaa 100%)',
        borderRadius : 20,
        width : '100%',  height : '100%',
        padding : 20
    },
    memberInfoDiv :{
        display : 'flex', alignItems : 'center',
        color : 'white', fontSize : 25, fontWeight : 'bold',
        marginLeft : 10,
        ['@media (max-width : 690px)'] : {
            fontSize : 20
        },
        ['@media (max-width : 620px)'] : {
            fontSize : 15
        }
    },
    memberLabel : {
        color : 'white',
        ['@media (max-width : 690px)'] : {
            fontSize : 20
        },
        ['@media (max-width : 620px)'] : {
            fontSize : 15
        }
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
        position : 'absolute', width: 200,  height: 150,
        right: 45, top: 400,
        background: '#4D5BCE',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    buttonGroup : {
        display : 'flex',
        justifyContent : 'flex-end'  ,

        width : '100%',

        marginTop : 60,
    },
    buttonCss : {
        textTransform : 'capitalize !important',
        
        width : 120,
        height : 45,

        fontSize: '18px !important',
        marginRight : '20px !important',

        background : '#283646 !important'
    },
    loadingDiv : {
        position : 'fixed', left : 0 , top : 0 , zIndex: 2000,
        width : '100vw' , height : '100vh',
        backdropFilter : 'blur(5px)',

        display : 'flex' , alignItems : 'center', justifyContent : 'center' 
    }
}))

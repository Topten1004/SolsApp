import { makeStyles } from '@mui/styles' ;

export const useStyles = makeStyles((theme) => ({
    root : {
       
    },
    rootExpand : {
        borderBottomLeftRadius : 10,
        width : 500,
        marginBottom : '10px !important',
        position : 'fixed', top : 200, right : 0,
        zIndex : 2000,
        background : '#283940',

        animation: `$root-expand-animation 1000ms ease-in-out running` ,

        ['@media (max-width : 575px)'] : {
            width : '100%',
            top : 'calc(100vh - 550px)',
            right : 0,
            height : 550,
            borderBottom : 'none',
            borderBottomLeftRadius : 0,
            borderLeft : 'none',
            animation :`$root-expand-mobile-575-animation 1000ms ease-in-out running` ,
        },
        ['@media (max-width : 520px)'] : {
            top : 'calc(100vh - 600px)',
            height : 600,
            animation :`$root-expand-mobile-520-animation 1000ms ease-in-out running` ,
        },
        backdropFilter : 'blur(4px)'
    },
    rootLess : {
        width : 500,
        marginBottom : '10px !important',
        position : 'fixed', top : 200, right : -500,
        zIndex : 2000,
        background : '#283940',
        animation: `$root-less-animation 1000ms ease-in-out running` ,
        ['@media (max-width : 575px)'] : {
            width : '100%',
            top : '100vh',
            right : 0,
            height : 550,
            borderLeft : 'none',
            borderBottom : 'none',
            borderBottomLeftRadius : 0,
            animation :`$root-less-mobile-575-animation 1000ms ease-in-out running` ,
        },
        ['@media (max-width : 520px)'] : {
            height : 600,
            animation :`$root-less-mobile-520-animation 1000ms ease-in-out running` ,
        },
        backdropFilter : 'blur(4px)'
    },
    mainDiv : {
        padding : 20,
        ['@media (max-width :520px)'] : {
            padding : 10
        },
        position : 'relative',
        display : 'flex', flexDirection : 'column', justifyContent : 'center',
        height :"100%"
    },
    hintDiv : {
        cursor : 'pointer',
        background : '#283940',
        borderTopLeftRadius : 10,
        borderBottomLeftRadius : 10,
        width : 70, height : 70,
        display : 'flex', justifyContent : 'center', alignItems : 'center',
        position : 'absolute',
        top : 0, left : -70,
        zIndex : -999999,

        "& img" : {
            width : 25
        },

        ['@media (max-width : 575px)'] : {
            left : 'calc(100vw - 70px)',
            width : 70, height : 70,
            top : -70,
            borderBottomLeftRadius : 0,
            borderBottom : 'none',
        },
    },
    iconButton : {
        boxShadow : '0 0 10px #eee !important',
        transition : '0.3s',
        "&:hover" : {
            background : "#4c595e",
        },
        padding : 5,
        width : 45,
        height : 45,
        display :'flex', alignItems : 'center', justifyContent : 'center',
        borderRadius : '50%'
    },
    descriptionDiv : {
        padding : 10,
        color : theme.palette.green.A100,
        fontSize : 17,
        width : '100%',
        ['@media (max-width : 810px)'] : {
            fontSize : 18,
            padding : 10
        },
        ['@media (max-width : 530px)'] : {
            fontSize : 18,
            padding : 10
        },
        ['@media (max-width : 440px)'] : {
            fontSize : 17,
            padding : 5
        },
        ['@media (max-width : 340px)'] : {
            fontSize : 15,
            padding : 5
        },
    },
    buttonCss : {
        backgroundImage: 'linear-gradient(to right, #4CB8C4 0%, #3CD3AD  51%, #4CB8C4  100%)',
        marginTop : '20px !important',  marginLeft : '20px !important',
        textAlign: 'center',
        textTransform: 'capitalize !important',
        transition: '0.5s !important',
        backgroundSize: '200% auto !important',
        color: 'white',          
        boxShadow: '0 0 15px #eee !important',
        borderRadius: '30px !important',
        height : '50px !important',
        padding : '25px 25px !important',
        fontSize : '17px !important', color : "#2974b5 !important", fontWeight : 'bold !important',
 
        "&:hover" : {
            backgroundPosition: 'right center',
            color: '#fff',
            textDecoration: 'none',
        }
    },
    circlePrefix : {
        height: 17, width : 17,
        marginRight : 10,
        borderRadius : '50%', 
        border : '3px solid #55638d',
        background : '#d97272',
        transition : '0.5s'
    },
    active : {
        background : theme.palette.green.A200,
        transition : '0.5s'
    },
    walletDiv : {
        cursor : 'pointer',
        border : '2px solid #536d6e78',
        // background : '#536d6e78',
        borderRadius : 10,
        width : 220,
        padding : 10,
        color : theme.palette.green.A200, fontSize : 15,
        display : 'flex', alignItems : 'center', gap : '15px',

        "& img" : {
            borderRadius : 10
        },
    },
    activeWalletDiv : {
        background : '#536d6e78',
        transition : '0.3s'
    },
    buttonDiv : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        gap : '10px',
        ['@media (max-width : 650px)'] : {
            paddingLeft : 0
        }
    },
    animationDiv : {
        position : 'relative',
        color : theme.palette.green.A100,
        height : 230,
        border : '3px solid #536d6e78',
        padding : 20,
        borderRadius : 20,
        width : 450,
        overflow : 'hidden'
    },
    walletVisibleDiv : {
        position : 'absolute',
        animation: `$wallet-visible-animation 2000ms linear running` ,
    },
    walletCancelDiv : {
        display : 'flex', justifyContent: 'center', alignItems: 'center',
        width : '100%', height : '100%',
    },
    labelDiv : {
        marginTop : 5,
        color : theme.palette.green.A200,
        fontSize : 20, fontWeight : 'bold'
    },
    valueDiv : {
        marginTop : 3,
        paddingLeft : 10,
        fontSize : 15
    },
    "@keyframes root-expand-animation" : {
        "0%" : {
            right : -500
        },
        "100%" : {
            right : 0,
        }
    },
    "@keyframes root-less-animation" : {
        "0%" : {
            right : 0
        },
        "100%" : {
            right : -500,
        }
    },
    "@keyframes root-less-mobile-575-animation" : {
        "0%" : {
            top : 'calc(100vh - 550px)',
        },
        "100%" : {
            top : '100vh',
        }
    },
    "@keyframes root-expand-mobile-575-animation" : {
        "0%" : {
            top : '100vh'
        },
        "100%" : {
            top : 'calc(100vh - 550px)'
        }
    },
    "@keyframes root-less-mobile-520-animation" : {
        "0%" : {
            top : 'calc(100vh - 600px)'
        },
        "100%" : {
            top : '100vh'
        }
    },
    "@keyframes root-expand-mobile-520-animation" : {
        "0%" : {
            top : '100vh'
        },
        "100%" : {
            top : 'calc(100vh - 600px)'
        }
    },
    "@keyframes wallet-visible-animation" : {
        "0%" : {
            bottom : '100%'
        },
        "50%" : {
            bottom : '50%',
        },
        "100%" : {
            bottom : 20,
        }
    },
})) ;
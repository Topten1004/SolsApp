import { makeStyles } from '@mui/styles' ;

export const useStyles = makeStyles((theme) => ({
    root : {
        marginBottom : '10px !important',
        "& .MuiAccordion-root" : {
            backgroundColor : 'transparent !important',
            boxShadow : "none",
            zIndex: 2,
        } ,
        "& .MuiAccordionSummary-root" : {
            cursor : 'pointer',
            color : theme.palette.green.A200, fontSize : 25,
            ['@media (max-width : 690px)'] : {
                fontSize : 20
            },
            ['@media (max-width : 630px)'] : {
                fontSize : 18
            },
            ['@media (max-width : 610px)'] : {
                fontSize : 15
            },
            ['@media (max-width : 610px)'] : {
                fontSize : 13
            },
            ['@media (max-width : 530px)'] : {
                fontSize : 20
            },
            ['@media (max-width : 380px)'] : {
                fontSize : 18
            },
            ['@media (max-width : 320px)'] : {
                fontSize : 15
            },
            ['@media (max-width : 290px)'] : {
                fontSize : 13
            },
            borderRadius : 10,
            padding : 5, paddingLeft : 20 , paddingRight : 20,
            marginRight : '20px !important', marginTop : 7,
            minHeight : '65px !important',
            height : '65px !important',
            backgroundColor : 'rgba(51, 139, 239, 0.21) !important',

            display : 'flex', justifyContent : 'space-between', alignItems : 'center',
            "&:hover" : {
                backgroundColor : 'rgba(51, 139, 239, 0.21)',
            },
            "& .MuiAvatar-root" : {
                border : 'none !important'
            },
            "& svg" : {
                color : 'white !important'
            },
            
        },
        "& .MuiAccordionSummary-root.Mui-expanded" : {
            minHeight : '70px !important',
            height : '70px !important',
        },
    },
    descriptionDiv : {
        padding : 20,
        color : theme.palette.green.A100,
        fontSize : 20,
        width : '70%',
        ['@media (max-width : 960px)'] : {
            width : '100%'
        },
        ['@media (max-width : 810px)'] : {
            fontSize : 18,
            padding : 10
        },
        ['@media (max-width : 530px)'] : {
            fontSize : 18,
            padding : 10
        },
        ['@media (max-width : 420px)'] : {
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
        marginBottom : 10,
        width : 270,
        padding : 15,
        color : theme.palette.green.A200, fontSize : 18,
        display : 'flex', alignItems : 'center', gap : '15px',

        "& img" : {
            borderRadius : 10
        },
        ['@media (max-width : 595px)'] : {
            "& img" : {
                width : 40, height : 40
            },
            fontSize : 15,
            width : 'auto'
        },
        ['@media (max-width : 525px)'] : {
            "& img" : {
                width : 40, height : 40
            },
            fontSize : 18,
            width : 'auto'
        },
        ['@media (max-width : 300px)'] : {
            fontSize : 15,
        },
    },
    activeWalletDiv : {
        background : '#536d6e78',
        transition : '0.3s'
    },
    buttonDiv : {
        paddingLeft : 20,
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
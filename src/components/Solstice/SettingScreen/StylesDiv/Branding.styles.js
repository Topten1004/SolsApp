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
        width : '70%'
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
        background : '#d97272'
    },
    active : {
        background : theme.palette.green.A200
    }
})) ;
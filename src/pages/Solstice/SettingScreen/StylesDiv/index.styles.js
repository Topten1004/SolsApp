import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : "#011627",
        minHeight : '100vh',
        position : 'relative',
        color : theme.palette.green.A200,
        padding : 70,
        ['@media (max-width : 880px)'] : {
            padding : 30
        },
        ['@media (max-width : 370px)'] : {
            padding : 10
        },
    },
    buttonCss : {
        background : 'white !important',
        color : '#2196F3 !important',
        textTransform  :'capitalize !important',
        fontWeight : 'bold !important',

        marginRight : '10px !important'
    },
    greenBlur : {
        position : 'absolute',
        width: 200,
        height: 150,
        left: 45,
        top: 170,

        background: '#43D9AD',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    blueBlur : {
        position : 'absolute', right: 45, top: 400,
        width: 200, height: 150, 
        background: '#4D5BCE',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    titleDiv : {
        fontSize : 40, fontWeight : 'bold',
        ['@media (max-width : 820px)'] : {
            fontSize : 30
        },
        ['@media (max-width : 700px)'] : {
            fontSize : 25
        },
        ['@media (max-width : 610px)'] : {
            fontSize : 20,
        },
        ['@media (max-width : 535px)'] : {
            fontSize : 30,
            marginTop : 20
        },
        ['@media (max-width : 430px)'] : {
            fontSize : 25,
            marginTop : 20
        },
        ['@media (max-width : 320px)'] : {
            fontSize : 20,
            marginTop : 20
        }
    },
    descriptionDiv : {
        fontSize : 20,
        color : theme.palette.green.A100,
        ['@media (max-width : 820px)'] : {
            fontSize : 15
        },
        ['@media (max-width : 610px)'] : {
            fontSize : 18,
        },
        ['@media (max-width : 330px)'] : {
            fontSize : 15,
        }
    }
}))


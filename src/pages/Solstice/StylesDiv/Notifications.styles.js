import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    rootExpand : {
        position : 'fixed',
        zIndex : 4000,

        width : 270,
        height : '100vh',

        background : '#366059',

        top : 0, right : 0,

        height: '100vh',

        border : '2px solid #42e189', borderRadius : 10,
        paddingTop : 20,

        animation: `$root-expand-animation 1000ms ease-in-out running`
    },
    rootLess : {
        position : 'fixed',
        zIndex : 4000,

        width : 270,
        height : '100vh',

        background : '#366059',

        top : 0, right : -270,

        height: '100vh',

        border : '2px solid #42e189', borderRadius : 10,
        paddingTop : 20,

        animation : `$root-less-animation 1000ms ease-in-out running`
    },
    notifyDiv : {
        position : 'relative',
        cursor : 'pointer',
        margin : 5,
        marginBottom : 10,
        border : '1px solid #aacfa4', borderRadius : 10,
        display : 'flex', gap : 15,
        fontSize : 15,
        color : '#b0e1a9',

        padding : 5,
        paddingRight : 20,
        background : '#314e2f',

        // "&:hover" : {
        //     background : '#5e895b'
        // }
    },
    closeDiv : {
        position : 'absolute',
        top : 5, right : 5,

        width : 17, height : 17,
        background : '#cfb3b3e0',
        "&:hover" : {
            background : "#cd6565e0"
        },
        borderRadius : '50%',

        display : 'flex', alignItems : 'center', justifyContent : 'center'
    },
    "@keyframes root-expand-animation" : {
        "0%" : {
            right : -270 ,
        },
        "100%" : {
            right : 0
        }
    },
    "@keyframes root-less-animation" : {
        "0%" : {
            right : 0 ,
        },
        "100%" : {
            right : -270
        }
    },
})) ;
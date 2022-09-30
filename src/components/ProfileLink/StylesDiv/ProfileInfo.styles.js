import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    root : {
    },
    avatarCtrlDiv : {
        display : 'flex',
        justifyContent : 'center',
        position : 'relative',

        borderRadius : 10,
        zIndex : 0
    },
    avatarDiv : {
        zIndex : 2,
        position : 'absolute',
        
        top : '70%',

        display : 'flex',
        alignItems : 'flex-end',
        justifyContent : 'space-between',
        flexWrap : 'wrap',
        
        width  : '100%',

        padding : 10,
        paddingLeft : 30
    },
    avatar : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'column'
    },
    userNameDiv : {
        color : 'white',
        fontSize : 18
    },
    userInfoDiv : {
        color : 'white',

        marginLeft :  5 ,
        marginRight : 5
    },
    userInfoNumber : {
        textAlign : 'center',
        fontSize : 18
    },
    userInfoLabel  :{
        textAlign : 'center',
        fontSize : 15
    },
    coverPictureDiv : {
        border : '1px solid ' + theme.palette.blue.A100,
        borderRadius : 20,
        display : 'flex' , justifyContent : 'center', alignItems : 'center', flexDirection : 'column', gap : 20,
        color : theme.palette.green.A200,

        background : theme.palette.blue.A200,

    },
    productTypeDiv : {
        color : "#43D9AD",
        fontSize : 18,
        
        padding : 10,

        display : 'flex',
        alignItems : 'center',
        flexWrap : 'wrap',
        gap : '10px',
    },
    productType : {
        borderRadius : 20,
        cursor : 'pointer',
        paddingLeft : 15,
        paddingRight : 15,
        marginLeft : 5,
        marginRight : 5,

        zIndex : 2,

        "&:hover" :{
            backgroundColor : 'rgba(51, 139, 239, 0.21)',
        }
    },
    activeProductType : {
        display : 'flex',
        alignItems : 'center',
        gap : '5px'
    },
    jobTagDiv : {
        marginRight : '30px !important',
        backgroundColor : "rgba(51, 139, 239, 0.21) !important",

        paddingTop : '0px !important',
        paddingBottom : '0px !important',
        paddingLeft :  '10px !important',
        paddingRight : '10px !important',
        borderRadius : '25px !important',

        textTransform : 'capitalize !important',

        width : 118,
        height : 27,

        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',

        fontFamily: 'Montserrat !important',
        color : '#338BEF !important',

        zIndex : 1000
    },
    productListConfigDiv : {
        display : 'flex', justifyContent : 'flex-end', gap : 20, alignItems : 'center',

        "& img" : {
            cursor :'pointer'
        },

        color : theme.palette.green.A200,
        fontSize : 20,

        marginRight : 30
    },
    productListConfig : {
        display : 'flex',
        alignItems : 'flex-end'
    },
    productListType : {
        cursor : 'pointer',
    },
    dividerDiv : {
        borderBottom : '1px solid #EFF2F4',

        marginTop : 20,
        marginBottom : 20,
        marginLeft : 20,
        marginRight : 30
    },
}))
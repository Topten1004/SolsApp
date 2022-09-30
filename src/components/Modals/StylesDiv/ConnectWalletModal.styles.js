import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    root : {

    },
    paper : {
        fontFamily : 'Bahnschrift SemiBold',
        padding : 20,
        ['@media (max-width: 435px)'] : {
            padding : 0,
            paddingTop : 10, paddingBottom : 10
        },
        backgroundColor : 'white !important',
        borderRadius : '15px !important',
        boxShadow : "7px 4px 20px 1px rgb(101 117 243 / 68%), 4px -7px 13px 5px rgb(101 117 243 / 68%), 7px 8px 20px 8px rgb(48 175 70 / 67%) !important",

        "& .MuiDialogTitle-root" : {
            color : 'white'
        },
        "& img" : {
            borderRadius : 10
        }
    },
    titleDiv : {
        fontSize : '30px', fontWeight : '500', fontWeight:'bold' , 
        ['@media (max-width: 435px)'] : {
            fontSize : 20
        },
        textAlign : 'center', 
        lineHeight : '32px', 
    },
    userInfoDiv : {
        background : "#DEDEDE",
        borderRadius : 20,
        fontSize : 20,
        display : 'flex',justifyContent : 'center',
        width : 150,
        padding : 5
    },
    descriptionDiv : {
        fontSize : 20, 
        ['@media (max-width: 435px)'] : {
            fontSize : 15
        },
        textAlign : 'center',
        marginTop : '30px',
    },
    cancelButtonCss : {
        border : 'none !important',
        textTransform : 'capitalize !important',
        color : "#757575 !important", fontSize : '18px !important', fontWeight : 'bold !important'
    }
})) ;
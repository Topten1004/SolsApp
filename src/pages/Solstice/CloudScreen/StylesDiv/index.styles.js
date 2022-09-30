import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles(() => ({
    root : {
        backgroundColor : "#011627",
        minHeight : '100vh',
        position : 'relative',

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
        position : 'absolute',
        width: 200,
        height: 150,
        right: 45,
        top: 400,

        background: '#4D5BCE',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    tabDiv : {
        padding: '20px', paddingBottom  : '10px',  
        display : 'flex', justifyContent : 'space-between', alignItems : 'center',
        ['@media (max-width : 890px)'] : {
            flexDirection : 'column',
            alignItems : 'flex-start'
        }
    },
    buttonGroup :  {
        ['@media (max-width : 890px)'] : {
            marginTop : '20px',
            "& .MuiButtonBase-root" : {
                marginTop : '10px'
            }
        }
    }
}));
import { makeStyles } from '@mui/styles' ;

export const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : '#010C15',
        "& .Mui-disabled": {
            color : 'gray !important',
            backgroundColor: 'rgb(28, 37, 49) !important',
        },
    },
    descriptionDiv : {
        backgroundColor : '#011627',
        padding : 30,
        margin : 20,
        ['@media (max-width : 375px)'] : {
            margin : 10,
        },
        height : 'calc(100vh - 40px)',
        ['@media (max-width : 899px)'] : {
            height : 'auto',
        },
        border: '1px solid #1E2D3D',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: 8,
        position : 'relative',
        overflow : 'hidden'
    },
    helloDiv : {
        color: '#E5E9F0',  fontStyle: 'normal', fontWeight: 450, fontSize: 18,

        ['@media (max-width : 500px)'] : {
            fontSize : 15
        },
        ['@media (max-width : 454px)'] : {
            fontSize : 12
        },

        letterSpacing : 1.5,
        marginBottom : 10,
    },
    welcomeDiv : {
         fontStyle: 'normal', fontWeight: 400, fontSize: 62,
        letterSpacing : 5,
        marginBottom : 15,
        color: '#E5E9F0',

        ['@media (max-width : 480px)'] : {
            fontSize : 45
        },
        ['@media (max-width : 375px)'] : {
            fontSize : 35
        },
        ['@media (max-width : 320px)'] : {
            fontSize : 25
        },
    },
    tickDiv : {
        color : '#43D9AD', fontSize : 20, fontWeight : 400,

        marginBottom : 20,
        ['@media (max-width : 475px)'] : {
            fontSize : 15
        },
        ['@media (max-width : 362px)'] : {
            fontSize : 12
        },
        ['@media (max-width : 308px)'] : {
            fontSize : 11
        },
    },
    slashDiv : {
        color: '#607B96',
        fontSize : 14, fontWeight : 400,
        marginTop : 130, marginBottom : 80
    },
    lineDiv : {
        borderBottom : '2px solid #1E2D3D',
        marginLeft : -30, marginBottom : 80, marginTop : 30,
        width  : '70%',
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
        top: 450,

        background: '#4D5BCE',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    formDiv : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        
        height : '100vh',

        ['@media (max-width : 900px)'] : {
            height : 'auto',
        },
        ['@media (max-width : 950px)'] : {
            paddingLeft : 10,
            paddingRight: 10,
        },
        
        paddingLeft : '20%', paddingRight: '20%',
        
        "& .MuiGrid-item" : {
            display : 'flex', justifyContent : 'center'
        },

        // label css style
        "& .MuiInputAdornment-root" : {
            "& p" :{
                color : '#43D9AD !important'
            } 
        },
        "& .MuiInputLabel-root" : {
            color : "#43D9AD !important",
        },

        // form control background style
        "& .MuiFormControl-root" : {
            borderRadius : 5,
            color : '#43D9AD',
            "& svg" :{
                color : 'white'
            }
        },

        // when hover border color style
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#C3C7E5 !important',
            },
            '&:hover fieldset': {
                borderColor: '#C3C7E5 !important',
            },
            '&.Mui-focused fieldset': {
                border : '1px solid #C3C7E5 !important'
            },
        },

        // textfield color style or disabled color style
        "& .MuiInputBase-input" :{
            color : '#43D9AD !important',
        },
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: 'red',
        },
        "& .MuiFormHelperText-root" : {
            background : '#010C15 !important',
            color : 'red !important',
            marginTop : '10px !important'
        },

        "& .MuiMenuItem-root" : {
            border : '1px solid red !important'
        },

        "& .MuiChip-root" : {
            color : "#43D9AD !important",
            backgroundColor : '#4D5BCE'
        }
    },
    signUpDiv : {
        
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 28,

        color: '#FFFFFF'
    },
    nextButtonCss : {
        marginTop : '20px !important',
        textTransform : 'capitalize !important',
        letterSpacing : '3px !important',
        width : 250,
        borderRadius : '25px !important',
        height : '50px',
        fontSize : '20px !important'
    },
    contentDiv : {
        color : "#969AA8 !important",
        fontSize : 13,

        flexDirection : 'column !important',
        alignItems: 'center',

        marginTop : '20px !important',
        marginBottom : '20px !important'
    },
    contentHighlight : {
        color : '#338BEF',
        borderBottom : '1px solid',
        cursor : 'pointer',
        "&:hover" : {
            color : 'white'
        }
    },
    questionDiv : {
        color : '#3B4C68 !important',

        marginBottom : '10px !important'
    }
})) ;
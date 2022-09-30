import { makeStyles } from "@mui/styles";

// Montserrat
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
        height : 'calc(100vh - 40px)',
        ['@media (max-width : 800px)'] : {
            height : 'auto'
        },
        border: '1px solid #1E2D3D', borderRadius: 8,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
        position : 'relative',
        overflow : 'hidden',
    },
    helloDiv : {
        fontStyle: 'normal',   fontWeight: 450, fontSize: 18,
        letterSpacing : 1.5,
        marginBottom : 10,
        color: '#E5E9F0',
        ['@media (max-width : 500px)'] : {
            fontSize : 15,
            letterSpacing : 1,
        },
        ['@media (max-width : 290px)'] : {
            fontSize : 14,
            letterSpacing : 1,
        },
    },
    welcomeDiv : {
        fontSize: 62, fontStyle: 'normal', fontWeight: 400,
        letterSpacing : 5,
        marginBottom : 15,
        color: '#E5E9F0',
        ['@media (max-width : 414px)'] : {
            fontSize : 40
        },
        ['@media (max-width : 390px)'] : {
            fontSize : 30,
        },
    },
    tickDiv : {
        color : '#43D9AD', fontSize : 20, fontWeight : 400,
        letterSpacing : 3,

        ['@media (max-width : 385px)'] : {
            fontSize : 18,
            letterSpacing : 1,
        },

        ['@media (max-width : 290px)'] : {
            fontSize : 14,
            letterSpacing : 1,
        },
    },
    slashDiv : {
        color: '#607B96', fontSize : 14, fontWeight : 400,
        marginTop : 130,  marginBottom : 60
    },
    lineDiv : {
        borderBottom : '2px solid #1E2D3D',
        marginLeft : -30, marginBottom : 80,  marginTop : 30,
        width  : '70%',
    },
    greenBlur : {
        position : 'absolute', left: 45,  top: 170,
        width: 200,  height: 150,
        background: '#43D9AD',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    blueBlur : {
        position : 'absolute', right: 45,  top: 450,
        width: 200, height: 150,
        background: '#4D5BCE',
        opacity: '0.35',
        filter: 'blur(55px)',
        transform: 'rotate(-140.38deg)'
    },
    formDiv : {
        display : 'flex', justifyContent : 'center',  alignItems : 'center',
        height : '100vh',
        ['@media (max-width : 950px)'] : {
            paddingLeft : '20px',  paddingRight : '20px'
        },
        ['@media (max-width : 800px)'] : {
            height : 'auto',
        },
        paddingLeft : '20%',  paddingRight: '20%',
        "& .MuiGrid-item" : {
            display : 'flex', justifyContent : 'center'
        },
        "& .MuiInputAdornment-root" : {
            "& p" :{
                color : 'white !important'
            } 
        },
        "& .MuiInputLabel-root" : {
            color : "white !important",
        },
        "& .MuiFormControl-root" : {
            borderRadius : 5,
            color : 'white',
            "& svg" :{
                color : 'white'
            }
        },
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
        "& .MuiInputBase-input" :{
            color : 'white !important',
        },
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: 'red',
        },
        "& .MuiFormHelperText-root" : {
            background : '#010C15 !important',
            marginTop : '10px !important'
        }
    },
    signUpDiv : {
        fontStyle: 'normal', fontWeight: 700, fontSize: 28, color: '#FFFFFF',

        marginBottom : '20px !important'
    },
    forgotDiv : {
        color : theme.palette.green.A200, width : '100%', textAlign : 'right', cursor : 'pointer',
        "&:hover" : {
            color : theme.palette.green.A100
        },
    },
    nextButtonCss : {
        marginTop : '20px !important',
        textTransform : 'capitalize !important',
        letterSpacing : '3px !important',
        height : '50px',
        borderRadius : '25px !important',
        fontSize : '20px !important'
    },
    contentDiv : {
        color : "#969AA8 !important",
        fontSize : 13,
        flexDirection : 'column !important', alignItems: 'center',
        marginTop : '20px !important', marginBottom : '20px !important'
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
        color : '#3B4C68 !important'
    }
})) ;
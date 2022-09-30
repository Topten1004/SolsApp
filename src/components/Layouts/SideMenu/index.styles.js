import  { makeStyles } from '@mui/styles' ;

export const useStyles = makeStyles((theme) => ({
    paper : {
      backgroundColor : '#031C30 !important', 
    },
    menuListDiv : {
      "& .MuiListItemButton-root" : {
        margin : 5,
        borderRadius : '10px !important',
        "&:hover" : {
          backgroundColor : '#667A8A'
        }
      }
    },
    logoDiv : {
      paddingLeft : 10,
      fontSize : 25,
      color : 'white'
    },
    expandUnion : {
      borderRadius : '50%',
      width : 60, height : 60,
      backgroundColor : "#EFF2F4 !important",
      display: 'flex', alignItems : 'center', justifyContent : 'center',
      cursor : 'pointer'
    },
    lessUnion : {
      width : 40, height : 40,
      background : '#EFF2F4',
      borderRadius : 10,
      display: 'flex', alignItems : 'center', justifyContent : 'center',
      cursor : 'pointer'
    },
    expandUnionDiv : {
      marginTop : 30, marginBottom : 40,
      display : 'flex', alignItems : 'center',
    },
    lessUnionDiv : {
      marginTop : 30, marginBottom : 40,
      display: 'flex', justifyContent : 'center',
    },
    popButtonCss : {
        zIndex : 10000,
        position : 'fixed', bottom : 20, left : 20,
        height : 50, width : 50,
        background : '#EFF2F4',
        transition : '0.1s',
        borderRadius : '50%',
        display: 'flex', alignItems : 'center', justifyContent : 'center',
        cursor : 'pointer',
        boxSizing : 'content-box',
        boxShadow : '0 0 20px #eee !important',
        "&:hover" : {
        }
    },
    addressDiv : {
      "& span" : {
        fontSize : '20px !important', fontWeight : 'bold',
        cursor : 'pointer !important'
      },
    },
    notificationDiv : {
      display : 'flex', alignItems : 'center' , justifyContent : 'center',
      position : 'fixed',
      right : 20,
      bottom : 20,
      zIndex: 5000,
      borderRadius : '50%',
      padding : 5,
      transition : '0.2s',
      boxShadow : '0px 0px 15px #42e189 !important',
      "&:hover" : {
        boxShadow : '0px 0px 20px #42e189 !important',
      },
      cursor : 'pointer' ,
      background : '#5589516b'
    },
    notifyCountDiv : {
      position : 'fixed',
      right : 30,
      bottom : 50,
      zIndex: 5001,

      // color : theme.palette.green.A100,
      color : '#2841bb',
      fontFamily : 'serif',

      width : 18, height : 18,
      background : '#ffffffa8',
      borderRadius : '50%',

      display : 'flex', justifyContent : 'center', alignItems : 'center',
      fontSize : 12,
      fontWeight : 'bold',
    }
  }));
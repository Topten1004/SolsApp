import { makeStyles } from '@mui/styles' ;

export const useStyles = makeStyles((theme) => ({
    root : {
        border : '1px solid '+theme.palette.blue.A100+' !important', borderRadius : '15px !important',
        backgroundColor : theme.palette.blue.A200,
        padding : '10px !important',
        margin : 20,

        "& .MuiTableContainer-root" : {
            "&::-webkit-scrollbar-thumb" : {
                backgroundColor : "#538f815c" ,
                borderRadius : "5px"
            } ,
            "&::-webkit-scrollbar-track" : {
                backgroundColor : "#538f815c" ,
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            "&::-webkit-scrollbar":{
                width : "10px",
                height : '10px',
                cursor : 'pointer !important'
            } ,

            maxHeight : '900px !important',
        },
        "& .MuiTable-root" : {
            minWidth : 1000,
            borderCollapse: 'separate !important',
            borderSpacing: '0 10px',
            "& .MuiTableCell-root" : {
                color : 'white'
            }
        },
        "& .MuiTableHead-root" : {
            "& .MuiTableCell-root" : {
                fontSize : '15px',
                "&:first-child": {
                    textAlign : 'left !important'
                },
            }
        },
        "& .MuiTableBody-root" : {
            "& .MuiTableRow-root" : {
                cursor : 'pointer',
                transition : '0.2s',
                "&:hover" : {
                    background : theme.palette.blue.A300 + ' !important'
                },
            },
            "& .MuiTableCell-root" : {
                background : '#538f815c',
                border : 'none !important',
                marginBottom : '10px !important',
                fontSize : '15px',
                "&:first-child": {
                    borderBottomLeftRadius : '10px !important', borderTopLeftRadius : '10px !important',
                },
                "&:last-child": {
                    borderBottomRightRadius : '10px !important', borderTopRightRadius : '10px !important',
                },
            }
        },
        "& .MuiTableFooter-root" : {
            "& .MuiTablePagination-root" : {
                color : theme.palette.green.A200 + " !important",
                "& svg" : {
                    color : theme.palette.green.A200
                }
            },
            "& .MuiTablePagination-spacer" : {
                "-webkit-flex" : 'none !important',
                flex : 'none !important'
            }
        }
    },
    paper : {
        backgroundColor : theme.palette.blue.main + ' !important',
        "& .MuiList-root" : {
            padding : '0px !important',
        },
        "& .MuiMenuItem-root" : {
            borderBottom : '1px solid gray !important',
            "&:last-child" : {
                borderBottom : 'none !important',
            },
            background : theme.palette.blue.A300 + " !important",
            color : theme.palette.green.A200 + " !important",
        },
    },
    acceptDiv : {
        color : '#103609 !important', fontWeight : 'bold',
        height : 40, width : 100,
        background : '#7AC131',
        display : 'flex !important' , alignItems : 'center', justifyContent : 'center',
        borderRadius : 5
    },
    pendingDiv : {
        color : '#495616 !important', fontWeight : 'bold',
        height : 40, width : 100,
        background : '#d7db6b',
        display : 'flex !important' , alignItems : 'center', justifyContent : 'center',
        borderRadius : 5
    },
    denyDiv : {
        color : '#3c0606 !important', fontWeight : 'bold',
        height : 40, width : 100,
        background : '#EB5757',
        display : 'flex !important' , alignItems : 'center', justifyContent : 'center',
        borderRadius : 5
    }
})) ;
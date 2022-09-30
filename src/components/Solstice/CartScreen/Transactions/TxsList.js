import * as React from 'react' ;

import Loading from 'react-loading-components' ;

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { UserTxsInfoList } from '../../../../redux/actions/cart';

import { walletAddressFormat } from '../../../../utils/Helper';

import CheckIcon from '@mui/icons-material/Check';
import ApprovalIcon from '@mui/icons-material/Approval';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

import RightImage from '../../../../assets/cart/Right.svg';
import LeftImage from '../../../../assets/cart/Left.svg';

import {
    Box,
    Grid,
    TableContainer, 
    Table, 
    TableBody, 
    TableHead, 
    TableRow, 
    TableCell,
    TableFooter,
    TablePagination,
    Tooltip
} from '@mui/material' ;

import { makeStyles, useTheme } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        border : '1px solid '+theme.palette.blue.A100+' !important', borderRadius : '15px !important',
        backgroundColor : theme.palette.blue.A200,
        padding : '10px !important',

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

            width : '100% !important',
            maxHeight : '900px !important',
        },
        "& .MuiTable-root" : {
            borderCollapse: 'separate !important',
            borderSpacing: '0 10px',
            "& .MuiTableCell-root" : {
                color : 'white'
            }
        },
        "& .MuiTableHead-root" : {
            "& .MuiTableCell-root" : {
                fontSize : '15px',
                textAlign : 'center !important',
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
                textAlign : 'center !important',
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
            },
            "& .MuiInputBase-input" : {
                color : theme.palette.green.A200 + " !important",
            },
            "& .MuiTablePagination-toolbar" : {
            },
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
    },
    pendingDiv : {
        color : '#495616 !important', fontWeight : 'bold',
        height : 40, width : 100,
        background : '#d7db6b',
        display : 'flex !important' , alignItems : 'center', justifyContent : 'center',
    },
    denyDiv : {
        color : '#3c0606 !important', fontWeight : 'bold',
        height : 40, width : 100,
        background : '#EB5757',
        display : 'flex !important' , alignItems : 'center', justifyContent : 'center',
    }
})) ;

const TxsList = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;

    const {
        searchStr,

        txsInfoList,
        web3Provider,
        UserTxsInfoList
    } = props ;

    const headFields = [
        "From",
        "",
        "To",
        "Tx Date",
        "Status",
    ]

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // const handleSelectFile = (fileIndex) => {
    //     setFileIndex(fileIndex) ;
    // }

    // React.useEffect(() => {
    //     if(fileList) {
    //         setPage(0) ;

    //         let temp = [...fileList?.filter(file => file.name.toLowerCase().search(searchStr.toLowerCase()) >= 0 
    //             && (viewFileList === 'recent' ? new Date().getTime() - file.created_at.toDate().getTime() < 24*60*60*1000*2 : true
    //                 ))] ;

    //         setFilterFileList(temp) ;
    //     }
    // }, [searchStr, viewFileList, fileList]) ;

    React.useEffect(() => {
        UserTxsInfoList(web3Provider) ;
    }, []) ;

    React.useEffect(() => {
        // console.log(txsInfoList) ;
    }, [txsInfoList]) ;

    return (
        <Grid container>
            <Grid item xs={12} className={classes.root}>
                <TableContainer sx={{paddingRight:"5px"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    headFields.map((field, index) => {
                                        return (
                                            <TableCell key={index} sx={{textAlign : 'center !important'}}>{ field }</TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                txsInfoList ? (
                                    txsInfoList.length ? 
                                        txsInfoList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tx, index) => {
                                            return(
                                                <TableRow key={index} >
                                                    <TableCell >
                                                        {tx.from}
                                                    </TableCell>
                                                    <TableCell>
                                                        <img src={tx.dir === 'right' ? RightImage : LeftImage} />
                                                    </TableCell>
                                                    <TableCell >
                                                        {tx.to}
                                                    </TableCell>
                                                    <TableCell sx={{minWidth : '200px !important'}}>
                                                        {tx.placed_at}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            tx.status === 'pending' && <Box sx={{display : 'flex', justifyContent : 'center'}}>
                                                                <Box className={classes.pendingDiv}>
                                                                    <Box>Pending</Box>&nbsp;
                                                                </Box>
                                                            </Box>
                                                        }
                                                        {
                                                            tx.status === 'accepted' && <Box sx={{display : 'flex', justifyContent : 'center'}}>
                                                                <Box className={classes.acceptDiv}>
                                                                    <Box>Accepted</Box>&nbsp;
                                                                </Box>
                                                            </Box>
                                                        }
                                                        {
                                                            tx.status === 'denied' && <Box sx={{display : 'flex', justifyContent : 'center'}}>
                                                                <Box className={classes.denyDiv}>
                                                                    <Box>Denied</Box>&nbsp;
                                                                </Box>
                                                            </Box>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    : <TableRow  >
                                        <TableCell colSpan={6} >There aren't any transactions.</TableCell>
                                    </TableRow>
                                ) : 
                                <TableRow  >
                                    <TableCell colSpan={6} >
                                        <Loading type='three_dots' width={50} height={50} fill='#43D9AD' />
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15]}
                                    labelRowsPerPage={"Transactions per page"}
                                    count={
                                        txsInfoList 
                                        ? txsInfoList.length
                                        : 0
                                    }
                                    SelectProps={{
                                        MenuProps : {
                                            classes : {
                                                paper :  classes.paper
                                            }
                                        }
                                    }}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />    
                            </TableRow>
                        
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}
TxsList.propTypes = {
    UserTxsInfoList : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
   txsInfoList : state.cart.txsInfoList,
   web3Provider : state.wallet.web3Provider
})
const mapDispatchToProps = {
    UserTxsInfoList
}
export default connect(mapStateToProps, mapDispatchToProps)(TxsList) ;
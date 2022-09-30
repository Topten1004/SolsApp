import * as React from 'react' ;

import Loading from 'react-loading-components' ;

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
    TablePagination
} from '@mui/material' ;

import { makeStyles, useTheme } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        width : '100% !important',

        "& .MuiTableContainer-root" : {
            maxHeight : '900px !important',
        },
        "& .MuiTable-root" : {
            borderCollapse: 'separate !important',
            border : '1px solid '+theme.palette.blue.A100+' !important', borderRadius : '15px !important',
            backgroundColor : theme.palette.blue.A200,
            padding : '10px !important',
            borderSpacing: '0 10px',
            "& .MuiTableCell-root" : {
                color : theme.palette.green.A200,
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
                "&:hover" : {
                    background : theme.palette.blue.A300 + ' !important'
                }
            },
            "& .MuiTableCell-root" : {
                borderBottom : '1px solid gray !important',
                borderTop : '1px solid gray !important',
                marginBottom : '10px !important',
                fontSize : '15px',
                textAlign : 'center !important',
                "&:first-child": {
                    borderLeft  :'1px solid gray',
                    borderBottomLeftRadius : '10px !important', borderTopLeftRadius : '10px !important',
                },
                "&:last-child": {
                    borderRight  :'1px solid gray',
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
})) ;

const ResellersList = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;

    const {
    
    } = props ;

    const headFields = [
        "Bidder",
        "Contact",
        "Profile",
        "Status"
    ]

    const resellersList = [
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
      {
        email : "im.christopher.groe@gmail.com"
      },
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
                                            <TableCell key={index}>{ field }</TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                resellersList ? (
                                  resellersList.length ? 
                                    resellersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reseller, index) => {
                                            return(
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Box sx={{display : 'flex', alignItems :'center', gap : '10px'}}>
                                                            {reseller.email}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell >{50}</TableCell>
                                                    <TableCell>{50}</TableCell>
                                                    <TableCell >{50}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    : <TableRow  >
                                        <TableCell colSpan={4} >There aren't any files.</TableCell>
                                    </TableRow>
                                ) : 
                                <TableRow  >
                                    <TableCell colSpan={4} >
                                        <Loading type='three_dots' width={50} height={50} fill='#43D9AD' />
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15]}
                                    labelRowsPerPage={"Files per page"}
                                    count={
                                        resellersList 
                                        ? resellersList.length
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

export default ResellersList ;
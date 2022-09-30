import * as React from 'react' ;

import Loading from 'react-loading-components' ;

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { ProductsInfoList } from '../../../../redux/actions/cart';

import { walletAddressFormat } from '../../../../utils/Helper';

import ApprovalIcon from '@mui/icons-material/Approval';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

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
                "&:hover" : {
                    background : theme.palette.blue.A300 + ' !important'
                }
            },
            "& .MuiTableCell-root" : {
                background : '#2A2B31',
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
    statusDiv : {
        color : 'white !important', 
        height : 40, width : 100,
        background : '#7AC131',
        display : 'flex !important' , alignItems : 'center', justifyContent : 'center',
    }
})) ;

const ProductsList = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;

    const {
        fileList,
        searchStr,

        productsInfoList,
        ProductsInfoList
    } = props ;

    const headFields = [
        "Product Name",
        "Used Wallet",
        "Buyer",
        "Sold At",
        "Created At",
    ]

    const [filterFileList, setFilterFileList] = React.useState([]) ;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(() => {
        ProductsInfoList() ;
    }, []) ;

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
                                productsInfoList ? (
                                    productsInfoList.length ? 
                                        productsInfoList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((productInfo, index) => {
                                            return(
                                                <TableRow key={index} >
                                                    <TableCell>
                                                        <Box sx={{display : 'flex', flexDirection : 'column', alignItems : 'flex-start',gap : '10px'}}>
                                                            <Box sx={{fontSize : 20, fontWeight : 'bold'}}>
                                                                {productInfo.master_piece}
                                                            </Box>
                                                            <Box>
                                                                {productInfo.price_type === 'legendary' && productInfo.product_price}
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Tooltip title={productInfo.creator}>
                                                            <Box>
                                                                { walletAddressFormat(productInfo.creator) }
                                                            </Box>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Tooltip title={productInfo.creator}>
                                                            <Box>
                                                                { walletAddressFormat(productInfo.buyer) }
                                                            </Box>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Box>
                                                            {/* { productInfo.sold_at.toDate().toLocaleString() } */}
                                                        </Box>
                                                    </TableCell>
                                                    {/* <TableCell>{productInfo.created_at.toDate().toLocaleString()}</TableCell> */}
                                                    <TableCell >
                                                        {
                                                            productInfo.sold ? <Box sx={{display : 'flex', justifyContent : 'center'}}>
                                                                <Box className={classes.statusDiv}>
                                                                    <Box>Sold</Box>&nbsp;<Box><DoneOutlineIcon fontSize='small'/></Box>
                                                                </Box>
                                                            </Box> : <Box sx={{display : 'flex', justifyContent : 'center'}}>
                                                                <Box className={classes.statusDiv}>
                                                                    <Box>Created</Box>&nbsp;<Box><ApprovalIcon fontSize='small' htmlColor='white' /></Box>
                                                                </Box>
                                                            </Box>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    : <TableRow  >
                                        <TableCell colSpan={6} >There aren't any files.</TableCell>
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
                                    labelRowsPerPage={"Products per page"}
                                    count={
                                        fileList 
                                        ? filterFileList.length
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
ProductsList.propTypes = {
    ProductsInfoList : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    productsInfoList : state.cart.productsInfoList
})
const mapDispatchToProps = {
    ProductsInfoList
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList) ;
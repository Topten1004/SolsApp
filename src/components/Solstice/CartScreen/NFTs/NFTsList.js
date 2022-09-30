import * as React from 'react' ;

import Loading from 'react-loading-components' ;

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { UserNFTsInfoList } from '../../../../redux/actions/cart';

import { walletAddressFormat } from '../../../../utils/Helper';

import CheckIcon from '@mui/icons-material/Check';
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
import OwnersList from './OwnersList';

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

const NFTsList = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;

    const {
        searchStr,

        UserNFTsInfoList,
        nftsInfoList,
        web3Provider
    } = props ;

    const headFields = [
        "NFT ID",
        "NFT Name",
        "Owners",
        "NFT Price",
        "# of NFTs",
    ]

    const [filterList, setFilterList] = React.useState([]) ;
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
        UserNFTsInfoList(web3Provider) ;
    }, []) ;

    React.useEffect(() => {
        if(nftsInfoList?.length) {
            console.log(nftsInfoList) ;
            let temp = [...nftsInfoList.filter(nft => nft.name.toLowerCase().search(searchStr.toLowerCase()) >= 0)]  ;
            setFilterList(temp);
        }
    }, [searchStr, nftsInfoList]) ;

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
                                nftsInfoList ? (
                                    nftsInfoList.length ? 
                                        filterList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((nft, index) => {
                                            return(
                                                <TableRow key={index} >
                                                    <TableCell>
                                                        <Box sx={{display : 'flex', flexDirection : 'column', alignItems : 'flex-start',gap : '10px'}}>
                                                            <Box sx={{fontSize : 20, fontWeight : 'bold'}}>
                                                                #{nft.nft_id}
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell >
                                                            {nft.name}
                                                    </TableCell>
                                                    <TableCell >
                                                        <OwnersList
                                                            ownersList={nft.owners}
                                                        />
                                                    </TableCell>
                                                    <TableCell >
                                                        {nft.nft_price}
                                                    </TableCell>
                                                    <TableCell>
                                                        { nft.nft_count }
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
                                    labelRowsPerPage={"NFTs per page"}
                                    count={
                                        nftsInfoList 
                                        ? filterList.length
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
NFTsList.propTypes = {
    UserNFTsInfoList : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    productsInfoList : state.cart.productsInfoList,
    nftsInfoList : state.cart.nftsInfoList,
    web3Provider : state.wallet.web3Provider
})
const mapDispatchToProps = {
    UserNFTsInfoList
}
export default connect(mapStateToProps, mapDispatchToProps)(NFTsList) ;
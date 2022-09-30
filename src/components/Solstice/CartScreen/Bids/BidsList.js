import * as React from 'react' ;

import Loading from 'react-loading-components' ;

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { UserBidsInfoList } from '../../../../redux/actions/cart' ;
import { walletAddressFormat } from '../../../../utils/Helper';
import ActionPopOver from './ActionPopOver';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ThreeDotsImage from '../../../../assets/cart/ThreeDots.svg' ;
import ArrowDownImage from '../../../../assets/cart/ArrowDown.svg' ;

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';

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

const BidsList = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;

    const {
        searchStr,
        startDate,
        endDate,

        web3Provider,
        UserBidsInfoList,
        bidsInfoList
    } = props ;

    const headFields = [
        "Product Name",
        "Price",
        "Amount",
        "Status",
        "Action",
        "Bidder",
        "Bidder Wallet",
        "Product Type",
        "Profile Link",
        "Date"
    ]

    const  [filterList, setFilterList] = React.useState([]) ;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [bidId, setBidId] = React.useState(null) ;
    const [buyerId,setBuyerId] = React.useState(null) ;
    const [buyerWallet, setBuyerWallet] = React.useState(null) ;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClickAction = async (event, bid_id, buyer_id, buyer_wallet) => {
        setAnchorEl(event.currentTarget);
        setBidId(bid_id) ;
        setBuyerId(buyer_id) ;
        setBuyerWallet(buyer_wallet) ;
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(() => {
        if(web3Provider) UserBidsInfoList(web3Provider) ;
    }, [web3Provider]) ;

    React.useEffect(() => {
        if(bidsInfoList?.length) {
            
            let temp = [...bidsInfoList.filter(bidInfo => 
                bidInfo.to.toLowerCase().search(searchStr.toLowerCase()) >= 0 &&
                new Date(bidInfo.placed_at).getTime() >= startDate &&
                new Date(bidInfo.placed_at).getTime() <= (endDate + 86400000)
            )] ;

            setFilterList(temp) ;
        }
    }, [endDate, startDate, searchStr, bidsInfoList]) ;

    return (
        <>
            <Grid item xs={12} className={classes.root}>
                <TableContainer sx={{paddingRight:"5px",}}>
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
                                bidsInfoList ? (
                                    bidsInfoList.length ? 
                                        filterList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((bidInfo, index) => {
                                            return(
                                                <TableRow key={index} >
                                                    <TableCell sx={{minWidth : '150px'}}>{bidInfo.product.name}</TableCell>
                                                    <TableCell>{bidInfo.price}</TableCell>
                                                    <TableCell>{bidInfo.amount}</TableCell>
                                                    <TableCell>
                                                        {
                                                            bidInfo.status === 'pending' && <Box sx={{display : 'flex', justifyContent : 'center'}}>
                                                                <Box className={classes.pendingDiv}>
                                                                    <Box>Pending</Box>&nbsp;
                                                                </Box>
                                                            </Box>
                                                        }
                                                        {
                                                            bidInfo.status === 'accepted' && <Box sx={{display : 'flex', justifyContent : 'center'}}>
                                                                <Box className={classes.acceptDiv}>
                                                                    <Box>Accepted</Box>&nbsp;
                                                                </Box>
                                                            </Box>
                                                        }
                                                        {
                                                            bidInfo.status === 'denied' && <Box sx={{display : 'flex', justifyContent : 'center'}}>
                                                                <Box className={classes.denyDiv}>
                                                                    <Box>Denied</Box>&nbsp;
                                                                </Box>
                                                            </Box>
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            bidInfo.status === "pending" ? <Box onClick={(e) => handleClickAction(e, bidInfo.bid_id, bidInfo.bidder.id, bidInfo.to)} aria-describedby={id} sx={{display : 'flex', gap: '10px', justifyContent : 'center'}}>
                                                                <MoreVertIcon />
                                                                <ExpandMoreIcon />
                                                            </Box> : (
                                                                bidInfo.status === 'accepted' ? <DoneOutlineIcon htmlColor='#7AC131'/>
                                                                : <RemoveDoneIcon htmlColor='#EB5757'/>
                                                            )
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{width : '100%', textAlign : 'left', fontSize : '18px', fontWeight : 'bold'}}>
                                                            {bidInfo.bidder.account_name}
                                                        </Box>
                                                        <Box sx={{width : '100%', textAlign : 'left'}}>
                                                            {bidInfo.bidder.email}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title={bidInfo.to}>
                                                            <Box sx={{textAlign : 'left'}}>
                                                                {walletAddressFormat(bidInfo.to)}
                                                            </Box>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell sx={{minWidth : '150px'}}>{bidInfo.product.type}</TableCell>
                                                    <TableCell>{bidInfo.bidder.profile_link}</TableCell>
                                                    <TableCell sx={{minWidth : '200px'}}>{bidInfo.placed_at}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    : <TableRow  >
                                        <TableCell colSpan={10} >There aren't any bids.</TableCell>
                                    </TableRow>
                                ) : 
                                <TableRow  >
                                    <TableCell colSpan={10} >
                                        <Loading type='three_dots' width={50} height={50} fill='#43D9AD' />
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15]}
                                    labelRowsPerPage={"Bids per page"}
                                    count={
                                        bidsInfoList 
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
            <ActionPopOver
                id={id}
                open={open}
                anchorEl={anchorEl}
                buyerWallet={buyerWallet}
                buyerId={buyerId}
                bidId={bidId}
                handleClose={handleClose}
            />
        </>
    )
}
BidsList.propTypes = {
    UserBidsInfoList : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    web3Provider : state.wallet.web3Provider,
    bidsInfoList : state.cart.bidsInfoList
})

const mapDispatchToProps = {
    UserBidsInfoList
}

export default connect(mapStateToProps, mapDispatchToProps)(BidsList) ;
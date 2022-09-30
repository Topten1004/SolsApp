import * as React from 'react' ;

import Loading from 'react-loading-components' ;

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;

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

import { useStyles } from './StylesDiv/UsersList.styles';
import { useTheme } from '@mui/styles';

const UsersList = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;

    const {
        searchStr,
        customersList
    } = props ;

    const headFields = [
        "Full Name",
        "User Name",
        "Email",
        "Profile Link",
    ]

    const [filterList, setFilterList] = React.useState(null) ;
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
        if(customersList) {
            let temp = Object.entries(customersList).filter(([id, item]) => 
                item.email.toLowerCase().search(searchStr.toLowerCase()) >= 0 ||
                item.userName.toLowerCase().search(searchStr.toLowerCase()) >= 0 ||
                item.fullName.toLowerCase().search(searchStr.toLowerCase()) >= 0
            ) ;

            setFilterList(temp) ;
        } 
    }, [searchStr, customersList]) ;

    return (
        <Box className={classes.root}>
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
                            filterList ? (
                                filterList.length ? 
                                    filterList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(([id, customerInfo]) => {
                                        return(
                                            <TableRow key={id} >
                                                <TableCell sx={{minWidth : '150px'}}>{customerInfo.fullName}</TableCell>
                                                <TableCell>{customerInfo.userName}</TableCell>
                                                <TableCell>{customerInfo.email}</TableCell>
                                                <TableCell sx={{minWidth : '150px', textAlign:'left !important'}}>{customerInfo.profileLink}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                : <TableRow  >
                                    <TableCell colSpan={10}  sx={{textAlign : 'center'}}>No Customers</TableCell>
                                </TableRow>
                            ) : 
                            <TableRow  >
                                <TableCell colSpan={10} sx={{textAlign : 'center'}}>
                                    <Loading type='three_dots' width={50} height={50} fill='#43D9AD' />
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                labelRowsPerPage={"Customers per page"}
                                count={
                                    filterList 
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
        </Box>
    )
}
UsersList.propTypes = {
}
const mapStateToProps = state => ({
    customersList : state.users.customersList
})
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList) ;
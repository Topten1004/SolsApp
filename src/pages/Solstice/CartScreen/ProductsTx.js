import * as React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;

import TxsList from '../../../components/Solstice/CartScreen/Transactions/TxsList';

import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DateInput from '../../../components/Solstice/CartScreen/Bids/DateInput';
import {utils} from "@amir04lm26/react-modern-calendar-date-picker";

import {
    Box, 
    TextField,
    Grid,
    InputAdornment,
    useMediaQuery
} from '@mui/material' ;

import { useTheme } from '@mui/material';
import { useStyles } from './StylesDiv/ProductsTx.styles';

const ProductsTx = (props) => {

    const classes = useStyles() ;
    const theme = useTheme() ;
    const match1100 =  useMediaQuery('(min-width : 1100px)') ;

    const {
       
    } = props ;

    const defaultStartDay = {
        year : new Date().getFullYear(),
        month : new Date().getMonth() + 1,
        day : 1
    }

    const [searchStr, setSearchStr] = React.useState('') ;
    const [viewFileList, setViewFileList] = React.useState('all') ;
    const [startDate, setStartDate] = React.useState(defaultStartDay) ;
    const [endDate, setEndDate] = React.useState(utils().getToday()) ;

    const handleChangeViewFileList = (viewFileList) => {
        setViewFileList(viewFileList) ;
    } 

    const handleSelectedFolder = (selectedFolder) => {
        setSelectedFolder(selectedFolder) ;
    }
    
    const handleChangeSearchStr = (searchStr) => {
        setSearchStr(searchStr) ;
    }

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={match1100 ? 6 : 12} sx={{display : 'flex', alignItems : 'flex-end', justifyContent : match1100 ? 'flex-end' : 'flex-start'}}>
                    <Box className={classes.searchDiv}>
                        <TextField 
                            size='small'
                            placeholder='Search transactions'
                            fullWidth
                            value={searchStr}
                            onChange={(e) => handleChangeSearchStr(e.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <ManageSearchIcon/>
                                </InputAdornment>,
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={match1100 ? 6 : 12} sx={{display : 'flex', alignItems : 'center', justifyContent : match1100 ? 'flex-end' : 'flex-start', gap : '30px'}}>
                    <Box className={classes.calendarDiv}>
                        <Box sx={{color : 'white'}}>
                            From : &nbsp;<DateInput 
                                selectedDay={startDate}
                                setSelectedDay={setStartDate}
                            />
                        </Box>
                        <Box sx={{color : 'white'}}>
                            To : &nbsp;<DateInput 
                                selectedDay={endDate}
                                setSelectedDay={setEndDate}
                                minimumDate={startDate}
                            />
                        </Box>    
                    </Box>
                </Grid>
                <Grid container>
                    <Grid item xs={12}  sx={{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                         <TxsList 
                            searchStr={searchStr}
                            viewFileList={viewFileList}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsTx) ;
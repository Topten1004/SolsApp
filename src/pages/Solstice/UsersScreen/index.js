import * as React from 'react';

import UsersList from '../../../components/Solstice/UserScreen/UsersList';

import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import {
    Box,
    TextField,
    InputAdornment
} from '@mui/material' ;

import { useStyles } from './StylesDiv/index.styles.js';

const UsersScreen = () => {

    const classes = useStyles() ;
  
    const [searchStr, setSearchStr] = React.useState('') ;

    return (
        <Box className={classes.root}>
            <Box className={classes.greenBlur} />
            <Box className={classes.blueBlur} />
            <Box className={classes.pageTitleDiv}>
                SOLSTICE Customers
            </Box>
            <Box>
                <Box className={classes.searchDiv}>
                    <TextField 
                        size='small'
                        placeholder='Search customer by email, full name and user name.'
                        fullWidth
                        value={searchStr}
                        onChange={(e) => setSearchStr(e.target.value)}

                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <ManageSearchIcon/>
                            </InputAdornment>,
                        }}
                    />
                </Box>
            </Box>
            <UsersList 
                searchStr={searchStr}
            />
        </Box>
    );
}

export default UsersScreen ;
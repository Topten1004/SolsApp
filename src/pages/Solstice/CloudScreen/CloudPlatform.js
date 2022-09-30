import * as React from 'react' ;

import Socials from '../../../components/Solstice/CloudScreen/CloudPlatform/Socials';

import {
    Box, 
    TextField,
    InputAdornment,
    Button ,
    Grid
} from '@mui/material' ;

import { useStyles } from './StylesDiv/CloudPlatform.styles';

const CloudPlatform = () => {
    
    const classes = useStyles() ;

    const [curCategory, setCategory] = React.useState("Socials") ;

    const categoryList = [
        "Socials",
        "Payment and Checkout",
        "Messaging and Communication",
        "Developer Platform",
        "Marketplaces"
    ];

    return (
        <Box className={classes.root}>
            <Box sx={{display : 'flex', flexWrap : 'wrap', mb : '20px', gap : '10px', mt : '20px'}}>
                <Box sx={{cursor : 'grab', color : 'white', mr : '20px'}}>
                    Categories:
                </Box>
                {
                    categoryList.map((item, index) => {
                        return (
                            <Box key={index} sx={{cursor : 'pointer', color : curCategory === item ? '#3772FF' : 'white', mr : '20px'}} onClick={() => setCategory(item)}>
                                { item }
                            </Box>
                        )
                    })
                }
            </Box>
            <TextField 
                size='small'
                placeholder='Search all integrations and apps'
                fullWidth
                InputProps={{
                    endAdornment : <InputAdornment position='end'>
                        <Button variant='contained' color='secondary' className={classes.createButtonCss}>
                            Search
                        </Button>
                    </InputAdornment>
                }}
            />
            <Grid container>
                <Grid item xs={12}>
                    <Socials />
                </Grid>
            </Grid>
        </Box>
    )
}

export default CloudPlatform ;
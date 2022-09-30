import React from 'react' ;

import { useState } from 'react' ;

import PersonIcon from '@mui/icons-material/Person';

import {
    Box,
    Accordion,
    AccordionActions,
    AccordionSummary,
    AccordionDetails,
    ListItem,
    List
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore' ;

import { makeStyles, useTheme } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        display : 'flex', justifyContent : 'center' ,
        
        "& .MuiAccordion-root" : {
            backgroundColor : 'transparent !important',
            boxShadow : "none",
            color : 'white !important',
            border : '1px solid gray',
            width : 450,
        } ,
        "& .MuiAccordionSummary-root" : {
            cursor : 'pointer',
            padding : '5px !important',
            minHeight : '0px !important',
            height : '40px !important',
    
            display : 'flex', justifyContent : 'space-between', alignItems : 'center',
            "&:hover" : {
                backgroundColor : 'gray',
            },
            "& .MuiAvatar-root" : {
                border : 'none !important'
            },
            "& svg" : {
                color : 'white !important'
            },

            
        },

        "& .MuiAccordionDetails-root" : {
            "& .MuiList-root" : {
                padding : '0px !important'
            },
            "& .MuiListItem-root" : {
                padding : '10px !important'
            }
        } ,

        "& .MuiAccordionSummary-root.Mui-expanded" : {
            minHeight : '0px !important',
            height : '40px !important',
        },
    }
}))

const OwnersList = (props) => {
    
    const classes = useStyles() ;
    
    const {
        ownersList
    } = props ;

    return (
        <Box className={classes.root}>
            <Accordion
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    View All {ownersList.length} Owners
                </AccordionSummary>
                <AccordionDetails
                    sx={{padding : '0px'}}
                >
                    <List> 
                    {
                        ownersList.map((owner, index) => {
                            return (
                               <ListItem key={index} sx={{borderTop : '1px solid gray'}}><PersonIcon /> &nbsp; {owner}</ListItem>
                            )
                        })
                    }
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default OwnersList;
import * as React from 'react' ;

import ExpandMoreIcon from '@mui/icons-material/ExpandMore' ;

import TickImage from '../../assets/common/tick.png' ;
import LinkImage from '../../assets/common/union.png' ;

import {
    Box ,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material' ;

import { makeStyles, useTheme } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        "& .MuiAccordion-root" : {
            backgroundColor : 'transparent !important',
            boxShadow : "none",
            zIndex: 1000,
        } ,
        "& .MuiAccordionSummary-root" : {
            cursor : 'pointer',
            // borderBottom : '1px solid #EFEFEF !important',
            borderRadius : 10,
            padding : 5, paddingLeft : 20 , paddingRight : 20,
            marginRight : '20px !important', marginTop : 7,
            minHeight : '0px !important',
            height : '50px !important',
            backgroundColor : 'rgba(51, 139, 239, 0.21) !important',

            display : 'flex', justifyContent : 'space-between', alignItems : 'center',
            "&:hover" : {
                backgroundColor : 'rgba(51, 139, 239, 0.21)',
            },
            "& .MuiAvatar-root" : {
                border : 'none !important'
            },
            "& svg" : {
                color : 'white !important'
            },
            
        },
        "& .MuiAccordionSummary-root.Mui-expanded" : {
            minHeight : '0px !important',
            height : '50px !important',
        },
    },
    solItemDiv : {
        cursor : 'pointer',
        marginTop : 5, 
        borderRadius : 10,
        padding : '10px !important', paddingLeft : 20,

        display : 'flex', justifyContent : 'space-between', alignItems : 'center',

        "& .MuiAvatar-root" : {
            border : 'none !important'
        },
        "& svg" : {
            color : 'white !important'
        },
        "&:last-child" : {
            border : '10px soild red !important',
        },
    },
    solItemLabel : {
        color : 'white',  fontSize : 15,
        display : 'flex', alignItems : 'center', gap : '10px',
    },
    detailsItemLabel : {
        color : 'white',  fontSize : 15
    },
    solTimeDiv : {
        color : 'white',  fontSize : 15
    },
    circlePrefixDiv : {
        border : '2px solid ' + theme.palette.green.A200 , borderRadius : theme.border.borderRadius.half,
        width : 10, height : 10,
    }
})) ;

const DetailListItem = (props) => {
    const classes = useStyles() ;
    
    const {
        productSelected,
        productIndex,
        solIndex,
        sols,
        masterPiece,

        handleCurrentProduct,
        handleCurrentSol,
    } = props ;

    const theme = useTheme() ;

    const handleChangeSol = (solIndex) => {
        if(!productSelected) handleCurrentProduct(productIndex);
        handleCurrentSol(solIndex) ;
    }

    const handleChangeProduct = (e, expanded) => {
        if(expanded && !productSelected) {
            handleCurrentProduct(productIndex) ;
            handleCurrentSol(0);
        }
    }

    React.useEffect(() => {
    }, [sols]) ;

    return (
        <Box className={classes.root}>
            <Accordion
                onChange={(e, expanded) => handleChangeProduct(e, expanded)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{backgroundColor : productSelected ? 'rgba(51, 139, 239, 0.21) !important' : 'transparent !important'}}
                >
                    <Box className={classes.detailsItemLabel}>
                        { masterPiece }
                    </Box>
                    <Box sx={{display : 'flex', alignItems : 'center'}}>
                       
                    </Box>
                </AccordionSummary>
                <AccordionDetails
                    sx={{padding : '0px', marginRight : '20px'}}
                >
                    {
                        sols.map((sol, index) => {
                            return (
                                <Box key={index} className={classes.solItemDiv} sx={{backgroundColor : (solIndex === index && productSelected) ? 'rgb(111, 172, 241, 0.21)' : 'transparent'}} 
                                    onClick={() => handleChangeSol(index)}
                                >
                                    <Box className={classes.solItemLabel}>
                                        <Box className={classes.circlePrefixDiv} sx={{backgroundColor : (solIndex === index && productSelected) ? theme.palette.green.A200 : 'transparent'}}></Box>{sol.name}
                                    </Box>
                                    <Box className={classes.solTimeDiv}>
                                        <img src={sol.platform === 'firebase' ? TickImage : LinkImage} /> {sol.format_duration}
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </AccordionDetails>
            </Accordion>
        </Box>
       
    )
}

export default DetailListItem ;
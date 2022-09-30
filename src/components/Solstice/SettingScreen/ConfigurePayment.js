import * as React from 'react' ;

import { useWalletInfo } from '../../../contexts/WalletContext' ;

import {connect} from 'react-redux' ;
import { ExpandedItem } from '../../../redux/actions/setting';
import PropTypes from 'prop-types' ;

import ExpandMoreIcon from '@mui/icons-material/ExpandMore' ;

import {
    Box ,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button
} from '@mui/material' ;

import { useStyles } from './StylesDiv/Payment.styles';
import { useTheme } from '@mui/material' ;

const ConfigurePayment = (props) => {
    const classes = useStyles() ;
    const theme = useTheme() ;
    
    const {
        ExpandedItem,
        expandedItem
    } = props ;

    const {
        provider ,
        web3Provider,
        walletAddress,
        chainData,
        isConnected,
    } = useWalletInfo() ;

    const [expand, setExpand] = React.useState(false) ;

    const TriggerExpandedItem = (e, expanded, itemIndex) => {
        ExpandedItem(itemIndex) ;
        setExpand(expanded) ;
    }
    
    React.useEffect(() => {
        if(expandedItem !== 0){
            setExpand(false) ;
        }
    }, [expandedItem]) ;

    return (
        <Box className={classes.root}>
            <Accordion
                expanded={expand}
                onChange={(e, expanded) => TriggerExpandedItem(e, expanded, 0)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{backgroundColor : 'rgba(51, 139, 239, 0.21) !important'}}
                >
                    <Box sx={{display : 'flex', justifyContent : 'flex-start', alignItems : 'center'}}>
                        <Box className={classes.circlePrefix} /><Box>Configure payments</Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails
                    sx={{padding : '10px'}}
                >
                    <Box className={classes.descriptionDiv}>
                        In order to begin accepting payments, you must connect a Stripe account.
                        Stripe is a payment processing platform used by millions of online businesses including Google, Apple, Amazon, Facebook, and Discord.
                        You're in good hands.
                    </Box>
                    <Button variant={'contained'} className={classes.buttonCss}>Connect Stripe</Button>
                </AccordionDetails>
            </Accordion>
        </Box>
       
    )
}
ConfigurePayment.propTypes = {
    ExpandedItem : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    expandedItem : state.setting.expandedItem
})
const mapDispatchToProps = {
    ExpandedItem
}
export default connect(mapStateToProps, mapDispatchToProps)(ConfigurePayment) ;
import React,{ useEffect, useState } from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputLegendaryPriceConfig } from '../../../redux/actions/upload';

import CloseImage from '../../../assets/close.svg' ;
import MasterCard from '../../../assets/paycards/Mastercard.svg' ;
import VisaCard from '../../../assets/paycards/Visa.svg' ;
import DiscoverCard from '../../../assets/paycards/Discover.svg' ;
import MaestroCard from '../../../assets/paycards/Maestro.svg' ;
import AddIcon from '../../../assets/add.svg' ;

import ETHIMAGE from '../../../assets/tokens/ETH.png' ;
import SOLIMAGE from '../../../assets/tokens/SOL.png' ;
import USDCIMAGE from '../../../assets/tokens/USDC.png' ;

import StepperControl from '../../../components/Solstice/UploadScreen/StepperControl';

import {
    Box,
    Grid,
    Slider,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    useMediaQuery
} from '@mui/material';

import { useStyles } from './StylesDiv/Legendary.styles';

const LegendaryPrice = (props) => {
    const classes = useStyles() ;
    
    const {
        handleChangeUploadStep,
        InputLegendaryPriceConfig,

        legendaryProductPrice,
        legendaryResellPrice,
        legendaryPriceUnit,
        legendaryResellUnit,
        legendaryResellCount,
        legendaryRoyaltyFee,
        legendaryPaymentAccount,

        solsResellTick
    } = props;

    const match1280 = useMediaQuery('(min-width : 1280px)') ;
    const match1170 = useMediaQuery('(min-width : 1170px)') ;

    const [productPrice, setProductPrice] = useState('');
    const [resellPrice, setResellPrice] = useState('');
    const [priceUnit, setPriceUnit] = useState(0) ;
    const [resellUnit, setResellUnit] = useState(0) ;
    const [resellCount, setResellCount] = useState('');
    const [paymentAccount, setPaymentAccount] = useState('visa');
    const [royaltyFee, setRoyaltyFee] = useState(0);

    const [disableContinue, setDisableContinue] = useState(true) ;

    const handleChangeProductPrice = (productPrice) => {
        setProductPrice( productPrice ) ;
    }

    const handleChangeResellPrice = (resellPrice) => {
        setResellPrice( resellPrice ) ;
    }

    const handleChangePaymentAccount = (paymentAccount) => {
        setPaymentAccount(paymentAccount) ;
    }

    const handleChangePriceUnit = (priceUnit) => {
        setPriceUnit(priceUnit) ;
    }

    const handleChangeResellUnit = (resellUnit) => {
        setResellUnit(resellUnit) ;
    }

    const handleChangeResellCount = (resellCount) => {
        if(resellCount === '') setResellCount(resellCount) ;
        else setResellCount( Number(Number(resellCount).toFixed(0)) ) ;
    }
    
    const handleChangeRoyalty = (fee) => {
        setRoyaltyFee(fee) ;
    }

    const handleBack = () => {
        handleChangeUploadStep('price-config') ;
    }
    
    const handleContinue = () => {
        InputLegendaryPriceConfig(productPrice, priceUnit, resellPrice, resellUnit, resellCount, royaltyFee, paymentAccount) ;
        handleChangeUploadStep('product-checkout') ;
    }

    useEffect(() => {
        handleChangePriceUnit(legendaryPriceUnit);
        handleChangeResellUnit(legendaryResellUnit);
        handleChangeResellCount(legendaryResellCount);
        handleChangePaymentAccount(legendaryPaymentAccount) ;
        handleChangeResellPrice(legendaryResellPrice);
        handleChangeProductPrice(legendaryProductPrice) ;
        handleChangeRoyalty(legendaryRoyaltyFee) ;
    }, [legendaryPaymentAccount, legendaryPriceUnit, legendaryResellCount, legendaryResellUnit, legendaryProductPrice, legendaryResellPrice, legendaryRoyaltyFee]) ;

    useEffect(() => {
        if(solsResellTick === "YES") {
            if(productPrice !== '0' && resellPrice !== '0' && resellCount !== '0' && royaltyFee !== 0 && 
                productPrice !== '' && resellPrice !== '' && resellCount !== '') setDisableContinue(false) ;
            else setDisableContinue(true) ;
        } else if(solsResellTick === "NO") {
            if(productPrice !== '0' && royaltyFee !== 0 &&
                productPrice !== '') setDisableContinue(false) ;
            else setDisableContinue(true) ;
        }
    }, [productPrice, resellPrice, resellCount, royaltyFee]) ;

    return (
        <Box className={classes.root}>
            <Box className={classes.greenBlur} />
            <Box className={classes.blueBlur} />
            <Box className={classes.pageTitleDiv}>
                Pricing and Tool
            </Box>
            <Box className={classes.typeDiv} >
                <Box sx={{color :"#806BD6" }}>Legendary : &nbsp;</Box>
                <Box sx={{color : '#43D9AD', textAlign : 'center'}}>Open market, fixed price/product</Box>
            </Box>
            <Grid container >
                <Grid item xs={match1170 ? 4 : 12} className={classes.gridDivForCard}>
                    <Box className={classes.cardDiv}>
                        <Box className={classes.priceCardTitle}>
                            Price Per Product
                        </Box>
                        <Box className={classes.priceCard}>
                            <Box>
                                <TextField
                                    placeholder='10.99'
                                    value={productPrice}
                                    type={'number'}
                                    onChange={(e) => handleChangeProductPrice(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <FormControl variant="standard" className={classes.symbolDiv}>
                                                    <Select
                                                        disableUnderline
                                                        value={priceUnit}
                                                        onChange={(e) => handleChangePriceUnit(e.target.value)}
                                                        MenuProps={{
                                                            className : classes.selectDiv
                                                        }}
                                                    >
                                                        <MenuItem value={0}>
                                                            <img src={SOLIMAGE} width={30} height={30} style={{borderRadius : '50%'}}/>&nbsp;SOLT
                                                        </MenuItem>
                                                        {/* <MenuItem value={1}>
                                                            <img src={USDCIMAGE} width={30} height={30} style={{borderRadius : '50%'}}/>&nbsp;USDC
                                                        </MenuItem> */}
                                                    </Select>
                                                </FormControl>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={match1170 ? 4 : 12} className={classes.gridDivForCard}>
                    <Box className={classes.cardDiv}>
                        <Box className={classes.priceCardTitle}>
                            Price Per Ticket
                        </Box>
                        <Box className={classes.priceCard}>
                            <Box>
                                <TextField
                                    disabled={solsResellTick === "NO" ? true : false}
                                    placeholder='70.03'
                                    type={'number'}
                                    value={resellPrice}
                                    onChange={(e) => handleChangeResellPrice(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <FormControl variant="standard" className={classes.symbolDiv}>
                                                    <Select
                                                        disableUnderline
                                                        value={resellUnit}
                                                        onChange={(e) => handleChangeResellUnit(e.target.value)}
                                                        MenuProps={{
                                                            className : classes.selectDiv
                                                        }}
                                                    >
                                                        <MenuItem value={0}>
                                                            <img src={SOLIMAGE} width={30} height={30} style={{borderRadius : '50%'}}/>&nbsp;SOLT
                                                        </MenuItem>
                                                        {/* <MenuItem value={1}>
                                                            <img src={USDCIMAGE} width={30} height={30} style={{borderRadius : '50%'}}/>&nbsp;USDC
                                                        </MenuItem> */}
                                                        {/* <MenuItem value={1}>
                                                            <img src={ETHIMAGE} width={30} height={30} style={{borderRadius : '50%'}}/>&nbsp;ETH
                                                        </MenuItem> */}
                                                    </Select>
                                                </FormControl>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={match1170 ? 4 : 12} className={classes.gridDivForCard}>
                    <Box className={classes.cardDiv}>
                        <Box className={classes.priceCardTitle}>
                            # of resellers tickets available
                        </Box>
                        <Box className={classes.resellCountDiv}>
                            <TextField
                                disabled={solsResellTick === "NO" ? true : false}
                                placeholder='200'
                                type={'number'}
                                value={resellCount}
                                onChange={(e) => handleChangeResellCount(e.target.value)}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={match1280 ? 6 : 12} sx={{display : 'flex', justifyContent : 'center', alignItems : 'flex-end', height : '150px'}}>
                    <Box className={classes.royaltyDiv}>
                        <Box className={classes.royaltyFeeDiv}>Royalty {royaltyFee}%</Box>
                        <Box className={classes.royaltyCardDiv} >
                            <Slider
                                value={royaltyFee}
                                aria-label="Small"
                                valueLabelDisplay="auto"
                                color={'primary'}
                                onChange={(e) => handleChangeRoyalty(e.target.value)}
                            />
                            <Box className={classes.percentTipDiv}>{royaltyFee}% tip</Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={match1280 ? 6 : 12} sx={{display : 'flex', alignItems : 'flex-end', justifyContent : !match1280 && 'center', pt : '20px'}}>
                    <Box className={classes.feeDetailDiv}>
                        <Box >Ticket Renewel Date: July 13 2029</Box>
                        <Box >Ticket Renewel Fee: 1%</Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container sx={{pt : '60px'}} spacing={2}>
                <Grid item xs={match1280 ? 6 : 12} sx={{display : 'flex', justifyContent : 'center'}}>
                    <Box className={classes.bankAccountDiv}>
                        <Box sx={{display : 'flex', justifyContent : 'space-between', alignItems : 'center'}}>
                            <Box sx={{color : 'white', fontSize : 25, fontWeight : 'bold'}}>
                                Seller Bank Account
                            </Box>
                            <img src={CloseImage} />
                        </Box>
                        <FormControl sx={{mt : '20px' , mb : '20px'}}>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={paymentAccount}
                                onChange={(e) => handleChangePaymentAccount(e.target.value)}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="visa" control={<Radio  className={classes.radioBoxCss}/>} label="Visa" />
                                <FormControlLabel value="discover" control={<Radio className={classes.radioBoxCss}/>} label="Discover" />
                                <FormControlLabel value="maestro" control={<Radio className={classes.radioBoxCss}/>} label="Maestro" />
                                <FormControlLabel value="master" control={<Radio className={classes.radioBoxCss}/>} label="Master" />
                            </RadioGroup>
                        </FormControl>
                        <Box sx={{display  : 'flex', justifyContent : 'center',gap : '10px'}}>
                            <img src={VisaCard} className={paymentAccount === 'visa' ? classes.activePaymentCard : classes.paymentCard} onClick={() => handleChangePaymentAccount('visa')}/>
                            <img src={DiscoverCard} className={paymentAccount === 'discover' ? classes.activePaymentCard : classes.paymentCard} onClick={() => handleChangePaymentAccount('discover')}/>
                            <img src={MaestroCard} className={paymentAccount === 'maestro' ? classes.activePaymentCard : classes.paymentCard} onClick={() => handleChangePaymentAccount('maestro')}/>
                            <img src={MasterCard} className={paymentAccount === 'master' ? classes.activePaymentCard : classes.paymentCard} onClick={() => handleChangePaymentAccount('master')}/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={match1280 ?6 : 12} sx={{display : 'flex', justifyContent : !match1280 && 'center'}}>
                    <Box className={classes.addTimeZoneDiv}>
                        <Box sx={{display : 'flex', justifyContent : 'space-between', mb : '15px'}}>
                            <Box sx={{color : '#43D9AD', fontSize : 20}}>
                                Add Location
                            </Box>
                            <Box>
                                <img src={AddIcon} />
                            </Box>
                        </Box>
                        <Box sx={{display : 'flex', justifyContent : 'space-between'}}>
                            <Box sx={{color : '#43D9AD', fontSize : 20}}>
                                Add Time
                            </Box>
                            <Box>
                                <img src={AddIcon} />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <StepperControl 
                        activeStep={2}
                        handleBack={handleBack}
                        handleContinue={handleContinue}

                        disableContinue={disableContinue}
                    />    
                </Grid>
            </Grid>
        </Box>
    )
}
LegendaryPrice.propTypes = {
    InputLegendaryPriceConfig : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    legendaryProductPrice : state.upload.legendaryProductPrice,
    legendaryResellPrice : state.upload.legendaryResellPrice,
    legendaryPriceUnit : state.upload.legendaryPriceUnit,
    legendaryResellUnit : state.upload.legendaryResellUnit,
    legendaryResellCount : state.upload.legendaryResellCount,
    legendaryRoyaltyFee : state.upload.legendaryRoyaltyFee,
    legendaryPaymentAccount : state.upload.legendaryPaymentAccount,

    solsResellTick : state.upload.solsResellTick
})
const  mapDispatchToProps = {
    InputLegendaryPriceConfig
}
export default connect(mapStateToProps, mapDispatchToProps)(LegendaryPrice) ;     
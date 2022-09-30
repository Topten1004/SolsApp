import React, { useRef, useEffect } from 'react' ;
import { useMeasure } from 'react-use';

import { connect } from 'react-redux';

import clsx from 'clsx' ;

import {
    Grid,
    Box,
    Button
} from '@mui/material' ;

import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';


import CircleIcon from '@mui/icons-material/Circle';
import CheckIcon from '@mui/icons-material/Check';

const QontoConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));
  
const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
        color: 'white',
        zIndex: 1,
        fontSize: 18,

        background : '#784af4',
        border : '1px solid #784af4',
        borderRadius : '50%'
    },
}));
  
const QontoStepIcon = (props) => {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {
            completed ? (
                <CheckIcon className="QontoStepIcon-completedIcon" />
            ) : (
                <CircleIcon className="QontoStepIcon-completedIcon"/>
            )
        }
      </QontoStepIconRoot>
    );
}

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    stepperDiv : {
        paddingTop : 50, paddingBottom : 50,
        paddingLeft : 10, paddingRight : 10,
        backgroundColor : "#011627",
        display : 'flex', flexDirection : 'column !important', justifyContent : 'center', alignItems : 'center',
        "& .Mui-disabled": {
            color : 'gray !important',
        },
    },
    stepperLineDiv : {
        width : '100%',
    },
    buttonGroup : {
        display : 'flex', justifyContent : 'flex-end'  ,
        width : '100%',
        marginTop : 30,
    },
    buttonCss : {
        textTransform : 'capitalize !important',
        width : 170, height : 50,
        fontSize: '18px !important',
        background : theme.palette.blue.main + " !important",
        border : '3px solid rgb(64 55 203 / 51%) !important'
    },
    mintButtonCss : {
        border : 'none !important',
        background : 'linear-gradient(135deg, #e52d65 0%, #629df6 53.09%, #3c1d9d 100%) !important',
        boxShadow : '0px 0px 1px rgb(45 97 229 / 24%), 0px 2px 4px -1px rgb(10 70 82 / 12%), 0px 16px 24px rgb(45 97 229 / 24%), 0px 8px 8px -4px rgb(45 97 229 / 12%) !important'
    }
})) ;

const StepperControl = (props) => {
    const classes = useStyles() ;

    const {
        activeStep,
        handleContinue,
        handleBack,

        disableContinue,
        finalStep,
        solsPriceType
    } = props ;

    const labelList = [
        "Upload Files & Add Link",
        "Select Pricing",
        "Price & Tool",
        "Checkout"
    ] ;

    const stepperCtrl = useRef() ;
    const [ setStepperCtrl, {width, height} ] = useMeasure() ;
    

    useEffect(() => {
        setStepperCtrl(stepperCtrl.current) ;
    }, []) ;

    return (
        <Grid container className={classes.stepperDiv} >
            <Box className={classes.stepperLineDiv}>
                <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                    {
                        labelList.map((item, index) => (
                            <Step key={index}>
                                <StepLabel StepIconComponent={QontoStepIcon}><Box sx={{color : 'white', fontSize: '15px', fontFamily : 'Montserrat'}}>{item}</Box></StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>
            </Box>
            <Box className={classes.buttonGroup} ref={stepperCtrl}>
                <Box sx={{display : 'flex', gap:'10px', flexDirection : width < 300 && 'column'}}>
                    { handleBack && <Button variant={'contained'} className={classes.buttonCss}  onClick={handleBack} >Back</Button> } 
                    { 
                        handleContinue && <Button variant={'contained'} className={clsx(classes.buttonCss, finalStep && classes.mintButtonCss)}  onClick={handleContinue} disabled={disableContinue}>
                            {
                                finalStep ? ( (solsPriceType === 'legendary' || solsPriceType === 'rare') ? "Upload & Mint" : "Upload"  )  : 'Continue'
                            }
                        </Button> 
                    }
                </Box>
            </Box>
        </Grid>
    )
}

const mapDispatchToProps = {

}
const mapStateToProps = state => ({
    solsPriceType : state.upload.solsPriceType,
})
export default connect(mapStateToProps, mapDispatchToProps)(StepperControl) ;
import * as React from 'react' ;

import { connect } from 'react-redux';

import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import { Calendar } from "@amir04lm26/react-modern-calendar-date-picker";

import CloseImage from '../../assets/modals/Close.svg' ;

import  {
    Dialog,
    DialogContent,
    Box,
    Button
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles(() => ({
    root : {
        
    },
    paper : {
        backgroundColor : 'white !important',
        borderRadius : '5px !important',
        
        "& .MuiDialogTitle-root" : {
            color : 'white'
        },
    },
    secondButtonCss : {
        color : 'white !important',
        background : '#3772FF !important',
        borderRadius : '25px !important',
        textTransform : 'capitalize !important',
        width : '100px !important'
    },
    firstButtonCss : {
        color : 'black !important',
        background : "#F1F1F1 !important",
        borderRadius : '25px !important',
        textTransform : 'capitalize !important',
        width : '100px !important'
    },
})) ;

const CalendarModal = (props) => {

    const classes = useStyles() ;

    const {
        open, handleClose,

        selectedDay,
        handleSecond,
        handleFirst,
        handleChangeSelectedDay,

        text1,
        text2
    } = props ;

    const myRef = React.useRef(null) ;

    React.useEffect(() => {
        return () => {
            // myRef.current.removeEventListener('')
        }
    }, []) ;

    return (
        <Box className={classes.root}>
            <Dialog
                open={open}
                classes ={{
                    paper : classes.paper
                }}
            >
                <DialogContent>
                    <Box sx={{position : 'relative'}}>
                        <Calendar
                            value={selectedDay}
                            onChange={(e) => handleChangeSelectedDay(e)}
                            calendarClassName="responsive-calendar" // added this
                            shouldHighlightWeekends
                        />
                        <Box sx={{position : 'absolute', right : 5, top : 0, zIndex : 1000, cursor : 'pointer'}} onClick={handleClose}>
                            <img src={CloseImage} />
                        </Box>
                        <Box sx={{mt : '10px', display : 'flex', justifyContent: 'flex-end', gap : '15px'}}>
                            <Button variant={'contained'} className={classes.firstButtonCss} onClick={handleFirst}>{text1}</Button>
                            <Button variant={'contained'} className={classes.secondButtonCss} onClick={handleSecond}>{text2}</Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(CalendarModal) ;
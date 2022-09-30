import React, { useState } from "react";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import DatePicker, {utils} from "@amir04lm26/react-modern-calendar-date-picker";
import { convertObjToString } from "../../../../utils/Helper";

import {

} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    root : {

    },
    inputDiv : {
        background : "#2A2B31 !important" ,
        textAlign: 'center',
        paddingTop: 10 , paddingBottom : 10,
        fontSize: '15px',
        border: '1px solid #2A2B31',
        boxShadow: '0 5px 5px #2A2B31',
        color: 'white',
        outline: 'none',
        width : '140px !important',
    }
})) ;
const DateInput = (props) => {
    const classes = useStyles() ;

    const {
        selectedDay,
        setSelectedDay,
        minimumDate
    } = props ;

    const renderCustomInput = ({ ref }) => (
        <input
            readOnly
            ref={ref} // necessary
            placeholder={`${new Date().toLocaleDateString()}`}
            value={selectedDay ? `${new Date(convertObjToString(selectedDay)).toLocaleDateString()}` :  `${new Date().toLocaleDateString()}`}
            className={classes.inputDiv} // a styling class
        />
    )

    return (
        <DatePicker
            value={selectedDay}
            onChange={setSelectedDay}
            minimumDate={minimumDate}
            renderInput={renderCustomInput} // render a custom input
            shouldHighlightWeekends
        />
    );
};

export default DateInput;
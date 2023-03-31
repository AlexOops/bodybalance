import React, {useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker, LocalizationProvider, MobileDatePicker, ruRU, StaticDatePicker,DateField } from "@mui/x-date-pickers";
import {useDispatch, useSelector} from "react-redux";
import s from './CalendarPicker.module.scss';
import {FilledInput, InputAdornment, inputAdornmentClasses, TextField} from "@mui/material";
import {green} from "@mui/material/colors";

function AccountCircle() {
    return null;
}

export const CalendarPicker = ({workDatesArr, getWorkTimes}) => { //получает массив дат, делает только их активными, отдает выбранную дату в функцию getWorkTimes
    const dispatch = useDispatch();
    const [calendarState, setCalendarState] = useState(false);

    //отобразим в календаре только рабочие даты
    const disableCustomDt = (day) => {
        return !(workDatesArr.includes(day.format('YYYY-MM-DD')));
    };

    const toggleCalendarState = () => {
        console.log(calendarState);
        setCalendarState(prevState => !prevState);
    }

    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}
                          localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
    >
        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>

            {/*поле со статичным календарем*/}
            {/*<div onClick={toggleCalendarState}>Выбор даты и времени</div>*/}
            {/*<StaticDatePicker className={(calendarState)? `${s.calendar} ${s.visible}` : `${s.calendar}`}*/}
            {/*    label="Дата и время приема"*/}
            {/*    shouldDisableDate={disableCustomDt}*/}
            {/*    onAccept={getWorkTimes} //отправили полученную дату для поиска времени по ней.*/}
            {/*/>*/}

            <DatePicker
                        slotProps={{
                    textField: {
                        className: s.myInput,
                        inputProps: {
                        },
                        placeholder: "Дата и время приема",
                        // variant: "standard",
                        disableUnderline: false,
                        // InputProps: {},
                        sx:{border: '1.5px solid #D78DFF', borderRadius: '40px'},
                    },
                }}

                // sx={{border: '1.5px solid #D78DFF'}}
                // label="Дата и время приема"
                shouldDisableDate={disableCustomDt}
                onAccept={getWorkTimes} //отправили полученную дату для поиска времени по ней.

            />


        </DemoContainer>
    </LocalizationProvider>
    )
}
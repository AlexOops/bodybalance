import React from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {useDispatch, useSelector} from "react-redux";


export const CalendarPicker = ({workDatesArr, getWorkTimes}) => { //получает массив дат, делает только их активными, отдает выбранную дату в функцию getWorkTimes
    const dispatch = useDispatch();

    //отобразим в календаре только рабочие даты
    const disableCustomDt = (day) => {
        return !(workDatesArr.includes(day.format('YYYY-MM-DD')));
    };

    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
            <DatePicker
                shouldDisableDate={disableCustomDt}
                onAccept={getWorkTimes} //отправили полученную дату для поиска времени по ней.
            />
        </DemoContainer>
    </LocalizationProvider>
    )
}
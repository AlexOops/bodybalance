import React from 'react';
import s from "../Appointments.module.scss";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/ru';
import axios from "../../../../axios";

const NewCalendarEvent = ({appointment}) => {

    const [startDate, setStartDate] = React.useState(dayjs(new Date()));
    const [endDate, setEndDate] = React.useState(dayjs(new Date()));

    const saveNewEvent = async () => { //создадим событие и привяжем его к записи
        // создаем event
        const response = await fetch(process.env.REACT_APP_API_URI + '/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start: startDate.format(),
                end: endDate.format(),
                title: `${appointment.firstName} ${appointment.secondName}`
            })
        })
        const event = await response.json();
        // привяжем. Делаем на фронте, так как фронт решает когда надо обновить заявку а когда новую создать и какие параметры дополнить
        if(event) {
            const eventId = event._id;
            const appointmentId = appointment._id;
            const response = await axios.patch(`/appointments/${appointmentId}`, {
                eventId: eventId
            });


            console.log(response);
        }
    }

    return (
        <div className={s.newEventBlock}>
            <div className={s.newEventBlockHeader}>Назначить прием для {appointment.firstName} {appointment.secondName}</div>
            <div className={s.info}>
                <span className={s.infoTitle}>Указанные данные:</span>
                <span className={s.infoPhone}>Номер телефона: {appointment.phone}</span>
                <span className={s.infoEmail}>e-mail: {appointment.email}</span>
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                        label="Uncontrolled picker"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                    />
                    <DateTimePicker
                        label="Controlled picker"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>

            <button onClick={saveNewEvent}>Назначить прием</button>
        </div>
    );
};

export default NewCalendarEvent;
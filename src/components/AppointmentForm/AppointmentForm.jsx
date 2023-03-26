
import React, {useState} from "react";
import s from './AppointmentForm.module.scss';
import {Form, Formik, Field} from 'formik';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export const AppointmentForm = ({services}) => {
    //Быстрая запись
    console.log(services);

    const [value, setValue] = useState(dayjs('2022-04-17T15:30'));
    const [workTimes, setWorkTimes] = useState([]);
    const [workDate, setWorkDate] = useState('');
    //Окна для записи на услугу
    const workDates = [
        {
            date: "2023-03-30",
            time: ["11:00", "13:00", "14:00"],
        },
        {
            date: "2023-03-25",
            time: ["14:00", "15:00"],
        },
        {
            date: "2023-03-29",
            time: ["14:00", "15:00"],
        },
    ];

    //получим все рабочие даты в массив
    const workDatesArr = workDates.map((obj) => obj.date);

    //отобразим в календаре только рабочие даты
    const disableCustomDt = (day) => {
        return !(workDatesArr.includes(day.format('YYYY-MM-DD')));
    };

    const getWorkTime = (date) => { //получим список времени приема для выбранной даты.

        workDates.map((obj) => {
            if(obj.date === date.format('YYYY-MM-DD')){
                setWorkDate(obj.date);
                setWorkTimes(obj.time);
            }
        });
    }


    return (
        <div className={s.main}>
            <h2>Быстрая запись</h2>

            <div className={s.form}>
                <Formik
                    initialValues={{
                        serviceId: '',
                        firstName: '',
                        secondName: '',
                        email: '',
                        phone: '',
                        datetime: '',
                        text: '',
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.email){
                            errors.email = 'Заполните поле e-mail';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Некорректный почтовый адрес';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(()=> {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <label htmlFor="service">Выберите услугу</label>
                            <Field component="select" name="serviceId" id="service">
                                    {services.map((service, key) =>
                                        <option key={service._id} value={service._id}>{service.name}</option>
                                    )}
                            </Field>
                            <label htmlFor="firstName">Ваше имя</label>
                            <Field type="text" name="firstName" id="firstName"/>

                            <label htmlFor="secondName">Ваша фамилия</label>
                            <Field type="text" name="secondName" id="secondName"/>

                            <label htmlFor="mail">Введите почту</label>
                            <Field type="email" name="email" id="email"/>

                            <label htmlFor="phone">Введите телефон</label>
                            <Field type="text" name="phone" id="phone"/>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                    <DatePicker
                                        shouldDisableDate={disableCustomDt}
                                        onAccept={getWorkTime}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <label htmlFor="time">Выбор времени</label>
                            <Field
                                component="select"
                                id="time"
                                name="datetime"
                                // multiple={true}
                            > {workTimes.map((time, key) =>
                                <option key={key} value={`${workDate} ${time}`}>{time}</option>
                            )}
                            </Field>
                            <Field type="text" name="text"/>
                            <button type ="submit" disabled={isSubmitting}>Записаться </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
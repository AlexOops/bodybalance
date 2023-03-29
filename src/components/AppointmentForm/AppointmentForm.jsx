import React, {useEffect, useState} from "react";
import s from './AppointmentForm.module.scss';
import {Form, Formik, Field, isFunction} from 'formik';

// import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {useSelector} from "react-redux";
import {CalendarPicker} from "../Layout/Main/DataPicker/CalendarPicker";
import FormListItem from "./FormListItem";
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export const AppointmentForm = ({services}) => {
    //Быстрая запись
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

    // const [value, setValue] = useState(dayjs('2022-04-17T15:30'));
    const [workTimes, setWorkTimes] = useState([]);
    const [workDate, setWorkDate] = useState('');

    //активный компонент по dataset
    const [active, setActive] = useState(null);
    const onClickItem = (e) => {
        setActive(e.target.dataset.index);
    };

    //получим все рабочие даты в массив
    const workDatesArr = workDates.map((obj) => obj.date);

    const getWorkTimes = (date) => { //получим список времени приема для выбранной даты.
        console.log('Что получиили', date);
        workDates.map((obj) => {
                if(obj.date === date.format('YYYY-MM-DD')) {
                    setWorkDate(obj.date);
                    setWorkTimes(obj.time);
                    return console.log(obj.time);
                }
        });
        return console.log('Нет свободных часов на такую дату');
    };

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
                        // picked: '',
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
                    {({isSubmitting, values}) => (
                        <Form>
                            <div className={s.select}>
                                <h3 id="select-group" className={s.selectHeader}>Выберите услугу</h3>
                                    {services.map((service, key) =>
                                        <FormListItem
                                            service={service}
                                            key={key}
                                            onClickItem={onClickItem}
                                            active={active}
                                        />

                                    )}


                            </div>
                            <label htmlFor="firstName">Ваше имя</label>
                            <Field type="text" name="firstName" id="firstName"/>

                            <label htmlFor="secondName">Ваша фамилия</label>
                            <Field type="text" name="secondName" id="secondName"/>

                            <label htmlFor="mail">Введите почту</label>
                            <Field type="email" name="email" id="email"/>

                            <label htmlFor="phone">Введите телефон</label>
                            <Field type="text" name="phone" id="phone"/>

                            <CalendarPicker workDatesArr={workDatesArr} getWorkTimes={getWorkTimes}/>

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
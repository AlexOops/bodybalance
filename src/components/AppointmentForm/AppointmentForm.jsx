import React, {useEffect, useState} from "react";
import s from './AppointmentForm.module.scss';
import {Form, Formik, Field} from 'formik';

import {CalendarPicker} from "../Layout/Main/DataPicker/CalendarPicker";
import FormListItem from "./FormListItem";

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
    console.log('workTimes', workTimes);
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
                            <div className={s.flexRowContainer}>
                                <Field name="firstName"  type="text"  id="firstName" placeholder="Имя" className={s.textField}/>
                                <Field type="text" name="secondName" id="secondName"  placeholder="Фамилия" className={s.textField}/>
                            </div>

                            <div className={s.flexRowContainer}>
                                <Field type="email" name="email" id="email" placeholder="E-mail" className={s.textField}/>
                                <Field type="text" name="phone" id="phone" placeholder="+7 (999) 999-99-99" className={s.textField}/>
                            </div>

                            <Field type="textarea" as="textarea"  name="text" className={s.textArea} placeholder="Напишите текст"/>

                            <CalendarPicker id="datetime" workDatesArr={workDatesArr} getWorkTimes={getWorkTimes} placeholderText={'Дата и время приема'}/>

                            <div className={(!workTimes || (workTimes.length === 0))? s.hidden: s.time}>
                                <h3 className={s.timeTittle}>Доступные даты</h3>
                                <Field
                                    component="select"
                                    id="time"
                                    name="datetime"

                                > {workTimes.map((time, key) =>
                                    <option key={key} value={`${workDate} ${time}`}>{time}</option>
                                )}
                                </Field>
                            </div>
                            <div className={s.flexEnd}>
                                <button className={s.button} type ="submit" disabled={isSubmitting}>Записаться </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
import React, {Fragment, useEffect, useState} from "react";
import s from './AppointmentForm.module.scss';
import {Form, Formik, Field, useFormikContext} from 'formik';

import {CalendarPicker} from "./DataPicker/CalendarPicker";
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {selectedService, setSelectedService} from "../../redux/slices/services";
import {TextField} from "@mui/material";


export const AppointmentForm = ({services, name, isSubmitting, errors, values, setFieldValue, touched}) => {
    const selected = useSelector(selectedService);

useEffect(() =>{
    setFieldValue('serviceId', selected.id);
}, [selected])
    //Быстрая запись
    const workDates = [
        {
            date: "2023-04-30",
            time: ["11:00", "13:00", "14:00"],
        },
        {
            date: "2023-04-25",
            time: ["14:00", "15:00"],
        },
        {
            date: "2023-04-29",
            time: ["14:00", "15:00"],
        },
    ];

    // const [value, setValue] = useState(dayjs('2022-04-17T15:30'));

    const [workTimes, setWorkTimes] = useState([]);
    const [workDate, setWorkDate] = useState('');

    const [headerValue, setHeaderValue] = useState('Выберите услугу');
    const [isOpen, setOpen] = useState(false);//Развернуть селект

    const dispatch = useDispatch();

    //активный компонент по dataset (чтобы отмечать активный, если меню не сворачиваем при выборе)
    // const [active, setActive] = useState(null);

    const handleOpen = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const onClickItem = (e, id, name) => {
        // setActive(e.target.dataset.index);
        setOpen(false);
        setFieldValue('serviceId', id);
        setHeaderValue(name);
        // dispatch(setSelectedService(null));//обнулить выбор из карточки для выбора из селекта, так как разделили управление
        // // ( выбор по checked или выбор по клику из Card)
        dispatch(setSelectedService({name: name, id:id})); //храним выбранную услугу в стейте
    };

    //получим все рабочие даты в массив
    const workDatesArr = workDates.map((obj) => obj.date);

    const getWorkTimes = (date) => { //отобразим список времени приема для даты.
        if(date){
            workDates.map((obj) => {
                if(obj.date === date.format('YYYY-MM-DD')) {
                    setWorkDate(obj.date);
                    setWorkTimes(obj.time);
                }
                return obj
            });
        } else {
            console.log('Дата не выбрана');
        }
    };

    return (

       <>
        <div className={s.main}>
            <h2 className={s.name}>{name}</h2>
            <div className={s.form}>
                        <Form>
                            <div className={s.selectRow}>
                                <div className={s.select}>

                                <div onClick={handleOpen} className={`${s.selectHeader} ${(isOpen)? s.open : s.close}`}>
                                    {(selected.name === null) ? 'Выберите услугу' : selected.name}
                                </div>
                                    <input name="serviceId"  type="text"  id="serviceId" value={values.serviceId} readOnly={true} hidden={true}/>
                                    {(errors.serviceId&&touched.serviceId) && <div className={s.error}>{errors.serviceId}</div>}

                                    <div className={isOpen ? s.selectContainer : `${s.selectContainer} ${s.closeContainer}`}>

                                            {services.map((service, key) =>

                                                <div key={service.id}
                                                    // className={s.selectInput}
                                                    className={`${s.selectLabel} ${service._id === selected.id ? s.active : ''}`}
                                                    // data-index={service._id}
                                                    onClick={(e) => {
                                                        setFieldValue('serviceId', service.id);
                                                        onClickItem(e, service.id, service.name)
                                                    }}
                                                >
                                                    {service.name}
                                                </div>
                                            )}
                                    </div>

                                </div>
                            </div>
                            <div className={s.flexRowContainer}>
                                <div className={`${s.flexRelative} ${s.width50}`} >
                                    <Field name="firstName"  type="text"  id="firstName" placeholder="Имя" className={`${s.textField} `}/>
                                    {(errors.firstName&&touched.firstName) && <div className={s.error}>{errors.firstName}</div>}
                                </div>
                                <div className={`${s.flexRelative} ${s.width50}`} >
                                    <Field type="text" name="secondName" id="secondName"  placeholder="Фамилия" className={`${s.textField} `}/>
                                    {(errors.secondName&&touched.secondName) && <div className={s.error}>{errors.secondName}</div>}
                                </div>
                            </div>

                            <div className={s.flexRowContainer}>
                                <div className={`${s.flexRelative} ${s.width50}`} >
                                    <Field type="email" name="email" id="email" placeholder="E-mail" className={`${s.textField} `}/>
                                    {(errors.email&&touched.email) && <div className={s.error}>{errors.email}</div>}
                                </div>
                                <div className={`${s.flexRelative} ${s.width50}`} >
                                    <Field type="text" name="phone" id="phone" placeholder="+7 (999) 999-99-99" className={`${s.textField} `}/>
                                    {(errors.phone&&touched.phone) && <div className={s.error}>{errors.phone}</div>}
                                </div>
                            </div>

                            <div className={`${s.flexRelative} ${s.width100}`} >
                                <Field type="textarea" as="textarea"  name="text" className={s.textArea} placeholder="Напишите текст"/>
                                {(errors.text&&touched.text) && <div className={s.error}>{errors.text}</div>}
                            </div>

                            {/*Календарь*/}
                            <CalendarPicker id="datetime" workDatesArr={workDatesArr} getWorkTimes={getWorkTimes} placeholderText={'Дата и время приема'}/>
                            {/*Часы приема*/}
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
                            <div className={s.flexRelative}>
                                {(errors.datetime&&touched.datetime) && <div className={s.error}>{errors.datetime}</div>}
                            </div>
                            <div className={s.flexEnd}>
                                <button className={s.button} type ="submit" disabled={isSubmitting}>Записаться </button>
                            </div>
                        </Form>
            </div>
        </div>


       </>
    );

}
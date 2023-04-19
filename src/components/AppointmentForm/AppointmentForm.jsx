import React, {Fragment, useState} from "react";
import s from './AppointmentForm.module.scss';
import {Form, Formik, Field} from 'formik';

import {CalendarPicker} from "./DataPicker/CalendarPicker";
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {selectedService, setSelectedService} from "../../redux/slices/services";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'Не менее трех символов')
        // .max(50, 'Too Long!')
        .required('Укажите имя'),
    secondName: Yup.string()
        .min(3, 'Не менее трех символов')
        // .max(50, 'Too Long!')
        .required('Укажите фамилию'),
    email: Yup.string().email('Некорректный email').required('Введите e-mail'),
    phone: Yup.string().matches(phoneRegExp, 'Некорректный номер телефона'),
    text: Yup.string().max(500, 'Пожалуйста, введите сообщение не более 500 символов'),
    datetime: Yup.string().required('Выберите дату и время'),
    serviceId: Yup.string().required('Выберите Услугу'),

});

export const AppointmentForm = ({services, name}) => {
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

    const selected = useSelector(selectedService);
    const dispatch = useDispatch();

    //активный компонент по dataset (чтобы отмечать активный, если меню не сворачиваем при выборе)
    const [active, setActive] = useState(null);

    const handleOpen = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const onClickItem = (e, value) => {
        setActive(e.target.dataset.index);
        setOpen(false);
        setHeaderValue(value);
        dispatch(setSelectedService(null));//обнулить выбор из карточки для выбора из селекта, так как разделили управление ( выбор по checked или выбор по клику из Card)
        // dispatch(setSelectedService({name: value, id:e.target.dataset.index})); //храним выбранную услугу в стейте
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

        <div className={s.main}>
            <h2 className={s.name}>{name}</h2>
            <div className={s.form}>
                <Formik

                    // enableReinitialize
                    initialValues={{
                        // serviceId: (selected !== null) ? selected.id : '',
                        serviceId: '',
                        firstName: '',
                        secondName: '',
                        email: '',
                        phone: '',
                        datetime: '',
                        text: '',
                        // picked: '',
                    }}
                    validationSchema={SignupSchema}

                    // validate={values => {
                    //     const errors = {};
                    //     if (!values.email){
                    //         errors.email = 'Заполните поле e-mail';
                    //     } else if (
                    //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    //     ) {
                    //         errors.email = 'Некорректный почтовый адрес';
                    //     }
                    //     return errors;
                    // }}

                    onSubmit={(values, actions) => {
                        if(selected!==null) {
                            console.log(actions);
                            actions.setFieldValue('serviceId', selected.id); //если выбрали услугу из карточки, то берем значение из стейта.
                        }

                        setTimeout(()=> {

                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({isSubmitting, values, errors, touched  , setFieldValue  }) => (
                        <Form>
                            <div className={s.selectRow}>
                                <div className={s.select}>
                                    {(errors.serviceId&&touched.serviceId) && <div className={s.error}>{errors.serviceId}</div>}
                                <div onClick={handleOpen} className={`${s.selectHeader} ${(isOpen)? s.open : s.close}`}>
                                    {(selected===null) ? headerValue : selected.name}
                                </div>

                                    <div className={isOpen ? s.selectContainer : `${s.selectContainer} ${s.closeContainer}`}>
                                        <Field
                                            name="serviceId"

                                            render={({ field }) => (
                                                <>
                                                    {services.map((service, key) =>
                                                    <Fragment key={key}>
                                                        <input type="radio"
                                                               className={s.selectInput}
                                                               id={service._id}
                                                               {...field}
                                                                value={service._id}
                                                               // value={service.name}

                                                        />
                                                        <label
                                                            key={`label${service._id}`}
                                                            className={`${s.selectLabel} ${service._id === active ? s.active : ''}`}
                                                            data-index={service._id}
                                                            htmlFor={service._id}
                                                            onClick={(e) => onClickItem(e, service.name)}

                                                        >
                                                            {service.name}
                                                        </label>
                                                    </Fragment>
                                                        )}
                                                </>
                                            )}
                                        />


                                        {/*{services.map((service, key) =>*/}
                                        {/*    <ServicesSelectItem*/}
                                        {/*        service={service}*/}
                                        {/*        key={key}*/}
                                        {/*        onClickItem={(e)=>onClickItem( e, service.name )}*/}
                                        {/*        active={(selected===null) ? active : selected.id} //если есть выбранный элемент в стейте, то выделяем его в стиле, иначе собственный выбор формы по клику.*/}
                                        {/*    />*/}
                                        {/*)}*/}
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
                    )}
                </Formik>
            </div>
        </div>
    );
}
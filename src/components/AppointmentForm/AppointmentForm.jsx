import React, {useEffect, useState} from "react";
import s from './AppointmentForm.module.scss';
import {Form, Formik, Field} from 'formik';

import {CalendarPicker} from "./DataPicker/CalendarPicker";
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {selectedService, setSelectedService} from "../../redux/slices/services";
import ServiceIdInput from "./ServiceIdInput";
import axios from "../../axios";
import Modal from "../Modal/Modal";
import {openModal} from "../../redux/slices/modal";
import {selectedEmployer, setSelectedEmployer} from "../../redux/slices/employers";
import EmployerIdInput from "./EmployerIdInput";
import {nanoid} from "nanoid";

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
    phone: Yup.string().required('Укажите контактный номер').matches(phoneRegExp, 'Некорректный номер телефона'),
    text: Yup.string().max(500, 'Пожалуйста, введите сообщение не более 500 символов'),
    datetime: Yup.string().required('Выберите дату и время'),
    serviceId: Yup.string().required('Выберите Услугу'),

});

export const AppointmentForm = ({
                                    services, name, isSpecialist, employers
                                    // isSubmitting, errors, values, setFieldValue, touched
                                }) => {

    const selected = useSelector(selectedService);
    const selectedSpecialist = useSelector(selectedEmployer);
    const {data: authUser} = useSelector(state => state.auth); //получим id авторизованного покупателя
    const [workDates, setWorkDates] = useState([]); // храним полученые рабочие даты специалиста.


    //  const [value, setValue] = useState(dayjs('2023-05-28T08:00:00.000+00:00')); //пример работы day.js
    // console.log(value);

    const [workTimes, setWorkTimes] = useState([]); //список доступного времени
    const [workDate, setWorkDate] = useState(''); // дата выбранная пикером

    const [isOpen, setOpen] = useState(false);//Развернуть селект
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const onClickItem = (e, id, name, employer) => {
        setOpen(false);
        if (!isSpecialist) {
            dispatch(setSelectedService({name: name, id: id}));
            (employer) ? dispatch(setSelectedEmployer({
                name: employer.fullName,
                id: employer._id
            })) : console.log("Нет данных сотрудника по услуге");
        } else {
            dispatch(setSelectedEmployer({name: name, id: id})); //поместим выбранную услугу в стейт
        }
        console.log('selectedSpecialist', selectedSpecialist);
    };


    useEffect(() => {
        setWorkDate('');
        setWorkTimes([]);
        const fetchDataByEmployer = async () => {
            try {

                console.log(selectedSpecialist.id)
                await axios.get(`/worktime/employer/${selectedSpecialist.id}`)
                    .then(res => {
                        setWorkDates(res.data);
                    });
            } catch (err) {
                console.log(err)
            }
        }
        if (selectedSpecialist.id !== null) {
            fetchDataByEmployer().then();
        }
    }, [selectedSpecialist.id]);

    //получим все рабочие даты в массив
    // const workDatesArr = workDates.map((obj) => obj.date);

    const getWorkTimes = (date) => { //отобразим список времени приема для даты.
        if (date) {
            const arrData = workDates.filter((obj) => {
                return (obj.slice(0, 10) === date.format('YYYY-MM-DD'))
            });
            setWorkDate(date.format('YYYY-MM-DD'));
            setWorkTimes(arrData.map(obj => obj.slice(11, 16)))
        } else {
            console.log('Дата не выбрана');
        }
    };

    return (
        <Formik
            validateOnBlur={false}
            // enableReinitialize
            initialValues={{
                // serviceId: (selected !== null) ? selected.id : '',
                serviceId: isSpecialist ? '64480825e556a337db3fb841' : '',
                employer: '6447fcd874f077e18de6dfa1', //сотрудник принимающий по записи на прием.
                firstName: '',
                secondName: '',
                email: '',
                phone: '',
                datetime: '',
                text: '',
                // picked: '',
            }}
            validationSchema={SignupSchema}

            onSubmit={async (values) => {
                // actions.setFieldValue('serviceId', selected.id); //если выбрали услугу из карточки, то берем значение из стейта.
                try {
                    let postData = {
                        firstName: values.firstName,
                        secondName: values.secondName,
                        email: values.email,
                        phone: values.phone,
                        service: values.serviceId,
                        employer: values.employer, // (по умолчанию) если сотрудников одной услуги несколько, то нужно будет отображать их в форме// идея хранить в базе сотрудника у услуги.
                        dateTime: values.datetime,
                    };
                    if (authUser) {
                        postData = {...postData, customer: authUser._id};
                    }
                    if (values.text) {
                        postData = {...postData, text: values.text};
                    }
                    await axios.post('/appointments', postData)
                        .then(res => {
                            // actions.setSubmitting(false);
                            dispatch(openModal('modalMessage'));
                        })
                        .catch(err => console.log("Не удалась запись на прием", err))


                } catch (err) {
                    console.warn(err);
                    alert('Ошибка при создании записи');
                }
            }}
        >
            {({isSubmitting, values, errors, touched, setFieldValue, resetForm, setSubmitting}) => {

                return (

                    <div className={s.main}>
                        <h2 className={s.name}>{name}</h2>
                        <div className={s.form}>
                            <Form>
                                <div className={s.selectRow}>
                                    <div className={s.select}>

                                        <div onClick={handleOpen}
                                             className={`${s.selectHeader} ${(isOpen) ? s.open : s.close}`}>
                                            {!isSpecialist ?
                                                ((selected.name === null) ? 'Выберите услугу' : selected.name) :
                                                ((selectedSpecialist.name === null) ? 'Выберите специалиста' : selectedSpecialist.name)
                                            }
                                        </div>

                                        {!isSpecialist ?
                                            <>
                                                <ServiceIdInput setFieldValue={setFieldValue}/>
                                                {(errors.serviceId && touched.serviceId) &&
                                                    <div className={s.error}>{errors.serviceId}</div>}


                                                <div
                                                    className={isOpen ? s.selectContainer : `${s.selectContainer} ${s.closeContainer}`}>

                                                    {services.map((service, key) =>
                                                        <div key={`emp_${key}_${service._id}`}
                                                            // className={s.selectInput}
                                                             className={`${s.selectLabel} ${service._id === selected.id ? s.active : ''}`}
                                                            // data-index={service._id}
                                                             onClick={(e) => {
                                                                 setFieldValue('serviceId', service.id);
                                                                 onClickItem(e, service.id, service.name, service.employer);
                                                             }}
                                                        >
                                                            {service.name}
                                                        </div>
                                                    )}
                                                </div>
                                            </> :
                                            <>
                                                <EmployerIdInput setFieldValue={setFieldValue}/>
                                                {(errors.employer && touched.employer) &&
                                                    <div className={s.error}>{errors.employer}</div>}


                                                <div
                                                    className={isOpen ? s.selectContainer : `${s.selectContainer} ${s.closeContainer}`}>

                                                    {employers.map((employer, key) =>
                                                        <div key={`${key}_${employer._id}`}
                                                            // className={s.selectInput}
                                                             className={`${s.selectLabel} ${employer._id === selectedSpecialist._id ? s.active : ''}`}
                                                            // data-index={service._id}
                                                             onClick={(e) => {
                                                                 setFieldValue('employer', employer._id);
                                                                 onClickItem(e, employer._id, employer.fullName + " - " + employer.employer && employer.employer.profession);
                                                             }}
                                                        >
                                                            {employer.fullName} - {employer.employer && employer.employer.profession}
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        }

                                    </div>
                                </div>
                                <div className={s.flexRowContainer}>
                                    <div className={`${s.flexRelative} ${s.width50}`}>
                                        <Field name="firstName" type="text" id="firstName" placeholder="Имя"
                                               className={`${s.textField} `}/>
                                        {(errors.firstName && touched.firstName) &&
                                            <div className={s.error}>{errors.firstName}</div>}
                                    </div>
                                    <div className={`${s.flexRelative} ${s.width50}`}>
                                        <Field type="text" name="secondName" id="secondName" placeholder="Фамилия"
                                               className={`${s.textField} `}/>
                                        {(errors.secondName && touched.secondName) &&
                                            <div className={s.error}>{errors.secondName}</div>}
                                    </div>
                                </div>

                                <div className={s.flexRowContainer}>
                                    <div className={`${s.flexRelative} ${s.width50}`}>
                                        <Field type="email" name="email" id="email" placeholder="E-mail"
                                               className={`${s.textField} `}/>
                                        {(errors.email && touched.email) &&
                                            <div className={s.error}>{errors.email}</div>}
                                    </div>
                                    <div className={`${s.flexRelative} ${s.width50}`}>
                                        <Field type="text" name="phone" id="phone" placeholder="+7 (999) 999-99-99"
                                               className={`${s.textField} `}/>
                                        {(errors.phone && touched.phone) &&
                                            <div className={s.error}>{errors.phone}</div>}
                                    </div>
                                </div>

                                <div className={`${s.flexRelative} ${s.width100}`}>
                                    <Field type="textarea" as="textarea" name="text" className={s.textArea}
                                           placeholder="Напишите текст"/>
                                    {(errors.text && touched.text) && <div className={s.error}>{errors.text}</div>}
                                </div>

                                {/*Календарь*/}
                                <CalendarPicker id="datetime"
                                                selected={workDate}

                                    // workDatesArr={workDatesArr}
                                                workDatesArr={workDates.map(el => el.slice(0, 10))}
                                                getWorkTimes={getWorkTimes}
                                                placeholderText={'Дата и время приема'}/>
                                {/*Часы приема*/}
                                <div className={(!workTimes || (workTimes.length === 0)) ? s.hidden : s.time}>
                                    <h3 className={s.timeTittle}>Доступное время</h3>
                                    <Field
                                        component="select"
                                        id="time"
                                        name="datetime"

                                    > {workTimes.map((time) =>
                                        <option key={nanoid()} value={`${workDate}T${time}:00`}>{time}</option>
                                    )}
                                    </Field>
                                </div>
                                <div className={s.flexRelative}>
                                    {(errors.datetime && touched.datetime) &&
                                        <div className={s.error}>{errors.datetime}</div>}
                                </div>
                                <div className={s.flexSBetween}>
                                    <button type='button' className={s.clearButton} onClick={() => {
                                        resetForm();
                                    }}>Очистить данные
                                    </button>
                                    <button className={s.button} type="submit" disabled={isSubmitting}>Записаться
                                    </button>
                                </div>
                                <Modal type={'modalMessage'}>
                                    <div className={s.feedback}>{values.firstName} {values.secondName}, Вы записаны на
                                        прием на {values.datetime.replace('T', ' ')} <br/>
                                        Ожидайте телефонного звонка в ближайшее время для подтверждения записи
                                    </div>
                                </Modal>
                            </Form>
                        </div>
                    </div>
                )
            }
            }

        </Formik>
    );

}
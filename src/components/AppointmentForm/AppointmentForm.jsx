import React, {useEffect, useState} from "react";
import s from './AppointmentForm.module.scss';
import {Form, Formik, Field} from 'formik';

import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {selectedService, setSelectedService} from "../../redux/slices/services";
import ServiceIdInput from "./ServiceIdInput";
import axios from "../../axios";
import Modal from "../Modal/Modal";
import {openModal} from "../../redux/slices/modal";
import {selectedEmployer, setSelectedEmployer} from "../../redux/slices/employers";
import EmployerIdInput from "./EmployerIdInput";
import Phone from "./Phone";


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
        phone: Yup.string().required('Укажите контактный номер'),
        text: Yup.string().max(500, 'Пожалуйста, введите сообщение не более 500 символов'),
        // serviceId: Yup.string().required('Выберите Услугу'),
        // Делаем поле обязательным на фронте для страницы услуги или специалисты соответственно
        serviceId: Yup.string().when("employer", {
            is: employer => employer === undefined,
            then: () => Yup.string().required("Выберите услугу"),
            // otherwise: Yup.string()
        }),
        employer: Yup.string().when("serviceId", {
            is: serviceId => serviceId === undefined,
            then: () => Yup.string().required("Выберите специалиста"),
            // otherwise: ()=>Yup.string()
        })

    },
    [["serviceId", "employer"]]
);

export const AppointmentForm = ({
                                    services, name, isSpecialist, employers, source_name
                                    // isSubmitting, errors, values, setFieldValue, touched
                                }) => {

    const selected = useSelector(selectedService);
    const selectedSpecialist = useSelector(selectedEmployer);
    const {data: authUser} = useSelector(state => state.auth); //получим id авторизованного покупателя

    const [isOpen, setOpen] = useState(false);//Развернуть селект
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const onClickItem = (e, id, name) => {
        setOpen(false);
        if (isSpecialist) {
            dispatch(setSelectedEmployer({name: name, id: id})); //поместим выбранного специалиста в стейт
        } else {
            dispatch(setSelectedService({name: name, id: id})); //поместим выбранную услугу в стейт
        }
    };


    useEffect(() => {
        dispatch(setSelectedEmployer({name: null, id: null}))
        dispatch(setSelectedService({name: null, id: null}))
    }, [])

    return (
        <Formik
            validateOnBlur={false}
            // enableReinitialize
            initialValues={{
                //Услуга приема специалиста по умолчанию (для заявки на прием к специалисту, уточнение услуги не критично)
                title: '',
                serviceId: '',
                employer: '', //сотрудник принимающий по записи на прием.
                firstName: '',
                secondName: '',
                email: '',
                phone: '',
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
                        // service: values.serviceId,
                        // employer: values.employer,
                        //источник обращения
                        source_name: source_name,
                    };
                    switch (source_name) {
                        case 'services':
                            postData.service = values.serviceId
                            break
                        case 'specialists':
                            postData.employer = values.employer
                            break
                        case 'rehabilitation':
                            postData.onlineRehabilitation = values.serviceId
                            break
                        default:
                            console.log('Источник не определен')
                    }

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
            {({isSubmitting, values, errors, touched, setFieldValue, resetForm, setSubmitting, setValues}) => {

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
                                        {
                                            // !isSpecialist
                                            (source_name === 'services' || source_name === 'rehabilitation')
                                                ?
                                                <>
                                                    <ServiceIdInput setFieldValue={setFieldValue}/>
                                                    {(errors.serviceId && touched.serviceId) &&
                                                        <div className={s.error}>{errors.serviceId}</div>}
                                                    {/*Сервисы*/}
                                                    <div
                                                        className={isOpen ? s.selectContainer : `${s.selectContainer} ${s.closeContainer}`}>
                                                        {services.map((service, key) =>
                                                            <div key={`emp_${key}_${service._id}`}
                                                                // className={s.selectInput}
                                                                 className={`${s.selectLabel} ${service._id === selected.id ? s.active : ''}`}
                                                                // data-index={service._id}
                                                                 onClick={(e) => {
                                                                     setFieldValue('serviceId', service._id);
                                                                     onClickItem(e, service._id, service.name);
                                                                 }}
                                                            >
                                                                {service.name}
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                                :
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
                                                                     onClickItem(e, employer._id,
                                                                         employer.fullName + " - " + employer.employer.profession);
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
                                        <Field name="phone" component={Phone}/>
                                        {(errors.phone && touched.phone) &&
                                            <div className={s.error}>{errors.phone}</div>}
                                    </div>
                                </div>

                                <div className={`${s.flexRelative} ${s.width100}`}>
                                    <Field type="textarea" as="textarea" name="text" className={s.textArea}
                                           placeholder="Напишите текст"/>
                                    {(errors.text && touched.text) && <div className={s.error}>{errors.text}</div>}
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
                                    <div className={s.feedback}>{values.firstName} {values.secondName}, Ваша заявка
                                        отправлена <br/>
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
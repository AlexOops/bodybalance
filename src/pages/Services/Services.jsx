import {useDispatch, useSelector} from 'react-redux';
import {fetchServices, selectedService, setSelectedService} from "../../redux/slices/services";
import s from './Services.module.scss';
import {Card} from "../../components/Card/Card";
import {Form, Formik, Field, useFormikContext} from 'formik';
import {AppointmentForm} from "../../components/AppointmentForm/AppointmentForm";
import {useEffect, useRef, useState} from "react";
import React from "react";
import {openModal} from "../../redux/slices/modal";
import Modal from "../../components/Modal/Modal";
import * as Yup from "yup";


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

export const Services = () => {
    const dispatch = useDispatch();
    const {services} = useSelector( state => state.services);
    const [service, setService] = useState({});
    // const {date, time} = useSelector( state => state.datepicker);

    const isServicesLoading = services.status === 'loading'; // boolean

    // const modalActive = useSelector(selectIsActive);
    const scrollToRef = useRef();

    const setModal = (event, obj) => {
        setService(obj);
        dispatch(openModal('modalService'));
    }

    const cardAction = () => {
        scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    useEffect(() => {
        dispatch(fetchServices());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <>
            <div className="container-color">
            <div className={s.main}>
                <div className={s.description}>
                    <div className={s.circleFirst}></div>
                    <div className={s.circleSecond}></div>
                    <h1 className={s.title}>Наши услуги</h1>
                    <p className={s.text}>Картельные сговоры не допускают ситуации, при которой реплицированные с зарубежных источников, современные исследования,
                        вне зависимости от их уровня, должны быть представлены в исключительно положительном свете.</p>
                </div>
                <div className={s.servicesTitleWrap}>
                    <h2 className={s.servicesTitle}>Все услуги</h2>
                </div>

                <div className={s.servicesItems}>{(isServicesLoading ? [...Array(6)] : services.items).map((obj, index)=>
                    isServicesLoading
                        ? (<div className={s.margin} key={index}>
                                <Card key={index} isLoading={true}/>
                            </div>
                        )
                        : (
                        <div className={s.margin} key={obj._id} onClick={(event)=>setModal(event, obj)}>
                            <Card
                                id={obj._id}
                                price={obj.price}
                                name={obj.name}
                                description={obj.description}
                                text={obj.text}
                                imageUrl={(obj.imageUrl) ?`http://localhost:4444${obj.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                            />
                        </div>
                    )
                )}
                </div>
            </div>
        </div>
            <div className="container" ref={scrollToRef}>

                <Formik
                    validateOnBlur={false}
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

                    onSubmit={(values, actions) => {
                            // actions.setFieldValue('serviceId', selected.id); //если выбрали услугу из карточки, то берем значение из стейта.

                        setTimeout(()=> {

                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({isSubmitting, values, errors, touched  , setFieldValue  }) => (
                        <AppointmentForm isSubmitting={isSubmitting}
                                         values={values}
                                         errors={errors}
                                         touched={touched}
                                         setFieldValue={setFieldValue}
                                         name={'Быстрая запись'}
                                         services={services.items}
                        />
                    )}

                </Formik>
                </div>
            <Modal type='modalService'>
                <Card
                    isFull={true}
                    id={service._id}
                    price={service.price}
                    name={service.name}
                    description={service.description}
                    text={service.text}
                    handleAction={cardAction}
                />
            </Modal>
        </>

    )
}
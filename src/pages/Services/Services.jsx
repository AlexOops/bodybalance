import {useDispatch, useSelector} from 'react-redux';
import {fetchServices} from "../../redux/slices/services";
import s from './Services.module.scss';
import {Card} from "../../components/Card/Card";
import {AppointmentForm} from "../../components/AppointmentForm/AppointmentForm";
import {useEffect, useRef, useState} from "react";
import React from "react";
import {openModal} from "../../redux/slices/modal";
import Modal from "../../components/Modal/Modal";

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
                        <div className={s.margin} key={obj._id} onClick={(event)=> {
                            setModal(event, obj)
                        }}>
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


                        <AppointmentForm
                                         // isSubmitting={isSubmitting}
                                         // values={values}
                                         // errors={errors}
                                         // touched={touched}
                                         // setFieldValue={setFieldValue}
                                         name={'Быстрая запись'}
                                         services={services.items}
                        />

                </div>
            <Modal type='modalService'>
                <Card
                    employer={service.employer}
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
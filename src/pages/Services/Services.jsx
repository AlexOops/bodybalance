import {useDispatch, useSelector} from 'react-redux';
import {fetchServices} from "../../redux/slices/services";
import s from './Services.module.scss';
import {Card} from "../../components/Card/Card";
import {AppointmentForm} from "../../components/AppointmentForm/AppointmentForm";
import {useEffect, useRef, useState} from "react";
import React from "react";
import {openModal} from "../../redux/slices/modal";
import Modal from "../../components/Modal/Modal";
import {Circles} from "../../components/Circles/Circles";

export const Services = () => {
    const dispatch = useDispatch();
    const {services} = useSelector(state => state.services);
    const [service, setService] = useState({});

    const isServicesLoading = services.status === 'loading';

    const scrollToRef = useRef();

    const setModal = (event, item) => {
        setService(item);
        dispatch(openModal('modalService'));
    }

    const cardAction = () => {
        scrollToRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    return (
        <>
            <div className="container-color">
                <div className={s.main}>
                    <div className={s.description}>

                        <Circles smallSize={280} smallAxisX={140} smallAxisY={-20}
                                 bigSize={430} bigAxisX={-145} bigAxisY={-40}/>

                        <h1 className={s.title}>Наши услуги</h1>
                        <p className={s.text}>Картельные сговоры не допускают ситуации, при которой реплицированные с
                            зарубежных источников, современные исследования,
                            вне зависимости от их уровня, должны быть представлены в исключительно положительном
                            свете.</p>
                    </div>
                    <div className={s.servicesTitleWrap}>
                        <h2 className={s.servicesTitle}>Все услуги</h2>
                    </div>

                    <div className={s.servicesItems}>
                        {
                            (isServicesLoading ? [...Array(6)] : services.items).map((item, index) =>

                                isServicesLoading ?
                                    (
                                        <div className={s.margin} key={index}>
                                            <Card key={index} isLoading={true}/>
                                        </div>
                                    ) : (
                                        <div className={s.margin} key={item._id} onClick={(event) => {
                                            setModal(event, item)
                                        }}>
                                            <Card
                                                id={item._id}
                                                name={item.name}
                                                recommendations={item.recommendations}
                                                text={item.text}
                                                imageUrl={(item.imageUrl) ? `http://localhost:4444${item.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
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
                    source_name={'services'}
                />

                <Circles smallSize={270} smallAxisX={-140} smallAxisY={170}
                         bigSize={420} bigAxisX={-90} bigAxisY={215}/>

                <Circles smallSize={345} smallAxisX={945} smallAxisY={220}
                         bigSize={530} bigAxisX={1020} bigAxisY={-40}/>

            </div>

            <Modal type='modalService'>
                <Card
                    employer={service.employer}
                    isFull={true}
                    id={service._id}
                    name={service.name}
                    description={service.description}
                    recommendations={service.recommendations}
                    imageUrl={(service.imageUrl) ? `http://localhost:4444${service.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                    handleAction={cardAction}
                />
            </Modal>
        </>

    )
}
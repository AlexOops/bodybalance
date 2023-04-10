import {useDispatch, useSelector} from 'react-redux';
import {fetchServices} from "../../redux/slices/services";
import s from './Services.module.scss';
import m from './../../components/Layout/Card/Card.module.scss'
import {Card} from "../../components/Layout/Card/Card";
import {AppointmentForm} from "../../components/AppointmentForm/AppointmentForm";
import {useEffect, useState} from "react";
import card_img from "../../assets/rectangle33.jpg";
import ReactMarkdown from "react-markdown";
import Modal from "../../components/Modal/Modal";
import React from "react";
import {active, openModal, selectIsActive} from "../../redux/slices/modal";


export const Services = () => {
    const dispatch = useDispatch();
    const {services} = useSelector( state => state.services);
    const [service, setService] = useState({});
    // const {date, time} = useSelector( state => state.datepicker);

    const isServicesLoading = services.status === 'loading'; // boolean
    // const isServicesLoading = true; // проверить скелетон

    const modalActive = useSelector(selectIsActive);

    const setModal = (event, obj) => {
        setService(obj);
        // dispatch(active(true));
        dispatch(openModal(
                <Card
                isFull={true}
                id={obj._id}
                price={obj.price}
                name={obj.name}
                description={obj.description}
                text={obj.text}
            />
        ));
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
            <div className="container"><AppointmentForm name={'Быстрая запись'} services={services.items}/></div>
            {/*<Modal width={'1070px'} height={'490px'}>*/}
            {/*    <Card*/}
            {/*        isFull={true}*/}
            {/*        id={service._id}*/}
            {/*        price={service.price}*/}
            {/*        name={service.name}*/}
            {/*        description={service.description}*/}
            {/*        text={service.text}*/}
            {/*    />*/}
            {/*</Modal>*/}
        </>

    )
}
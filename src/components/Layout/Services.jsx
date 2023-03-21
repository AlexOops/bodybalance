import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchServices} from "../../redux/slices/services";
import ReactMarkdown from "react-markdown";
import s from './Services.module.scss'

export const Services = () => {
    const dispatch = useDispatch();
    const {services} = useSelector( state => state.services);

    const isServicesLoading = services.status === 'loading'; // boolean

    React.useEffect(() => {
        dispatch(fetchServices());
    },[]);

    return (
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
                <div className={s.servicesItems}>{(isServicesLoading ? [...Array(3)] : services.items).map((obj, index)=>
                    isServicesLoading ? (<div > Загрузка...</div>) : (
                        <div className={s.serviceItem} key={index}>
                            <div className={s.image}>
                                <img
                                    src={(obj.imageUrl) ?`http://localhost:4444${obj.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                                    alt={obj.name}
                                 />
                            </div>
                            <h3 className={s.h3} > {obj.name} </h3>
                            <p className={s.itemText}><ReactMarkdown>{obj.description}</ReactMarkdown></p>
                            <div className={s.itemPrice}> {obj.price} </div>
                        </div>
                    )
                )}
                </div>
            </div>
        </div>


    )
}
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../../../redux/slices/modal";
import s from "./Services.module.scss";
import axios from "../../../axios";
import {fetchServices} from "../../../redux/slices/services";
import Modal from "../../../components/Modal/Modal";
import {CreateService} from "../../../components/Admin/CreateService/CreateService";
import CustomAvatar from "../../../components/Images/CustomAvatar/CustomAvatar";
import {Service} from "../../../components/Admin/Service/Service";
import ReactMarkdown from "react-markdown";

export const Services = () => {

    const dispatch = useDispatch();
    const {services} = useSelector(state => state.services);
    const isServicesLoading = services.status === 'loading';

    const [message, setMessage] = useState('');
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch])

    // СОЗДАНИЕ НОВОЙ УСЛУГИ
    const handleOpenModalForAddNewService = (e) => {
        e.preventDefault();

        dispatch(openModal('modalNewService'));
    }

    const handleOpenService = (e, service) => {
        e.preventDefault();

        setSelectedService(service);
        dispatch(openModal('modalOpenService'));
    }

    const handleSubmitToRemove = async (e, id) => {
        e.stopPropagation();

        const response = await axios.delete(`/admin/services/removeService/${id}`);

        if (response.data.success) {
            setMessage('Услуга успешно удалена!');
            dispatch(fetchServices());
        } else {
            setMessage('Произошла ошибка при удалении');
        }
    }

    const handleUpdatedServices = () => {
        dispatch(fetchServices());
    }

    return (
        <>
            <h4>Услуги</h4>

            <div className={s.controlBar}>
                <button className={'adminButton'} onClick={(e) => handleOpenModalForAddNewService(e)}>
                    Создать новую услугу
                </button>

                <Modal type={'modalNewService'}>
                    <CreateService/>
                </Modal>
            </div>

            <div className={s.container}>
                {
                    isServicesLoading ? 'Загрузка услуг...'

                        : services.items.map((service) =>

                            <div className={s.card} key={service._id} onClick={(e) => handleOpenService(e, service)}>

                                <div className="remove"
                                     onClick={(e) => handleSubmitToRemove(e, service._id)}>
                                </div>

                                <div className={s.avatar}>
                                    <CustomAvatar avatarUrl={service.imageUrl}
                                                  fullName={service.name} size={'100px'}/>
                                </div>

                                <div className={s.name}>{service.name}</div>

                                <div className={`${s.descriptions} serviceDescription`}>
                                    <ReactMarkdown>{service.recommendations}</ReactMarkdown>
                                </div>
                            </div>
                        )
                }

                <Modal type={"modalOpenService"}>
                    <Service service={selectedService} handleUpdatedServices={handleUpdatedServices}/>
                </Modal>

            </div>
        </>
    );
};
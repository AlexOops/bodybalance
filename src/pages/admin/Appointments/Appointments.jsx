import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAppointments} from "../../../redux/slices/appointments";
import s from "./Appointments.module.scss"
import {nanoid} from "nanoid";
import axios from "../../../axios";
import Modal from "../../../components/Modal/Modal";
import {closeModal, openModal} from "../../../redux/slices/modal";
import {NewCalendarEvent} from "../../../components/Admin/Appointment/NewCalendarEvent/NewCalendarEvent";

export const Appointments = () => {

    const dispatch = useDispatch();
    const [message, setMessage] = useState('');

    const {appointments} = useSelector(state => state.appointments);
    const isAppointmentsLoading = appointments.status === 'loading';

    const [optionSources] = useState({
        'services': 'Услуги',
        'specialists': 'Специалисты',
        'rehabilitation': 'Онлайн-реабилитация',
    });

    const [optionColors] = useState({
        'Ждет ответ': s.openOption,
        'Назначен прием': s.inProgressOption,
        'Прием состоялся': s.completedOption,
        'Прием не состоялся': s.canceledOption,
    });

    //выбранная запись для передачи в модальное окно
    const [selectedAppointment, setSelectedAppointment] = useState({});


    useEffect(() => {
        dispatch(fetchAppointments())
    }, [dispatch])

    const handleStatusChange = async (e, id) => {
        const newStatus = e.target.value

        try {
            const res = await axios.patch("/appointments/" + id, {
                status: newStatus
            })
            if (res.status === 200) {
                console.log('Статус изменен на ' + newStatus)
                e.target.className = optionColors[e.target.value]

            }

        } catch (err) {
            console.log("Ошибка обновления статуса", err)
        }
    }

    const openNewEventModal = (obj) => {
        dispatch(openModal('modalNewEvent'))
        setSelectedAppointment(obj);
    }

    const showMessage = (message) => {
        setMessage(message);

        setTimeout(() => {
            setMessage('');
            dispatch(fetchAppointments());  //временно - обновляем все - возможно перейти на redux
            dispatch(closeModal('modalNewEvent'));
        }, 1500);
    }

    return (

        <div>
            <h1 className={s.title}>Заявка клиента на запись</h1>

            <div className={s.appointments}>

                <div className={`${s.cell} ${s.headerCell} ${s.startCell}`}>Источник</div>
                <div className={`${s.cell} ${s.headerCell}`}>Имя</div>
                <div className={`${s.cell} ${s.headerCell}`}>Фамилия</div>
                <div className={`${s.cell} ${s.headerCell}`}>Телефон</div>
                <div className={`${s.cell} ${s.headerCell}`}>Услуга</div>
                <div className={`${s.cell} ${s.headerCell}`}>Специалист</div>
                <div className={`${s.cell} ${s.headerCell}`}>Статус</div>
                <div className={`${s.cell} ${s.headerCell}`}>Авторизован</div>
                <div className={`${s.cell} ${s.headerCell}`}>Дата</div>
                <div className={`${s.cell} ${s.headerCell} ${s.endCell}`}>Создать событие</div>

                {(isAppointmentsLoading ? [...Array(3)] : appointments.items).map((obj) => (
                    isAppointmentsLoading
                        ? (<div key={nanoid()}>Loading...</div>)
                        : (<Fragment key={nanoid()}>
                            <div className={`${s.cell} ${s.startCell}`}>{optionSources[obj.source_name]}</div>
                            <div className={s.cell}>{obj.firstName}</div>
                            <div className={s.cell}>{obj.secondName}</div>
                            <div className={s.cell}>{obj.phone}</div>
                            <div
                                className={s.cell}>{obj.service?.name || obj.onlineRehabilitation?.name || 'Услуга не указана'}</div>
                            <div className={s.cell}>{obj.employer?.fullName || 'Специалист не указан'}</div>
                            {/*<div className={s.cell}>{obj.status}</div>*/}
                            <select
                                // value={selectedStatus[obj._id]}
                                defaultValue={obj.status}
                                onChange={(e) =>
                                    handleStatusChange(e, obj._id)
                                }

                                className={optionColors[obj.status]}
                            >
                                <option value="Ждет ответ" className={s.openOption}>Ждет ответ</option>
                                <option value="Назначен прием" className={s.inProgressOption}>Назначен прием</option>
                                <option value="Прием состоялся" className={s.completedOption}>Прием состоялся</option>
                                <option value="Прием не состоялся" className={s.canceledOption}>Прием не состоялся</option>
                            </select>
                            <div className={s.cell}>{obj.customer?.fullName || 'не авторизован'}</div>
                            <div className={`${s.cell}`}>
                                {new Date(obj.createdAt).toLocaleString('ru-RU')}
                            </div>
                            <div className={`${s.cell} ${s.endCell}`} onClick={() => openNewEventModal(obj)}>
                                Назначить прием
                            </div>


                        </Fragment>)
                ))}
            </div>

            {
                selectedAppointment &&

                <Modal type={'modalNewEvent'}>

                    {

                        message ?
                            <div className={s.message}>{message}</div>
                            :
                            <NewCalendarEvent appointment={selectedAppointment}
                                              showMessage={showMessage}
                            />
                    }

                </Modal>
            }

        </div>
    );
};


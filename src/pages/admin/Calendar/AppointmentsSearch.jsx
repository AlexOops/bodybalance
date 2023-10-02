import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAppointments} from "../../../redux/slices/appointments";
import {nanoid} from "nanoid";
import s from './Calendar.module.scss'
import Checkbox from "./Checkbox";

export const AppointmentsSearch = () => {
    const dispatch = useDispatch();
    const {appointments} = useSelector(state => state.appointments);

    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const isAppointmentsLoading = appointments.status === 'loading'; // boolean
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

    const [toppings, setToppings] = useState([
        {name: "services", checked: true, title: "Услуги"},
        {name: "specialists", checked: true, title: "Специалисты"},
        {name: "rehabilitation", checked: true, title: "Онлайн-реабилитация"},
    ])

    const [statuses, setStatuses] = useState([
        {name: "waiting", checked: true, title: "Ждет ответ"},
        {name: "appointment", checked: true, title: "Назначен прием"},
        {name: "completed", checked: true, title: "Прием состоялся"},
        {name: "cancel", checked: true, title: "Прием не состоялся"},
    ])

    const updateCheckStatus = (state, setState, index) => {
        setState(
            state.map((topping, currentIndex) =>
                currentIndex === index
                    ? {...topping, checked: !topping.checked}
                    : topping
            )
        )
    }

    const deleteAllStatuses = () => {
        setStatuses(
            statuses.map((status) =>
                 ({...status, checked: false})
            )
        )
    }

    const deleteAllSources = () => {
        setToppings(
            toppings.map((topping) =>
                ({...topping, checked: false})
            )
        )
    }


    useEffect(() => {
        dispatch(fetchAppointments())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    return (

        <div>
            Фильтр по источнику:

            <div className={s.sourcesFilter}>
                {toppings.map((topping, index) => (
                    <Checkbox
                        key={topping.name}
                        isChecked={topping.checked}
                        checkHandler={() => updateCheckStatus(toppings, setToppings, index)}
                        label={topping.title}
                        index={index}
                    />
                    
                ))}
                <div onClick={deleteAllSources}>убрать все</div>
            </div>


            Фильтр по статусу:

            <div className={s.sourcesFilter}>
                {statuses.map((status, index) => (
                    <Checkbox
                        key={status.name}
                        isChecked={status.checked}
                        checkHandler={() => updateCheckStatus(statuses, setStatuses, index)}
                        label={status.title}
                        index={index}
                    />
                ))}

                <div onClick={deleteAllStatuses}>убрать все</div>
            </div>



            <input className={s.search}
                   type="text"
                   placeholder="Поиск заявки по фамилии, телефону"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}/>

            <div className={s.appointments}>

                <div className={`${s.cell} ${s.startCell}`}>Источник</div>
                <div className={s.cell}>Имя</div>
                <div className={s.cell}>Фамилия</div>
                <div className={s.cell}>Телефон</div>
                <div className={s.cell}>Услуга</div>
                <div className={s.cell}>Специалист</div>
                <div className={s.cell}>Статус</div>
                <div className={s.cell}>Авторизован</div>
                <div className={`${s.cell} ${s.endCell}`}>Дата</div>

                {(isAppointmentsLoading ? [...Array(3)] : appointments.items).filter(app => {

                        return (

                            toppings.some(el => (el.name === app?.source_name && el.checked === true)) &&
                            (
                                app?.secondName.toLowerCase().includes(search.toLowerCase()) ||
                                app?.phone.toLowerCase().includes(search.toLowerCase())
                            ) && (
                                statuses.some(el => (el.title === app?.status && el.checked === true))
                            )
                        )
                    }
                )
                    .map((obj, ind) => (
                        isAppointmentsLoading
                            ? (<div key={nanoid()}>Loading...</div>)
                            : (<Fragment key={nanoid()}>
                            <div  className={s.appointmentsRow} onClick={()=> console.log(obj)}>
                                <div className={`${s.cell} ${s.startCell}`}>{optionSources[obj.source_name]}</div>
                                <div className={s.cell}>{obj.firstName}</div>
                                <div className={s.cell}>{obj.secondName}</div>
                                <div className={s.cell}>{obj.phone}</div>
                                <div
                                    className={s.cell}>{obj.service?.name || obj.onlineRehabilitation?.name || 'Услуга не указана'}</div>
                                <div className={s.cell}>{obj.employer?.fullName || 'Специалист не указан'}</div>
                                <div className={s.cell}>{obj.status}</div>
                                <div className={s.cell}>{obj.customer.fullName || 'не авторизован'}</div>
                                <div
                                    className={`${s.cell} ${s.endCell}`}>{new Date(obj.createdAt).toLocaleString('ru-RU')}</div>
                            </div>
                            </Fragment>)
                    ))}
            </div>
            {/*{ <Modal type={'modalMessage'}>*/}
            {/*    <div className={s.message}>Статус изменен</div>*/}
            {/*</Modal>}*/}
        </div>
    );
};


import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";

import {fetchConsultationRecords} from "../../../redux/slices/consultations";
import {fetchConsultationTopics} from "../../../redux/slices/contacts";

import s from "./Consultations.module.scss";
import axios from "../../../axios";

export const Consultations = () => {

    const dispatch = useDispatch();
    const consultations = useSelector((state) => state.consultationRecords.consultationRecords);
    const consultationTopics = useSelector((state) => state.consultationTopics.consultationTopics);

    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        dispatch(fetchConsultationRecords());
        dispatch(fetchConsultationTopics());
    }, [dispatch])

    // ОТОБРАЖЕНИЕ ТЕМЫ
    const getTopicName = (topicId) => {
        const topic = consultationTopics.items.find((topic) => topic._id === topicId);
        return topic ? topic.name : "";
    };

    // ОТОБРАЖЕНИЯ НОРМАЛЬНОЙ ДАТЫ
    const newFormatDate = (dateStr) => {

        const date = new Date(dateStr);

        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };

        return date.toLocaleString("ru-RU", options);
    }

    // ИЗМЕНЕНИЕ СТАТУСА
    const handleStatusChange = async (e, consultationId) => {

        const newStatus = e.target.value

        try {
            await axios.patch("/admin/consultations/updateStatus", {
                consultationId,
                newStatus
            });

            //ЕСЛИ ВСЕ ОК ОБНОВЛЯЕМ СОСТОЯНИЕ
            setSelectedStatus((prevStatus) => ({
                ...prevStatus,
                [consultationId]: newStatus
            }));

        } catch (error) {
            console.log("Ошибка обновления статуса", error)
        }
    }

    // Для select подсветке цветом
    const [optionColors] = useState({
        'Открыто': 'blue',
        'В работе': 'green',
        'Завершено': 'purple',
        'Отменено': 'red',
    });

    return (
        <>
            <h1 className={s.title}>Заявки на консультации</h1>

            <div className={s.consultations}>

                {
                    consultations.items?.map((item, idx) =>
                        <div className={s.consultation} key={idx}>
                            <div className={s.consultationItem}>{getTopicName(item.topic)}</div>
                            <div className={s.consultationItem}>{item.clientName}</div>
                            <div className={s.consultationItem}>{item.clientPhone}</div>
                            <div className={s.consultationItem}>{item.clientEmail}</div>
                            <div className={s.consultationItem}>{item.additionalInfo}</div>
                            <div className={`${s.consultationItem} ${s.status}`}>
                                <select
                                    className={s.consultationSelect}
                                    value={selectedStatus[item._id] || item.status}
                                    onChange={(e) => handleStatusChange(e, item._id)}
                                    style={{
                                        color: optionColors[selectedStatus[item._id] || item.status],
                                    }}
                                >
                                    <option value="Открыто" className={s.openOption}>Открыто</option>
                                    <option value="В работе" className={s.inProgressOption}>В работе</option>
                                    <option value="Завершено" className={s.completedOption}>Завершено</option>
                                    <option value="Отменено" className={s.canceledOption}>Отменено</option>

                                </select>
                            </div>
                            <div className={s.consultationItem}>{newFormatDate(item.createdAt)}</div>
                        </div>
                    )
                }

            </div>
        </>
    )
}
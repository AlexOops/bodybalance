import React, {useEffect} from 'react';
import s from "./ProfileMain.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchPatientCards} from "../../../redux/slices/patientCard";
import {fetchEmployers} from "../../../redux/slices/employers";
import {fetchTraining} from "../../../redux/slices/training";
import {logout} from "../../../redux/slices/auth";
import {fetchCustomers} from "../../../redux/slices/customers";

export const ProfileMain = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.data);
    const {patients} = useSelector(state => state.patients);
    const {employers} = useSelector(state => state.employers);
    const {training: videoCatalog} = useSelector(state => state.training);
    const {customers} = useSelector(state => state.customers);

    useEffect(() => {
        dispatch(fetchPatientCards())
        dispatch(fetchEmployers());
        dispatch(fetchTraining());
        dispatch(fetchCustomers())
    }, [dispatch]);

    // Карточка пациента
    const patientData = patients.items.find((patient) => patient.userId === user._id);

    //ВРАЧ
    const attendingDoctor = patientData && patientData.employerId
        ? employers.items.find((employer) => employer._id === patientData.employerId)
        : null;

    //Видео, возможно расширение
    const trainingCatalog = patientData && patientData.catalogVideoId
        ? videoCatalog.items.find((catalog) => catalog._id === patientData.catalogVideoId)
        : null;

    const QuantityTrainingVideo = trainingCatalog ? trainingCatalog.videos.length : 0;

    const customer = customers.items.find((customer) => customer._id.toString() === user.customer);

    return (
        <>
            <h4 className={s.title}>Главная</h4>

            <div className={s.container}>
                <div className={s.healthId}>
                    <p className={s.healthIdTitle}>Карточка пациента</p>
                    <img className={s.healthIdImg} src={user.avatarUrl} alt="customer"/>
                    <p className={s.healthIdName}>{user.fullName}</p>
                    <div className={s.healthIdWrp}>
                        <p className={s.healthIdEmail}><span>Почта: </span>{user.email}</p>
                        <p className={s.healthIdPhone}>
                            <span>Номер телефона: </span>{(user.customer) && user.customer.phone}</p>
                        <p className={s.healthIdBirth}><span>Дата рождения: </span>8 марта</p>
                    </div>
                </div>
                <div className={s.content}>
                    <div className={s.recommendations}>

                        <div className={s.training}>
                            {QuantityTrainingVideo !== 0 ? (
                                <>
                                    <p className={s.subTitle}>Тренировки</p>
                                    <span>{QuantityTrainingVideo}</span> видео необходимо посмотреть
                                </>
                            ) : (
                                <>
                                    <span>Раздел с тренировками пока закрыт!</span>
                                </>
                            )}

                        </div>

                        <div className={s.mySpecialist}>
                            {attendingDoctor ? (
                                <>
                                    <p className={s.subTitle}>МОЙ ВРАЧ</p>
                                    <img className={s.mySpecialistImg} src={attendingDoctor.avatarUrl} alt="doc"/>
                                    <p>{attendingDoctor.fullName}</p>
                                </>
                            ) : (
                                <>
                                    <span>Лечащий врач не указан</span>
                                </>
                            )}
                        </div>

                        <div className={s.healthNote}>

                            <div className={s.healthNoteItem}>
                                {patientData ? (
                                    <div className={s.healthNoteList}>
                                        <p className={s.subTitle}>РЕКОМЕНДАЦИИ ПО ЛЕЧЕНИЮ</p>
                                        <p>{patientData.recommendations ? patientData.recommendations : "Врач еще не указал рекомендации по лечению!"}</p>
                                    </div>
                                ) : (
                                    <span>Рекомендации по лечению еще не указаны!</span>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className={s.appointment}>
                        <p className={s.appointmentTitle}>Мои записи</p>
                    </div>
                </div>
            </div>
        </>
    );
};

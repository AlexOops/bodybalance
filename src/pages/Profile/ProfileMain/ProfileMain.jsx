import React, {useEffect, useState} from 'react';
import s from "./ProfileMain.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchPatientCards} from "../../../redux/slices/patientCard";
import {fetchEmployers} from "../../../redux/slices/employers";
import {fetchTraining} from "../../../redux/slices/training";
import {fetchCustomerList, fetchCustomers} from "../../../redux/slices/customers";
import PhoneInput from "react-phone-number-input";
import axios from "../../../axios";

export const ProfileMain = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.data);
    const {patients} = useSelector(state => state.patients);
    const {employers} = useSelector(state => state.employers);
    const {training: videoCatalog} = useSelector(state => state.training);
    const {customers} = useSelector(state => state.customers);

    const customer = customers.list.find((customer) => customer.userId._id === user._id);

    useEffect(() => {
        dispatch(fetchPatientCards())
        dispatch(fetchEmployers());
        dispatch(fetchTraining());
        dispatch(fetchCustomerList())
    }, [dispatch]);

    useEffect(() => {
        if(customer) {
            setPhone(customer.phone)
            setDateOfBirth(customer.dateOfBirth)
        }
    }, [customer])

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

    const [userId, serUserId] = useState(user._id);
    const [fullName, setFullName] = useState(user.fullName);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState('');

    const updateCustomer = async (data) => {
        try {
            const response = await axios.patch(`/customers/${user._id}`, data);
            return response.data;
        } catch (e) {
            console.log("Ошибка обновления пользователя", e);
            throw e;
        }
    }

    const createCustomer = async (data) => {
        try {
            const response = await axios.post(`/customers`, data);
            return response.data;
        } catch (e) {
            console.log("Ошибка создания пользователя", e);
            throw e;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Для проверки на существование, либо обновляем, либо создаем
        const isExistingCustomer = customers.items.find((customer) => customer.userId === user._id);

        const dataToSendInToCustomer = {
            userId,
            fullName,
            phone,
            email,
            dateOfBirth
        }

        if (isExistingCustomer) {
            const updatedCustomer = await updateCustomer(dataToSendInToCustomer);
            console.log("Данные пользователя обновлены", updatedCustomer)
        } else {
            const newCustomer = await createCustomer(dataToSendInToCustomer);
            console.log("Пользователь содан:", newCustomer)

        }
    }

    return (
        <>
            <h4 className={s.title}>Главная</h4>

            <div className={s.container}>
                <div className={s.healthId}>
                    <p className={s.healthIdTitle}>Моя карточка</p>

                    <img className={s.healthIdImg} src={user.avatarUrl} alt="customer"/>

                    <form onSubmit={handleSubmit}>

                        <label htmlFor="fullName"
                               className={s.label}>
                            Имя и фамилия:
                            <input type="text"
                                   className={s.input}
                                   name={'fullName'}
                                   value={fullName}
                                   onChange={(e) => setFullName(e.target.value)}
                            />
                        </label>

                        <label htmlFor="dateOfBirth"
                               className={s.label}>
                            Дата рождения:
                            <input type="text"
                                   className={s.input}
                                   name={'dateOfBirth'}
                                   value={dateOfBirth}
                                   onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </label>

                        <label htmlFor="mail"
                               className={s.label}>
                            Почта:
                            <input type="text"
                                   className={s.input}
                                   name={'mail'}
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <label htmlFor="phone"
                               className={s.label}>
                            Номер телефона:
                            <PhoneInput
                                className={"phoneInputProfile"}
                                international
                                name={"phone"}
                                defaultCountry="RU"
                                value={phone}
                                onChange={(value) => setPhone(value)}
                            />
                        </label>

                        <button type={"submit"} className={s.button}>Сохранить</button>
                    </form>


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
import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import s from "./CreateEmployer.module.scss";
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import axios from "../../../axios";
import {fetchEmployers} from "../../../redux/slices/employers";

export const CreateEmployer = () => {
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profession, setProfession] = useState('');
    const [description, setDescription] = useState('');
    const [achievements, setAchievements] = useState('');

    const [message, setMessage] = useState('');

    const handleSuccessMessage = (message) => {
        setMessage(message);

        // Сбрасываем поля после успешного создания
        setFullName('');
        setEmail('');
        setPhone('');
        setProfession('');
        setDescription('');
        setAchievements('');

        dispatch(fetchEmployers());

        setTimeout(() => {
            setMessage('');
        }, 3000);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            fullName,
            email,
            phone,
            profession,
            description,
            achievements
        }

        try {
            const response = await axios.post('/admin/specialists/newEmployer', dataToSend);

            handleSuccessMessage(response.data.message);
        } catch (e) {
            console.log("Ошибка создания сотрудника", e);
            throw e;
        }
    }

    return (
        <>
            {
                message ?
                    <div className={s.message}>
                        {message}
                    </div>
                    :
                    <div className={s.block}>

                        <h3 className={s.title}>Добавление нового сотрудника</h3>

                        <form className={s.formCreateEmployer} onSubmit={handleSubmit}>

                            <input className={s.input}
                                   type="text"
                                   placeholder={'Введите Имя и Фамилию'}
                                   value={fullName}
                                   onChange={(e) => setFullName(e.target.value)}/>

                            <input className={s.input}
                                   type="email"
                                   placeholder={'Введите адрес электронной почты'}
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>

                            <PhoneInput
                                className={s.phone}
                                international
                                defaultCountry="RU"
                                value={phone}
                                onChange={setPhone}
                                error={phone ? (isValidPhoneNumber(phone) ? undefined : 'Неверный номер телефона') : 'Требуется номер телефона'}
                            />

                            <input className={s.input}
                                   type="text"
                                   placeholder={'Введите название профессии'}
                                   value={profession}
                                   onChange={(e) => setProfession(e.target.value)}/>

                            <textarea className={s.textarea}
                                      placeholder={'Биография'}
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}/>

                            <textarea className={s.textarea}
                                      placeholder={'Введите достижения'}
                                      value={achievements}
                                      onChange={(e) => setAchievements(e.target.value)}/>

                            {/*Аватарка и Сертификаты загрузка*/}

                            <button type={"submit"} className={s.button}>Добавить сотрудника</button>
                        </form>
                    </div>
            }
        </>
    );
};

import React, {useState} from 'react';
import s from './ResetPassword.module.scss';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "../../axios";
import {useNavigate, useParams} from "react-router-dom";

export const ResetPassword = () => {

    const {token} = useParams();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    //валидация
    const initialValues = {
        newPassword: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required('Обязательное поле')
            .min(6, 'Минимальная длина пароля: 6 символов')
            .matches(/[0-9]/, 'Пароль должен содержать цифры')
            .matches(/[a-z]/, 'Пароль должен содержать прописныю букву')
            .matches(/[A-Z]/, 'Пароль должен содержать заглавную букву')
            .matches(/[^\w]/, 'Пароль должен содержать символ'),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Пароли не совпадают')
            .required('Обязательное поле'),
    })

    //отправка
    const handleSubmit = async (values, {setSubmitting}) => {

        const {newPassword} = values;

        try {
            const response = await axios.patch(`/resetPassword/${token}`, {newPassword: newPassword});

            setMessage(response.data.message); // Обработка успешного ответа ЗАМЕНИТЬ
        } catch (error) {
            setMessage('Произошла ошибка при отправке запроса ' + error.message);
        }

        setTimeout(() => {
            navigate("/");
        }, 5000)

        setSubmitting(false);
    };

    return (
        <div className={s.block}>
            <h1 className={s.title}>Страница сброса пароля</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({isSubmitting}) => (
                    <Form className={s.form}>
                        <div className={s.blockPass}>
                            <label className={s.label} htmlFor="newPassword">Новый пароль</label>
                            <Field className={s.input} type="password" name="newPassword"/>
                            <ErrorMessage className={s.error} name="newPassword" component="div"/>
                        </div>
                        <div className={s.blockPass}>
                            <label className={s.label} htmlFor="confirmPassword">Подтвердите пароль</label>
                            <Field className={s.input} type="password" name="confirmPassword"/>
                            <ErrorMessage className={s.error} name="confirmPassword" component="div"/>
                        </div>
                        <button className={s.button} type="submit" disabled={isSubmitting}>
                            Сменить пароль
                        </button>
                    </Form>
                )}
            </Formik>

            <div className={s.message}>
                {message}
            </div>
        </div>
    );
};
import React, {useState} from 'react';
import s from "./Security.module.scss";
import Modal from "../../../components/Modal/Modal";
import {useDispatch} from "react-redux";
import {openModal} from "../../../redux/slices/modal";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {redirect, useNavigate} from "react-router-dom";
import axios from "../../../axios";

export const Security = () => {

    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Обязательное поле'),

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


    const handleChangePassword = async (values, {setSubmitting, resetForm}) => {

        const {oldPassword, newPassword} = values;

        try {
            const response = await axios.patch('/profile/changePassword/', {oldPassword, newPassword})

            setMessage(response.data.message);

            if (response.status === 200) {
                resetForm();
            }

        } catch (error) {
            setMessage('Произошла ошибка при изменении пароля ' + error.message);
        }

        setSubmitting(false);
    }

    const handleOpenModal = (e) => {
        e.preventDefault();

        dispatch(openModal('modalRemoveUser'));
    }

    const handleRemoveUser = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete('/profile/delete/');

            if(response.data.success) {
                navigate('/');
                window.location.reload(); // поправить
            }

        } catch (error) {
            setMessage('Не удалось удалить профиль ' + error.message);
        }
    }

    return (
        <div>
            <h4>Безопасность</h4>

            <div className={s.security}>

                <div className={s.changePasswordUser}>

                    <p className={s.title}>Изменение пароля:</p>


                    <Formik initialValues={initialValues} validationSchema={validationSchema}
                            onSubmit={handleChangePassword}>
                        {({isSubmitting}) => (
                            <Form className={s.formPass}>
                                <div className={s.blockPass}>
                                    <label className={s.label} htmlFor="oldPassword">Старый пароль</label>
                                    <Field className={s.input} type="password" name="oldPassword"/>
                                    <ErrorMessage className={s.error} name="oldPassword" component="div"/>
                                </div>
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
                                <button className={'adminButton'} type="submit" disabled={isSubmitting}>
                                    Сменить пароль
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <button className={s.button} onClick={(e) => handleOpenModal(e)}>Удалить учетную запись</button>

                </div>


            </div>

            <Modal type={'modalRemoveUser'}>
                <div className={s.modalRemoveUser}>
                    Вы действительно хотите удалить учетную запись ?
                    <button className={s.button} onClick={(e) => handleRemoveUser(e)}>Да</button>
                </div>
            </Modal>

            <div className={s.message}>
                {message}
            </div>

        </div>
    );
};
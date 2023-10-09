import React from 'react';
import '../../index.scss';

import styles from './Registration.module.scss';
import stylesLogin from '../Login/Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import {useForm} from "react-hook-form";
// import {Navigate} from "react-router-dom";
import {closeModal, openModal} from "../../redux/slices/modal";
import {Input} from "@mui/material";

export const Registration = () => {
    const typeModalRegistration = 'modalRegister';
    const typeModalLogin = 'modalLogin';

    const isAuth = useSelector(selectIsAuth)

    const dispatch = useDispatch();
    const {
        register,
        watch,
        handleSubmit,
        formState:
            {errors, isValid}
    } = useForm({
        // defaultValues: {
        //     fullName: "",
        //     firstName: 'Вася',
        //     secondName: 'Пупкин',
        //     email: 'vasya@test.ru',
        //     password: '1234',
        // },
        mode: 'onChange',
    });

    const clickLogin = () => {
        dispatch(closeModal(typeModalRegistration));
        dispatch(openModal(typeModalLogin));
    }

    const onSubmit = async (values) => {
        values.fullName = values.firstName + ' ' + values.secondName;
        const data = await dispatch(fetchRegister(values));

        if(!data.payload){
            alert('Не удалось зарегистрироваться');
        }

        if('token' in data.payload) { //если есть токен в payload
            // то мы авторизованы
            window.localStorage.setItem('token', data.payload.token); //сохраним токен в Localstorage
        }
    };
    if(isAuth){
        dispatch(closeModal());
    }

    return (
        <div className={styles.registration}>
            <div className={styles.circles}>
                <div style={{position: "relative"}}>
                    <div className='circleFirst'/>
                    <div className='circleSecond'/>
                </div>
            </div>
            <h2 className={stylesLogin.title}>
                Регистрация
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={stylesLogin.fieldRow}>
                    <Input className={stylesLogin.field}
                           error={Boolean(errors.firstName?.message)} //подсвечиваем красным если true
                        // helperText={errors.firstName?.message}
                           {...register('firstName', {
                               required: 'Укажите имя',
                               maxLength: {
                                   value: 20,
                                   message: 'Имя не более 20 символов'
                               },
                               minLength: {
                                   value: 3,
                                   message: 'Имя не менее 3 символов'
                               }
                           })}
                           placeholder='Введите имя'
                           disableUnderline={true}
                           fullWidth
                    />
                    {errors.firstName && errors.firstName.type === "required" && <div className={stylesLogin.error}>{errors.firstName.message}</div>}
                    {errors.firstName && <div className={stylesLogin.error}>{errors.firstName.message}</div>}
                </div>
                <div className={stylesLogin.fieldRow}>
                    <Input className={stylesLogin.field}
                           error={Boolean(errors.secondName?.message)} //подсвечиваем красным если true
                           {...register('secondName', {
                               required: 'Укажите фамилию',
                               maxLength: {
                                   value: 20,
                                   message: 'Фамилия не более 20 символов'
                               },
                               minLength: {
                                   value: 3,
                                   message: 'Фамилия не менее 3 символов'
                               }
                           })}
                           placeholder='Введите фамилию'
                           disableUnderline={true}
                           fullWidth
                    />
                    {errors.secondName && errors.secondName.type === "required" && <div className={stylesLogin.error}>{errors.secondName.message}</div>}
                    {errors.secondName &&<div className={stylesLogin.error}>{errors.secondName.message}</div>}
                </div>
                <div className={stylesLogin.fieldRow}>
                    <Input className={stylesLogin.field}
                           error={Boolean(errors.email?.message)} //подсвечиваем красным если true
                           {...register('email', {
                               required: 'Пожалуйста, введите e-mail',
                               pattern: {
                                   value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                   message: 'Пожалуйста, введите корректный e-mail',
                               },
                           })}
                           placeholder='Введите E-mail'
                           fullWidth
                           disableUnderline={true}
                    />
                    {errors.email && errors.email.type === "required" && <div className={stylesLogin.error}>{errors.email.message}</div>}
                    {errors.email && <div className={stylesLogin.error}>{errors.email.message}</div>}
                </div>
                <div className={stylesLogin.fieldRow}>
                    <Input className={stylesLogin.field}
                           error={Boolean(errors.password?.message)} //подсвечиваем красным если true
                           type="password"
                           {...register('password', {
                               required: 'Укажите пароль',
                               minLength: {
                                   value: 8,
                                   message: 'Пароль должен содержать не менее 8 символов'
                               },
                               validate: (str) =>
                                       [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                                           pattern.test(str)
                                   )|| 'Пароль должен содержать буквы разных регистров, цифры и спецсимволы',
                           })}
                           placeholder='Введите пароль'
                           fullWidth
                           disableUnderline={true}
                    />
                    {errors.password && errors.password.type === "required" && <div className={stylesLogin.error}>{errors.password.message}</div>}
                    {errors.password && errors.password.type === "minLength" && <div className={stylesLogin.error}>{errors.password.message}</div>}
                    {errors.password && errors.password.type === "validate" && <div className={stylesLogin.error}>{errors.password.message}</div>}
                </div>
                <div className={stylesLogin.fieldRow}>
                    <Input className={stylesLogin.field}
                           error={Boolean(errors.confirm_password?.message)} //подсвечиваем красным если true
                           type="password"
                           placeholder='Повторите пароль'
                           {...register('confirm_password', {
                               required: 'Повторите пароль для подтверждения',
                               validate: (val) => {
                                   if (watch('password') !== val) {
                                       return "Пароли не совпадают";
                                   }
                               },
                           })}
                           label="Повтор пароля"
                           fullWidth
                           disableUnderline={true}
                    />
                    {errors.confirm_password && errors.confirm_password.type === "required" && <div className={stylesLogin.error}>{errors.confirm_password.message}</div>}
                    {errors.confirm_password && errors.confirm_password.type === "validate" && <div className={stylesLogin.error}>{errors.confirm_password.message}</div>}
                </div>
                <div className={styles.login}>
                    <div>Есть аккаунт? <span onClick={clickLogin}>Войдите!</span></div>
                    <button type="submit" className={styles.button}>
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    );
};
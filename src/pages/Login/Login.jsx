import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, selectIsAuth,} from "../../redux/slices/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useForm} from 'react-hook-form';

import styles from "./Login.module.scss";
import {openModal} from "../../redux/slices/modal";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const typeModalRegistration = 'modalRegister';

    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const clickRegistration = () => {
        dispatch(openModal(typeModalRegistration));
    }

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));

        if(!data.payload){
           return alert("Не удалось авторизоваться");
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token); //сохраним токен в Localstorage
        }
    };

    if(isAuth){
        // dispatch(closeModal());
    }

    return (
        <>
            <div className={styles.login}>
                <h2 className={styles.title}>
                    Вход
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField

                        classes={{ root: styles.field }}
                        // label="E-Mail"
                        type="email"
                        error={Boolean(errors.email?.message)} //подсвечиваем красным если true
                        helperText={errors.email?.message}
                        {...register('email', {required: 'Укажите почту'})}
                        fullWidth
                    />
                    <TextField
                        classes={{ root: styles.field }}
                        // label="Пароль"
                        type="password"
                        error={Boolean(errors.password?.message)} //подсвечиваем красным если true
                        helperText={errors.password?.message}
                        {...register('password', {required: 'Введите пароль'})}
                        fullWidth
                    />
                    <div>Нет аккаунта? <span onClick={clickRegistration}>Зарегистрируйтесь!</span></div>
                    <Button type="submit" disabled={!isValid} size="large" variant="contained" fullWidth>
                        Войти
                    </Button>
                </form>
            </div>
        </>
    )
}




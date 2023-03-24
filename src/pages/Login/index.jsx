import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, selectIsAuth} from "../../redux/slices/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useForm} from 'react-hook-form';
import {Navigate} from 'react-router-dom';

import styles from "./Login.module.scss";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);

    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

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
        return <Navigate to="/" />
    }

    return (
        <>
            <Paper classes={{ root: styles.root }}>
                <Typography classes={{ root: styles.title }} variant="h5">
                    Вход в аккаунт
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        className={styles.field}
                        label="E-Mail"
                        type="email"
                        error={Boolean(errors.email?.message)} //подсвечиваем красным если true
                        helperText={errors.email?.message}
                        {...register('email', {required: 'Укажите почту'})}
                        fullWidth
                    />
                    <TextField
                        className={styles.field}
                        label="Пароль"
                        type="password"
                        error={Boolean(errors.password?.message)} //подсвечиваем красным если true
                        helperText={errors.password?.message}
                        {...register('password', {required: 'Введите пароль'})}
                        fullWidth
                    />
                    <Button type="submit" disabled={!isValid} size="large" variant="contained" fullWidth>
                        Войти
                    </Button>

                </form>
            </Paper>
        </>
    )
}




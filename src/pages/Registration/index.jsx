import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Registration.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import {useForm} from "react-hook-form";
// import {Navigate} from "react-router-dom";
import {closeModal} from "../../redux/slices/modal";

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth)

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState:
            {errors, isValid}
    } = useForm({
        defaultValues: {
            fullName: 'Вася Пупкин',
            email: 'vasya@test.ru',
            password: '1234',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
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
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
          <TextField className={styles.field}
                     error={Boolean(errors.fullName?.message)} //подсвечиваем красным если true
                     helperText={errors.fullName?.message}
                     {...register('fullName', {required: 'Укажите полное имя'})}
                     label="Полное имя"
                     fullWidth
          />
          <TextField className={styles.field}
                     error={Boolean(errors.email?.message)} //подсвечиваем красным если true
                     helperText={errors.email?.message}
                     {...register('email', {required: 'Укажите почту'})}
                     label="E-Mail"
                     fullWidth
          />
          <TextField className={styles.field}
                     error={Boolean(errors.password?.message)} //подсвечиваем красным если true
                     helperText={errors.password?.message}
                     type="password"
                     {...register('password', {required: 'Укажите пароль'})}
                     label="Пароль"
                     fullWidth
          />
          <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
              Зарегистрироваться
          </Button>
      </form>
    </div>
  );
};

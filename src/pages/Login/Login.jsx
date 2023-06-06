import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, selectIsAuth,} from "../../redux/slices/auth";
import '../../index.scss'
import {useForm} from 'react-hook-form';

import styles from "./Login.module.scss";
import {closeModal, openModal} from "../../redux/slices/modal";
import {Input} from "@mui/material";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const typeModalRegistration = 'modalRegister';
    const typeModalLogin = 'modalLogin';

    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const clickRegistration = () => {
        dispatch(closeModal(typeModalLogin));
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
                <div className={styles.circles}>
                    <div style={{position: "relative"}}>
                        <div className='circleFirst'/>
                        <div className='circleSecond'/>
                    </div>
                </div>
                <h2 className={styles.title}>
                    Вход
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.fieldRow}>
                        <Input
                            disableUnderline={true}
                            placeholder='Введите E-mail'
                            classes={{ root: styles.field }}
                            // label="E-Mail"
                            type="email"
                            error={Boolean(errors.email?.message)} //подсвечиваем красным если true
                            // helperText={errors.email?.message}
                            {...register('email', {required: 'Укажите E-mail'})}
                            fullWidth
                        />
                    {errors.email && errors.email.type === "required" && <div className={styles.error}>Укажите e-mail</div>}
                    </div>
                    <div className={styles.fieldRow}>
                        <Input
                            disableUnderline={true}
                            placeholder='Введите пароль'
                            classes={{ root: styles.field }}
                            // label="Пароль"
                            type="password"
                            error={Boolean(errors.password?.message)} //подсвечиваем красным если true
                            // helperText={errors.password?.message}
                            {...register('password', {required: 'Введите пароль'})}
                            fullWidth
                        />
                        {errors.password && errors.password.type === "required" && <div className={styles.error}>Укажите пароль</div>}
                    </div>


                    <div className={styles.register}>
                        <div>Нет аккаунта? <span onClick={clickRegistration}>Зарегистрируйтесь!</span></div>
                        <button type="submit"
                                // disabled={!isValid}
                                className={styles.button}
                        >
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}



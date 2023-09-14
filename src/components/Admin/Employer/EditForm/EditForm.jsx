import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import s from './EditForm.module.scss';

export const EditForm = ({data, setData, onSave, onCancel}) => {

    const {register, handleSubmit, reset} = useForm();

    useEffect(() => {
        reset(data); // Сбросить значения полей к исходным данным при изменении data
    }, [data, reset]);

    const onSubmit = (formData) => {
        onSave(formData);
    }

    const handleCancel = () => {
        setData({...data});

        onCancel();
    }

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>

            <label className={s.label}>
                Фамилия и Имя:
                <input className={s.input} type="text" {...register("fullName")} />
            </label>

            <label className={s.label}>
                Почта:
                <input className={s.input} type="email" {...register("email")} />
            </label>

            <label className={s.label}>
                Телефон:
                <input className={s.input} type="text" {...register("employer.phone")} />
            </label>

            <label className={s.label}>
                Профессия:
                <input className={s.input} type="text" {...register("employer.profession")}/>
            </label>

            <label className={s.label}>
                Биография:
                <textarea className={s.textarea} {...register("employer.description")}/>
            </label>

            <label className={s.label}>
                Достижения:
                <textarea className={s.textarea} {...register("employer.achievements")}/>
            </label>

            <div className={s.buttons}>
                <button type="submit">Сохранить</button>
                <button type="button" onClick={handleCancel}>Отмена</button>
            </div>
        </form>
    );
};
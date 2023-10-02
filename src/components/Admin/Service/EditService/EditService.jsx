import React, {useEffect} from 'react';
import s from "../../Employer/EditForm/EditForm.module.scss";
import {useForm} from "react-hook-form";

export const EditService = ({data, setData, onSave, onCancel}) => {

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
        <div>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>

                <label className={s.label}>
                   Название:
                    <input className={s.input} type="text" {...register("name")} />
                </label>

                <label className={s.label}>
                    Описание:
                    <textarea className={s.textarea} {...register("description")}/>
                </label>

                <label className={s.label}>
                    Рекомендации:
                    <textarea className={s.textarea} {...register("recommendations")}/>
                </label>

                <div className={s.buttons}>
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={handleCancel}>Отмена</button>
                </div>
            </form>
        </div>
    );
};
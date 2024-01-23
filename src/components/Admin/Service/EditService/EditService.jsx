import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import s from "./EditService.module.scss";

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
                    <span>Название:</span>
                    <input className={s.input} type="text" {...register("name")} />
                </label>

                <label className={s.label}>
                    <span>Описание:</span>
                    <textarea className={s.textarea} {...register("description")}/>
                </label>

                <label className={s.label}>
                    <span>Рекомендации:</span>
                    <textarea className={s.textarea} {...register("recommendations")}/>
                </label>

                <div className={s.buttons}>
                    <button className={`adminButton ${s.save}`} type="submit">Сохранить</button>
                    <button className={`adminButton ${s.cancel}`} type="button" onClick={handleCancel}>Отмена</button>
                </div>
            </form>
        </div>
    );
};
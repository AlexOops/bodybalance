import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import s from "../../Employer/EditForm/EditForm.module.scss";

export const EditCatalog = ({data, setData, onCancel, onSave}) => {

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
                    <span>Категория:</span>
                    <textarea className={s.textarea} {...register("category")}/>
                </label>

                <div className={s.buttons}>
                    <button type={'submit'} className={"adminButton save"}>Сохранить</button>
                    <button className={"adminButton cancel"} onClick={handleCancel}>Отмена</button>
                </div>

            </form>
        </div>
    );
};
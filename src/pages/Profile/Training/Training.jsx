import React from 'react';
import s from "./Training.module.scss";
import {Training as MyTraining} from "../../../components/Trainings/Training";

export const Training = () => {
    return (
        <>
            <h1 className={s.title}> Мои тренировки</h1>
            <div className={s.container}>
                <div className={s.content}>
                    <MyTraining/>
                </div>
            </div>
        </>
    );
};

import React from 'react';
import s from "./Training.module.scss";
import {Training as MyTraining} from "../../../components/Training/Training";

export const Training = () => {
    return (
        <>
            <h1 className={s.title}> Мои тренировки</h1>

            <div className={s.content}>
                <div className={s.text}>В разделе с тренировками вы можете найти комплексы упражнений, специально
                    разработанные для лечения суставов и реабилитации. Эти упражнения помогут вам укрепить
                    суставы, улучшить их гибкость и мобильность, а также снять боль и восстановить
                    функциональность.
                </div>

                <MyTraining/>
            </div>
        </>
    );
};
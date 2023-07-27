import React from 'react';
import s from "./ProfileMain.module.scss";
import {useSelector} from "react-redux";

export const ProfileMain = () => {
    const user = useSelector(state => state.auth.data);

    return (
        <>
            <h4 className={s.title}>Главная</h4>

            <div className={s.container}>
                <div className={s.healthId}>
                    <p className={s.healthIdTitle}>Карточка пациента</p>
                    <img className={s.healthIdImg} src={user.avatarUrl} alt="customer"/>
                    <p className={s.healthIdName}>{user.fullName}</p>
                    <div className={s.healthIdWrp}>
                        <p className={s.healthIdEmail}><span>Почта: </span>{user.email}</p>
                        <p className={s.healthIdPhone}>
                            <span>Номер телефона: </span>{(user.customer) && user.customer.phone}</p>
                        <p className={s.healthIdBirth}><span>Дата рождения: </span>8 марта</p>
                    </div>
                </div>
                <div className={s.content}>
                    <div className={s.recommendations}>

                        <div className={s.training}>
                            <p className={s.trainingTittle}>Тернировки</p>
                            <span> 5 </span> видео не просмотрено
                        </div>

                        <div className={s.mySpecialist}>
                            <p>МОЙ ВРАЧ</p>
                            <img className={s.mySpecialistImg} src="https://mui.com/static/images/avatar/2.jpg"
                                 alt="specialist"/>
                            <p>АЛЕКСЕЙ МАКАРОВ</p>
                        </div>

                        <div className={s.healthNote}>
                            <p>РЕКОМЕНДАЦИИ ПО ЛЕЧЕНИЮ</p>
                            <ul className={s.healthNoteList}>
                                <li className={s.healthNoteItem}>
                                    Ежедневные видео тренировки
                                </li>
                                <li className={s.healthNoteItem}>
                                    Прием витаминов группы B
                                </li>
                                <li className={s.healthNoteItem}>
                                    Прогулки на свежем воздухе
                                </li>
                                <li className={s.healthNoteItem}>
                                    Осмотр у врача через 2 недели
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={s.appointment}>
                        <p className={s.appointmentTitle}>Мои записи</p>
                    </div>
                </div>
            </div>
        </>
    );
};

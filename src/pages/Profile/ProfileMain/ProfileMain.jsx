import React, {useEffect} from 'react';
import s from "./ProfileMain.module.scss";
import {useSelector} from "react-redux";

export const ProfileMain = () => {
    const user = useSelector(state => state.auth.data);

    return (
        <>
            <h1 className={s.title}>Главная</h1>

            <div className={s.container}>
                <div className={s.healthСard}>
                    <p className={s.healthСard__title}>Карточка пациента</p>
                    <img className={s.healthСard__img} src={user.avatarUrl} alt="customer"/>
                    <p className={s.healthСard__name}>{user.fullName}</p>
                    <div className={s.healthСard__wrp}>
                        <p className={s.healthСard__email}><span>Почта: </span>{user.email}</p>
                        <p className={s.healthСard__phone}>
                            <span>Номер телефона: </span>{(user.customer) && user.customer.phone}</p>
                        <p className={s.healthСard__birth}><span>Дата рождения: </span>8 марта</p>
                    </div>
                </div>
                <div className={s.content}>
                    <div className={s.recommendations}>

                        <div className={s.trainings}>
                            <p className={s.trainings__titile}>Тернировки</p>
                            <span> 5 </span> видео не просмотрено
                        </div>

                        <div className={s.mySpecialist}>
                            <p>МОЙ ВРАЧ</p>
                            <img className={s.mySpecialist__img} src="https://mui.com/static/images/avatar/2.jpg"
                                 alt="specialist"/>
                            <p>АЛЕКСЕЙ МАКАРОВ</p>
                            <span>Перейти к карточке</span>
                        </div>

                        <div className={s.healthNote}>
                            <p>РЕКОМЕНДАЦИИ ПО ЛЕЧЕНИЮ</p>
                            <ul className={s.healthNote__list}>
                                <li className={s.healthNote__list__item}>
                                    Ежедневные видео тренировки
                                </li>
                                <li className={s.healthNote__list__item}>
                                    Прием витаминов группы B
                                </li>
                                <li className={s.healthNote__list__item}>
                                    Прогулки на свежем воздухе
                                </li>
                                <li className={s.healthNote__list__item}>
                                    Осмотр у врача через 2 недели
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={s.appointments}>
                        <p className={s.appointments__title}>Мои записи</p>
                    </div>
                </div>
            </div>
        </>
    );
};

import React from 'react';
import s from "./Card.module.scss";
import service from "../../../assets/img-service.png";

export const Card = ({price}) => {
    return (
        <div className={s.card}>
            <div className={`${s.img} ${s.center}`}>
                <img src={service} alt=""/>
            </div>
            <div className={`${s.center}`}>
                <h3>
                    Восстановительный комплекс
                </h3>
            </div>
            {price ?
                <div>
                    <div className={s.direction}>
                        <div className={s.circle}></div>
                        <p>От боли в спине</p>
                    </div>
                    <div className={s.direction}>
                        <div className={s.circle}></div>
                        <p>Восстановление после травм</p>
                    </div>
                    <div className={s.direction}>
                        <div className={s.circle}></div>
                        <p>Восстановление после операции</p>
                    </div>
                    <div className={s.price}>От {price}</div>
                </div>
                :
                <div className={`${s.center}`}>
                    <p>Банальные, но неопровержимые выводы, а также интерактивные прототипы неоднозначны и будут
                        функционально разнесены на независимые элементы</p>
                </div>
            }

        </div>
    );
};
import React from 'react';
import s from "./Recommendation.module.scss"
import logo from "../../assets/logo-white.svg";
import doctor from "../../assets/doctor.png";

export const Recommendation = ({name, profession, title, text, button, clickHandle, avatar = doctor}) => {
    return (
        <div className={s.position}>
            <div className={s.left}>
                <div className={s.logo}>
                    <img src={logo} alt="logo"/>
                </div>

                <div className={s.avatar} style={{backgroundImage: `url(${avatar})`}} alt="doctor"></div>

                <div className={s.description}>
                    <p className={s.nameSpecialist}>{name}</p>
                    <p className={s.profSpecialist}>{profession}</p>
                </div>

            </div>
            <div className={s.right}>
                <h2 className={s.nameSection}>{title}</h2>
                <p className={s.descriptionSpecialist}>{text}</p>
                <button className={s.button} onClick={clickHandle}>{button}</button>
            </div>
        </div>
    );
};
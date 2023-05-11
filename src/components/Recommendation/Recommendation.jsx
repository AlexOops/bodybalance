import React from 'react';
import s from "./Recommendation.module.scss"
import logo from "../../assets/logo-white.svg";
import doctor from "../../assets/doctor.png";

const Recommendation = ({name, profession, title, text, button, clickHandle}) => {
    return (
        <div className={s.position}>
            <div className={s.left}>
                <div className={s.logo}>
                    <img src={logo} alt="logo"/>
                </div>
                <img src={doctor} alt="doctor"/>
                <p className={s.nameSpecialist}>{name}</p>
                <p className={s.profSpecialist}>{profession}</p>
            </div>
            <div className={s.right}>
                <h2 className={s.nameSection}>{title}</h2>
                <p className={s.descriptionSpecialist}>{text}</p>
                <button className={s.button} onClick={clickHandle}>{button}</button>
            </div>
        </div>
    );
};

export default Recommendation;
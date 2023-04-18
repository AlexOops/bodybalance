import s from './ErrorPage.module.scss';
import {Link} from "react-router-dom";
import React from "react";
import logo from '../../assets/logo.svg'

export const ErrorPage = () => {
    return (
        <div className={'container'}>
            <div className={s.textCenter}>
                <img className={s.logo} src={logo} alt="logo"/>
                <div className={s.circleFirst}></div>
                <div className={s.circleSecond}></div>
                <p className={s.errorNumber}>404</p>
                <p className={s.errorText}>страница не найдена</p>
                <Link to={'/'}>
                    <button className={s.button}>на главную</button>
                </Link>
                <div className={s.circleThree}></div>
                <div className={s.circleFour}></div>
            </div>
        </div>

    )
}
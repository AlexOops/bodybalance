import logo from '../../assets/logo.png'
import s from './Header.module.scss'
import '../../index.scss'
import {Navigate} from "../Navigate/Navigate";
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <div className={'container'}>
            <div className={s.header}>
                <Link to={'/'}>
                    <img className={s.logo} src={logo} alt="logo"/>
                </Link>
                <Navigate/>
                <div className={s.login}>
                    <button className={`${s.singUp} ${s.button}`}>Вход</button>
                    <button className={`${s.singOut} ${s.button}`}>Регистрация</button>
                </div>
            </div>
        </div>

    )
}
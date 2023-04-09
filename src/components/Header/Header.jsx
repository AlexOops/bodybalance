import logo from '../../assets/logo.svg'
import s from './Header.module.scss'
import '../../index.scss'
import {Navigate} from "../Navigate/Navigate";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {isRegistration, logout, selectIsAuth} from "../../redux/slices/auth";
import {active} from "../../redux/slices/modal";
import Modal from "../Modal/Modal";
import {Login} from "../../pages/Login";
import {useState} from "react";
import {Registration} from "../../pages/Registration";

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const isReg = useSelector(isRegistration);

    const onClickLogout = () => {
        if(window.confirm("Вы действительно хотите выйти?")){
            dispatch(logout()); //обнулили данные в state auth
            window.localStorage.removeItem('token'); //удалили токен из localStorage
        }
    }

    return (
        <div className={'container-color'}>
            <div className={'container'}>
                <Modal width={'850px'} height={'478px'}>{(!isReg)? <Login/>:<Registration/>}</Modal>
                <div className={s.header}>
                    <Link to={'/'}>
                        <img className={s.logo} src={logo} alt="logo"/>
                    </Link>
                    <Navigate/>
                    <div className={s.login}>

                        {isAuth ? (
                            <button onClick={onClickLogout} className={`${s.singUp} ${s.button}`}>Выход</button>
                        ) : (<>
                            {/*<Link to="/login">*/}
                            <button className={`${s.singUp} ${s.button}`} onClick={()=>dispatch(active(true))}>Вход</button>
                            {/*</Link>*/}
                            <Link to="/register">
                            <button className={`${s.singOut} ${s.button}`}>Регистрация</button>
                            </Link>
                        </>)}

                    </div>
                </div>
            </div>
        </div>

    )
}
import logo from '../../assets/logo.svg'
import s from './Header.module.scss'
import '../../index.scss'
import {Navigate} from "../Navigate/Navigate";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {openModal} from "../../redux/slices/modal";
import Modal from "../Modal/Modal";
import {Login} from "../../pages/Login/Login";
import {Registration} from "../../pages/Registration/Registration";
import React, {useState} from "react";
import logout from "../../assets/logout.svg";

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const user = useSelector(state => state.auth.data);

    const [visible, setVisible] = useState(false)


    const handleVisible = () => {
        setVisible(!visible)
    }

    const typeModalLogin = 'modalLogin'
    const typeModalRegistration = 'modalRegister'

    const onClickLogout = () => {

        if (window.confirm("Вы действительно хотите выйти?")) {
            dispatch(logout()); //обнулили данные в state auth
            window.localStorage.removeItem('token'); //удалили токен из localStorage
        }
    }

    const onClickLogin = () => {

        //контент логина в модальном окне
        dispatch(openModal(typeModalLogin));
    }

    const onClickRegister = () => {

        //контент регистрации в модальном окне
        dispatch(openModal(typeModalRegistration));
    }


    return (
        <div className={'container-color'}>
            <div className={'container'}>
                <div className={s.header}>
                    <Link to={'/'}>
                        <img className={s.logo} src={logo} alt="logo"/>
                    </Link>
                    <div
                        onClick={() => handleVisible()}
                        className={s.toggle}>
                        {visible && <span></span>}
                        <label className={s.checkLabel} htmlFor="check">
                            <input
                                type="checkbox"
                                onChange={handleVisible}
                                checked={visible}
                                value=''
                                className={s.toggleInput}
                            />
                            <span className={s.bar}></span>
                            <span className={s.bar}></span>
                            <span className={s.bar}></span>
                        </label>
                    </div>
                    <div style={visible ? {display: 'flex'} : undefined} className={s.burger}>
                        <Navigate setVisible={setVisible}/>
                        <div className={s.border}/>
                        <div className={s.login}>
                            {isAuth ? (
                                <div className={s.profile__wrp}>

                                    <img className={s.profile__img} src={user.avatarUrl} alt=""/>
                                    <div className={s.profile}>
                                        <p>{user.fullName}</p>
                                        <span>{user.role}</span>
                                    </div>

                                    <img className={s.profile__logout}
                                         onClick={onClickLogout}
                                         src={logout}
                                         alt="logout"
                                    />

                                </div>

                            ) : (<>
                                <button className={`${s.singUp} ${s.button}`} onClick={onClickLogin}>Вход</button>
                                <button className={`${s.singOut} ${s.button}`} onClick={onClickRegister}>Регистрация
                                </button>
                                <Modal type={typeModalLogin}><Login/></Modal>
                                <Modal type={typeModalRegistration}><Registration/></Modal>
                            </>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
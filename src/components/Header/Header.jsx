import logo from '../../assets/logo.svg'
import s from './Header.module.scss'
import '../../index.scss'
import {Navigate} from "../Navigate/Navigate";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {openModal} from "../../redux/slices/modal";
import Modal from "../Modal/Modal";
import {Login} from "../../pages/Login/Login";
import {Registration} from "../../pages/Registration/Registration";
import React, {useState} from "react";
import ProfileBlock from "../ProfileBlock/ProfileBlock";

export const Header = () => {

    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.data);

    const [visible, setVisible] = useState(false);

    const typeModalLogin = 'modalLogin'
    const typeModalRegistration = 'modalRegister'

    const handleVisible = () => {
        setVisible(!visible)
    }

    const handleNavigateToProfile = () => {
        if (user.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/profile');
        }
    };

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

                                <div className={s.profileBlock}>
                                    <ProfileBlock handleNavigate={handleNavigateToProfile}
                                                  redirectLabel={"Перейти в личный кабинет"}/>
                                </div>

                            ) : (

                                <div className={s.profileBlock}>
                                    <button className={`${s.singUp} ${s.button}`} onClick={onClickLogin}>Вход</button>
                                    <button className={`${s.singOut} ${s.button}`} onClick={onClickRegister}>Регистрация
                                    </button>
                                    <Modal type={typeModalLogin}><Login/></Modal>
                                    <Modal type={typeModalRegistration}><Registration/></Modal>
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React from 'react';
import {Link, NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import s from './ProfileLayout.module.scss'
import logo from "../../assets/logo.svg";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import ProfileBlock from "../../components/Profile/ProfileBlock/ProfileBlock";

export const ProfileLayout = () => {

    const location = useLocation();
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();

    const handleNavigateToHome = () => {
        navigate('/');
    };

    if (isAuth) {
        return (
            <div className={s.container}>
                <div className={s.containerProfile}>
                    <aside className={s.sidebar}>
                        <div className={s.logo}>
                            <Link to={'/profile'}><img src={logo} alt="logo"/></Link>
                        </div>
                        <ul className={s.menuList}>
                            <NavLink to='/profile'>
                                <li className={location.pathname === '/profile' ? `${s.active} ${s.menuListItem}` : `${s.menuListItem}`}>
                                    Главная
                                </li>
                            </NavLink>
                            <NavLink to='/profile/training'>
                                <li className={location.pathname === '/profile/training' ? `${s.active} ${s.menuListItem}` : `${s.menuListItem}`}>
                                    Мои тренировки
                                </li>
                            </NavLink>
                            <NavLink to='/profile/appointments'>
                                <li className={location.pathname === '/profile/appointments' ? `${s.active} ${s.menuListItem}` : `${s.menuListItem}`}>
                                    Мои записи
                                </li>
                            </NavLink>
                            <NavLink to='/profile/security'>
                                <li className={location.pathname === '/profile/security' ? `${s.active} ${s.menuListItem}` : `${s.menuListItem}`}>
                                    Безопасность
                                </li>
                            </NavLink>
                        </ul>

                    </aside>

                    <div className={s.content}>

                        <div className={s.profileBlock}>
                            <ProfileBlock
                                handleNavigate={handleNavigateToHome}
                                redirectLabel={"Вернуться на сайт"}/>
                        </div>

                        <Outlet/>

                    </div>
                </div>
            </div>
        );
    }
};
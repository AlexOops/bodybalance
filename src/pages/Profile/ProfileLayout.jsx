import React from 'react';
import s from './ProfileLayout.module.scss'
import {Link, NavLink, Outlet, useLocation} from "react-router-dom";
import logo from "../../assets/logo.svg";

export const ProfileLayout = () => {
    const location = useLocation();

    return (
        <div className={s.container}>
            <aside className={s.sidebar}>
                <div className={s.logo}>
                    <Link to={'/profile'}><img src={logo} alt="logo"/></Link>
                </div>
                <ul className={s.menuList}>
                    <NavLink to='/profile'>
                        <li className={location.pathname === '/profile' ? `${s.active} ${s.menuList__item}` : `${s.menuList__item}`}>
                            Главная
                        </li>
                    </NavLink>
                    <NavLink to='/profile/trainings'>
                        <li className={location.pathname === '/profile/trainings' ? `${s.active} ${s.menuList__item}` : `${s.menuList__item}`}>
                            Мои тренировки
                        </li>
                    </NavLink>
                    <NavLink to='/profile/appointments'>
                        <li className={location.pathname === '/profile/appointments' ? `${s.active} ${s.menuList__item}` : `${s.menuList__item}`}>
                            Мои записи
                        </li>
                    </NavLink>
                    <NavLink to='/profile/specialists'>
                        <li className={location.pathname === '/profile/specialists' ? `${s.active} ${s.menuList__item}` : `${s.menuList__item}`}>
                            Специалисты
                        </li>
                    </NavLink>
                    <NavLink to='/profile/recommendations'>
                        <li className={location.pathname === '/profile/recommendations' ? `${s.active} ${s.menuList__item}` : `${s.menuList__item}`}>
                            Ремондации по лечению
                        </li>
                    </NavLink>
                </ul>
            </aside>

            <div className={s.content}>
                <Outlet/>
            </div>
        </div>
    );
};
import React from 'react';
import {Link, NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import s from './ProfileLayout.module.scss'
import logo from "../../assets/logo.svg";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import ProfileBlock from "../../components/ProfileBlock/ProfileBlock";

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
                                <li className={location.pathname === '/profile' ? `${s.active} ${s.menuList__item}` : `${s.menuList__item}`}>
                                    Главная
                                </li>
                            </NavLink>
                            <NavLink to='/profile/training'>
                                <li className={location.pathname === '/profile/training' ? `${s.active} ${s.menuList__item}` : `${s.menuList__item}`}>
                                    Мои тренировки
                                </li>
                            </NavLink>
                            <NavLink to='/profile/appointments'>
                                <li className={location.pathname === '/profile/appointments' ? `${s.active} ${s.menuList__item}` : `${s.menuList__item}`}>
                                    Мои записи
                                </li>
                            </NavLink>
                            {/*<NavLink to='/profile/specialists'>*/}
                            {/*    <li className={location.pathname === '/profile/specialists' ? `${s.active} ${s.menuList__item}` : `${s.menuList__item}`}>*/}
                            {/*        Специалисты*/}
                            {/*    </li>*/}
                            {/*</NavLink>*/}
                            {/*<NavLink to='/profile/recommendations'>*/}
                            {/*    <li className={location.pathname === '/profile/recommendations' ? `${s.active} ${s.menuList__item}` : `${s.menuList__item}`}>*/}
                            {/*        Ремондации по лечению*/}
                            {/*    </li>*/}
                            {/*</NavLink>*/}
                        </ul>

                        <div className={s.profileBlock}>
                            <ProfileBlock
                                handleNavigate={handleNavigateToHome}
                                redirectLabel={"Вернуться на сайт"}/>
                        </div>

                    </aside>

                    <div className={s.content}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        );
    }
};
import s from './Admin.module.scss'
import logo from '../../assets/logo.svg'
import {Link, NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import React from "react";
import ProfileBlock from "../../components/Profile/ProfileBlock/ProfileBlock";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";

export const Admin = () => {

    const location = useLocation();
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();

    const handleNavigateToHome = () => {
        navigate('/');
    };

    if (isAuth) {
        return (
            <div className={s.container}>
                <div className={s.containerAdmin}>
                    <aside className={s.sidebar}>
                        <div className={s.logo}>
                            <Link to={'/admin'}><img src={logo} alt="logo"/></Link>
                        </div>
                        <ul className={s.menuList}>
                            <NavLink to='/admin'>
                                <li className={location.pathname === '/admin' ? `${s.active} ${s.menuListItem}` : `${s.menuListItem}`}>Главная</li>
                            </NavLink>
                            <NavLink to='/admin/records'>
                                <li className={location.pathname === '/admin/records' ? `${s.active} ${s.menuListItem}` : `${s.menuListItem}`}>Записи</li>
                            </NavLink>
                            <NavLink to='/admin/consultations'>
                                <li className={location.pathname === '/admin/Consultations' ? `${s.active} ${s.menuListItem}` : `${s.menuListItem}`}>Заявки
                                    на консультации
                                </li>
                            </NavLink>
                            <NavLink to='/admin/customers'>
                                <li className={location.pathname === '/admin/customers' ? `${s.active} ${s.menuListItem}` : `${s.menuListItem}`}>Пациенты</li>
                            </NavLink>
                            <NavLink to='/admin/specialists'>
                                <li className={location.pathname === '/admin/Specialists' ? `${s.active} ${s.menuListItem}` : `${s.menuListItem}`}>Специалисты</li>
                            </NavLink>
                        </ul>
                    </aside>

                    <div className={s.content}>

                        <div className={s.adminBlock}>
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
}
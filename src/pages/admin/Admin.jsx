import s from './Admin.module.scss'
import logo from '../../assets/logo.svg'
import {Link, NavLink, Outlet, useLocation} from "react-router-dom";
import {AdminMain} from "./AdminMain/AdminMain";

export const Admin = () => {
    const location = useLocation()

    return (
        <div className={s.position}>
            <aside className={s.sidebar}>
                <div className={s.logo}>
                    <Link to={'/admin/'}><img src={logo} alt="logo"/></Link>
                </div>
                <ul className={s.list}>
                    <NavLink to='/admin/'>
                        <li className={location.pathname === '/admin/' ? `${s.active} ${s.listItems}` : `${s.listItems}`}>Главная</li>
                    </NavLink>
                    <NavLink to='/admin/records'>
                        <li className={location.pathname === '/admin/records' ? `${s.active} ${s.listItems}` : `${s.listItems}`}>Записи</li>
                    </NavLink>
                    <NavLink to='/admin/email'>
                        <li className={location.pathname === '/admin/email' ? `${s.active} ${s.listItems}` : `${s.listItems}`}>Почта</li>
                    </NavLink>
                    <NavLink to='/admin/patients'>
                        <li className={location.pathname === '/admin/patients' ? `${s.active} ${s.listItems}` : `${s.listItems}`}>Пациенты</li>
                    </NavLink>
                    <NavLink to='/admin/specialists'>
                        <li className={location.pathname === '/admin/specialists' ? `${s.active} ${s.listItems}` : `${s.listItems}`}>Специалисты</li>
                    </NavLink>
                </ul>
                <div className={s.line}/>
                <ul className={s.list}>
                    <NavLink to='/admin/settings'>
                        <li className={location.pathname === '/admin/settings' ? `${s.active} ${s.listItems}` : `${s.listItems}`}>Настройки</li>
                    </NavLink>
                    <NavLink to='/admin/specialists'>
                        <li className={location.pathname === '/admin/specialists' ? `${s.active} ${s.listItems}` : `${s.listItems}`}>Специалисты</li>
                    </NavLink>
                </ul>
            </aside>
            <div className={s.color}>
                {location.pathname === '/admin/' ? <AdminMain/> : <Outlet/>}
            </div>
        </div>


    )
}
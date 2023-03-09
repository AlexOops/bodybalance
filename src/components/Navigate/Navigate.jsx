import s from './Navigate.module.scss'
import {NavLink} from "react-router-dom";
import '../../index.scss'

export const Navigate = () => {
    return (
        <nav className={s.nav}>
            <ul className={s.menuList}>
                <li className={s.menuItems}>
                    <NavLink to='/'>О нас</NavLink>
                </li>
                <li className={s.menuItems}>
                    <NavLink to='/specialists'>Специалисты</NavLink>
                </li>
                <li className={s.menuItems}>
                    <NavLink to='/services'>Услуги</NavLink>
                </li>
                <li className={s.menuItems}>
                    <NavLink to='/online_recording'>Онлайн запись</NavLink>
                </li>
                <li className={s.menuItems}>
                    <NavLink to='/training'>Тренировки</NavLink>
                </li>
                <li className={s.menuItems}>
                    <NavLink to='/contacts'>Контакты</NavLink>
                </li>
            </ul>
        </nav>
    )
}
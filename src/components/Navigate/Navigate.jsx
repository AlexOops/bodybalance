import s from './Navigate.module.scss'
import {NavLink} from "react-router-dom";
import '../../index.scss'

export const Navigate = ({setVisible}) => {
    return (
        <nav className={s.nav}>
            <ul className={s.menuList}>
                <li  className={s.menuItems}>
                    <NavLink onClick={() => setVisible(false)} to='/'>О нас</NavLink>
                </li>
                <li  className={s.menuItems}>
                    <NavLink onClick={() => setVisible(false)}  to='/specialists'>Специалисты</NavLink>
                </li>
                <li className={s.menuItems}>
                    <NavLink onClick={() => setVisible(false)} to='/services'>Услуги</NavLink>
                </li>
                <li className={s.menuItems}>
                    <NavLink onClick={() => setVisible(false)} to='/online-rehabilitation'>Онлайн-реабилитация</NavLink>
                </li>
                <li className={s.menuItems}>
                    <NavLink onClick={() => setVisible(false)} to='/contacts'>Контакты</NavLink>
                </li>
            </ul>
        </nav>
    )
}
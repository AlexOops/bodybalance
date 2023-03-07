import logo from '../../assets/logo.png'
import s from './Header.module.scss'
import '../../index.scss'

export const Header = () => {
    return  (
        <div className={'container'}>
        <div className={s.header}>
            <img className={s.logo} src={logo} alt="logo"/>
            <ul className={s.menuList}>
                <li className={s.menuItems}>О нас</li>
                <li className={s.menuItems}>Специалисты</li>
                <li className={s.menuItems}>Услуги</li>
                <li className={s.menuItems}>Онлайн запись</li>
                <li className={s.menuItems}>Тренировки</li>
                <li className={s.menuItems}>Контакты</li>
            </ul>
            <div className={s.login}>
                <button className={s.singUp}>Вход</button>
                <button className={s.singOut}>Регистрация</button>
            </div>
        </div>
        </div>
    )
}
import s from './Footer.module.scss'
import '../../index.scss'
import logo from '../../assets/logo.svg'
import instagram from '../../assets/instagram.svg'
import vk from '../../assets/vk.svg'
import telegram from '../../assets/telegram.svg'
import twitter from '../../assets/twiter.svg'
import location from '../../assets/location.svg'
import telegram2 from '../../assets/telegram2.svg'
import mail from '../../assets/mail.svg'
import telephone from '../../assets/telephone.svg'


export const Footer = () => {
    return (
        <div className={'container-color'}>
            <div className={'container'}>
                <div className={s.footer}>
                    <div className={s.img}>
                        <div className={s.logo}><img src={logo} alt=""/></div>
                        {/*<div className={s.socialNetwork}>*/}
                        {/*    <img src={twitter} alt="twitter"/>*/}
                        {/*    <img src={instagram} alt="instagram"/>*/}
                        {/*    <img src={vk} alt="vk"/>*/}
                        {/*    <img src={telegram} alt="telegram"/>*/}
                        {/*</div>*/}
                    </div>
                    <div className={s.menu}>
                        <ul className={s.menuList}>
                            <li className={s.menuItems}>О нас</li>
                            <li className={s.menuItems}>Специалисты</li>
                            <li className={s.menuItems}>Наши Услуги</li>
                            <li className={s.menuItems}>Контакты</li>
                        </ul>
                    </div>
                    <div className={s.menu}>
                        <ul className={s.menuList}>
                            <li className={s.menuItems}>Личный кабинет</li>
                            <li className={s.menuItems}>Онлайн-реабилитация</li>
                            <li className={s.menuItems}>Тренировки</li>
                            <li className={s.menuItems}>Наши партнеры</li>
                        </ul>
                    </div>
                    <div className={s.contacts}>
                        <ul className={s.menuList}>
                            <li className={s.menuItems}><img className={s.image} src={mail} alt="mail"/> bocharnikovdoc@mail.ru</li>
                            <li className={s.menuItems}><img className={s.image} src={telephone} alt="telephone"/>+ 7 (800) 526-56-77</li>
                            <li className={s.menuItems}><img className={s.image} src={telegram2} alt="telegram2"/>+ 7 (915) 421-78-58</li>
                            <li className={s.menuItems}><img className={s.image} src={location} alt="location"/>Москва, ул. Адмирала Макарова д.17 к.2</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
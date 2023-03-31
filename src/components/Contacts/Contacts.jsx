import s from "./Contacts.module.scss";
import '../../index.scss'
import mail from "../../assets/mail.svg";
import telephone from "../../assets/telephone.svg";
import location from "../../assets/location.svg";
import telegram from "../../assets/telegram.svg";

import {MapYandex} from "./Map/MapYandex";
import Select from "./Select/Select"


export const Contacts = () => {


    // const handleChange = (selectedOption) => {
    //     console.log(selectedOption)
    // }

    return (
        <>
            <div className={'container-color'}>
                <div className={'container'}>
                    <div className={s.header}>
                        <p className={s.title}>Контакты</p>
                        <p className={s.text}>Свяжитесь с нами любым удобным для вас способом</p>
                    </div>
                </div>
            </div>
            <div className={s.content}>
                <div className={s.contacts}>
                    <p className={s.contactsTitle}>Мы на связи</p>
                    <ul className={s.contactList}>
                        <li className={s.contactListItem}><img src={mail} width={36} height={36} alt="mail"/>
                            <a className={s.contactListText}
                               href="mailto:bodybalancedoc@mail.ru">bodybalancedoc@mail.ru</a>
                        </li>
                        <li className={s.contactListItem}><img src={telephone} width={36} height={36} alt="telephone"/>
                            <a className={s.contactListText} href="tel:+79154217858">+7 (915) 421-78-58</a>
                        </li>
                        <li className={s.contactListItem}><img src={telegram} width={36} height={36} alt="telegram"/>
                            <a className={s.contactListText} href="tg://resolve?domain=bodybalance">@bodybalance</a>
                        </li>
                        <li className={s.contactListItem}><img src={location} width={36} height={36} alt="location"/>
                            <p className={s.contactListText}>Москва, ул. Адмирала Макарова д.17 к.2</p>
                        </li>
                    </ul>
                </div>
                <form action="" className={s.form}>
                    <Select/>
                    <input className={s.formItem} type="text" placeholder={'Имя'}/>
                    <input className={s.formItem} type="text" placeholder={'Фамилия'}/>
                    <input className={s.formItem} type="email" placeholder={'E-mail'}/>
                    <input className={`${s.formMessage} ${s.formItem}`} type="text" placeholder={'Напишите нам'}/>
                    <button className={s.button}>Отправить письмо</button>
                </form>
            </div>
            <MapYandex/>
        </>
    );
};

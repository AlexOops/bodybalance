import s from "./Contacts.module.scss";
import '../../index.scss'
import mail from "../../assets/mail.svg";
import telephone from "../../assets/telephone.svg";
import location from "../../assets/location.svg";
import telegram from "../../assets/telegram.svg";

import {MapYandex} from "../../components/Contacts/Map/MapYandex";
import {Select} from "../../components/Contacts/Select/Select"
import React, {useState} from "react";

import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input';
import axios from "../../axios";
import Modal from "../../components/Modal/Modal";
import {openModal} from "../../redux/slices/modal";
import {useDispatch} from "react-redux";


export const Contacts = () => {

    const dispatch = useDispatch();
    const [phone, setPhone] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [data, setData] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const topic = selectedOption.value;
        const clientName = formData.get('name');
        const clientPhone = phone;
        const clientEmail = formData.get('email');
        const additionalInfo = formData.get('additionalInfo');

        const dataToSend = {
            topic: topic,
            clientName: clientName,
            clientPhone: clientPhone,
            clientEmail: clientEmail,
            additionalInfo: additionalInfo
        }

        try {
            const response = await axios.post("/contacts", dataToSend, {
                headers: {"Content-Type": "application/json"},
            })
                .catch(err => console.log("Не удалась отправить заявку", err))

            // Мб поменять ??? заменала ?? Альтернатива ???
            setData(response.data);

            dispatch(openModal('modalMessage'));

            // Очищаем поля формы после успешной отправки
            e.target.reset();
            setPhone('');
            setSelectedOption(null);

        } catch (error) {
            // Обработка ошибки, если требуется
            console.error(error);
        }
    };

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
                <form className={s.form} onSubmit={handleSubmit}>

                    <Select selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>

                    <input className={s.formItem} name={'name'} placeholder={'Имя'} required/>

                    <PhoneInput
                        international
                        defaultCountry="RU"
                        value={phone}
                        onChange={setPhone}
                        error={phone ? (isValidPhoneNumber(phone) ? undefined : 'Неверный номер телефона') : 'Требуется номер телефона'}
                    />

                    <input className={s.formItem} name={'email'} type="email" placeholder={'E-mail'} required/>

                    <textarea className={`${s.formMessage} ${s.formItem}`}
                              name={'additionalInfo'}
                              placeholder={'Напишите нам'}>
                    </textarea>

                    <button type={"submit"} className={s.button}>Отправить письмо</button>

                    <Modal type={'modalMessage'}>
                        <div className={s.feedback}>{data.clientName}, Ваша завка принята!<br/>
                            Ожидайте ответа, в ближайшее время с Вами свяжутся.
                        </div>
                    </Modal>
                </form>
            </div>
            <MapYandex/>
        </>
    );
};

import React, {useState} from 'react';
import s from './CreateService.module.scss';
import {useDispatch} from "react-redux";
import {fetchServices} from "../../../redux/slices/services";
import axios from "../../../axios";

export const CreateService = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [recommendations, setRecommendations] = useState('');

    const [message, setMessage] = useState('');

    const handleSuccessMessage = (message) => {
        setMessage(message);

        // Сбрасываем поля после успешного создания
        setName('');
        setDescription('');
        setRecommendations('');

        dispatch(fetchServices());

        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newService = {
            name,
            description,
            recommendations
        }

        try {
            const response = await axios.post('/admin/services/newService', newService);

            handleSuccessMessage(response.data.message);
        } catch (e) {
            console.log("Ошибка создания сотрудника", e);
            throw e;
        }
    }

    return (
        <>
            {
                message ?
                    <div className={s.message}>
                        {message}
                    </div>
                    :
                    <div className={s.block}>

                        <h3 className={s.title}>Создание новой услуги</h3>

                        <form className={s.formCreateService} onSubmit={handleSubmit}>

                            <input className={s.input}
                                   type="text"
                                   placeholder={'Название услуги'}
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}/>

                            <textarea className={s.textarea}
                                      placeholder={'Описание услуги'}
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}/>

                            <textarea className={s.textarea}
                                      placeholder={'Рекомендации '}
                                      value={recommendations}
                                      onChange={(e) => setRecommendations(e.target.value)}/>


                            <button type={"submit"} className={'adminButton'}>Добавить услугу</button>

                        </form>
                    </div>
            }
        </>
    );
};

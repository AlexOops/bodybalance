import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchTraining} from "../../../redux/slices/training";
import axios from "../../../axios";
import s from "./CreateTraining.module.scss";

export const CreateTraining = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    // проброс наверх ?????
    const [message, setMessage] = useState('');

    const handleSuccessMessage = (message) => {
        setMessage(message);

        // Сбрасываем поля после успешного создания
        setName('');
        setDescription('');
        setCategory('');

        dispatch(fetchTraining());

        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCatalog = {
            name,
            description,
            category
        }

        try {
            const response = await axios.post('/admin/training/newCatalog', newCatalog);

            handleSuccessMessage(response.data.message);
        } catch (e) {
            console.log("Ошибка создания видеокаталога", e);
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

                        <h3 className={s.title}>Создание новой видеокаталога</h3>

                        <form className={s.formCreateCatalog} onSubmit={handleSubmit}>

                            <input className={s.input}
                                   type="text"
                                   placeholder={'Название каталога'}
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}/>

                            <textarea className={s.textarea}
                                      placeholder={'Описание каталога'}
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}/>

                            <input className={s.input}
                                   type="text"
                                   placeholder={'Категория'}
                                   value={category}
                                   onChange={(e) => setCategory(e.target.value)}/>

                            <button type={"submit"} className={'adminButton'}>Добавить видеокаталог</button>

                        </form>
                    </div>
            }
        </>
    );
};
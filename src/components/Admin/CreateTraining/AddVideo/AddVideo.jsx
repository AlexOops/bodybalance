import React, {useState} from 'react';
import s from "./AddVideo.module.scss";
import axios from "../../../../axios";

export const AddVideo = ({category, onCancel, onVideoAdded}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const [message, setMessage] = useState('');

    const handleCancel = () => onCancel();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newVideo = {
            title,
            description,
            videoUrl,
            category
        }

        try {
            const response = await axios.post('/admin/training/newVideo', newVideo);

            handleSuccessMessage(response.data.message);

            if (response.data && response.data.video) {
                onVideoAdded(response.data.video);
            }

        } catch (e) {
            console.log("Ошибка добавления видео", e);
            throw e;
        }
    }

    const handleSuccessMessage = (message) => {
        setMessage(message);

        // Сбрасываем поля после успешного создания
        setTitle('');
        setDescription('');
        setVideoUrl('');
    };


    return (
        <div className={s.videoBlock}>

            <form className={s.formCreateVideo} onSubmit={e => handleSubmit(e)}>

                <input className={s.input}
                       type="text"
                       placeholder={'Название видеоролика'}
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}/>

                <textarea className={s.textarea}
                          placeholder={'Описание видеоролика'}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}/>

                <textarea className={s.textarea}
                          placeholder={'Ccылка на видеоролик'}
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}/>

                <button type={"submit"} className={'adminButton'}>Сохранить</button>
            </form>

            <button className={'adminButton'} onClick={handleCancel}>Отмена</button>
        </div>
    );
};
import React, {useState} from 'react';

import s from './AvatarUploader.module.scss'
import axios from "../../../axios";

export const AvatarUploader = ({ onAvatarUpdate }) => {

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.patch('/profile/updateAvatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const updatedAvatarUrl = response.data.avatarUrl;

            onAvatarUpdate(updatedAvatarUrl);
        } catch (e) {
            console.error('Не удалось загрузить аватарку', e);
        }
    };

    return (
        <div className={s.uploadElems}>
            {/*<input  className={s.inputFile} placeholder={'Выберите файл'} type="file" accept="image/*" onChange={handleImageChange} />*/}

            <div className={s.inputFileWrapper}>
                <input type="file" accept="image/*" className={s.inputFile}  onChange={handleImageChange}/>
                <span className={s.customButtonText}>Выберите файл</span>
            </div>
            {image && (
                <>
                    <button className={s.button} onClick={handleUpload}>Загрузить</button>
                </>
            )}
        </div>
    );
};

import React, {useState} from 'react';
import s from './AvatarUploader.module.scss'
import axios from "../../../axios";

export const AvatarUploader = ({userId, handleUpdatedAvatarUrl}) => {

    const [image, setImage] = useState(null);

    const handleAvatarUpdate = (updatedAvatarUrl) => {
        handleUpdatedAvatarUrl(updatedAvatarUrl);
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.patch(`/profile/updateAvatar/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            handleAvatarUpdate(response.data.avatarUrl);

        } catch (e) {
            console.error('Не удалось загрузить аватарку', e);
        }
    };

    return (
        <div className={s.uploadElems}>
            <div className={s.inputFileWrapper}>
                <input type="file" accept="image/*" className={s.inputFile} onChange={handleImageChange}/>
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

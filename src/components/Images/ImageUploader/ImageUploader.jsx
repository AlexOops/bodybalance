import React, {useState} from 'react';
import s from './ImageUploader.module.scss'
import axios from "../../../axios";

export const ImageUploader = ({fieldName = 'image', uploadUrl, handleUpdatedImageUrl}) => {

    const [image, setImage] = useState(null);

    const handleImageUpdate = (updatedAvatarUrl) => {
        handleUpdatedImageUrl(updatedAvatarUrl);
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleUpload = async () => {
        const formData = new FormData();

        formData.append(fieldName, image); // как заготовка на проброс

        try {
            const response = await axios.patch(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            handleImageUpdate(response.data.imageUrl);

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

import React, {useEffect, useState} from 'react';
import s from './Service.module.scss';
import CustomAvatar from "../../Images/CustomAvatar/CustomAvatar";
import {ImageUploader} from "../../Images/ImageUploader/ImageUploader";
import axios from "../../../axios";
import {EditService} from "./EditService/EditService";

export const Service = ({service, handleUpdatedServices}) => {

    const [serviceData, setServiceData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        setServiceData(service);
    }, [service]);

    const onClickEditing = () => {

        setIsEditing(true);
    }

    const handleCancelClick = () => {

        setIsEditing(false);
    }

    const handleUploadedImageUrl = (updatedAvatarUrl) => {

        setImageUrl(updatedAvatarUrl);

        handleUpdatedServices(); // обновляем в родителе
    }

    const handleSaveClick = async (updatedData) => {
        try {

            const serviceId = service._id;

            const response = await axios.patch(`/admin/services/updateService/${serviceId}`, updatedData);

            setServiceData(updatedData);

            handleUpdatedServices(); // обновляем в родителе

            setMessage(response.body.message); //доделать сообщения ?????

        } catch (e) {
            setMessage('Не удалось обновить данные!', e);
        }

        setIsEditing(false);
    }

    return (
        <div className={s.block}>

            {
                serviceData ? (

                    <div className={s.container}>

                        <div className={s.avatar}>
                            <CustomAvatar avatarUrl={imageUrl ? imageUrl : serviceData.imageUrl}
                                          fullName={serviceData && serviceData.name}
                                          size={'100px'}/>

                            <ImageUploader uploadUrl={`/admin/services/updateImage/${serviceData?._id}`}
                                           handleUpdatedImageUrl={handleUploadedImageUrl}/>
                        </div>

                        {
                            isEditing ?
                                (
                                    <div>
                                        <div className={s.card}>
                                            <EditService data={serviceData} setData={setServiceData}
                                                         onSave={handleSaveClick}
                                                         onCancel={handleCancelClick}/>
                                        </div>
                                    </div>

                                ) : (

                                    <div className={s.aboutService}>
                                        <div className={s.name}><span>Название услуги: </span>{serviceData.name}</div>
                                        <div className={s.description}>
                                            <span>Описание услуги: </span>{serviceData.description}
                                        </div>
                                        <div className={s.recommendations}>
                                            <span>Рекоммендации: </span>{serviceData.recommendations}</div>

                                        <button className={'adminButton'} onClick={onClickEditing}>Редактировать</button>
                                    </div>
                                )
                        }
                    </div>

                ) : null
            }

        </div>
    );
};
import React, {useEffect, useState} from 'react';
import s from './Service.module.scss';
import CustomAvatar from "../../Images/CustomAvatar/CustomAvatar";
import {ImageUploader} from "../../Images/ImageUploader/ImageUploader";
import axios from "../../../axios";
import {EditService} from "./EditService/EditService";
import {Edit} from "../../Edit/Edit";
import ReactMarkdown from "react-markdown";

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

                        <Edit text={'Данные услуги'} action={onClickEditing}/>

                        {
                            isEditing ?
                                (
                                    <div className={s.card}>
                                        <EditService data={serviceData} setData={setServiceData}
                                                     onSave={handleSaveClick}
                                                     onCancel={handleCancelClick}/>
                                    </div>

                                ) : (

                                    <div className={s.card}>
                                        <div className={s.item}>
                                            <div className={s.label}>Название услуги:</div>
                                            <div className={s.text}>{serviceData.name}</div>
                                        </div>

                                        <div className={s.item}>
                                            <div className={s.label}>Описание услуги:</div>
                                            <div className={s.text}>  {serviceData.description}</div>
                                        </div>

                                        <div className={s.item}>
                                            <div className={s.label}>Рекоммендации:</div>
                                            <div className={`${s.text} serviceDescription`}><ReactMarkdown>{serviceData.recommendations}</ReactMarkdown></div>
                                        </div>
                                    </div>
                                )
                        }
                    </div>

                ) : null
            }

        </div>
    );
};
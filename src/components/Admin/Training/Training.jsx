import React, {useEffect, useState} from 'react';
import axios from "../../../axios";
import s from "./Training.module.scss";
import CustomAvatar from "../../Images/CustomAvatar/CustomAvatar";
import {ImageUploader} from "../../Images/ImageUploader/ImageUploader";
import {EditCatalog} from "./EditCatalog/EditCatalog";
import {AddVideo} from "../CreateTraining/AddVideo/AddVideo";
import {Edit} from "../../Edit/Edit";

export const Training = ({catalog, handleUpdatedCatalog}) => {

    const [catalogData, setCatalogData] = useState();
    const [imageUrl, setImageUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingVideo, setIsEditingVideo] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setCatalogData(catalog);
    }, [catalog]);

    const onClickEditing = () => setIsEditing(true);
    const handleCancelClick = () => setIsEditing(false);

    // ДОБАВЛЕНИЕ ВИДЕО
    const toggleAddVideo = () => setIsEditingVideo(prevState => !prevState);

    const handleUploadedImageUrl = (updatedImageUrl) => {

        setImageUrl(updatedImageUrl);

        handleUpdatedCatalog(); // обновляем в родителе
    }

    const handleSaveClick = async (updatedData) => {
        try {

            const catalogId = catalog._id;

            const response = await axios.patch(`/admin/training/updateCatalog/${catalogId}`, updatedData);

            setCatalogData(updatedData);

            handleUpdatedCatalog(); // обновляем в родителе

            setMessage(response.body.message); //доделать сообщения ?????

        } catch (e) {
            setMessage('Не удалось обновить данные!', e);
        }

        setIsEditing(false);
    }

    //апдейт видео после добавления
    const onNewVideoAdded = (newVideoData) => {
        // Обновите catalogData с новыми данными видео
        setCatalogData(prevData => ({
            ...prevData,
            videos: [...prevData.videos, newVideoData]
        }));
    }

    //Апдейт видео после удаления
    const onVideoRemoved = (videoId) => {
        setCatalogData(prevData => ({
            ...prevData,
            videos: prevData.videos.filter(video => video._id !== videoId)
        }));
    }


    const handleSubmitToRemoveVideo = async (e, id) => {
        e.stopPropagation();

        const response = await axios.delete(`/admin/training/removeVideo/${id}`);

        if (response.data.success) {

            setMessage(response.data.message);

            onVideoRemoved(id);

        } else {
            setMessage(response.data.message);
        }
    }


    return (
        <div>
            {
                catalogData ?

                    (
                        <div className={s.container}>

                            <div className={s.avatar}>
                                <CustomAvatar avatarUrl={imageUrl ? imageUrl : catalogData.imageUrl}
                                              fullName={catalogData?.name}
                                              size={'100px'}/>

                                <ImageUploader uploadUrl={`/admin/training/updateImage/${catalogData?._id}`}
                                               handleUpdatedImageUrl={handleUploadedImageUrl}/>
                            </div>

                            <Edit text={'Данные видеокаталога'} action={onClickEditing}/>

                            {
                                isEditing ?

                                    (
                                        <div className={s.cardEdit}>
                                            <EditCatalog data={catalogData}
                                                         setData={setCatalogData}
                                                         onSave={handleSaveClick}
                                                         onCancel={handleCancelClick}
                                            />
                                        </div>


                                    ) : (

                                        <div className={s.card}>

                                            <div className={s.item}>
                                                <div className={s.label}>Название:</div>
                                                <div className={s.text}>{catalogData.name}</div>
                                            </div>

                                            <div className={s.item}>
                                                <div className={s.label}>Описание:</div>
                                                <div className={s.text}>{catalogData.description}</div>
                                            </div>

                                            <div className={s.item}>
                                                <div className={s.label}>Категория видео:</div>
                                                <div className={s.text}>{catalogData.category}</div>
                                            </div>

                                        </div>
                                    )
                            }

                            <div>

                                <Edit text={'Видеокаталог'} action={toggleAddVideo}/>

                                {
                                    isEditingVideo ?

                                        (
                                            <AddVideo category={catalogData.category}
                                                      onCancel={toggleAddVideo}
                                                      onVideoAdded={onNewVideoAdded}
                                            />

                                        ) : (

                                            <div className={s.videos}>

                                                {
                                                    catalogData.videos && catalogData.videos.length > 0 ?

                                                        (
                                                            <>
                                                                <div className={s.videoCard}>
                                                                    <div className={s.videoCardItem}>Название видео</div>
                                                                    <div className={s.videoCardItem}>Описание видео</div>
                                                                    <div className={s.videoCardItem}>Ссылка на видео</div>
                                                                </div>

                                                                {
                                                                    catalogData.videos.map((video) =>

                                                                        <div className={s.video} key={video._id}>
                                                                            <div className={s.videoTitle}>{video.title}</div>
                                                                            <div className={s.videoDescription}>{video.description}</div>
                                                                            <div className={s.videoUrl}>
                                                                                <a className={s.link} target="_blank"
                                                                                   href={video.videoUrl} rel="noreferrer">{video.videoUrl}</a>
                                                                            </div>

                                                                            <div className="remove"
                                                                                 onClick={(e) => handleSubmitToRemoveVideo(e, video._id)}>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }

                                                            </>

                                                        ) : (

                                                            <div className={s.text}>
                                                                В этом видеокаталоге еще нет видео!
                                                            </div>
                                                        )
                                                }

                                            </div>
                                        )
                                }

                            </div>
                        </div>

                    ) : null
            }
        </div>
    );
};
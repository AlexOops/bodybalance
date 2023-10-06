import React, {useEffect, useState} from 'react';
import axios from "../../../axios";
import s from "./Training.module.scss";
import CustomAvatar from "../../Images/CustomAvatar/CustomAvatar";
import {ImageUploader} from "../../Images/ImageUploader/ImageUploader";
import {EditCatalog} from "./EditCatalog/EditCatalog";
import {AddVideo} from "../CreateTraining/AddVideo/AddVideo";

export const Training = ({catalog, handleUpdatedCatalog}) => {

    const [catalogData, setCatalogData] = useState();
    const [imageUrl, setImageUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingVideo, setIsAddingVideo] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setCatalogData(catalog);
    }, [catalog]);

    const onClickEditing = () => setIsEditing(true);
    const handleCancelClick = () => setIsEditing(false);

    // ДОБАВЛЕНИЕ ВИДЕО
    const toggleAddVideo = () => setIsAddingVideo(prevState => !prevState);

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

                            {
                                isEditing ?

                                    (
                                        <div>
                                            <EditCatalog data={catalogData} setData={setCatalogData}
                                                         onSave={handleSaveClick} onCancel={handleCancelClick}/>
                                        </div>

                                    ) : (

                                        <div className={s.videoCatalog}>

                                            <div className={s.description}>

                                                <div className={s.name}>
                                                    <span>Название видеокаталога: </span>{catalogData.name}
                                                </div>
                                                <div className={s.description}>
                                                    <span>Описание видеокаталога: </span>{catalogData.description}
                                                </div>
                                                <div className={s.recommendations}>
                                                    <span>Категория видео: </span>{catalogData.category}</div>

                                                <button className={'adminButton'} onClick={onClickEditing}>Редактировать
                                                </button>

                                                <button className={'adminButton'}
                                                        onClick={toggleAddVideo}>Добавить видео
                                                </button>


                                                <div className={s.videos}>

                                                    {
                                                        catalogData.videos?.map((video, idx) =>

                                                            <div className={s.video} key={idx}>
                                                                <div className={s.videoItem}>{video.title}</div>
                                                                <div className={s.videoItem}>{video.description}</div>
                                                                <div className={s.videoItem}><a href={video.videoUrl}><span>{video.title}</span></a></div>

                                                                <div className="remove"
                                                                     onClick={(e) => handleSubmitToRemoveVideo(e, video._id)}>
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                </div>


                                            </div>

                                            <div className={s.createVideo}>

                                                {
                                                    isAddingVideo ?
                                                        <AddVideo category={catalogData.category}
                                                                  onCancel={toggleAddVideo}
                                                                  onVideoAdded={onNewVideoAdded}
                                                        />
                                                        : null
                                                }

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
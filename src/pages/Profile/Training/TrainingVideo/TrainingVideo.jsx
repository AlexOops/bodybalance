import React, {useEffect} from 'react';
import s from "./TrainingVideo.module.scss";
import {Video} from "../../../../components/Training/Video/Video";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideos, setDescription, setName} from "../../../../redux/slices/training";
import {useParams} from "react-router-dom";

export const TrainingVideo = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.training.videos);
    const isVideosLoading = videos.status === 'loading'

    const {name, description} = useSelector((state) => state.training.training);

    useEffect(() => {
        dispatch(fetchVideos(id));

        if (!name && !description) {
            dispatch(setName(localStorage.getItem('name')));
            dispatch(setDescription(localStorage.getItem('description')));
        }

    }, [description, dispatch, id, name])

    return (
        <>
            <div className={s.header}>
                <p className={s.title}>{name}</p>
                <p className={s.text}>{description}</p>
            </div>

            {(isVideosLoading ? [...Array(3)] : videos.items).map((item, idx) =>

                isVideosLoading
                    ? (
                        <div className={s.joint} key={idx}>
                            <div className={s.jointContent}>Загрузка...</div>
                        </div>
                    )
                    :
                    (
                        <div className={s.joint} key={idx}>
                            <div className={s.jointContent}>
                                <p className={s.jointTitle}>{item.title}</p>
                                <p className={s.jointText}>{item.description}</p>
                            </div>

                            <Video url={item.videoUrl}/>
                        </div>
                    )
            )}
        </>
    );
};

import React, {useEffect} from 'react';
import s from "./Videos.module.scss";
import {Video} from "../../../components/Trainings/Video/Video";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideos, setDescription, setName} from "../../../redux/slices/training";
import {useParams} from "react-router-dom";

export const Videos = () => {

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
            <div className={'container-color'}>
                <div className={'container'}>
                    <div className={s.header}>
                        <p className={s.title}>{name}</p>
                        <p className={s.text}>{description}</p>
                    </div>
                </div>

                <div className={s.servicesTitleWrap}>
                    <h2 className={s.servicesTitle}>Комплекс упражнений для голеностопного сустава</h2>
                </div>

                {(isVideosLoading ? [...Array(3)] : videos.items).map((item, idx) =>

                    isVideosLoading
                        ? (
                            <div className={s.ankles_content} key={idx}>
                                <div className={s.ankles_content_description}></div>
                            </div>
                        )
                        :
                        (
                            <div className={s.ankles_content} key={idx}>
                                <div className={s.ankles_content_description}>
                                    <p className={s.ankles_content_title}>{item.title}</p>
                                    <p className={s.ankles_content_text}>{item.description}</p>
                                </div>

                                <Video url={item.videoUrl}/>
                            </div>
                        )
                )}
            </div>
        </>
    );
};

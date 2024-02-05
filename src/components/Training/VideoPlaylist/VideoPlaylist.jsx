import React from 'react';
import {Video} from "../Video/Video";
import s from "./VideoPlaylist.module.scss";

export const VideoPlaylist = ({trainingCatalog}) => {

    return (
        <div className={s.block}>

            <h1 className={s.title}>{trainingCatalog?.name}</h1>

            <p className={s.text}>{trainingCatalog?.description}</p>

            {
                trainingCatalog.videos?.map((video) =>

                    <div className={s.videoContainer} key={video._id}>

                        <Video url={video.videoUrl}/>

                        <div className={s.videoContent}>
                            <p className={s.videoTitle}>{video.title}</p>
                            <p className={s.videoText}>{video.description}</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};
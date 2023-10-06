import React from 'react';
import {Video} from "../Video/Video";
import s from "./VideoPlaylist.module.scss";

export const VideoPlaylist = ({trainingCatalog}) => {

    return (
        <div>
            <div className={s.header}>
                <p className={s.title}>{trainingCatalog?.name}</p>
                <p className={s.text}>{trainingCatalog?.description}</p>
            </div>

            {
                trainingCatalog.videos?.map((video, idx) =>

                    <div className={s.joint} key={idx}>
                        <div className={s.jointContent}>
                            <p className={s.jointTitle}>{video.title}</p>
                            <p className={s.jointText}>{video.description}</p>
                        </div>

                        <Video url={video.videoUrl}/>
                    </div>
                )
            }
        </div>
    );
};
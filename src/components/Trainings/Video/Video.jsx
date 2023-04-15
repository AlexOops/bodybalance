import React from "react";
import ReactPlayer from "react-player";

import s from "./Video.module.scss";

export const Video = ({url}) => {
    return (
        <div className={s.player}>
            <ReactPlayer
                className="player"
                url={url}
                width="100%"
                height="100%"
                controls={false}
            />
        </div>
    );
};

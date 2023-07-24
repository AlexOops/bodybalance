import React from "react";
import ReactPlayer from "react-player";

import s from "./Video.module.scss";

export const Video = ({url}) => {
    return (
        <>
            <div className={s.customPlayer}>
                <ReactPlayer
                    className="player"
                    url={url}
                    controls={false}
                />
            </div>
        </>
    );
};

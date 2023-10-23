import React from 'react';
import s from './Circles.module.scss';

export const Circles = ({smallSize, smallAxisX, smallAxisY, bigSize, bigAxisX, bigAxisY}) => {
    return (
        <>
            <div className={s.smallCircle}
                 style={{
                     width: `${smallSize}px`,
                     height: `${smallSize}px`,
                     left: `${smallAxisX}px`,
                     top: `${smallAxisY}px`
                 }}>
            </div>

            <div className={s.bigCircle}
                 style={{
                     width: `${bigSize}px`,
                     height: `${bigSize}px`,
                     left: `${bigAxisX}px`,
                     top: `${bigAxisY}px`
                 }}>
            </div>
        </>
    );
};
import React from 'react';
import s from './Edit.module.scss';

export const Edit = ({text , action}) => {
    return (
        <div className={s.info}>{text} <div className={s.img} onClick={action}></div></div>
    );
};
import React from 'react';
import {useSelector} from "react-redux";

export const Specialists = () => {

    const employers = useSelector(state => state.employers);
    console.log(employers);

    return (
        <div>
            Специалисты


        </div>
    );
};

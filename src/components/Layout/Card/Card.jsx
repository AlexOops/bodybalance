import React from 'react';
import s from "./Card.module.scss";
import ReactMarkdown from "react-markdown";
export const Card = ({
    id,
    price,
    name,
    description,
    text,
    isPopular,
    imageUrl,
}) => {
    return (
        <div className={s.card}>
            <div className={s.flexCenter}>
            <div className={`${s.img} ${s.center}`}>
                <img src={imageUrl} alt=""/>
            </div>

                <h3 className={s.name}>
                    {name}
                </h3>

                {isPopular ?
                    <>
                        <ReactMarkdown>{description}</ReactMarkdown>
                    </>
                    :
                    <>
                        <div className={s.text}><ReactMarkdown>{text}</ReactMarkdown></div>
                    </>
                }
            </div>
            {isPopular?? <div className={s.price}>{price}</div>}

        </div>
    );
};
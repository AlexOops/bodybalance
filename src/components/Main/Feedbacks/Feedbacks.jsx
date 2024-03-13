import React from 'react';
import s from "./Feedbacks.module.scss";
import Carousel from "../../Carousel/Carousel";
import {Feedback} from "../../Feedback/Feedback";

export const Feedbacks = () => {
    return (
        <div className={s.wrapper}>
            <div className={'container-carousel'}>
                <h2 className={s.section}>Довольные клиенты</h2>
                <Carousel>
                    <Feedback
                        text={'А ещё представители современных социальных резервов набирают популярность среди определённых слоёв населения, а значит, должны быть превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Значимость этих проблем настолько очевидна, что высококачественный прототип будущего проекта играет важную роль в формировании переосмысления внешнеэкономических политик.'}
                        author={'Рикардо Милос - '}
                        profession={'профессиональный танцор'}
                    />
                    <Feedback
                        text={'А ещё представители современных социальных резервов набирают популярность среди определённых слоёв населения, а значит, должны быть превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Значимость этих проблем настолько очевидна, что высококачественный прототип будущего проекта играет важную роль в формировании переосмысления внешнеэкономических политик.'}
                        author={'Рикардо Милос - '}
                        profession={'профессиональный танцор'}
                    />
                </Carousel>
            </div>
        </div>
    );
};
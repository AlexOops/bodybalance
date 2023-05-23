import {PopularServices} from "../../components/Main/PopularServices/PopularServices";
import {TeamDoctor} from "../../components/Main/TeamDoctor/TeamDoctor";
import s from "../../components/Feedback/Feedback.module.scss";
import {Feedback} from "../../components/Feedback/Feedback";
import {Partners} from "../../components/Main/Partners/Partners";
import {Slider2} from "../../components/Slider2/Slider2";
import Carousel from "../../components/Carousel/Carousel";

export const Main = () => {
    return (
        <>
            <Slider2/>
            <PopularServices/>
            <TeamDoctor/>
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
            <Partners/>
        </>
    )
}

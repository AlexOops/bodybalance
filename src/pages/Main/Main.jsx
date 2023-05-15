import {Slider} from "../../components/Layout/Main/Slider/Slider";
import {PopularServices} from "../../components/Layout/Main/PopularServices/PopularServices";
import {TeamDoctor} from "../../components/Layout/Main/TeamDoctor/TeamDoctor";
import s from "../../components/Feedback/Feedback.module.scss";
import {ArrowLeft} from "../../components/Arrow/ArrowLeft";
import {Feedback} from "../../components/Feedback/Feedback";
import {ArrowRight} from "../../components/Arrow/ArrowRight";
import {Partners} from "../../components/Layout/Main/Partners/Partners";

export const Main = () => {
    return (
        <>
            <Slider/>
            <PopularServices/>
            <TeamDoctor/>
            <div className={s.wrapper}>
                <div className={'container-carousel'}>
                    <ArrowLeft/>
                    <Feedback name={'Довольные клиенты'}
                              text={'А ещё представители современных социальных резервов набирают популярность среди определённых слоёв населения, а значит, должны быть превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Значимость этих проблем настолько очевидна, что высококачественный прототип будущего проекта играет важную роль в формировании переосмысления внешнеэкономических политик.'}
                              author={'Рикардо Милос - '}
                              profession={'профессиональный танцор'}
                    />
                    <ArrowRight/>
                </div>
            </div>
            <Partners/>
        </>
    )
}

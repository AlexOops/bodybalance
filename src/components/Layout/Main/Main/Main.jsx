import {Header} from "../../../Header/Header";
import {Footer} from "../../../Footer/Footer";
import {Outlet, useLocation} from "react-router-dom";
import {Slider} from "../Slider/Slider";
import {PopularServices} from "../PopularServices/PopularServices";
import {TeamDoctor} from "../TeamDoctor/TeamDoctor";
import {Feedback} from "../Feedback/Feedback";
import {Partners} from "../Partners/Partners";
import s from "../Feedback/Feedback.module.scss";
import {ArrowLeft} from "../../Arrow/ArrowLeft";
import {ArrowRight} from "../../Arrow/ArrowRight";
import Modal from "../../../Modal/Modal"

export const Main = () => {
    const location = useLocation()
    return (
        <>
            <Header/>
            <Modal/>
            {location.pathname === '/' ?
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
                :
                <Outlet/>
            }
            <Footer/>
        </>
    )
}
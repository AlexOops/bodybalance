import {ArrowLeft} from "../../Arrow/ArrowLeft";
import {ArrowRight} from "../../Arrow/ArrowRight";
import s from './Feedback.module.scss'
import customers from "../../../../assets/customers.png";
import doubleQuotes from "../../../../assets/double-quotes.svg";

export const Feedback = () => {
    return (
        <div className={s.wrapper}>

            <div className={'container-carousel'}>
                <ArrowLeft />
            <div className={'container'}>
                <h2 className={s.section}>Довольные клиенты</h2>
                <div className={s.direction}>
                    <div className={s.img}>
                        <img src={customers} alt=""/>
                    </div>
                    <div className={s.feedback}>
                        <div className={s.line}></div>
                        <img className={s.quotes} src={doubleQuotes} alt=""/>
                        <p>А ещё представители современных социальных резервов набирают популярность среди определённых слоёв населения, а значит, должны быть превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Значимость этих проблем настолько очевидна, что высококачественный прототип будущего проекта играет важную роль в формировании переосмысления внешнеэкономических политик.</p>
                        <p className={s.name}>Рикардо Милос - <span className={s.profession}>профессиональный танцор</span></p>
                        <div className={s.line}></div>
                    </div>
                </div>
            </div>
                <ArrowRight />
            </div>

        </div>

    )
}
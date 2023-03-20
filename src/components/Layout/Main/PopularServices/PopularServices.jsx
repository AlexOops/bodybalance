import {ArrowLeft} from "../../Arrow/ArrowLeft";
import {ArrowRight} from "../../Arrow/ArrowRight";
import s from './PopularServices.module.scss'
import {Card} from "../../Card/Card";

// при загрузке с сервера убрать эту переменную и изменить её ниже. пока для заглушки
const price = 7200

export const PopularServices = () => {
    return (
        <>
            <div className='container-carousel'>
                <ArrowLeft/>
                <div className='container'>
                    <div className={s.position}>
                        <div className={s.services}>
                            <h2 className={s.space}>популярные услуги</h2>
                            <div className={s.cards}>
                                {/* изменить на получение с сервера пока только статика */}
                                <Card price={price} />
                                <Card />
                                <Card />
                            </div>
                        </div>
                    </div>
                </div>
                <ArrowRight/>
            </div>
        </>
    )
}
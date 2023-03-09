import '../../../../index.scss'
import s from './Slider.module.scss'
import {ArrowRight} from "../../Arrow/ArrowRight";
import {ArrowLeft} from "../../Arrow/ArrowLeft";
import {Dots} from "./Dots/Dots";

export const Slider = () => {
    return (
        <>
            <div className={'container-color container-slider'}>
                <ArrowLeft/>
            <div className={'container'}>
                <div className={s.slider}>
                    <h1 className={s.sliderName}>Bodybalance</h1>
                    <p className={s.sliderText}>Не следует, однако, забывать, что семантический разбор внешних противодействий способствует повышению качества первоочередных требований.</p>
                    <button className={s.signUp}>Записаться</button>
                </div>
                <div className={s.dots}>
                    <Dots />
                    <Dots />
                    <Dots />
                    <Dots />
                </div>
            </div>
                <ArrowRight/>
            </div>
        </>
    )
}
import '../../index.scss'
import s from './Slider2.module.scss'
import sliderImg from '../../assets/vectorpaint.svg'
import {nanoid} from "nanoid";
import Carousel from "../Carousel/Carousel";

// пока статика на получение с сервера переписать
const slider = [
    {
        id: 1,
        text: 'Не следует, однако, забывать, что семантический разбор внешних противодействий способствует повышению качества первоочередных требований.',
        name: 'Bodybalance'
    },
    {id: 2, text: 'Не следует, однако, забывать, что семантический разбор внешних противодействий способствует повышению качества первоочередных требований.', name: 'balance'},
    {id: 3, text: 'И снова здраствуйте', name: 'баланс тела'},
    {id: 4, text: 'Не следует, однако, забывать, что семантический разбор внешних противодействий способствует повышению качества первоочередных требований.', name: 'hello'},
]

export const Slider2 = () => {

    return (
        <div className={'container-color container-carousel container-slider'}>
            <img className={s.sliderImg} src={sliderImg} alt=""/>

            <Carousel>
                 {Object.values(slider).map((el) => {
                                return (
                                    <div className={s.slider} key={nanoid()} >
                                        <h1 className={s.sliderName}>{el.name}</h1>
                                        <p className={s.sliderText}>{el.text}</p>
                                        <button className={s.signUp}>Записаться</button>
                                    </div>

                                )
                            })}
            </Carousel>
        </div>
    )
}
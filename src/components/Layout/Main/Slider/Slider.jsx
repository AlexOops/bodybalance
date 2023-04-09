import '../../../../index.scss'
import s from './Slider.module.scss'
import {ArrowRight} from "../../Arrow/ArrowRight";
import {ArrowLeft} from "../../Arrow/ArrowLeft";
import {Dots} from "./Dots/Dots";
import sliderImg from '../../../../assets/vectorpaint.svg'
import {useEffect, useState} from "react";

// пока статика на получение с сервера переписать
const slider = [
    {
        id: 1,
        img: sliderImg,
        text: 'Не следует, однако, забывать, что семантический разбор внешних противодействий способствует повышению качества первоочередных требований.',
        name: 'Bodybalance'
    },
    {id: 2, img: sliderImg, text: 'hello', name: 'balance'},
    {id: 3, img: sliderImg, text: 'и снова здраствуйте', name: 'баланс тела'},
    {id: 4, img: 'https://img-fotki.yandex.ru/get/9755/16969765.1dd/0_8b308_4386fadb_orig.png', text: 'hello', name: 'balance'},
]

export const Slider = () => {
    const [count, setCount] = useState(0)
    const [filterSlider, setFilterSlider] = useState([])
    // переклиючение слайдов
    useEffect(() => {
            setFilterSlider(Object.values(slider).filter((el, idx) => {
                if (count < 0) {
                    setCount(slider.length -1)
                    return slider[0]
                } else if (count > slider.length - 1) {
                    setCount(0)
                    return slider.at(-1)
                } else {
                    return idx === count
                }
            }))
        }, [count])

    // интервал на слайды
    useEffect(() => {
        const timeout = setInterval(() => setCount(prevState => prevState + 1), 4000)
        return() => {
            clearInterval(timeout)
        }
    },[count])



        return (
            <>
                {filterSlider.map((el) => {
                    return <div key={el.id} className={'container-color container-slider container-carousel'}>
                        <img src={el.img} className={s.sliderImg} alt=""/>
                        <ArrowLeft setCount={setCount}/>
                        <div className={'container'}>
                            <div className={s.slider}>
                                <h1 className={s.sliderName}>{el.name}</h1>
                                <p className={s.sliderText}>{el.text}</p>
                                <button className={s.signUp}>Записаться</button>
                            </div>
                            <div className={s.dots}>
                                {[...Array(slider.length)].map((el, index) =>
                                    <Dots
                                        count={count}
                                        setCount={setCount}
                                        index={index}
                                        key={index}
                                    />)}
                            </div>
                        </div>
                        <ArrowRight setCount={setCount}/>
                    </div>
                })}
            </>
        )
    }
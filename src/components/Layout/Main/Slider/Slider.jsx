import '../../../../index.scss'
import s from './Slider.module.scss'
import {Dots} from "./Dots/Dots";
import sliderImg from '../../../../assets/vectorpaint.svg'
import {useEffect, useRef, useState} from "react";
import {nanoid} from "nanoid";
import {ArrowRight} from "../../../Arrow/ArrowRight";
import {ArrowLeft} from "../../../Arrow/ArrowLeft";

// пока статика на получение с сервера переписать
const slider = [
    {
        id: 1,
        text: 'Не следует, однако, забывать, что семантический разбор внешних противодействий способствует повышению качества первоочередных требований.',
        name: 'Bodybalance'
    },
    {id: 2, text: 'hello', name: 'balance'},
    {id: 3, text: 'и снова здраствуйте', name: 'баланс тела'},
    {id: 4, text: 'balance', name: 'hello'},
]

export const Slider = () => {
    const [offset, setOffset] = useState(0)
    const maxLength = -offset * (slider.length - 1)
    const [width, setWidth] = useState(0)
    const ref = useRef(null)


    useEffect(() => {
        setOffset(ref.current.clientWidth)
    }, [offset])

    useEffect(() => {
        if (width > 0) {
            setWidth(maxLength)
        } else if (width < maxLength) {
            setWidth(0)
        }
        const timeout = setInterval(() => setWidth(prevState => prevState - offset), 4000)
        return() => {
            clearInterval(timeout)
        }
    }, [width, offset, maxLength])

    return (
        <>
            <div className={'container-color container-carousel container-slider'}>
                <img className={s.sliderImg} src={sliderImg} alt=""/>
                <ArrowLeft offset={offset} width={width} setWidth={setWidth}/>
                <div className={`${s.contain} container`}  >
                    {Object.values(slider).map((el) => {
                        return (
                            <div className={s.slider} ref={ref} key={nanoid()} style={{
                                transform: `translateX(${width}px)`,
                            }}>
                                <h1 className={s.sliderName}>{el.name}</h1>
                                <p className={s.sliderText}>{el.text}</p>
                                <button className={s.signUp}>Записаться</button>
                            </div>

                        )
                    })}
                </div>
                <div className={s.dots}>
                    {[...Array(slider.length)].map((el, index) =>
                        <Dots
                            index={index}
                            offset={offset} width={width} setWidth={setWidth}
                            key={nanoid()}
                        />)}
                </div>
                <ArrowRight offset={offset} width={width} setWidth={setWidth}/>
            </div>
        </>
    )
}
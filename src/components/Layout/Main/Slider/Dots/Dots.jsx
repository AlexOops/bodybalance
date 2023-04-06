import s from './Dots.module.scss'
import {useState} from "react";

export const Dots = ({index, count, setCount}) => {
    const [active, setActive] = useState(false)

    const handleClick = () => {
        setCount(index)
    }

    return (
        <button onClick={handleClick} className={index === count ? `${s.dots} ${s.dotsActive}` : s.dots }></button>
    )
}
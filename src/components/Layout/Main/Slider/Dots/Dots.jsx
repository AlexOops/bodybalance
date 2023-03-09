import s from './Dots.module.scss'
import {useState} from "react";

export const Dots = () => {
    const [active, setActive] = useState(false)

    const handleClick = () => {
        setActive(!active)
    }

    return (
        <button onClick={handleClick} className={active ? `${s.dots} ${s.dotsActive}` : s.dots }></button>
    )
}
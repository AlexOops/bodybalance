import s from './Arrow.module.scss'
import arrow from "../../../assets/Vector.svg";
import {useEffect} from "react";

export const ArrowLeft = ({offset, setWidth, width}) => {

    const handleClick = () => {
        setWidth(width + offset)
    }

    return (
        <div onClick={handleClick} className={`${s.arrowBackground} ${s.arrowPositionLeft}`}>
            <button className={`${s.arrow} ${s.rotate}`}><img className={s.size} src={arrow} alt=""/></button>
        </div>
    )
}
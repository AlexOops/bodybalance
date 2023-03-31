import s from './Arrow.module.scss'
import arrow from "../../../assets/Vector.svg";

export const ArrowLeft = ({setCount}) => {

    const changeCount = () => {
        setCount(prev => prev - 1)
    }

    return (
        <div onClick={changeCount} className={`${s.arrowBackground} ${s.arrowPositionLeft}`}>
            <button className={`${s.arrow} ${s.rotate}`}><img className={s.size} src={arrow} alt=""/></button>
        </div>
    )
}
import s from './Arrow.module.scss'
import arrow from "../../../assets/Vector.svg";

export const ArrowRight = ({setCount}) => {

    const changeCount = () => {
        setCount(prev => prev + 1)
    }

    return (
        <div onClick={changeCount} className={ `${s.arrowBackground} ${s.arrowPositionRight}`}>
            <button className={`${s.arrow}`}><img className={s.size} src={arrow} alt=""/> </button>
        </div>
    )
}
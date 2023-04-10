import s from './Arrow.module.scss'
import arrow from "../../../assets/Vector.svg";

export const ArrowRight = ({setWidth, offset, width}) => {

    const handleClick = () => {
        setWidth(width - offset)
    }

    return (
        <div onClick={handleClick} className={ `${s.arrowBackground} ${s.arrowPositionRight}`}>
            <button className={`${s.arrow}`}><img className={s.size} src={arrow} alt=""/> </button>
        </div>
    )
}
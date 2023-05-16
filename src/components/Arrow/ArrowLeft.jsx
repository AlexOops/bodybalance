import s from './Arrow.module.scss'
import arrow from "../../assets/Vector.svg";

export const ArrowLeft = ({offset, setWidth, width}) => {

    const handleClick = () => {
        setWidth(width + offset)
    }

    return (
        <div style={{display: "inline-block"}}>
            <button className={`${s.arrow} ${s.rotate} ${s.arrowPositionLeft}`}
                    onClick={handleClick}
            >
                <img className={s.size} src={arrow} alt=""/>
            </button>
        </div>

    )
}
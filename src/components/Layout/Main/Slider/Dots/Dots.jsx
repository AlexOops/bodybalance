import s from './Dots.module.scss'

export const Dots = ({index, width, setWidth, offset}) => {

    const handleClick = () => {
        setWidth(index*-offset)
    }

    return (
        <button onClick={handleClick} className={index === -width/offset ? `${s.dots} ${s.dotsActive}` : s.dots }></button>
    )
}
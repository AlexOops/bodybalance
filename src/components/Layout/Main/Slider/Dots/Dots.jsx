import s from './Dots.module.scss'

export const Dots = ({index, count, setCount}) => {

    const handleClick = () => {
        setCount(index)
    }

    return (
        <button onClick={handleClick} className={index === count ? `${s.dots} ${s.dotsActive}` : s.dots }></button>
    )
}
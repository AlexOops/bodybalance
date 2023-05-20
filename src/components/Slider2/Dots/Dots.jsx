import s from './Dots.module.scss'

export const Dots = ({index, setSlideIndex}) => {


    return (
        <div className={s.dots} onClick={()=>setSlideIndex(index)}/>
    )
}
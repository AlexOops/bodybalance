import s from './Arrow.module.scss'

export const ArrowLeft = () => {
    return (
        <div className={ `${s.arrowBackground} ${s.arrowPositionLeft}`}>
           <button className={`${s.arrow} ${s.right}`}> > </button>
        </div>
    )
}
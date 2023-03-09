import s from './Arrow.module.scss'

export const ArrowRight = () => {
    return (
        <div className={ `${s.arrowBackground} ${s.arrowPositionRight}`}>
            <button className={`${s.arrow}`}> > </button>
        </div>
    )
}
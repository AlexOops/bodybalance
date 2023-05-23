import s from './TeamDoctor.module.scss'
import doctor_three from "../../../assets/doctor_3.png";

export const TeamDoctor = () => {
    return (
        <div className='container'>
            <div className={s.wrapper}>
                <div className={s.img}>
                    <img className={s.three} src={doctor_three} alt=""/>
                </div>
                <div className={s.description}>
                    <h2 className={s.name}>Команда профессиональных врачей</h2>
                    <p className={s.text}>Разнообразный и богатый опыт говорит нам, что экономическая повестка сегодняшнего дня однозначно определяет каждого участника как способного принимать собственные решения касаемо глубокомысленных рассуждений.</p>
                    <button className={s.button}>Посмотреть всех специалистов</button>
                </div>
            </div>
        </div>
    )
}
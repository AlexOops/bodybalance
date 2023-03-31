import s from './TeamDoctor.module.scss'
import doctor_one from "../../../../assets/doctor_1.png";
import doctor_two from "../../../../assets/doctor_2.png";
import doctor_three from "../../../../assets/doctor_3.png";

export const TeamDoctor = () => {
    return (
        <div className='container'>
            <div className={s.wrapper}>
                <div className={s.img}>
                    <img className={s.one} src={doctor_one} alt=""/>
                    <img className={s.two} src={doctor_two} alt=""/>
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
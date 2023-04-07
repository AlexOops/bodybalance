import s from './Specialists.module.scss'
import doctor from '../../../assets/doctor.png'
import doc from '../../../assets/doc.png'
import doc2 from '../../../assets/doc2.png'
import doc3 from '../../../assets/doc3.png'
import doc4 from '../../../assets/doc4.png'
import sertificate from '../../../assets/sertificate.png'
import logo from '../../../assets/logo-white.svg'
import {ArrowLeft} from "../Arrow/ArrowLeft";
import {ArrowRight} from "../Arrow/ArrowRight";
import {AppointmentForm} from "../../AppointmentForm/AppointmentForm";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchServices} from "../../../redux/slices/services";
import {nanoid} from "nanoid";

const arrDoc = [
    {
        img: doc,
        name: 'Алексей Петров',
        profession: 'Врач-реаниматолог'
    },
    {
        img: doc2,
        name: 'Алексей Макаров',
        profession: 'Массажист'
    },
    {
        img: doc3,
        name: 'Даниил Бутов',
        profession: 'Врач-реаниматолог'
    },
    {
        img: doc4,
        name: 'Михаил Красов',
        profession: 'Массажист'
    },
]
const sertific = [{img: sertificate},{img: sertificate},{img: sertificate},{img: sertificate}]

export const Specialists = () => {
    const dispatch = useDispatch();
    const {services} = useSelector(state => state.services);


    React.useEffect(() => {
        dispatch(fetchServices());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="container-color">
                <div className={s.main}>
                    <div className={s.description}>
                        <h1 className={s.title}>Специалисты</h1>
                        <p className={s.text}>Следует отметить, что постоянный количественный рост и сфера нашей
                            активности
                            прекрасно подходит для реализации форм воздействия.</p>
                    </div>
                    <div className={s.position}>
                        <div className={s.left}>
                            <div className={s.logo}>
                                <img src={logo} alt="logo"/>
                            </div>
                            <img src={doctor} alt="doctor"/>
                            <p className={s.nameSpecialist}>Дмитрий Бочарников</p>
                            <p className={s.profSpecialist}>Основатель реабилитационной клиники BodyBalance</p>
                        </div>
                        <div className={s.right}>
                            <h2 className={s.nameSection}>Команда профессиональных врачей</h2>
                            <p className={s.descriptionSpecialist}>Разнообразный и богатый опыт говорит нам, <br/> что
                                экономическая повестка сегодняшнего <br/> дня однозначно определяет каждого участника
                                каспособного
                                принимать собственные решения <br/> касаемо глубокомысленных рассуждений.</p>
                            <button className={s.button}>Посмотреть всех специалистов</button>
                        </div>
                    </div>
                </div>
                <div className={'container-carousel'}>
                    <div className={'container'}>
                    <div className={s.servicesTitleWrap}>
                        <h2 className={s.servicesTitle}>Наша команда</h2>
                    </div>
                    <ArrowLeft/>
                    <div className={`${s.positionDoc} container`}>
                        {arrDoc.map(person => {
                            return <div key={nanoid()} className={s.cardDoctor}>
                                <img src={person.img} alt="doc"/>
                                <p className={s.name}>{person.name}</p>
                                <p className={s.profession}>{person.profession}</p>
                            </div>
                        })}

                    </div>
                    <ArrowRight/>
                </div>
                </div>
            </div>
            <div className="container"><AppointmentForm name={'Быстрая запись к специалисту'}
                                                        services={services.items}/></div>
            <div className="container-color">
                <div className={s.servicesTitleWrap}>
                    <h2 className={s.servicesTitle}>Сертификаты наших специалистов</h2>
                </div>
                <div className={'container-carousel'}>
                    <ArrowLeft/>
                    <div className={`container ${s.positionDoc}`}>
                        {sertific.map(el => <div key={nanoid()}><img src={el.img} alt=""/></div>)}
                    </div>
                    <ArrowRight/>
                </div>
                <div className={s.magrin}></div>
            </div>
        </>
    )
}
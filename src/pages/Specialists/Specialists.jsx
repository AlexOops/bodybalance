import s from './Specialists.module.scss'
import doctor from '../../assets/doctor.png'
import doc from '../../assets/doc.png'
import doc2 from '../../assets/doc2.png'
import doc3 from '../../assets/doc3.png'
import doc4 from '../../assets/doc4.png'
import sertificate from '../../assets/sertificate.png'
import logo from '../../assets/logo-white.svg'
import {ArrowLeft} from "../../components/Arrow/ArrowLeft";
import {ArrowRight} from "../../components/Arrow/ArrowRight";
import {AppointmentForm} from "../../components/AppointmentForm/AppointmentForm";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchServices} from "../../redux/slices/services";
import {nanoid} from "nanoid";
import Recommendation from "../../components/Recommendation/Recommendation";
import {fetchEmployers} from "../../redux/slices/employers";
import Modal from "../../components/Modal/Modal"
import {Card} from "../../components/Card/Card";
import {openModal} from "../../redux/slices/modal";
import {Employer} from "../../components/Employer/Employer";

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
const sertific = [{img: sertificate}, {img: sertificate}, {img: sertificate}, {img: sertificate}]

export const Specialists = () => {
    const dispatch = useDispatch();
    const {services} = useSelector(state => state.services);
    const {employers} = useSelector(state => state.employers);
    const [card, setCard] = useState({});

    const openFullCard = (employer) => {
        setCard(employer);
        dispatch(openModal('modalService'));
    }


    React.useEffect(() => {
        dispatch(fetchServices());
        dispatch(fetchEmployers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(card);
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

                    <Recommendation
                        name={"Дмитрий Бочарников"}
                        profession={"Основатель реабилитационной клиники BodyBalance"}
                        title={"Команда профессиональных врачей"}
                        text={"Разнообразный и богатый опыт говорит нам, что " +
                            "   экономическая повестка сегодняшнего дня однозначно определяет каждого участника\n" +
                            "   каспособного\n" +
                            "   принимать собственные решения касаемо глубокомысленных рассуждений."}
                        button={"Посмотреть всех специалистов"}
                    />

                </div>
                <div className={'container-carousel'}>
                    <div className={'container'}>
                        <div className={s.servicesTitleWrap}>
                            <h2 className={s.servicesTitle}>Наша команда</h2>
                        </div>
                        <ArrowLeft/>
                        <div className={`${s.positionDoc} container`}>
                            {employers.items.map((person,key) => {
                                return <div key={`employer${key}`} className={s.cardDoctor} onClick={()=>openFullCard(person)}>
                                            <img src={`http://localhost:4444${person.imageUrl}`} alt="doc"/>
                                            <p className={s.name}>{person.user.fullName}</p>
                                            <p className={s.profession}>{person.profession}</p>
                                        </div>
                            })}
                        </div>
                        <ArrowRight/>
                        <Modal type={'modalService'}>
                            {card &&
                                <Employer isFull={true}
                                          id={card._id}
                                          imageUrl={(card.imageUrl) ?`http://localhost:4444${card.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                                          name={card.user?.fullName}
                                          profession={card.profession}
                                          description={card.description}
                                          text={card.text}
                                          certificates={card.certificates}
                                />}
                        </Modal>
                    </div>
                </div>
            </div>
            <div className="container">
                <AppointmentForm isSpecialist={true}
                    name={'Быстрая запись к специалисту'}
                    services={services.items}
                    employers={employers.items}
                />
            </div>
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
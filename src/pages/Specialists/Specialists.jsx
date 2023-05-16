import s from './Specialists.module.scss'
import sertificate from '../../assets/sertificate.png'
import {ArrowLeft} from "../../components/Arrow/ArrowLeft";
import {ArrowRight} from "../../components/Arrow/ArrowRight";
import {AppointmentForm} from "../../components/AppointmentForm/AppointmentForm";
import React, {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchServices} from "../../redux/slices/services";
import {nanoid} from "nanoid";
import Recommendation from "../../components/Recommendation/Recommendation";
import {fetchEmployers} from "../../redux/slices/employers";
import Modal from "../../components/Modal/Modal"
import {openModal} from "../../redux/slices/modal";
import {Employer} from "../../components/Employer/Employer";

const certificates = [{img: sertificate}, {img: sertificate}, {img: sertificate}, {img: sertificate}]

export const Specialists = () => {
    const dispatch = useDispatch();
    const {services} = useSelector(state => state.services);
    const {employers} = useSelector(state => state.employers);
    const [card, setCard] = useState({});
    const [certificateUrl, setCertificateUrl] = useState('');

    const openFullCard = (employer) => {
        setCard(employer);
        dispatch(openModal('modalService'));
    }
    const openEmployerCertificate = (doc) => {
        setCertificateUrl(doc);
        dispatch(openModal('modalGallery'));
    }

    const scrollToEmployers = () => {
        scrollToEmployersRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const scrollToRef = useRef();
    const scrollToEmployersRef = useRef();
    const clickCardButton = () => {
        scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    React.useEffect(() => {
        dispatch(fetchServices());
        dispatch(fetchEmployers());
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

                    <Recommendation
                        name={"Дмитрий Бочарников"}
                        profession={"Основатель реабилитационной клиники BodyBalance"}
                        title={"Команда профессиональных врачей"}
                        text={"Разнообразный и богатый опыт говорит нам, что " +
                            "   экономическая повестка сегодняшнего дня однозначно определяет каждого участника\n" +
                            "   каспособного\n" +
                            "   принимать собственные решения касаемо глубокомысленных рассуждений."}
                        button={"Посмотреть всех специалистов"}
                        clickHandle={scrollToEmployers}
                    />

                </div>
                <div className={'container-carousel'}>
                        <div className={'flexRelative'}>
                        <div className={s.servicesTitleWrap}>
                            <h2 className={s.servicesTitle} ref={scrollToEmployersRef}>Наша команда</h2>
                        </div>

                        <div className={`${s.positionDoc}`}>
                            <ArrowLeft/>
                            {employers.items.map((person, key) => {
                                return <div className={s.cardRow} onClick={() => openFullCard(person)} key={'employer'+person._id}>
                                    <Employer
                                        id={person._id}
                                        imageUrl={(person.imageUrl) ? `http://localhost:4444${person.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                                        name={person.user?.fullName}
                                        profession={person.profession}
                                        description={person.description}
                                        text={person.text}
                                        certificates={person.certificates}
                                        openImageFromParent={openEmployerCertificate}
                                    />
                                </div>
                            })}
                            <ArrowRight/>
                        </div>

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
                                          handleAction={clickCardButton}
                                          openImageFromParent={openEmployerCertificate}
                                />}
                        </Modal>
                        <Modal type={'modalGallery'}>
                            <div className={s.modalGallery}>
                                <img src={`http://localhost:4444${certificateUrl}`} alt="сертификат"/>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
            <div className="container"  ref={scrollToRef}>
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
                        {certificates.map(el => <div key={nanoid()}><img src={el.img} alt=""/></div>)}
                    </div>
                    <ArrowRight/>
                </div>

            </div>
        </>
    )
}
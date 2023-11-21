import s from './Specialists.module.scss'
import certificate from '../../assets/sertificate.png'
import {AppointmentForm} from "../../components/AppointmentForm/AppointmentForm";
import React, {useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "nanoid";
import {Recommendation} from "../../components/Recommendation/Recommendation";
import {fetchEmployers} from "../../redux/slices/employers";
import Modal from "../../components/Modal/Modal"
import {openModal} from "../../redux/slices/modal";
import {Employer} from "../../components/Employer/Employer";
import Carousel from "../../components/Carousel/Carousel";
import DmitryBocharnikov from '../../assets/doc/DmitryBocharnikov.jpg'
import {Circles} from "../../components/Circles/Circles";

const certificates = [{img: certificate}, {img: certificate}, {img: certificate}, {img: certificate}, {img: certificate}]

export const Specialists = () => {
    const dispatch = useDispatch();
    const {services} = useSelector(state => state.services);
    const {employers} = useSelector(state => state.employers);
    const [card, setCard] = useState({});
    const [certificateUrl, setCertificateUrl] = useState('');

    const openFullCard = (employer) => {
        setCard(employer);
        dispatch(openModal('modalEmployer'));
    }

    const openEmployerCertificate = (doc) => {
        setCertificateUrl(doc);
        dispatch(openModal('modalGallery'));
    }

    const scrollToEmployers = () => {
        scrollToEmployersRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    const scrollToRef = useRef();
    const scrollToEmployersRef = useRef();
    const clickCardButton = () => {
        scrollToRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    useEffect(() => {
        dispatch(fetchEmployers());
    }, [dispatch]);

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
                        avatar={DmitryBocharnikov}
                    />

                </div>
                <div className={'container-carousel'}>
                    <div className={'flexRelative'}>
                        <div className={s.servicesTitleWrap}>
                            <h2 className={s.servicesTitle} ref={scrollToEmployersRef}>Наша команда</h2>
                        </div>

                        <div className={`${s.positionDoc}`}>

                            <Carousel show={4}>

                                {employers.items.map((employer, idx) => {

                                    return <div className={s.cardRow}
                                                key={idx}
                                                onClick={() => openFullCard(employer)}>

                                        <Employer
                                            id={employer._id}
                                            imageUrl={(employer.avatarUrl) ? `${process.env.REACT_APP_API_URI}${employer.avatarUrl}` :
                                                `${process.env.REACT_APP_API_URI}/uploads/default_service.png`}
                                            name={employer.fullName}
                                            profession={employer.employer.profession}
                                            description={employer.employer.description}
                                            achievements={employer.employer.achievements}
                                            certificates={employer.employer.certificates}
                                            openImageFromParent={openEmployerCertificate}
                                        />
                                    </div>
                                })}

                            </Carousel>
                        </div>

                        <Modal type={'modalEmployer'}>
                            {card.employer &&
                                <Employer isFull={true}
                                          id={card._id}

                                          imageUrl={card.avatarUrl ?
                                              `${process.env.REACT_APP_API_URI}${card.avatarUrl}` :
                                              `${process.env.REACT_APP_API_URI}/uploads/default_service.png`}
                                          name={card.fullName}
                                          profession={card.employer.profession}
                                          description={card.employer.description}
                                          achievements={card.employer.achievements}
                                          certificates={card.employer.certificates}
                                          handleAction={clickCardButton}
                                          openImageFromParent={openEmployerCertificate}
                                />}
                        </Modal>
                        <Modal type={'modalGallery'}>
                            <div className={s.modalGallery}>
                                <img src={certificateUrl ? `${process.env.REACT_APP_API_URI}${certificateUrl}` : ""}
                                     alt="сертификат"/>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
            <div className="container" ref={scrollToRef}>

                <AppointmentForm
                    isSpecialist={true}
                    name={'Быстрая запись к специалисту'}
                    services={services.items}
                    employers={employers.items}
                    source_name={'specialists'}
                />

                <Circles smallSize={270} smallAxisX={-140} smallAxisY={170}
                         bigSize={420} bigAxisX={-90} bigAxisY={215}/>

                <Circles smallSize={345} smallAxisX={945} smallAxisY={220}
                         bigSize={530} bigAxisX={1020} bigAxisY={-40}/>

            </div>
            <div className="container-color">
                <div className={s.servicesTitleWrap}>
                    <h2 className={s.servicesTitle}>Сертификаты наших специалистов</h2>
                </div>
                <div className={'container-carousel container-slider'}>
                    <div style={{marginTop: 64}}>

                        <Carousel show={4}>
                            {certificates.map(el =>
                                <div key={nanoid()}>
                                    <div style={{padding: 8}}>
                                        <img src={el.img} alt="" style={{width: '100%'}}/>
                                    </div>
                                </div>
                            )}
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    )
}
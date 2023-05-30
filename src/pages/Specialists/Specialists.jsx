import s from './Specialists.module.scss'
import sertificate from '../../assets/sertificate.png'
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
import Carousel from "../../components/Carousel/Carousel";

const certificates = [{img: sertificate}, {img: sertificate}, {img: sertificate}, {img: sertificate}, {img: sertificate}]

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
        scrollToEmployersRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    const scrollToRef = useRef();
    const scrollToEmployersRef = useRef();
    const clickCardButton = () => {
        scrollToRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
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
                            <Carousel show={4}>
                            {employers.items.map((person, key) => {
                                return <div className={s.cardRow} onClick={() => openFullCard(person)}
                                            key={'employer' + person._id}>
                                    <Employer
                                        id={person._id}
                                        imageUrl={(person.employer.imageUrl) ? `http://localhost:4444${person.employer.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                                        name={person.fullName}
                                        profession={person.employer.profession}
                                        description={person.employer.description}
                                        text={person.employer.text}
                                        certificates={person.employer.certificates}
                                        openImageFromParent={openEmployerCertificate}
                                    />
                                </div>
                            })}
                            </Carousel>
                        </div>

                        <Modal type={'modalService'}>
                            {card.employer &&
                                <Employer isFull={true}
                                          id={card._id}
                                          imageUrl={(card.employer.imageUrl) ? `http://localhost:4444${card.employer.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                                          name={card.fullName}
                                          profession={card.employer.profession}
                                          description={card.employer.description}
                                          text={card.employer.text}
                                          certificates={card.employer.certificates}
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
            <div className="container" ref={scrollToRef}>
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
                <div className={'container-carousel container-slider'}>
                    <div style={{marginTop: 64}}>

                        <Carousel show={4}>

                            {/*<img src="https://via.placeholder.com/1600x300" alt="placeholder" />*/}
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
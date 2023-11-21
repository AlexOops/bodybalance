import React, {useEffect, useRef, useState} from 'react';
import s from "./OnlineRehabilitation.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../../redux/slices/modal";
import {fetchOnlineServices} from "../../redux/slices/onlineRehabilitation"
import {Card} from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import {Recommendation} from "../../components/Recommendation/Recommendation";
import {AppointmentForm} from "../../components/AppointmentForm/AppointmentForm";
import AlexMitkin from "../../assets/doc/AlexMitkin.JPG";
import {Circles} from "../../components/Circles/Circles";

export const OnlineRehabilitation = () => {

    const dispatch = useDispatch();
    const onlineServiceList = useSelector((state) => state.onlineServices.onlineServices);
    const isOnlineServiceListLoading = onlineServiceList.status === 'loading';
    const [service, setService] = useState({});

    const scrollToRef = useRef();
    const cardAction = () => {
        scrollToRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    const setModal = (event, obj) => {
        setService(obj);
        dispatch(openModal('modalService'));
    }

    useEffect(() => {
        dispatch(fetchOnlineServices());
    }, [dispatch]);

    return (
        <>
            <div className={'container-color'}>
                <div className={'container'}>
                    <div className={s.header}>
                        <p className={s.title}>Онлайн-реабилитация</p>
                        <p className={s.text}>Онлайн-реабилитация – удалённо консультироваться у
                            врача и заниматься с физическим терапевтом. Это
                            особенно будет полезно пациентам, которые вернулись домой после реабилитации в стационаре,
                            хотят сохранить результаты и добиться новых целей в восстановлении.</p>
                    </div>

                    <Recommendation
                        name={"Александр Митькин"}
                        profession={"Врач - невролог реабилитолог"}
                        title={"наш профессионал"}
                        text={`
                            Специализируюсь на диагностике и лечении острого и хронического болевого синдрома 
                            (головная боль, боль в шее и спине, миофасциальный болевой синдром, невропатическая боль и тд).
                            Нестандартный подход к лечению болевого синдрома, не ограниченный фармакологической терапией.
                            Имею большой опыт по профилю спортивной медицины, кинезио и мануальной терапии.`
                        }
                        button={"Записаться на прием"}
                        clickHandle={cardAction}
                        avatar={AlexMitkin}
                    />

                    <div className={s.services}>
                        <div className={s.servicesTitleWrap}>
                            <h2 className={s.servicesTitle}>Онлайн-программы</h2>
                        </div>
                        {
                            (isOnlineServiceListLoading ? [...Array(3)] : onlineServiceList.items)?.map((item, idx) =>

                                isOnlineServiceListLoading ? (
                                    <div key={idx}>
                                        <Card key={idx} isLoading={true}/>
                                    </div>
                                ) : (
                                    <div key={idx} onClick={(event) => setModal(event, item)}>
                                        <Card
                                            id={item._id}
                                            name={item.name}
                                            description={item.description}
                                            recommendations={item.text}
                                            imageUrl={(item.imageUrl) ? `http://localhost:4444${item.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                                        />
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="container" ref={scrollToRef}>
                <AppointmentForm
                    name={'Быстрая запись'}
                    services={onlineServiceList.items}
                    source_name={'rehabilitation'}
                />

                <Circles smallSize={270} smallAxisX={-140} smallAxisY={170}
                         bigSize={420} bigAxisX={-90} bigAxisY={215}/>

                <Circles smallSize={345} smallAxisX={945} smallAxisY={220}
                         bigSize={530} bigAxisX={1020} bigAxisY={-40}/>

            </div>

            <Modal type='modalService'>
                <Card
                    isFull={true}
                    id={service._id}
                    name={service.name}
                    imageUrl={(service.imageUrl) ? `http://localhost:4444${service.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                    description={service.description}
                    recommendations={service.text}
                    handleAction={cardAction}
                />
            </Modal>
        </>
    );
}
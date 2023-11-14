import React, {useEffect, useRef, useState} from 'react';
import s from "./OnlineRehabilitation.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../../redux/slices/modal";
import {fetchOnlineServices} from "../../redux/slices/onlineRehabilitation"
import {Card} from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import {Recommendation} from "../../components/Recommendation/Recommendation";
import {AppointmentForm} from "../../components/AppointmentForm/AppointmentForm";


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
                        text={"Онлайн-реабилитация — лучшее решение для тех, кого\n" +
                            "  беспокоит травма, но нет возможности лично посетить реабилитолога. Наши специалисты\n" +
                            "  помогут вам восстановиться после травмы, избавиться от боли в спине и суставах и как\n" +
                            "  можно скорее вернуться в спорт."}
                        button={"Записаться на прием"}
                    />

                    <div className={s.services}>
                        <div className={s.servicesTitleWrap}>
                            <h2 className={s.servicesTitle}>Онлайн-программы</h2>
                        </div>
                        {(isOnlineServiceListLoading ? [...Array(3)] : onlineServiceList.items)?.map((item, idx) =>
                            isOnlineServiceListLoading
                                ? (<div key={idx}>
                                        <Card key={idx} isLoading={true}/>
                                    </div>
                                )
                                : (
                                    <div key={idx} onClick={(event) => setModal(event, item)}>
                                        <Card
                                            id={item._id}
                                            price={item.price}
                                            name={item.name}
                                            description={item.description}
                                            text={item.text}
                                            imageUrl={(item.imageUrl) ? `http://localhost:4444${item.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                                        />
                                    </div>
                                )
                        )}
                    </div>
                </div>
            </div>

            <div className="container" ref={scrollToRef}>
                <AppointmentForm
                    name={'Быстрая запись'}
                    services={onlineServiceList.items}
                    source_name={'rehabilitation'}
                />
            </div>

            <Modal type='modalService'>
                <Card
                    isFull={true}
                    id={service._id}
                    name={service.name}
                    description={service.description}
                    text={service.text}
                    handleAction={cardAction}
                />
            </Modal>
        </>
    );
}
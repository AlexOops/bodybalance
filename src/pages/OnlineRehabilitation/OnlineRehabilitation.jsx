import React from 'react';
import s from "./OnlineRehabilitation.module.scss"
import Recommendation from "../../components/Recommendation/Recommendation";
import {AppointmentForm} from "../../components/AppointmentForm/AppointmentForm";
import service1 from "../../assets/img-service.png"
import card_img from "../../assets/rectangle33.jpg"
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../../redux/slices/modal";

export const OnlineRehabilitation = () => {

    const onlineServiceList = [
        {
            name: "Онлайн-консультация",
            description: "Составление индивидуального комплекса терапевтических упражнений для выполнения в домашних условиях",
            treatment: [
                {
                    name: "От боли в спине",
                },
                {
                    name: "Восстановление после травме",
                },
                {
                    name: "Восстановление после операции",
                },

            ]
        },
        {
            name: "Индивидуальная",
            description: "Составление индивидуального комплекса терапевтических упражнений для выполнения в домашних условиях",
            treatment: [
                {
                    name: "От боли в спине",
                },
                {
                    name: "Восстановление после травме",
                },
                {
                    name: "Восстановление после операции",
                },

            ]
        },
        {
            name: "Со специалистом",
            description: "Составление индивидуального комплекса терапевтических упражнений для выполнения в домашних условиях",
            treatment: [
                {
                    name: "От боли в спине",
                },
                {
                    name: "Восстановление после травме",
                },
                {
                    name: "Восстановление после операции",
                },

            ]
        }
    ]

    const {services} = useSelector(state => state.services);
    const dispatch = useDispatch()

    const setModal = (event, item) => {

        dispatch(openModal(
            <div className={s.modal}>
                <img className={s.modalImage} src={card_img} alt=""/>
                <div className={s.modalContent}>
                    <p className={s.modalTitle}>{item.name}</p>
                    <p className={s.modalDescription}>{item.description}</p>
                    <p className={s.modalCaption}>Данный комплекс отличнно подойдет при:</p>
                    {item.treatment.map((treatment, idx) => {
                        return (
                            <div className={s.modalPoints} key={idx}>
                                <p className={s.modalPointsText} key={idx}>{treatment.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        ));
    }

    return (
        <div>
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
                        {
                            onlineServiceList.map((item, idx) => {
                                return (
                                    <div className={s.card} key={idx} onClick={(event) => setModal(event, item)}>
                                        <div className={s.center}>
                                            <img src={service1} width={180} height={180} alt=""/>
                                            <h3 className={s.title}>
                                                {item.name}
                                            </h3>
                                        </div>

                                        {item.treatment.map((treatment, idx) => {
                                            return (
                                                <div className={s.direction} key={idx}>
                                                    <div className={s.circle}></div>
                                                    <p key={idx}>
                                                        {treatment.name}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="container">
                <AppointmentForm
                    name={'Быстрая запись'}
                    services={services.items}
                />
            </div>

        </div>
    );
};
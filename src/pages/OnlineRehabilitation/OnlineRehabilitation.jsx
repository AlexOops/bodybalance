import React, {useEffect} from 'react';
import s from "./OnlineRehabilitation.module.scss"
import Recommendation from "../../components/Recommendation/Recommendation";
import service1 from "../../assets/img-service.png"
import {useDispatch, useSelector} from "react-redux";
import {fetchOnlineServices} from "../../redux/slices/onlineRehabilitation"
import {Card} from "../../components/Card/Card";

export const OnlineRehabilitation = () => {

    const dispatch = useDispatch();
    const onlineServiceList = useSelector((state) => state.onlineServices.onlineServices.items);

    const isOnlineServiceListLoading = onlineServiceList.status === 'loading';

    useEffect(() => {
        dispatch(fetchOnlineServices());
    }, [dispatch]);

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
                            (isOnlineServiceListLoading ? [...Array(3)] : onlineServiceList)?.map((item, idx) => {
                                    return (isOnlineServiceListLoading
                                        ? (<div className={s.card} key={idx}>
                                                <Card key={idx} isLoading={true}/>
                                            </div>
                                        )
                                        : (
                                            <div className={s.card} key={idx}>
                                                <div className={s.center}>
                                                    <img src={service1} width={180} height={180} alt=""/>
                                                    <h3 className={s.title}>
                                                        {item.name}
                                                    </h3>
                                                    {
                                                        item.treatment.map((item, idx) => {
                                                            return (
                                                                <div key={idx}>
                                                                    <div className={s.direction} key={idx}>
                                                                        <div className={s.circle}></div>
                                                                        <p>
                                                                            {item}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            </div>
                                        ))
                                }
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
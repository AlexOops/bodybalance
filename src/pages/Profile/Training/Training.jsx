import React, {useEffect, useState} from 'react';
import s from "./Training.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchTraining} from "../../../redux/slices/training";
import training_1 from "../../../assets/training_1.png";
import play_item from "../../../assets/play_item.svg";
import {VideoPlaylist} from "../../../components/Training/VideoPlaylist/VideoPlaylist";

export const Training = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.data);
    const {patients} = useSelector(state => state.patients);
    const {training: videoCatalog} = useSelector(state => state.training);

    useEffect(() => {
        dispatch(fetchTraining());
    }, [dispatch])

    const patientData = patients && patients.items ? patients.items.find((patient) => patient.userId === user._id) : null;

    const trainingCatalog = patientData && patientData.catalogVideoId
        ? videoCatalog.items.find((catalog) => catalog._id === patientData.catalogVideoId)
        : null;

    const [selectedCatalog, setSelectedCatalog] = useState(null);

    const handleCatalogClick = (catalog) => setSelectedCatalog(catalog);

    return (
        <>
            <h1 className={s.title}> Мои тренировки</h1>


                <div className={s.trainingList}>

                    {
                        selectedCatalog ?

                            (
                                <VideoPlaylist trainingCatalog={selectedCatalog}/>

                            ) : (

                                <div className={s.trainingList}>

                                    <div className={s.content}>
                                        <div className={s.text}>В разделе с тренировками вы можете найти комплексы упражнений, специально
                                            разработанные для лечения суставов и реабилитации. Эти упражнения помогут вам укрепить
                                            суставы, улучшить их гибкость и мобильность, а также снять боль и восстановить
                                            функциональность.
                                        </div>

                                    </div>

                                    {
                                        trainingCatalog ?

                                            (
                                                <div className={s.trainingItem}
                                                     onClick={() => handleCatalogClick(trainingCatalog)}>
                                                    <img src={training_1} alt="trn1"/>
                                                    <div className={s.trainingItemWrp}>
                                                        <p className={s.trainingItemText}>{trainingCatalog.name}</p>
                                                        <img src={play_item}
                                                             className={s.trainingItemImg}
                                                             alt="play"
                                                             width={36}
                                                             height={36}/>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className={s.message}>Вам еще не открыт доступ!</span>
                                            )
                                    }

                                </div>
                            )
                    }


            </div>
        </>
    );
};
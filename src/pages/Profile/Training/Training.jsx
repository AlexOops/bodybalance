import React, {useEffect, useState} from 'react';
import s from "./Training.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchTraining} from "../../../redux/slices/training";
import training_1 from "../../../assets/training_1.png";
import {VideoPlaylist} from "../../../components/Training/VideoPlaylist/VideoPlaylist";

export const Training = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.data);
    const {patients} = useSelector(state => state.patients);
    const {training: videoCatalog} = useSelector(state => state.training);

    useEffect(() => {
        dispatch(fetchTraining());
    }, [dispatch]);

    const patientData = patients && patients.items ? patients.items.find((patient) => patient.userId === user._id) : null;

    const trainingCatalog = patientData && patientData.catalogVideoId
        ? videoCatalog.items.find((catalog) => catalog._id === patientData.catalogVideoId)
        : null;

    const [selectedCatalog, setSelectedCatalog] = useState(null);

    const handleCatalogClick = (catalog) => setSelectedCatalog(catalog);

    return (
        <div className={s.container}>

            {
                selectedCatalog ?

                    (
                        <VideoPlaylist trainingCatalog={selectedCatalog}/>

                    ) : (

                        <div className={s.block}>

                            <h1 className={s.title}>Мои тренировки</h1>

                            <div className={s.text}>
                                В разделе с тренировками вы можете найти комплексы упражнений, специально
                                разработанные для лечения суставов и реабилитации. Эти упражнения помогут вам
                                укрепить суставы, улучшить их гибкость и мобильность, а также снять боль и восстановить
                                функциональность.
                            </div>

                            {
                                trainingCatalog ? (

                                    <div className={s.item} onClick={() => handleCatalogClick(trainingCatalog)}>
                                        <img
                                            className={s.itemImage}
                                            src={(trainingCatalog.imageUrl) ? `http://localhost:4444${trainingCatalog.imageUrl}` : training_1}
                                            alt="trn1"/>

                                        <div className={s.itemContent}>
                                            <p className={s.itemText}>{trainingCatalog.name}</p>

                                            <div className={s.play}></div>

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
    );
};
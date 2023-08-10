import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTraining, setDescription, setName} from "../../redux/slices/training";
import s from "./Training.module.scss";
import training_1 from "../../assets/training_1.png";
import play_item from "../../assets/play_item.svg";
import {Link} from "react-router-dom";
import {fetchPatientCards} from "../../redux/slices/patientCard";

export const Training = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.data);
    const {patients} = useSelector(state => state.patients);
    const {training: videoCatalog} = useSelector(state => state.training);

    const patientData = patients.items.find((patient) => patient.userId === user._id);

    const trainingCatalog = patientData && patientData.catalogVideoId
        ? videoCatalog.items.find((catalog) => catalog._id === patientData.catalogVideoId)
        : null;

    useEffect(() => {
        dispatch(fetchPatientCards())
        dispatch(fetchTraining());
    }, [dispatch])

    const handleClick = (name, description) => {
        dispatch(setName(name));
        dispatch(setDescription(description));

        localStorage.setItem('name', name);
        localStorage.setItem('description', description);
    }

    return (
        <div className={s.trainingList}>

            {trainingCatalog ?
                (
                    <Link to={`/profile/training/${patientData.catalogVideoId}`}
                          onClick={() => handleClick(trainingCatalog.name, trainingCatalog.description)}
                    >
                        <div className={s.trainingItem}>
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
                    </Link>
                ) : (
                    <span className={s.message}>Раздел к тренировкам закрыт!</span>
                )
            }
        </div>
    );
};
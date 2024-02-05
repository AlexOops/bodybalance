import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTraining} from "../../../redux/slices/training";
import {openModal} from "../../../redux/slices/modal";
import s from "./Training.module.scss";
import Modal from "../../../components/Modal/Modal";
import {CreateTraining} from "../../../components/Admin/CreateTraining/CreateTraining";
import {Training as TrainingItem} from "../../../components/Admin/Training/Training"
import axios from "../../../axios";
import CustomAvatar from "../../../components/Images/CustomAvatar/CustomAvatar";

export const Training = () => {

    const dispatch = useDispatch();
    const {training} = useSelector(state => state.training);
    const [selectedCatalog, setSelectedCatalog] = useState(null);
    const isTrainingLoading = training.status === 'loading';

    const [message, setMessage] = useState('');

    useEffect(() => {
        dispatch(fetchTraining());
    }, [dispatch])

    const handleOpenModalForAddNewTrainingCatalog = (e) => {
        e.preventDefault();

        dispatch(openModal('modalNewCatalog'));
    }

    const handleOpenTraining = (e, catalog) => {
        e.preventDefault();

        setSelectedCatalog(catalog);
        dispatch(openModal('modalOpenCatalog'));
    }

    const handleSubmitToRemove = async (e, id) => {
        e.stopPropagation(); // предотвращаем всплытие

        const response = await axios.delete(`/admin/training/${id}`);

        if (response.data.success) {

            setMessage(response.data.message);

            dispatch(fetchTraining());

        } else {
            setMessage(response.data.message);
        }
    }

    const handleUpdatedCatalogs = () => {
        dispatch(fetchTraining());
    }

    return (
        <>
            <h4>Каталог видео тренировок</h4>

            <div className={s.controlBar}>
                <button className={'adminButton'} onClick={(e) => handleOpenModalForAddNewTrainingCatalog(e)}>
                    Создать каталог
                </button>

                <Modal type={'modalNewCatalog'}>
                    <CreateTraining/>
                </Modal>
            </div>

            <div className={s.container}>
                {
                    isTrainingLoading ? 'Загрузка каталога тренировок...'

                        : training.items?.map((catalog) =>

                            <div className={s.card} key={catalog._id} onClick={(e) => handleOpenTraining(e, catalog)}>

                                <div className="remove"
                                     onClick={(e) => handleSubmitToRemove(e, catalog._id)}>
                                </div>

                                <div className={s.avatar}>
                                    <CustomAvatar avatarUrl={catalog.imageUrl}
                                                  fullName={catalog.name} size={'100px'}/>
                                </div>

                                <div className={s.name}>{catalog.name}</div>
                                <div className={s.category}>{catalog.category}</div>

                            </div>
                        )
                }

                <Modal type={"modalOpenCatalog"}>
                    <TrainingItem catalog={selectedCatalog} handleUpdatedCatalog={handleUpdatedCatalogs}/>
                </Modal>
            </div>
        </>
    );
};
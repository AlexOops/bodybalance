import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Select from "react-select";
import s from './patient.module.scss';
import axios from "../../../axios";
import CustomAvatar from "../../Images/CustomAvatar/CustomAvatar";
import {CustomSelect} from "../../CustomSelect/CustomSelect";

export const Patient = ({patientCard, customer, employer, catalogVideo}) => {

    const {employers} = useSelector(state => state.employers);
    const {training: videoCatalog} = useSelector(state => state.training);

    const [selectedEmployer, setSelectedEmployer] = useState(null);
    const [selectedVideoCatalog, setSelectedVideoCatalog] = useState(null);
    const [selectedRecommendations, setSelectedRecommendations] = useState('');

    useEffect(() => {
        if (employer) {
            setSelectedEmployer({value: patientCard.employerId, label: employer.fullName});
        }

        if (catalogVideo) {
            setSelectedVideoCatalog({value: patientCard.catalogVideoId, label: catalogVideo.name});
        }

        setSelectedRecommendations(patientCard.recommendations || '');

    }, [catalogVideo, employer, patientCard.catalogVideoId, patientCard.employerId, patientCard.recommendations])

    const handleEmployerChange = (selectedOption) => {
        setSelectedEmployer(selectedOption);
    };

    const handleVideoCatalogChange = (selectedOption) => {
        setSelectedVideoCatalog(selectedOption);
    };

    //ОБНОВЛЕНИЕ ДАННЫХ О ПАЦИЕНТЕ
    const handleSubmit = async () => {

        try {
            await axios.patch(`/admin/customers/${patientCard._id}`, {
                employerId: selectedEmployer?.value,
                catalogVideoId: selectedVideoCatalog?.value,
                recommendations: selectedRecommendations
            })

        } catch (e) {
            console.log(e, "Ошибка ввода данных!")
        }
    }

    return (
        <>
            <div className={s.card}>
                <h3 className={s.healthIdTitle}>Карточка пациента</h3>
                <CustomAvatar avatarUrl={customer.avatarUrl} fullName={customer.fullName} size={'150px'}/>
                <div className={s.healthIdName}>{customer.fullName}</div>
                <div className={s.healthIdEmail}><span>Почта: </span>{customer.email}</div>

                {customer.customerData.map(customer =>
                    <>
                        <div className={s.healthIdPhone}><span>Номер телефона: </span> {customer.phone}</div>
                        <div className={s.healthIdBirth}><span>Дата рождения: </span>{customer.dateOfBirth}</div>
                    </>)}

                <div className={s.healthIdWrp}>

                    <label className={s.label}>Лечащий врач: </label>

                    <CustomSelect
                        data={employers}
                        onChange={handleEmployerChange}
                        value={selectedEmployer}
                        placeholder={'Выберите врача...'}
                    />

                    <label className={`${s.label} ${s.labelTrening}`}>Раздел с тренировками: </label>

                    <CustomSelect
                        data={videoCatalog}
                        onChange={handleVideoCatalogChange}
                        value={selectedVideoCatalog}
                        placeholder={'Выберите каталог...'}
                    />

                    <label className={`${s.label} ${s.labelRecommendations}`}>Рекоммендации по лечению: </label>
                    <textarea className={s.recommendations}
                              value={selectedRecommendations}
                              onChange={(e) => setSelectedRecommendations(e.target.value)}
                    />

                    <button className={s.button} onClick={handleSubmit}>Сохранить</button>
                </div>
            </div>
        </>
    );
};
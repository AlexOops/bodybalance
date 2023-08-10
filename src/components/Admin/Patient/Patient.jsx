import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import s from './patient.module.scss';
import {fetchEmployers} from "../../../redux/slices/employers";
import {fetchTraining} from "../../../redux/slices/training";
import axios from "../../../axios";

export const Patient = ({patientCard, customer, employer, catalogVideo}) => {

    const dispatch = useDispatch();
    const {employers} = useSelector(state => state.employers);
    const {training: videoCatalog} = useSelector(state => state.training);

    const [selectedEmployer, setSelectedEmployer] = useState(null);
    const [selectedVideoCatalog, setSelectedVideoCatalog] = useState(null);
    const [selectedRecommendations, setSelectedRecommendations] = useState('');

    useEffect(() => {
        dispatch(fetchEmployers());
        dispatch(fetchTraining());
    }, [dispatch]);

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
            const response = await axios.patch(`/admin/customers/${patientCard._id}`, {
                employerId: selectedEmployer?.value,
                catalogVideoId: selectedVideoCatalog?.value,
                recommendations: selectedRecommendations
            })

            console.log(response.data)

        } catch (e) {
            console.log(e, "Ошибка ввода данных!")
        }
    }

    //ДЛЯ SELECT
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            maxWidth: '400px',
            border: '1px solid #d89ff6',
            boxShadow: state.isFocused ? '0 4px 4px rgb(216, 159, 246)' : 'none',
            borderRadius: '40px',
            padding: '8px',
            marginBottom: '5px',
            marginTop: '10px',
            outline: 'none',
            cursor: 'pointer'
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#AEAEAE',
            fontSize: '14px',
        }),
        menu: (provided) => ({
            ...provided,
            fontSize: '14px',
            borderRadius: '40px',
            marginTop: '0'
        })
    };

    const customOptionComponent = ({innerProps, label}) => (
        <div {...innerProps} style={{
            color: '#636363',
            fontSize: '16px',
            padding: '10px 0 10px 25px',
            cursor: 'pointer'
        }}>
            {label}
        </div>
    );

    return (
        <>
            <div className={s.card}>
                <div className={s.healthIdTitle}>Карточка пациента</div>
                <img className={s.healthIdImg} src={customer.avatarUrl} alt="customer"/>
                <div className={s.healthIdName}>{customer.fullName}</div>
                <div className={s.healthIdEmail}><span>Почта: </span>{customer.email}</div>
                <div className={s.healthIdPhone}>
                    <span>Номер телефона: </span>{(customer.customer) && customer.customer.phone}</div>
                <div className={s.healthIdBirth}><span>Дата рождения: </span>8 марта</div>

                <div className={s.healthIdWrp}>

                    <Select
                        placeholder={'Выберите врача...'}
                        styles={customStyles}
                        components={{
                            Option: customOptionComponent,
                        }}
                        options={employers.items.map(employer => ({
                            value: employer._id,
                            label: employer.fullName
                        }))}
                        onChange={handleEmployerChange}
                        value={selectedEmployer}
                    />

                    <Select
                        placeholder={'Выберите каталог...'}
                        styles={customStyles}
                        components={{
                            Option: customOptionComponent,
                        }}
                        options={videoCatalog.items.map(catalog => ({
                            value: catalog._id,
                            label: catalog.name
                        }))}
                        onChange={handleVideoCatalogChange}
                        value={selectedVideoCatalog}
                    />

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
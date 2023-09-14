import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchCustomers} from "../../../redux/slices/customers";
import s from './Customers.module.scss';
import Modal from "../../../components/Modal/Modal";
import {openModal} from "../../../redux/slices/modal";
import axios from "../../../axios";
import {fetchPatientCards, setPatientCard} from "../../../redux/slices/patientCard";
import {Patient} from "../../../components/Admin/Patient/Patient";
import {fetchEmployers} from "../../../redux/slices/employers";
import {fetchTraining} from "../../../redux/slices/training";
import CustomAvatar from "../../../components/Avatar/CustomAvatar/CustomAvatar";
import {SearchBar} from "../../../components/Admin/SearchBar/SearchBar";
import {CreatePatient} from "../../../components/Admin/CreatePatient/CreatePatient";

export const Customers = () => {

    const dispatch = useDispatch();
    const {customers} = useSelector(state => state.customers);
    const isCustomersLoading = customers.status === 'loading'; // boolean
    const {employers} = useSelector(state => state.employers);
    const {training: videoCatalog} = useSelector(state => state.training);
    const {patients} = useSelector(state => state.patients); //newPatient
    const [message, setMessage] = useState('');
    const [idRemoveCustomer, setIdRemoveCustomer] = useState('');

    useEffect(() => {
        dispatch(fetchPatientCards())
        dispatch(fetchEmployers());
        dispatch(fetchTraining());
        dispatch(fetchCustomers())
    }, [dispatch]);

    // ДОБАВЛЕНИЕ ВАРАЧА И КАТАЛОГА
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const employerForPatient = (employers, selectedPatient) => {
        return employers.items.find((employer) => employer._id === selectedPatient.employerId)
    }

    const videoCatalogForPatient = (videoCatalog, selectedPatient) => {
        return videoCatalog.items.find((catalog) => catalog._id === selectedPatient.catalogVideoId);
    };

    //ПРЕОБРАЗУЕМ ДАТУ
    const getDataStr = (date) => {

        const day = date.slice(8, 10);
        const month = date.slice(5, 7);
        const year = date.slice(0, 4);
        const time = date.slice(11, 16);

        return `${day}.${month}.${year} ${time}`;
    }

    //МОДАЛЬНОЕ
    const handleOpenCard = (event, customer) => {
        event.preventDefault();

        setSelectedPatient(patients.items.find((item) => item.userId === customer._id));
        setSelectedCustomer(customer);

        dispatch(openModal('modalCustomer'));
    }

    //ЗАПРОС НА КАРТОЧКУ ПАЦИЕНТА
    const handleCreateCard = async (customer) => {
        try {

            const patientCard = await axios.post('/admin/customers', {
                userId: customer._id
            })

            dispatch(setPatientCard({userId: customer._id, patientCard: patientCard.data}));
            setSelectedPatient(patientCard.data);

            // СДЕЛАТЬ СОСТОЯНИЕ ДЛЯ ХРАНЕНИЯ КАРТОЧКИ ЦЕЛИКОМ, ЧТОБЫ БЕЗ ПЕРЕЗАГРУЗКИ РАБОТАЛО

            dispatch(openModal('modalCustomer'));

            dispatch(fetchPatientCards());
            setSelectedPatient(null); // Сброс данных
        } catch (e) {
            console.log("Не удалось создать карточку пациента", e);
        }
    }

    // ПОИСК
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    //СОЗДАНИЕ НОВОГО ПАЦИЕНТА
    const handleOpenModalForAddNewUser = (e) => {
        e.preventDefault();

        dispatch(openModal('modalNewCustomer'));
    }

    //Удаление пациента user (не customer)
    const handleSubmitToRemove = (customer) => {
        setIdRemoveCustomer(customer._id)
        setMessage('');
        dispatch(openModal('modalMessage'));
    }

    const handleRemoveCustomer = async (id) => {
        const response = await axios.delete(`/admin/customers/removeCustomer/${id}`);

        if (response.data.success) {
            setMessage('Пациент успешно удален!');
            dispatch(fetchCustomers());
        } else {
            setMessage('Произошла ошибка при удалении пациента');
        }
    }

    return (
        <div>
            <h4>Пациенты</h4>

            <div className={s.controlBar}>
                <SearchBar onSearchChange={handleSearchChange}/>

                <button className={`${s.button} ${s.buttonAdd}`} onClick={(e) => handleOpenModalForAddNewUser(e)}>
                    + Добавить нового пациента
                </button>

                <Modal type={"modalNewCustomer"}>
                    <CreatePatient/>
                </Modal>

            </div>

            <div className={s.customers}>

                {isCustomersLoading ? 'Загрузка списка пациентов ...'

                    : customers.items.filter((customer) =>
                        customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        customer.customerData.some((data) =>
                            data.phone.includes(searchQuery)
                        )
                    )
                        .map((customer, idx) =>

                            <div className={s.customerCard} key={idx}>

                                <div className="remove"
                                     onClick={() => handleSubmitToRemove(customer)}>
                                </div>

                                <div className={s.profile}>

                                    <CustomAvatar avatarUrl={customer.avatarUrl}
                                                  fullName={customer.fullName}
                                                  size={'100px'}/>

                                    <div className={s.fullName}>{customer.fullName}</div>
                                </div>
                                <div className={s.contacts}>
                                    <div className={s.email}>{customer.email}</div>
                                    <div className={s.phone}>
                                        {customer.customerData && customer.customerData.length > 0 ? (
                                            customer.customerData.map((customer, idx) => (
                                                <div key={idx}>
                                                    {customer.phone}
                                                </div>
                                            ))
                                        ) : (
                                            <div> Не указан</div>
                                        )}

                                    </div>
                                </div>
                                <div className={s.createdData}>регистрация: {getDataStr(customer.createdAt)}</div>

                                {Array.isArray(patients.items) && patients.items.some((item) => item.userId === customer._id) ? (
                                    <button className={s.button}
                                            onClick={(event) => handleOpenCard(event, customer)}>Открыть
                                        карточку</button>
                                ) : (
                                    <button className={s.button} onClick={() => handleCreateCard(customer)}>Создать
                                        карточку</button>
                                )}
                            </div>
                        )
                }

                <Modal type={"modalMessage"}>

                    {
                        message
                            ?
                            <div className={s.message}>
                                {message}
                            </div>
                            :
                            <div className={s.confirm}>
                                Вы уверены, что хотите удалить пользователя ?
                                <button
                                    className={s.button}
                                    onClick={() => handleRemoveCustomer(idRemoveCustomer)}>
                                    Удалить
                                </button>
                            </div>
                    }

                </Modal>


                <Modal type='modalCustomer'>
                    {selectedPatient && selectedCustomer ?
                        <Patient
                            patientCard={selectedPatient}
                            customer={selectedCustomer}
                            employer={employerForPatient(employers, selectedPatient)}
                            catalogVideo={videoCatalogForPatient(videoCatalog, selectedPatient)}
                        />
                        :
                        <div className={s.message}>
                            Карточка пациента успешно создана!
                        </div>
                    }
                </Modal>
            </div>
        </div>
    )
}
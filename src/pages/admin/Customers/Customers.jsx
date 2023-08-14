import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchCustomers} from "../../../redux/slices/customers";
import s from './Customers.module.scss';
import Modal from "../../../components/Modal/Modal";
import {openModal} from "../../../redux/slices/modal";
import axios from "../../../axios";
import {fetchPatientCards, setPatientCard} from "../../../redux/slices/patientCard";
import {Patient} from "../../../components/Admin/Patient/Patient";
import {fetchEmployers} from "../../../redux/slices/employers";
import {fetchTraining} from "../../../redux/slices/training";
import CustomAvatar from "../../../components/Profile/CustomAvatar/CustomAvatar";
import {SearchBar} from "../../../components/Admin/SearchBar/SearchBar";

export const Customers = () => {

    const dispatch = useDispatch();
    const {customers} = useSelector(state => state.customers);
    const isCustomersLoading = customers.status === 'loading'; // boolean
    const {employers} = useSelector(state => state.employers);
    const {training: videoCatalog} = useSelector(state => state.training);
    const {patients} = useSelector(state => state.patients); //newPatient

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

        dispatch(openModal('modalService'));
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

            dispatch(openModal('modalService'));

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

    return (
        <div>
            <h4>Пациенты</h4>

            <SearchBar onSearchChange={handleSearchChange}/>

            <div className={s.customers}>

                {isCustomersLoading ? 'Загрузка списка клиентов ...'

                    : customers.items.filter((customer) =>
                        customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        customer.customerData.some((data) =>
                            data.phone.includes(searchQuery)
                        )
                    )
                        .map((customer, key) =>

                            <div className={s.customerCard} key={key}>

                                <div className={s.profile}>

                                    <CustomAvatar avatarUrl={customer.avatarUrl}
                                                  fullName={customer.fullName}
                                                  size={'100px'}/>

                                    <h2 className={s.title}>{customer.fullName}</h2>
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

                <Modal type='modalService'>
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
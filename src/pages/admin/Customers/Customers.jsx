import {useDispatch, useSelector} from "react-redux";
import formatDistance from 'date-fns/formatDistance'
import {useEffect} from "react";
import {fetchCustomers} from "../../../redux/slices/customers";
import s from './Customer.module.scss';
import iconPhone from '../../../assets/iconPhone.svg';
import iconEmail from '../../../assets/iconEmail.svg';
import {replace} from "formik";

export const Customers = () => {

    const dispatch = useDispatch();
    const {customers} = useSelector(state => state.customers);
    const isCustomersLoading = customers.status === 'loading'; // boolean
    console.log(customers);

    useEffect(() => {
        dispatch(fetchCustomers())
    }, []);

    const getDataDistanceStr = (date) => { //прошло время с даты регистрации
        const dateStr = date;
        const str = formatDistance(
            new Date(dateStr),
            new Date()
        );
        return str
    }

    const getDataStr = (date) => { //2023-05-26T14:36:58.150+00:00

        const day = date.slice(8,10);
        const month = date.slice(5,7);
        const year = date.slice(0,4);
        const time = date.slice(11,16);

        return `${day}.${month}.${year} ${time}`;
    }

    return (
        <div>
            <h2>Клиенты</h2>
            <div className={s.customers}>
            {isCustomersLoading ? 'Загрузка списка клиентов ...'
                : customers.items.map((customer, key) =>
                    <div className={s.customerCard} key={customer._id}>
                        <div className={s.profile}>
                            <img className={s.avatarUrl} src={customer.avatarUrl} alt=""/>
                            <h2 className={s.title}>{customer.fullName}</h2>
                        </div>
                        <div className={s.contacts}>
                            <div className={s.email}>
                                {customer.email}
                            </div>
                            {customer.customer &&
                            <div className={s.phone}>
                                {customer.customer.phone}
                            </div>
                            }
                        </div>
                        <div className={s.createdData}>регистрация: {getDataStr(customer.createdAt)}</div>
                        {/*{customer.customer &&*/}
                        {/*    <div>*/}
                        {/*        <h3>Анкетные данные</h3>*/}
                        {/*        <span>Имя: {customer.customer.firstName} </span>*/}
                        {/*        <span>Фамилия: {customer.customer.secondName} </span>*/}
                        {/*        {customer.customer.patronymic && <span>Отчество: {customer.customer.patronymic} </span>}*/}
                        {/*    </div>*/}
                        {/*}*/}
                    </div>)
            }
            </div>
        </div>

    )
}
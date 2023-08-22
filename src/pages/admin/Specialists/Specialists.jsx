import s from './Specialists.module.scss';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchEmployers} from "../../../redux/slices/employers";
import CustomAvatar from "../../../components/Profile/CustomAvatar/CustomAvatar";
import {openModal} from "../../../redux/slices/modal";
import Modal from "../../../components/Modal/Modal";
import {CreateEmployer} from "../../../components/Admin/CreateEmployer/CreateEmployer";
import axios from "../../../axios";

export const Specialists = () => {

    const dispatch = useDispatch();
    const {employers} = useSelector(state => state.employers);
    const isEmployersLoading = employers.status === 'loading';

    const [message, setMessage] = useState('');

    console.log(employers)

    useEffect(() => {
        dispatch(fetchEmployers())
    }, [dispatch]);

    //СОЗДАНИЕ НОВОГО СПЕЦИАЛИСТА
    const handleOpenModalForAddNewUser = (e) => {
        e.preventDefault();

        dispatch(openModal('modalNewEmployer'));
    }

    // УДАЛЕНИЕ СПЕЦИАЛИСТА
    const handleSubmitToRemove = async (id) => {
        const response = await axios.delete(`/admin/specialists/removeEmployer/${id}`);

        if (response.data.success) {
            setMessage('Специалист успешно удален!');
            dispatch(fetchEmployers());
        } else {
            setMessage('Произошла ошибка при удалении специалиста');
        }
    }

    return (
        <div>
            <h4>Специалисты</h4>

            <div className={s.controlBar}>
                <button className={s.button} onClick={(e) => handleOpenModalForAddNewUser(e)}>
                    Добавить нового специалиста
                </button>


                <Modal type={'modalNewEmployer'}>
                    <CreateEmployer/>
                </Modal>

            </div>

            <div className={s.container}>
                {
                    isEmployersLoading ? 'Загрузка списка врачей...'

                        : employers.items.map((employer, idx) =>

                            <div className={s.card} key={idx}>

                                <div className="remove"
                                     onClick={() => handleSubmitToRemove(employer.user._id)}>
                                </div>

                                <CustomAvatar avatarUrl={employer.user && employer.user.avatarUrl}
                                              fullName={employer.user && employer.user.fullName} size={'100px'}/>
                                <div className={s.fullName}>{employer.user && employer.user.fullName}</div>
                                <div className={s.profession}>{employer.profession}</div>
                                <div className={s.phone}>{employer.phone}</div>
                                <div className={s.email}>{employer.user.email}</div>

                            </div>
                        )
                }
            </div>
        </div>
    )
}
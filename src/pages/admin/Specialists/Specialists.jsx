import s from './Specialists.module.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchEmployers} from "../../../redux/slices/employers";
import CustomAvatar from "../../../components/Profile/CustomAvatar/CustomAvatar";

export const Specialists = () => {

    const dispatch = useDispatch();
    const {employers} = useSelector(state => state.employers);
    const isEmployersLoading = employers.status === 'loading';

    useEffect(() => {
        dispatch(fetchEmployers())
    }, [dispatch]);

    return (
        <div>
            <h4>Специалисты</h4>

            <div className={s.container}>
                {
                    isEmployersLoading ? 'Загрузка списка врачей...'

                        : employers.items.map((employer, idx) =>

                            <div className={s.card} key={idx}>
                                <CustomAvatar avatarUrl={employer.avatarUrl} fullName={employer.fullName} size={'100px'}/>
                                <div className={s.fullName}>{employer.fullName}</div>
                                <div className={s.profession}>{employer.employer.profession}</div>
                                <div className={s.email}>{employer.email}</div>
                            </div>
                        )
                }
            </div>
        </div>
    )
}
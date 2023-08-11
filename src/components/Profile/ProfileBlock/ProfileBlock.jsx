import React, {useEffect} from 'react';
import exit from "../../../assets/exit.svg";
import s from './ProfileBlock.module.scss';
import {logout} from "../../../redux/slices/auth";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import CustomAvatar from "../CustomAvatar/CustomAvatar";
import {fetchPatientCards} from "../../../redux/slices/patientCard";

const ProfileBlock = ({handleNavigate, redirectLabel}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.data);
    const uploadedAvatarUrl = useSelector((state) => state.patients.uploadedAvatarUrl);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPatientCards())
    }, [dispatch]);

    const onClickLogout = () => {
        if (window.confirm("Вы действительно хотите выйти?")) {
            dispatch(logout()); //обнулили данные в state auth
            window.localStorage.removeItem('token'); //удалили токен из localStorage
            navigate('/');
        }
    }

    return (
        <div className={s.profileWrp}>
            <div className={s.profile}>

                <CustomAvatar avatarUrl={uploadedAvatarUrl || user.avatarUrl } fullName={user.fullName} size={'60px'}/>

                <span className={s.profileRole}>{user.role}</span>
            </div>
            <div className={s.profile}>
                <p className={s.profileName}>{user.fullName}</p>

                <div className={s.linkToProfile} onClick={handleNavigate}>{redirectLabel}</div>
            </div>
            <img className={s.profileLogout} onClick={onClickLogout} src={exit} alt="logout"/>
        </div>
    );
};

export default ProfileBlock;
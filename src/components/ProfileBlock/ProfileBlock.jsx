import React from 'react';
import exit from "../../assets/exit.svg";
import s from './ProfileBlock.module.scss';
import {logout} from "../../redux/slices/auth";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const ProfileBlock = ({ handleNavigate, redirectLabel }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.data);
    const navigate = useNavigate();

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
                <img className={s.profileImg} src={user.avatarUrl} alt="avatar"/>
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
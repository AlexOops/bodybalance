import React, {useEffect, useState} from 'react';
import s from "./Employer.module.scss";
import {EditForm} from "./EditForm/EditForm";
import axios from "../../../axios";
import {ImageUploader} from "../../Images/ImageUploader/ImageUploader";
import CustomAvatar from "../../Images/CustomAvatar/CustomAvatar";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {ScheduleEmployer} from "../ScheduleEmployer/ScheduleEmployer";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {useSelector} from "react-redux";

export const Employer = ({employer, handleUpdatedUsers}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [employerData, setEmployerData] = useState({});
    const [avatarUrl, setAvatarUrl] = useState('');
    const [message, setMessage] = useState('');

    const {schedules} = useSelector(state => state.schedules);

    const schedulesEmployer = schedules.items.filter((schedule) => schedule.employerId === employer?.employer?._id);

    useEffect(() => {
        setEmployerData(employer);
    }, [employer]);

    const handleSaveClick = async (updatedData) => {

        try {
            const userId = employer._id;

            const response = await axios.patch(`/admin/specialists/updateEmployer/${userId}`, updatedData);

            setEmployerData(updatedData);

            handleUpdatedUsers(); // обновляем в родителе

            setMessage(response.body.message); //доделать сообщения ?????

        } catch (e) {
            setMessage('Не удалось обновить данные!', e);
        }

        setIsEditing(false);
    }

    const handleCancelClick = () => {

        setIsEditing(false);
    }

    const onClickEditing = () => {

        setIsEditing(true);
    }

    const handleUploadedAvatarUrl = (updatedAvatarUrl) => {
        setAvatarUrl(updatedAvatarUrl);

        handleUpdatedUsers(); // обновляем в родителе
    }

    return (
        <div className={s.block}>
            <h3 className={s.title}>Карточка сотрудника</h3>

            {employerData && employerData.employer ? (

                <div className={s.container}>

                    <div className={s.card}>

                        <div className={s.avatar}>
                            <CustomAvatar avatarUrl={avatarUrl ? avatarUrl : employerData.avatarUrl}
                                          fullName={employerData.fullName} size={'100px'}/>

                            <ImageUploader uploadUrl={`/profile/updateAvatar/${employerData._id}`} handleUpdatedImageUrl={handleUploadedAvatarUrl}/>
                        </div>

                        <div className={s.about}>

                            {
                                isEditing ? (

                                    <div className={s.card}>
                                        <EditForm data={employerData} setData={setEmployerData} onSave={handleSaveClick}
                                                  onCancel={handleCancelClick}/>
                                    </div>

                                ) : (

                                    <div className={s.card}>
                                        <div className={s.item}>
                                            <p className={s.text}>Фамилия и Имя: </p>{employerData.fullName}</div>
                                        <div className={s.item}>
                                            <p className={s.text}>Почта: </p>{employerData.email}</div>
                                        <div className={s.item}>
                                            <p className={s.text}>Телефон: </p>{employerData.employer.phone}
                                        </div>
                                        <div className={s.item}>
                                            <p className={s.text}>Профессия: </p>{employerData.employer.profession}
                                        </div>
                                        <div className={s.item}>
                                            <p className={s.text}>Описание: </p>{employerData.employer.description}
                                        </div>
                                        <div className={s.item}>
                                            <p className={s.text}>Достижения: </p>{employerData.employer.achievements}
                                        </div>
                                        <div className={s.item}>
                                            <p className={s.text}>
                                                Дата создания: <span>{employerData.employer.createdAt}</span>
                                            </p>
                                        </div>

                                        <button className={'adminButton'} onClick={onClickEditing}>Редактировать</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div className={s.workTime}>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <ScheduleEmployer employerId={employer.employer._id} employerFullName={employer.fullName} schedulesEmployer={schedulesEmployer} />
                        </LocalizationProvider>

                    </div>
                </div>

            ) : null}

        </div>
    );
};
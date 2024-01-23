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
import {Edit} from "../../Edit/Edit";

export const Employer = ({employer, handleUpdatedUsers}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingSchedule, setIsEditingSchedule] = useState(false);

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

    const handleCancelClick = () => setIsEditing(false);
    const onClickEditing = () => setIsEditing(true);
    const onClickAddSchedule = () => setIsEditingSchedule(true);
    const onClickCancelSchedule = () => setIsEditingSchedule(false);

    const handleUploadedAvatarUrl = (updatedAvatarUrl) => {
        setAvatarUrl(updatedAvatarUrl);

        handleUpdatedUsers(); // обновляем в родителе
    }

    const getDayName = (dayNumber) => {
        const date = new Date();
        date.setDate((date.getDate() - date.getDay()) + dayNumber);
        return <div className={s.day}>{date.toLocaleDateString('ru-RU', {weekday: 'short'})}</div>;
    };

    return (
        <div className={s.block}>

            {
                employerData && employerData.employer ? (

                    <div className={s.container}>

                        <div className={s.card}>

                            <div className={s.header}>

                                <div className={s.avatar}>
                                    <CustomAvatar avatarUrl={avatarUrl ? avatarUrl : employerData.avatarUrl}
                                                  fullName={employerData.fullName} size={'100px'}/>

                                    <ImageUploader uploadUrl={`/profile/updateAvatar/${employerData._id}`}
                                                   handleUpdatedImageUrl={handleUploadedAvatarUrl}/>
                                </div>

                                <div className={s.about}>
                                    <div className={s.name}>{employerData.fullName}</div>
                                    <div className={s.item}>{employerData.employer.profession}</div>
                                </div>

                            </div>


                            <div className={s.description}>

                                <Edit text={'Данные специалиста'} action={onClickEditing}/>

                                {
                                    isEditing ? (

                                        <div className={s.card}>
                                            <EditForm
                                                data={employerData}
                                                setData={setEmployerData}
                                                onSave={handleSaveClick}
                                                onCancel={handleCancelClick}
                                            />
                                        </div>

                                    ) : (

                                        <ul className={s.card}>
                                            <li className={s.item}>
                                                <div className={s.label}>Имя и фамилия:</div>
                                                <div className={s.text}>{employerData.fullName}</div>
                                            </li>

                                            <li className={s.item}>
                                                <div className={s.label}>Почта:</div>
                                                <div className={s.text}>{employerData.email}</div>
                                            </li>

                                            <li className={s.item}>
                                                <div className={s.label}>Телефон:</div>
                                                <div className={s.text}>{employerData.employer.phone} </div>
                                            </li>

                                            <li className={s.item}>
                                                <div className={s.label}>Специальность:</div>
                                                <div className={s.text}>{employerData.employer.profession}</div>
                                            </li>

                                            <li className={s.item}>
                                                <div className={s.label}>Описание:</div>
                                                <div className={s.text}>{employerData.employer.description}</div>
                                            </li>

                                            <li className={s.item}>
                                                <div className={s.label}>Достижения:</div>
                                                <div className={s.text}>{employerData.employer.achievements}</div>
                                            </li>

                                            <li className={s.item}>
                                                <div className={s.label}>Дата создания:</div>
                                                <div className={s.text}>
                                                    {employerData.employer.createdAt && new Date(employerData.employer.createdAt).toLocaleDateString('ru-RU')}
                                                </div>
                                            </li>
                                        </ul>
                                    )
                                }

                                <Edit text={'График работы'} action={onClickAddSchedule}/>

                                {
                                    isEditingSchedule ?

                                        (
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <ScheduleEmployer
                                                    employerId={employer.employer._id}
                                                    employerFullName={employer.fullName}
                                                    schedulesEmployer={schedulesEmployer}
                                                    onClickCancelSchedule={onClickCancelSchedule}
                                                />
                                            </LocalizationProvider>

                                        ) : (

                                            <>
                                                {
                                                    schedulesEmployer && schedulesEmployer.length > 0 ?

                                                        (
                                                            <>
                                                                <div className={s.headerSchedule}>
                                                                    <div className={s.labelSchedule}>Дни недели</div>
                                                                    <div className={s.labelSchedule}>Время работы</div>
                                                                    <div className={s.labelSchedule}>Период</div>
                                                                    <div className={s.labelSchedule}>Цвет расписания</div>
                                                                </div>

                                                                <div className={s.ScheduleList}>
                                                                    {
                                                                        schedulesEmployer.map((schedule) => (

                                                                            <div className={s.scheduleItem}
                                                                                 key={schedule._id}>

                                                                                <div
                                                                                    className={s.days}>{schedule.daysOfWeek.map(day => getDayName(day))}</div>

                                                                                <div
                                                                                    className={s.time}>{schedule.startTime} - {schedule.endTime}</div>

                                                                                <div className={s.date}>
                                                                                    {schedule.startRecur && new Date(schedule.startRecur).toLocaleDateString('ru-RU') + ' - '}
                                                                                    {schedule.endRecur && new Date(schedule.endRecur).toLocaleDateString('ru-RU')}
                                                                                </div>

                                                                                <div className={s.color}
                                                                                     style={{backgroundColor: schedule.color}}></div>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </>

                                                        ) : (

                                                            <div className={s.text}>
                                                                Расписание не указано!
                                                            </div>
                                                        )
                                                }

                                            </>
                                        )
                                }
                            </div>
                        </div>

                    </div>

                ) : null}

        </div>
    );
};
import React, {useEffect, useState} from 'react';
import s from './ScheduleEmployer.module.scss';
import axios from "../../../axios";
import {FormControl, MenuItem, Select, TextField} from "@mui/material";
import DatePicker from "react-datepicker";
import {useDispatch} from "react-redux";
import {fetchSchedules} from "../../../redux/slices/schedules";

export const ScheduleEmployer = ({employerId, employerFullName, schedulesEmployer}) => {

    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const [showDate, setShowDate] = useState(false);
    const [schedules, setSchedules] = useState(schedulesEmployer || []);

    const addNewSchedule = () => {
        setSchedules([
            ...schedules,
            {
                tempId: Date.now(),
                daysOfWeek: [],
                startTime: "",
                endTime: "",
                startRecur: null,
                endRecur: null,
                color: "",
                groupId: employerFullName
            }
        ])
    }

    useEffect(() => {
        setSchedules(schedulesEmployer || []);
    }, [schedulesEmployer]);

    const handleShowDateFields = () => {
        setShowDate(true);
    }

    const handleScheduleChange = (index, key, value) => {
        const newSchedule = [...schedules];
        newSchedule[index][key] = value;
        setSchedules(newSchedule);
    }

    const handleSubmit = async () => {

        try {
            const newSchedules = schedules.filter((schedule) => schedule.tempId);

            const response = await axios.post(`/admin/specialists/${employerId}/schedules`, {schedules: newSchedules})

            if (response.status === 200 && response.data.newSchedules) {
                setSchedules(prevSchedules => [
                    ...prevSchedules.filter(s => !s.tempId), // исключили
                    ...response.data.newSchedules // обновили
                ]);
                setMessage(response.data.message);
                dispatch(fetchSchedules());
            }

        } catch (e) {
            setMessage('Не удалось задать рабочее время сотрудника!', e)
        }
    }

    const handleRemoveSchedule = async (scheduleId) => {
        const scheduleToRemove = schedules.filter(s => s._id === scheduleId);

        if (scheduleToRemove && scheduleToRemove.tempId) {
            setSchedules(schedules.filter(s => s._id !== scheduleId))
        }

        try {
            const response = await axios.delete(`/admin/schedules/${scheduleId}`)

            if (response.status === 200) {
                const updatedSchedules = schedules.filter(schedule => schedule._id !== scheduleId);
                setSchedules(updatedSchedules);
            }

            setMessage(response.data.message);
            dispatch(fetchSchedules());

        } catch (e) {
            setMessage('Не удалось удалить расписание!', e)
        }
    }

    // const handleEditSchedule = async (editedSchedule) => {
    //     try {
    //         const response = await axios.put(`/admin/schedules/${editedSchedule._id}`, editedSchedule);
    //
    //         if (response.status === 200) {
    //
    //             const updatedSchedules = schedules.map(schedule =>
    //                 schedule._id === editedSchedule._id ? editedSchedule : schedule
    //             );
    //             setSchedules(updatedSchedules);
    //             setMessage(response.data.message);
    //         }
    //
    //     } catch (e) {
    //         setMessage('Не удалось обновить расписание!', e);
    //     }
    // };

    const styles = {
        textFieldColor: {
            marginTop: '15px',
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    border: 'none',
                },
            },
        },
        textField: {
            cursor: 'pointer',
            '& .MuiOutlinedInput-root': {
                marginBottom: '20px',
                borderRadius: '40px',
                outline: '1px solid #D78DFF',

                '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        boxShadow: '0 2px 2px rgb(216, 159, 246)',
                    },
                },
                '& .Mui-focused': {  // Этот стиль применяется при фокусе на элемент
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #D78DFF',
                    },
                },
                '& .MuiOutlinedInput-notchedOutline': { // Удаление бордера
                    border: 'none',
                }
            },
        },
    };

    const selectStyles = {
        boxShadow: "none",
        cursor: 'pointer',
        marginBottom: '20px',
        borderRadius: '40px',
        border: '1px solid #D78DFF',
        ".MuiOutlinedInput-notchedOutline": {border: 0},
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: 0,
            boxShadow: '0 2px 2px rgb(216, 159, 246)',
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: 0,
            boxShadow: '0 2px 2px rgb(216, 159, 246)',
        }
    };

    function formatDate(d) {
        let year = d.getFullYear();
        let month = (d.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0, поэтому добавляем 1
        let day = d.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }


    return (
        <div className={s.block}>

            <div className={s.container}>
                {
                    schedules.map((schedule, index) => (

                        <div className={s.schedule} key={index}>

                            <div className="remove"
                                 onClick={() => handleRemoveSchedule(schedule._id)}>
                            </div>

                            <label className={s.label}>Выберите дни недели</label>
                            <FormControl>
                                <Select
                                    sx={selectStyles}
                                    multiple
                                    value={schedule.daysOfWeek}
                                    onChange={(e) => handleScheduleChange(index, 'daysOfWeek', e.target.value)}
                                >
                                    <MenuItem style={styles.menuItem} value="1">Понедельник</MenuItem>
                                    <MenuItem style={styles.menuItem} value="2">Вторник</MenuItem>
                                    <MenuItem style={styles.menuItem} value="3">Среда</MenuItem>
                                    <MenuItem style={styles.menuItem} value="4">Четверг</MenuItem>
                                    <MenuItem style={styles.menuItem} value="5">Пятница</MenuItem>
                                    <MenuItem style={styles.menuItem} value="6">Суббота</MenuItem>
                                    <MenuItem style={styles.menuItem} value="7">Воскресенье</MenuItem>
                                </Select>
                            </FormControl>

                            <label className={s.label}>Время начала рабочего дня</label>
                            <TextField
                                sx={styles.textField}
                                type="time"
                                value={schedule.startTime}
                                onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                            />

                            <label className={s.label}>Время окончания рабочего дня</label>
                            <TextField
                                sx={styles.textField}
                                type="time"
                                value={schedule.endTime}
                                onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                            />

                            {
                                showDate ?
                                    ( //ПОПРАВИТЬ
                                        <div className={s.dateContainer}>
                                            <label className={s.label}> Дата начала</label>
                                            <DatePicker
                                                className={s.date}
                                                value={schedule.startRecur || null}
                                                onChange={(date) => handleScheduleChange(index, 'startRecur', date ? formatDate(date) : null)}
                                            />

                                            <label className={s.label}> Дата окончания</label>
                                            <DatePicker
                                                className={s.date}
                                                value={schedule.endRecur || null}
                                                onChange={(date) => handleScheduleChange(index, 'endRecur', date ? formatDate(date) : null)}
                                            />
                                        </div>
                                    ) : null
                            }

                            <button className={`adminButton ${s.buttonAddDate}`} onClick={handleShowDateFields}>
                                Указать дату графика работы
                            </button>

                            <TextField
                                label="Цвет для графика работы"
                                sx={styles.textFieldColor}
                                type="color"
                                value={schedule.color || '#e5c4f8'}
                                onChange={(e) => handleScheduleChange(index, 'color', e.target.value)}
                            />

                            <TextField
                                label="Имя и Фамилия"
                                sx={styles.textFieldColor}
                                value={employerFullName}
                                disabled={true}
                            />

                            <button className={'adminButton'} onClick={handleSubmit}>Сохранить график работы</button>
                        </div>
                    ))
                }
            </div>

            <button className={'adminButton'} onClick={addNewSchedule}>Добавить расписание работы</button>

            <div className={s.message}>
                {message}
            </div>
        </div>
    );
};
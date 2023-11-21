import React, {useEffect, useState} from 'react';
import s from './ScheduleEmployer.module.scss';
import axios from "../../../axios";
import {FormControl, MenuItem, Select, TextField} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch} from "react-redux";
import {fetchSchedules} from "../../../redux/slices/schedules";

export const ScheduleEmployer = ({employerId, employerFullName, schedulesEmployer, onClickCancelSchedule}) => {

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

    const handleShowDateFields = () => setShowDate(true);
    const handleHideDateFields = () => setShowDate(false);

    const handleSelectChange = (index, e) => {
        const newDaysOfWeek = e.target.value;
        handleScheduleChange(index, 'daysOfWeek', newDaysOfWeek);
    }

    const handleScheduleChange = (index, key, values) => {
        setSchedules(prevSchedules => {
            const newSchedules = [...prevSchedules];
            newSchedules[index] = {...newSchedules[index], [key]: values};
            return newSchedules;
        });
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
        const isTempSchedule  = schedules.some(schedule => schedule.tempId  === scheduleId);

        if (isTempSchedule) { // временное

            const updatedSchedules = schedules.filter(schedule => schedule.tempId !== scheduleId);
            setSchedules(updatedSchedules);

        } else {

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
    }

    const handleEditSchedule = async (index) => {

        const editedSchedule = schedules[index];

        try {
            const response = await axios.patch(`/admin/schedules/${editedSchedule._id}`, editedSchedule);

            if (response.status === 200) {

                const updatedSchedules = schedules.map(schedule =>
                    schedule._id === editedSchedule._id ? editedSchedule : schedule
                );
                setSchedules(updatedSchedules);
                setMessage(response.data.message);
            }

        } catch (e) {
            setMessage('Не удалось обновить расписание!', e);
        }
    };

    const styles = {

        textFieldColor: {
            width: '100%',
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderRadius: '15px',
                    border: 'none',
                },
                '& input': {
                    height: '20px',
                },
            },
        },
        textField: {
            cursor: 'pointer',
            '& .MuiOutlinedInput-root': {
                marginBottom: '20px',
                borderRadius: '15px',
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
        width: '495px',
        marginRight: '20px',
        borderRadius: '15px',
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

                <div className={s.headerSchedule}>
                    <div className={`${s.label} ${s.labelDays}`}>Дни недели</div>
                    <div className={s.label}>Время работы</div>
                    <div className={s.label}>Период</div>
                    <div className={s.label}>Цвет расписания</div>
                </div>

                {
                    schedules.map((schedule, index) => (

                        <div className={s.schedule} key={index}>

                            <FormControl>
                                <Select
                                    sx={selectStyles}
                                    multiple
                                    value={schedule.daysOfWeek}
                                    onChange={(e) => handleSelectChange(index, e)}
                                >
                                    <MenuItem style={styles.menuItem} value={1}>Понедельник</MenuItem>
                                    <MenuItem style={styles.menuItem} value={2}>Вторник</MenuItem>
                                    <MenuItem style={styles.menuItem} value={3}>Среда</MenuItem>
                                    <MenuItem style={styles.menuItem} value={4}>Четверг</MenuItem>
                                    <MenuItem style={styles.menuItem} value={5}>Пятница</MenuItem>
                                    <MenuItem style={styles.menuItem} value={6}>Суббота</MenuItem>
                                    <MenuItem style={styles.menuItem} value={7}>Воскресенье</MenuItem>
                                </Select>
                            </FormControl>

                            <div className={s.workingHours}>
                                <TextField
                                    sx={styles.textField}
                                    type="time"
                                    value={schedule.startTime}
                                    onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                                />

                                <TextField
                                    label={""}
                                    sx={styles.textField}
                                    type="time"
                                    value={schedule.endTime}
                                    onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                                />

                            </div>

                            <div className={s.period}>
                                {
                                    showDate ?
                                        ( //ПОПРАВИТЬ
                                            <div className={s.dateContainer}>

                                                <DatePicker
                                                    className={s.dateSchedule}
                                                    value={schedule.startRecur && new Date(schedule.startRecur).toLocaleDateString('ru-RU') || null}
                                                    onChange={(date) => handleScheduleChange(index, 'startRecur', date ? formatDate(date) : null)}

                                                />

                                                <DatePicker
                                                    className={s.dateSchedule}
                                                    value={schedule.endRecur && new Date(schedule.endRecur).toLocaleDateString('ru-RU') || null}
                                                    onChange={(date) => handleScheduleChange(index, 'endRecur', date ? formatDate(date) : null)}
                                                />

                                                <button className={`adminButton ${s.buttonAddDate}`}
                                                        onClick={handleHideDateFields}>
                                                    Отмена
                                                </button>

                                            </div>
                                        ) : (
                                            <button className={`adminButton ${s.buttonAddDate}`}
                                                    onClick={handleShowDateFields}>
                                                Указать период
                                            </button>
                                        )
                                }
                            </div>

                            <div className={s.color}>
                                <TextField
                                    sx={styles.textFieldColor}
                                    type="color"
                                    value={schedule.color || '#e5c4f8'}
                                    onChange={(e) => handleScheduleChange(index, 'color', e.target.value)}
                                />

                            </div>

                            <div className={s.scheduleButtons}>
                                {
                                    schedule._id ?
                                        (
                                            <button className={`adminButton ${s.edit}`}
                                                    onClick={() => handleEditSchedule(index)}>
                                                Редактировать график работы</button>
                                        ) : (
                                            <button className={`adminButton ${s.edit}`} onClick={handleSubmit}>
                                                Сохранить график работы</button>
                                        )
                                }

                                <button className={`adminButton ${s.remove}`}
                                        onClick={() => handleRemoveSchedule(schedule._id)}>Удалить график
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className={s.buttons}>
                <button className={'adminButton'} onClick={addNewSchedule}>Добавить расписание</button>
                <button className={`adminButton ${s.buttonCancel}`} onClick={onClickCancelSchedule}>Отмена</button>
            </div>

            <div className={s.message}>
                {message}
            </div>
        </div>
    );
};
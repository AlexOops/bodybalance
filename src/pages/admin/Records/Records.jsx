import {Fragment, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {nanoid} from "nanoid";
import s from './Records.module.scss'
import {setDate, setDay, setHours, setISODay, setMinutes} from "date-fns";
import {useDispatch, useSelector} from "react-redux";
import {fetchAppointmentsByEmployer} from "../../../redux/slices/appointments";
import dayjs from "dayjs";
import {fetchEmployers} from "../../../redux/slices/employers";

const numberDays = [0, 1, 2, 3, 4, 5, 6]
const dateNow = new Date()
export const Records = () => {
    const [startDate, setStartDate] = useState(new Date()); //обнулить часы
    const [days, setDays] = useState([]);
    const [employerId, setEmployerId] = useState('6447fcd874f077e18de6dfa1');
    const {appointments} = useSelector(state => state.appointments);
    const dispatch = useDispatch();
    const {employers} = useSelector(state => state.employers);


    useEffect(() => {
        dispatch(fetchEmployers());
        dispatch(fetchAppointmentsByEmployer(employerId));
    }, [employerId]);


    useEffect(() => {
        const today = startDate.getDay();
        const monday = startDate.getDate()-today
        setDays(numberDays.map((day) => setDate(startDate, monday+day)))
    },[startDate])

    const setTime = (e) => { //при клике на время
        setStartDate(setHours(setMinutes(startDate, 0), +e.target.value))
    }
    const prevWeek = () => {
        setStartDate(setDay(startDate, startDate.getDay()-7))
    }
    const nextWeek = () => {
        setStartDate(setDay(startDate, startDate.getDay()+7))
    }

    const setToday = () => {
        setStartDate(dateNow)
    }

    return (
        <div className={s.appointments}>
            <div className={s.employers}>
                <span>Выбрать сотрудника:</span>
                {employers.items.map(emp => <div key={nanoid()} onClick={()=> setEmployerId(emp._id)}>
                    {emp.fullName} - {emp.employer.profession}
                </div>)}
            </div>

            <div className={s.positionFlex}>
                <div className={s.datePicker}>
                    <DatePicker
                        selected={startDate}
                        inline
                        showWeekPicker
                        onChange={(date) => setStartDate(date)}/>

                </div>
                <p className={s.today} onClick={setToday}>вернуться на сегодня {dateNow.toLocaleDateString('ru-RU')}</p>
                {/*<div className={s.selectedDate}> <h1>{startDate.toLocaleDateString('ru-RU')} {startDate.toLocaleTimeString('ru-RU')}</h1></div>*/}
            </div>
            <div className={s.dateFlex}>
                <button onClick={prevWeek}>назад</button>
                {days.map(day => <div key={nanoid()} className={s.date}>{day.toLocaleDateString('ru-RU')}</div>)}
                <button onClick={nextWeek}>вперед</button>
            </div>
            <div>
                {[...Array(12)].map((el, timeIndex) =>
                    <Fragment key={nanoid()}>
                        <button
                            value={timeIndex + 9}
                            // className={arr[0] === timeIndex+9 ? s.timeColor : s.time}
                            // className={arr.map(el => el === timeIndex ? s.time : s.timeColor)}
                            onClick={(e) => setTime(e)}>
                            {`${timeIndex + 9}:00`}
                        </button>
                        <div className={s.row}>
                            {
                                days.map((day, dayIndex) => {

                                    return <div className={s.cell} key={nanoid()}>

                                        {(typeof appointments.items[day.toLocaleDateString('ru-RU') + `, ${timeIndex + 9}:00:00`] !== 'undefined') &&
                                            appointments.items[day.toLocaleDateString('ru-RU') + `, ${timeIndex + 9}:00:00`].firstName
                                        }
                                    </div>
                                })
                            }
                        </div>
                        <hr/>
                    </Fragment>
                )}
            </div>
        </div>
    );
}
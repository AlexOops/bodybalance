import {Fragment, useEffect, useState} from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);
/* eslint-disable import/first */
import "react-datepicker/dist/react-datepicker.css";
import {nanoid} from "nanoid";
import s from './Appointments.module.scss'
import {addDays, format, setDate, setDay, setHours, setMinutes, startOfWeek} from "date-fns";
import {useDispatch, useSelector} from "react-redux";
import {fetchAppointmentsByEmployer} from "../../../redux/slices/appointments";
import {fetchEmployers} from "../../../redux/slices/employers";

const numberDays = [0, 1, 2, 3, 4, 5, 6]
const dateNow = new Date()
export const Appointments = () => {
    const [startDate, setStartDate] = useState(new Date()); //обнулить часы
    const [days, setDays] = useState([]);
    const [myDays, setMyDays] = useState([]);
    const [employerId, setEmployerId] = useState(''); //Сотрудник для вывода его календаря
    const {appointments} = useSelector(state => state.appointments);
    const dispatch = useDispatch();
    const {employers} = useSelector(state => state.employers);
    const [selectedDates, setSelectedDates] = useState([]);
    const [indexAppointments, setIndexAppointments] = useState({});
    // const [appointmentsWithIndex, setAppointmentsWitIndex] = useState([]);// проиндексировать appointments по дате или фетчим по дате и заполняем от 00:00 до 24:00 в ответе

    useEffect(()=> {
        dispatch(fetchEmployers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=> {
        if(employers.items[0]) {
         setEmployerId(employers.items[0]._id);
        }
    }, [employers])

    useEffect(() => {
        if(employerId){
            dispatch(fetchAppointmentsByEmployer(employerId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employerId]);



    useEffect(() => {
        //отметить даты со встречами в датапикере.
        let selDates = [];
        appointments.items.map(el => selDates.push(new Date(el.dateTime)));
        setSelectedDates(selDates);
        setIndexAppointments({}); //обнулим
        //назначим координаты событиям
        appointments.items.forEach( el => {
            let idx = (new Date(el.dateTime).toLocaleString('ru-RU')).replace('09:', '9:');
            setIndexAppointments( prevState => {
                prevState[idx] = el
                return {...prevState}
            }
            );
        });

    }, [appointments])


    useEffect(() => {
        const today = startDate.getDay();
        const monday = startDate.getDate() - today;
        const myMonday = startOfWeek(startDate, {weekStartsOn: 1})
        // setDays(numberDays.map((day) => setDate(startDate, monday+day)))
        setDays([...Array(7)].map((el, key) => addDays(myMonday, key)));
        console.log(444, myDays);
        console.log(555, days)
    },[startDate])

    const setTime = (e) => { //при клике на время
        setStartDate(setHours(setMinutes(startDate, 0), +e.target.value))
    }
    const prevWeek = () => {
        setStartDate(setDay(startDate, startDate.getDay()-7))
    }
    const nextWeek = () => {
        setStartDate(setDay(startDate, startDate.getDay()+7));
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
                        locale="ru"
                        selected={startDate}
                        inline
                        showWeekPicker
                        onChange={(date) => setStartDate(date)}
                        highlightDates={selectedDates}//выделили даты с записями
                    />

                </div>
                <p className={s.today} onClick={setToday}>вернуться на сегодня {dateNow.toLocaleDateString('ru-RU')}</p>
                {/*<div className={s.selectedDate}> <h1>{startDate.toLocaleDateString('ru-RU')} {startDate.toLocaleTimeString('ru-RU')}</h1></div>*/}
            </div>
            <div className={s.weekHeader}>
                <button className={`${s.button} ${s.buttonLeft}`} onClick={prevWeek}><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.63672 0.812501L7.82422 7L1.63672 13.1875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg></button>
                { (days[0]) &&
                    <div>{format(days[0], 'd MMM')} - {format(days[6], 'd MMM')}</div>
                }
                <button className={`${s.button} ${s.buttonRight}`} onClick={nextWeek}><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.63672 0.812501L7.82422 7L1.63672 13.1875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg></button>
            </div>
            {/*ширина календаря*/}
            <div className={s.calendarRow}>
                {days.map(day => <div key={nanoid()} className={s.date}>{format(day, 'd MMM, iiiiii')}</div>)}
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

                                        {(typeof indexAppointments[day.toLocaleDateString('ru-RU') + `, ${timeIndex + 9}:00:00`] !== 'undefined') &&
                                            indexAppointments[day.toLocaleDateString('ru-RU') + `, ${timeIndex + 9}:00:00`].firstName
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
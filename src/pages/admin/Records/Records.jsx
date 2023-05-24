import {Fragment, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {nanoid} from "nanoid";
import s from './Records.module.scss'
import {setDate, setDay, setHours, setMinutes} from "date-fns";

const numberDays = [0, 1, 2, 3, 4, 5, 6]
const dateNow = new Date()
export const Records = () => {


    const [startDate, setStartDate] = useState(new Date());
    const [days, setDays] = useState([])

    useEffect(() => {
        setStartDate(new Date())
    }, [])

    useEffect(() => {
        const today = startDate.getDay()
        const monday = startDate.getDate()-today
        setDays(numberDays.map((day) => setDate(startDate, monday+day)))
    },[startDate])

    const setTime = (e) => {
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
        <>
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
                {[...Array(12)].map((el, index) =>
                    <Fragment key = {nanoid()}>
                        <button
                            value={index+9}
                            // className={arr[0] === index+9 ? s.timeColor : s.time}
                            // className={arr.map(el => el === index ? s.time : s.timeColor)}
                            onClick={(e) => setTime(e)} >
                            {`${index+9}:00`}
                        </button>
                        <hr/>
                    </Fragment>
                )}
            </div>
        </>
    );
}
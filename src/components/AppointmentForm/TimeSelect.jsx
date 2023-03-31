import React from 'react';
import {Field} from "formik";
import s from "./AppointmentForm.module.scss";

const TimeSelect = ({workTimes, workDate}) => {
    return (
        <>

        {workTimes.map((time, key) => <>
                    <Field className={s.selectInput}  type="radio" name="datetime" value={time}/>
                    <option key={key} value={`${workDate} ${time}`}>{time}</option>
            <label
                        key={`label${service._id}`}
                        className={`${s.selectLabel} ${service._id === active ? s.active : ''}`}
                        data-index={service._id}
                        htmlFor={service._id}
                        onClick={onClickItem}
                    >
                        {service.name}
                    </label>

                </>
            )}
        </>

    // <Field
    //         component="select"
    //         id="time"
    //         name="datetime"
    //         // multiple={true}
    //     > {workTimes.map((time, key) =>
    //         <option key={key} value={`${workDate} ${time}`}>{time}</option>
    //     )}
    //     </Field>

    // <>
    //     <Field className={s.selectInput} id={service._id} type="radio" name="serviceId" value={service._id}/>
    //     <label
    //         key={`label${service._id}`}
    //         className={`${s.selectLabel} ${service._id === active ? s.active : ''}`}
    //         data-index={service._id}
    //         htmlFor={service._id}
    //         onClick={onClickItem}
    //     >
    //         {service.name}
    //     </label>
    // </>




    );

};

export default TimeSelect;
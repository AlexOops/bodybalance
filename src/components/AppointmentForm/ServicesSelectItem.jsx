import React from 'react';
import {Field} from "formik";
import s from "./AppointmentForm.module.scss";

const FormListItem = ({service, onClickItem, active}) => {
    return (<>
            <Field className={s.selectInput} id={service._id} type="radio" name="serviceId" value={service._id}/>
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
    );
};

export default FormListItem;
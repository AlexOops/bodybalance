import React from 'react';
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import s from "./AppointmentForm.module.scss";

const Phone = ({field, form, ...props}) => {
    return (
        <PhoneInput
            international
            defaultCountry="RU"
            value={field.value}
            onChange={value => {
                if (!form.touched[field.name]) form.setFieldTouched(field.name);
                form.setFieldValue(field.name, value);
            }}
            className={s.textField}
        />

    );
};

export default Phone;
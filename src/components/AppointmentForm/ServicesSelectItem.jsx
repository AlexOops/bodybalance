import React from 'react';
import {Field} from "formik";
import s from "./AppointmentForm.module.scss";

const ServicesSelectItem = ({service, onClickItem, active}) => {

    return (<>

            <Field name="serviceId">
                {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.

                  }) => {

                    return (

                        <>
                            <input type="radio"
                                   className={s.selectInput}
                                   id={service._id}
                                   {...field}
                                   // value={service._id}
                                   value={service.name}
                            />
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
                    )
                }


                    }
            </Field>

            {/*<Field className={s.selectInput} id={service._id} type="radio" name="serviceId" value={service._id}*/}
                {/*    // checked={service._id === active}*/}
                {/*    // defaultChecked={service._id === active}*/}
                {/*/>*/}
                {/*<label*/}
                {/*    key={`label${service._id}`}*/}
                {/*    className={`${s.selectLabel} ${service._id === active ? s.active : ''}`}*/}
                {/*    data-index={service._id}*/}
                {/*    htmlFor={service._id}*/}
                {/*    onClick={onClickItem}*/}

                {/*>*/}
                {/*    {service.name}*/}
                {/*</label>*/}
            </>
    );
};

export default ServicesSelectItem;
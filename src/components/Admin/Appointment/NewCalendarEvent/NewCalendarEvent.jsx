import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/ru';
import axios from "../../../../axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchEmployers} from "../../../../redux/slices/employers";
import {fetchServices} from "../../../../redux/slices/services";
import {fetchCustomers} from "../../../../redux/slices/customers";
import {CustomSelect} from "../../../CustomSelect/CustomSelect";
import s from './NewCalendarEvent.module.scss';
import {Autocomplete, TextField} from "@mui/material";


export const NewCalendarEvent = ({appointment, showMessage}) => {

    const dispatch = useDispatch()

    const {employers} = useSelector(state => state.employers);
    const {services} = useSelector(state => state.services);
    const {customers} = useSelector(state => state.customers);

    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [endDate, setEndDate] = useState(dayjs(new Date()));

    const [selectedEmployer, setSelectedEmployer] = useState(null); //value - id - можно добавить в localstorage
    const [selectedService, setSelectedService] = useState(null);   //value - id
    const [selectedCustomer, setSelectedCustomer] = useState(null); //- id

    //Вынос запросов --- проанализировать ----
    useEffect(() => {
        dispatch(fetchEmployers());
        dispatch(fetchServices());
        dispatch(fetchCustomers());
    }, [dispatch]);


    const handleAddNewEvent = async () => { //создадим событие и привяжем его к записи

        // запишем дату и статус опубликовано
        const appointmentId = appointment._id;

        const response = await axios.patch(`/appointments/${appointmentId}`, {
            start: startDate.format(),
            end: endDate.format(),
            public: true,
            employer: selectedEmployer.value,
            service: selectedService.value,
            customer: selectedCustomer,
            status: "Назначен прием",
        });

        if (response) {
            showMessage(response.data.message);
        }
    }

    const handleEmployerChange = (selectedOption) => setSelectedEmployer(selectedOption);
    const handleServiceChange = (selectedOption) => setSelectedService(selectedOption);

    return (
        <div className={s.block}>
            <div className={s.info}>
                <div className={s.name}>
                    <span className={s.label}>ФИО:</span>
                    {appointment.firstName} {appointment.secondName}
                </div>

                <div className={s.phone}>
                    <span className={s.label}>Номер телефона:</span> {appointment.phone}
                </div>

                <div className={s.email}>
                    <span className={s.label}>e-mail:</span> {appointment.email}
                </div>

                <div className={s.doctor}>
                    <span className={s.label}>Лечащий врач: </span>

                    <div className={s.select}>
                        <CustomSelect
                            data={employers}
                            onChange={handleEmployerChange}
                            value={selectedEmployer}
                            placeholder={'Выберите врача...'}
                        />
                    </div>
                </div>

                <div className={s.service}>
                    <span className={s.label}>Услуга: </span>

                    <div className={s.select}>
                        <CustomSelect
                            data={services}
                            onChange={handleServiceChange}
                            value={selectedService}
                            placeholder={'Выберите услугу...'}
                        />
                    </div>

                </div>
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>

                <div className={s.date}>
                    <div className={s.start}>
                        <span className={s.label}>Дата начала записи: </span>

                        <DateTimePicker
                            className={`myDatePicker`}
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                        />
                    </div>

                    <div className={s.end}>
                        <span className={s.label}>Дата конца записи: </span>

                        <DateTimePicker
                            className={`myDatePicker`}
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                        />
                    </div>
                </div>

            </LocalizationProvider>

            <div className={s.customer}>
                <span className={s.label}>Поиск пациента: </span>

                <div className={s.autocomplete}>
                    <Autocomplete
                        className="myAutocomplete"
                        options={customers.items || []}
                        getOptionLabel={(option) => option.fullName || ''}
                        value={customers.items.find(customer => customer._id === selectedCustomer) || null}
                        onChange={(event, newValue) => {
                            setSelectedCustomer(newValue ? newValue._id : null);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                            />
                        )}
                    />
                </div>

            </div>

            <button className={`adminButton ${s.button}`} onClick={handleAddNewEvent}>Назначить прием</button>
        </div>
    );
};
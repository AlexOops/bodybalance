import React from 'react';
import Select from "react-select";

export const CustomSelect = ({data, placeholder, onChange, value}) => {

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            maxWidth: '400px',
            border: '1px solid #d89ff6',
            boxShadow: state.isFocused ? '0 2px 2px rgb(216, 159, 246)' : 'none',
            borderRadius: '40px',
            padding: '8px',
            marginTop: '10px',
            outline: 'none',
            cursor: 'pointer',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#AEAEAE',
            fontSize: '14px',
        }),
        menu: (provided) => ({
            ...provided,
            fontSize: '14px',
            borderRadius: '40px',
            marginTop: '0'
        })
    };

    const customOptionComponent = ({innerProps, label}) => (
        <div {...innerProps} style={{
            color: '#636363',
            fontSize: '16px',
            padding: '10px 0 10px 25px',
            cursor: 'pointer'
        }}>
            {label}
        </div>
    );


    const options = [
            {value: null, label: 'Не выбрано'},

            ...data.items?.map(item => ({
                value: item._id,
                label: item.fullName || item.name
            }))
        ]

    return (
        <Select
            placeholder={placeholder}
            styles={customStyles}
            components={{
                Option: customOptionComponent,
            }}
            options={options}
            onChange={onChange}
            value={value}
        />
    );
};
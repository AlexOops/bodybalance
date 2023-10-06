import "../../../index.scss";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchConsultationTopics} from "../../../redux/slices/contacts";

import ReactSelect from 'react-select';

export const Select = ({ selectedOption, setSelectedOption }) => {

    const dispatch = useDispatch();
    const {consultationTopics} = useSelector((state) => state.consultationTopics);

    useEffect(() => {
        dispatch(fetchConsultationTopics());
    }, [dispatch]);

    const selectOptions = consultationTopics.items?.map((topic) => ({
        label: topic.name,
        value: topic._id
    }));

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: '1px solid #d89ff6',
            boxShadow: state.isFocused ? '0 4px 4px rgb(216, 159, 246)' : 'none',
            borderRadius: '40px',
            padding: '20px',
            marginBottom: '20px',
            outline: 'none',
            cursor: 'pointer',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#AEAEAE',
            fontSize: '20px',
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '40px',
            marginTop: '-7px'
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '20px',
            color: '#636363',
        })
    };

    const customOptionComponent = ({innerProps, label}) => (
        <div {...innerProps} style={{
            color: '#636363',
            fontSize: '20px',
            padding: '20px',
            cursor: 'pointer'
        }}>
            {label}
        </div>
    );

    return (
        <>
            <ReactSelect
                placeholder={'Выберите тему: '}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={selectOptions}
                value={selectedOption}
                styles={customStyles}
                components={{
                    Option: customOptionComponent,
                }}
            />
        </>
    );
};
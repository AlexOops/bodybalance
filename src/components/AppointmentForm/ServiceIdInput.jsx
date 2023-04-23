import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectedService} from "../../redux/slices/services";

const ServiceIdInput = ({setFieldValue}) => {
    const selected = useSelector(selectedService);
    useEffect(()=>{
        setFieldValue('serviceId', selected.id);
    }, [selected]);
    return (
        <input name="serviceId" type="text" id="serviceId" readOnly={true}
               hidden={true}/>
    );
};

export default ServiceIdInput;
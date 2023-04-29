import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectedEmployer} from "../../redux/slices/employers";

const EmployerIdInput = ({setFieldValue}) => {
    const selected = useSelector(selectedEmployer);
    useEffect(()=>{
        setFieldValue('employer', selected.id);
    }, [selected]);
    return (
        <input name="employer" type="text" id="employer" readOnly={true}
               hidden={true}/>
    );
};

export default EmployerIdInput;
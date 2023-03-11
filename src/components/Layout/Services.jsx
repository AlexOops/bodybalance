import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchServices} from "../../redux/slices/services";

export const Services = () => {
    const dispatch = useDispatch();
    const {services} = useSelector( state => state.services);

    const isServicesLoading = services.status === 'loading'; // boolean

    React.useEffect(() => {
        dispatch(fetchServices());
    },[]);

    return (
        <>
        <h1>Услуги</h1>
            <div>{(isServicesLoading ? [...Array(3)] : services.items).map((obj, index)=>
                isServicesLoading ? (<div > Загрузка...</div>) : (
                    <div>
                        <div key={index}> {obj.name} </div>
                        <div key={index}> {obj.description} </div>
                        <div key={index}> {obj.price} </div>
                    </div>
                )
            )}</div>
        </>

    )
}
import React from "react";
import {ArrowLeft} from "../../Arrow/ArrowLeft";
import {ArrowRight} from "../../Arrow/ArrowRight";
import s from './PopularServices.module.scss'
import {Card} from "../../Card/Card";
import {useDispatch, useSelector} from "react-redux";
import {fetchServices} from "../../../../redux/slices/services";

// при загрузке с сервера убрать эту переменную и изменить её ниже. пока для заглушки
// const price = 7200

export const PopularServices = () => {
    const dispatch = useDispatch();
    const {services} = useSelector(state => state.services);
    const isServicesLoading = services.status === 'loading'; // boolean

    React.useEffect(() => {
        dispatch(fetchServices());
    }, [] );

    return (
        <>
            <div className='container-carousel'>
                <ArrowLeft/>
                <div className='container'>
                    <div className={s.position}>
                        <div className={s.services}>
                            <h2 className={s.space}>популярные услуги</h2>
                            <div className={s.cards}>
                                {/* изменить на получение с сервера пока только статика */}
                                {(isServicesLoading ? [...Array(3)] : services.items).map((obj, index) =>
                                    isServicesLoading
                                        ? <Card key={index} isLoading={true}/>
                                        : <Card isPopular={true}
                                            price={obj.price}
                                            name={obj.name}
                                            description={obj.description}
                                            text={obj.text}
                                            imageUrl={(obj.imageUrl) ?`http://localhost:4444${obj.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                                        />
                                )}
                                {/*<Card price={price} />*/}
                                {/*<Card />*/}
                                {/*<Card />*/}
                            </div>
                        </div>
                    </div>
                </div>
                <ArrowRight/>
            </div>
        </>
    )
}
import s from './PopularServices.module.scss'
import {Card} from "../../Card/Card";
import {useDispatch, useSelector} from "react-redux";
import {fetchServicesByRating} from "../../../../redux/slices/services";
import {useEffect} from "react";

export const PopularServices = () => {
    const dispatch = useDispatch();
    const {services} = useSelector(state => state.services);
    const isServicesLoading = services.status === 'loading'; // boolean

    useEffect(() => {
        dispatch(fetchServicesByRating());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // сервисы
    // const [count, setCount] = useState(0)
    // const [filterService, setFilterService] = useState([])
    // const [flag, setFlag] = useState(1)

// логика для 3-х элементов на слайдере в популярных услугах
    // // первый рендеринг после получения всех сервисов
    // useEffect(() => {
    //     setFilterService(Object.values(services.items).filter((el, idx) => idx < count + 3))
    //     console.log(filterService)
    // },[services, count])
    //
    // // фильтрация массива сервисов
    // useEffect(() => {
    //     if(flag !== count) {
    //         setFlag(count)
    //         setFilterService(Object.values(services.items).filter((el, idx) => (idx >= count && idx < count + 3)))
    //         if (services.items.length < count) {
    //             setCount(0)
    //         } else if (count < 0) {
    //             setCount(services.items.length)
    //         }
    //     }
    //     console.log(filterService)
    // }, [services, filterService, count, flag])

    return (
    <>
        <div className='container-carousel'>
            {/*<ArrowLeft setCount={setCount}/>*/}
            <div className='container'>
                <div className={s.position}>
                    <div className={s.services}>
                        <h2 className={s.space}>популярные услуги</h2>
                        {/*<div className={s.cards}>*/}
                        {/*    {filterService.map((obj, index) =>*/}
                        {/*        isServicesLoading*/}
                        {/*            ? <Card key={index} />*/}
                        {/*            : <Card key={obj.id}*/}
                        {/*                    price={obj.price}*/}
                        {/*                    name={obj.name}*/}
                        {/*                    description={obj.description}*/}
                        {/*                    text={obj.text}*/}
                        {/*                    imageUrl={(obj.imageUrl) ? `http://localhost:4444${obj.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}*/}
                        {/*            />*/}
                        {/*    )}*/}
                        {/*</div>*/}
                        <div className={s.cards}>
                            {(isServicesLoading ? [...Array(3)] : services.items).map((obj, index) =>
                                isServicesLoading
                                    ? <Card key={index} isLoading={true}/>
                                    : <Card key={obj.id} isPopular={true}
                                            price={obj.price}
                                            name={obj.name}
                                            description={obj.description}
                                            text={obj.text}
                                            imageUrl={(obj.imageUrl) ? `http://localhost:4444${obj.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                                    />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/*<ArrowRight setCount={setCount}/>*/}
        </div>
    </>
)
}
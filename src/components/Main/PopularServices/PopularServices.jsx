import s from './PopularServices.module.scss'
import {Card} from "../../Card/Card";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {fetchServices} from "../../../redux/slices/services";

export const PopularServices = () => {
    const dispatch = useDispatch();
    const {services} = useSelector(state => state.services);
    const isServicesLoading = services.status === 'loading'; // boolean

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0
        });
    }

    return (
    <>
            <div className='container'>
                <div className={s.position}>

                        <h2 className={s.space}>популярные услуги</h2>
                        <div className={s.cards}>
                            {(isServicesLoading ? [...Array(3)] : services.items.slice(0,3)).map((obj, index) =>
                                isServicesLoading
                                    ? <Card key={index} isLoading={true}/>
                                    : <Card key={index} isPopular={true}
                                            price={obj.price}
                                            name={obj.name}
                                            description={obj.description}
                                            text={obj.text}
                                            imageUrl={(obj.imageUrl) ? `http://localhost:4444${obj.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                                    />
                            )}
                </div>
                    <Link to={"/services"} onClick={scrollToTop} className={s.btn}>Все услуги</Link>
            </div>
                
        </div>
    </>
)
}
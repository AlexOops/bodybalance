import s from './PopularServices.module.scss'
import {Card} from "../../Card/Card";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {fetchServices} from "../../../redux/slices/services";
import {Circles} from "../../Circles/Circles";

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

                <div className={'circles'}>
                    <Circles smallSize={180} smallAxisX={-240} smallAxisY={150}
                             bigSize={350} bigAxisX={-240} bigAxisY={-75}/>
                </div>

                <div className={s.position}>

                    <h1 className={s.title}>популярные услуги</h1>

                    <div className={s.cards}>

                        {(isServicesLoading ? [...Array(3)] : services.items.slice(0, 3)).map((obj, index) =>

                            isServicesLoading ?
                                <div className={s.cardItem}>
                                    <Card key={index} isLoading={true}/>
                                </div>
                                :

                                <div className={s.cardItem}>
                                    <Card key={obj._id} isPopular={true}
                                          price={obj.price}
                                          name={obj.name}
                                          description={obj.description}
                                          text={obj.text}
                                          imageUrl={(obj.imageUrl) ? `http://localhost:4444${obj.imageUrl}` : `http://localhost:4444/uploads/default_service.png`}
                                    />
                                </div>
                        )}
                    </div>

                    <Link to={"/services"} onClick={scrollToTop} className={s.btn}>Все услуги</Link>
                </div>

                <div className={'circles'}>
                    <Circles smallSize={180} smallAxisX={1350} smallAxisY={400}
                             bigSize={350} bigAxisX={1100} bigAxisY={400}/>
                </div>
            </div>
        </>
    )
}
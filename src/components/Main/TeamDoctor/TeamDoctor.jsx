import s from './TeamDoctor.module.scss'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchEmployers} from "../../../redux/slices/employers";
import {Circles} from "../../Circles/Circles";

export const TeamDoctor = () => {
    const dispatch = useDispatch();
    const {employers} = useSelector(state => state.employers);
    const apiUrl = process.env.REACT_APP_API_URL;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0
        });
    }

    useEffect(() => {
        dispatch(fetchEmployers());
    }, [dispatch]);

    return (
        <div className='container'>

            <div className={s.wrapper}>

                <div className={'circles'}>
                    <Circles smallSize={180} smallAxisX={-125} smallAxisY={200}
                             bigSize={350} bigAxisX={-204} bigAxisY={-60}/>

                    <Circles smallSize={180} smallAxisX={400} smallAxisY={200}
                             bigSize={350} bigAxisX={350} bigAxisY={-100}/>
                </div>

                <div className={s.img}>

                    {
                        employers.items.slice(0, 4).map((employer, index) =>
                            <img className={`${s.three} ${index > 0 ? 'hide-on-mobile' : ''}`}
                                 src={(employer.avatarUrl) ? `${apiUrl}${employer.avatarUrl}` : `http://localhost:4444/uploads/default_service.png`}
                                 key={employer._id} alt="employer"/>
                        )
                    }
                </div>

                <div className={s.description}>
                    <h2 className={s.name}>Команда профессиональных врачей</h2>
                    <p className={s.text}>Разнообразный и богатый опыт говорит нам, что экономическая повестка
                        сегодняшнего дня однозначно определяет каждого участника как способного принимать собственные
                        решения касаемо глубокомысленных рассуждений.</p>
                    <Link to={"/Specialists"} onClick={scrollToTop} className={s.button}>Посмотреть всех
                        специалистов</Link>
                </div>
            </div>
        </div>
    )
}
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTraining, setDescription, setName} from "../../redux/slices/training";
import s from "./Training.module.scss";
import training_1 from "../../assets/training_1.png";
import play_item from "../../assets/play_item.svg";
import {Link} from "react-router-dom";

export const Training = () => {

    const dispatch = useDispatch();
    const trainings = useSelector((state) => state.training.training);
    const isTrainingsLoading = trainings.status === 'loading';

    useEffect(() => {
        dispatch(fetchTraining());
    }, [dispatch])

    const handleClick = (name, description) => {
        dispatch(setName(name));
        dispatch(setDescription(description));

        localStorage.setItem('name', name);
        localStorage.setItem('description', description);
    }

    return (
        <>
            <ul className={s.training__list}>
                {(isTrainingsLoading ? [...Array(3)] : trainings.items).map((item, idx) =>
                    isTrainingsLoading
                        ? (<div className={s.training__item} key={idx}>
                                <img src={training_1} alt="trn1"/>
                                <div className={s.training__item__wrp}>
                                    <img src={play_item}
                                         className={s.training__item__img}
                                         alt="play"
                                         width={36}
                                         height={36}/>
                                </div>
                            </div>
                        )
                        : (<Link to={`/training/${item._id}`}
                                 key={idx}
                                 onClick={() => handleClick(item.name, item.description)}
                            >
                                <div className={s.training__item} key={idx}>
                                    <img src={training_1} alt="trn1"/>
                                    <div className={s.training__item__wrp}>
                                        <p className={s.training__item__text}>{item.name}</p>
                                        <img src={play_item}
                                             className={s.training__item__img}
                                             alt="play"
                                             width={36}
                                             height={36}/>
                                    </div>
                                </div>
                            </Link>
                        )
                )}
            </ul>
        </>
    );
};
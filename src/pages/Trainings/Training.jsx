import React, {useEffect} from "react";
import s from "./Training.module.scss";
import "../../index.scss";
import play_item from "../../assets/play_item.svg";
import training_1 from "../../assets/training_1.png"
import {Feedback} from "../../components/Feedback/Feedback";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchTraining, setDescription, setName} from "../../redux/slices/training";

export const Training = () => {

    const dispatch = useDispatch();
    const trainings = useSelector((state) => state.training.training);
    const isTrainingsLoading = trainings.status === 'loading';

    const handleClick = (name, description) => {
        dispatch(setName(name));
        dispatch(setDescription(description));

        localStorage.setItem('name', name);
        localStorage.setItem('description', description);
    }

    useEffect(() => {
        dispatch(fetchTraining());
    }, [dispatch])

    return (
        <>
            <div className={'container-color'}>
                <div className={'container'}>
                    <div className={s.header}>
                        <p className={s.title}>Тренировки</p>
                        <p className={s.text}>Следует отметить, что постоянный количественный рост и сфера нашей
                            активности прекрасно подходит для реализации форм воздействия.</p>
                    </div>
                </div>
            </div>
            <div className="container">
            <Feedback
                name={"Почему важно делать упражнения ежедневно ?"}
                text={"Также как перспективное планирование, в своём классическом представлении, допускает внедрение системы обучения кадров, соответствующей насущным потребностям."}
                author={"Дмитрий Бочарников - "}
                profession={"Невролог-реабилитолог"}
            />
            </div>
            <div className={'container-color'}>
                <div className={'container'}>
                    <div className={s.training}>
                        <div className={s.servicesTitleWrap}>
                            <h2 className={s.servicesTitle}>Упражнения</h2>
                        </div>

                        <ul className={s.training_list}>
                            {(isTrainingsLoading ? [...Array(3)] : trainings.items).map((item, idx) =>
                                isTrainingsLoading
                                    ? (<div className={s.training_item} key={idx}>
                                                <img src={training_1} alt="trn1"/>
                                                <div className={s.training_item_wrp}>
                                                    <img src={play_item}
                                                         className={s.training_item_img}
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
                                            <div className={s.training_item}     key={idx}>
                                                <img src={training_1} alt="trn1"/>
                                                <div className={s.training_item_wrp}>
                                                    <p className={s.training_item_text}>{item.name}</p>
                                                    <img src={play_item}
                                                         className={s.training_item_img}
                                                         alt="play"
                                                         width={36}
                                                         height={36}/>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};


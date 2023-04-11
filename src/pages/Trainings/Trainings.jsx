import React from "react";
import s from "./Trainings.module.scss";
import "../../index.scss";
import play_item from "../../assets/play_item.svg";
import training_1 from "../../assets/training_1.png"
import {Feedback} from "../../components/Feedback/Feedback";
import {Link} from "react-router-dom";

export const Trainings = () => {
    const trainingList = [
        {
            img: training_1,
            name: "Упражнения для восстановления подвижности голеностопного сустава",
            url: "http://localhost:3000/training"
        },
        {
            img: training_1,
            name: "Упражнения для восстановления подвижности голеностопного сустава",
            url: "http://localhost:3000/training"
        },
        {
            img: training_1,
            name: "Упражнения для восстановления подвижности голеностопного сустава",
            url: "http://localhost:3000/training"
        },
        {
            img: training_1,
            name: "Упражнения для восстановления подвижности голеностопного сустава",
            url: "http://localhost:3000/training"
        },
        {
            img: training_1,
            name: "Упражнения для восстановления подвижности голеностопного сустава",
            url: "http://localhost:3000/training"
        },
        {
            img: training_1,
            name: "Упражнения для восстановления подвижности голеностопного сустава",
            url: "http://localhost:3000/training"
        },
    ]


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
            <Feedback
                name={"Почему важно делать упражнения ежедневно ?"}
                text={"Также как перспективное планирование, в своём классическом представлении, допускает внедрение системы обучения кадров, соответствующей насущным потребностям."}
                author={"Дмитрий Бочарников - "}
                profession={"Невролог-реабилитолог"}
            />
            <div className={'container-color'}>
                <div className={'container'}>
                    <div className={s.training}>
                        <div className={s.servicesTitleWrap}>
                            <h2 className={s.servicesTitle}>Упражнения</h2>
                        </div>

                        <ul className={s.training_list}>
                            {
                                trainingList.map((item, idx) => {
                                    return (
                                        <Link to={item.url} key={idx} >
                                            <li className={s.training_item}>
                                                <img src={item.img} alt="trn1"/>
                                                <div className={s.training_item_wrp}>
                                                    <p className={s.training_item_text}>
                                                        {item.name}
                                                    </p>
                                                    <img src={play_item}
                                                         className={s.training_item_img}
                                                         alt="play"
                                                         width={36}
                                                         height={36}/>
                                                </div>
                                            </li>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};


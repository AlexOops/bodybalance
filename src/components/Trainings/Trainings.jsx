import React from "react";
import s from "./Trainings.module.scss";
import "../../index.scss";
import doctor_three from "../../assets/doctor_3.png";
import play_item from "../../assets/play_item.svg";
import training_1 from "../../assets/training_1.png"

export const Trainings = () => {

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
            <div className={s.advice}>
                <p className={s.advice_title}>Почему важно делать упражнения ежедневно ?</p>
                <div className={s.advice_content}>
                    <img src={doctor_three} alt="doctor" width={280} height={280}/>
                    <div className={s.advice_content_description}>
                        <p className={s.advice_content_text}>Также как перспективное планирование, в своём классическом
                            представлении, допускает внедрение системы обучения кадров, соответствующей насущным
                            потребностям.</p>
                        <p className={s.advice_content_autor}>Дмитрий Бочарников - <span>Невролог-реабилитолог</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className={'container-color'}>
                <div className={'container'}>
                    <div className={s.training}>
                        <p className={s.training_title}>Упражнения</p>
                        <ul className={s.training_list}>
                            <li className={s.training_item}>
                                <img src={training_1} alt="trn1"/>
                                <div className={s.training_item_wrp}>
                                    <p className={s.training_item_text}>
                                        Упражнения для восстановления подвижности голеностопного сустава
                                    </p>
                                    <img src={play_item}
                                         className={s.training_item_img}
                                         alt="play"
                                         width={36}
                                         height={36}/>
                                </div>
                            </li>
                            <li className={s.training_item}>
                                <img src={training_1} alt="trn1"/>
                                <div className={s.training_item_wrp}>
                                    <p className={s.training_item_text}>
                                        Упражнения для восстановления подвижности голеностопного сустава
                                    </p>
                                    <img src={play_item}
                                         className={s.training_item_img}
                                         alt="play"
                                         width={36}
                                         height={36}/>
                                </div>
                            </li>
                            <li className={s.training_item}>
                                <img src={training_1} alt="trn1"/>
                                <div className={s.training_item_wrp}>
                                    <p className={s.training_item_text}>
                                        Упражнения для восстановления подвижности голеностопного сустава
                                    </p>
                                    <img src={play_item}
                                         className={s.training_item_img}
                                         alt="play"
                                         width={36}
                                         height={36}/>
                                </div>
                            </li>
                            <li className={s.training_item}>
                                <img src={training_1} alt="trn1"/>
                                <div className={s.training_item_wrp}>
                                    <p className={s.training_item_text}>
                                        Упражнения для восстановления подвижности голеностопного сустава
                                    </p>
                                    <img src={play_item}
                                         className={s.training_item_img}
                                         alt="play"
                                         width={36}
                                         height={36}/>
                                </div>
                            </li>
                            <li className={s.training_item}>
                                <img src={training_1} alt="trn1"/>
                                <div className={s.training_item_wrp}>
                                    <p className={s.training_item_text}>
                                        Упражнения для восстановления подвижности голеностопного сустава
                                    </p>
                                    <img src={play_item}
                                         className={s.training_item_img}
                                         alt="play"
                                         width={36}
                                         height={36}/>
                                </div>
                            </li>
                            <li className={s.training_item}>
                                <img src={training_1} alt="trn1"/>
                                <div className={s.training_item_wrp}>
                                    <p className={s.training_item_text}>
                                        Упражнения для восстановления подвижности голеностопного сустава
                                    </p>
                                    <img src={play_item}
                                         className={s.training_item_img}
                                         alt="play"
                                         width={36}
                                         height={36}/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};


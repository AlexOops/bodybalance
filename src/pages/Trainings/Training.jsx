import React from "react";
import s from "./Training.module.scss";
import "../../index.scss";

import {Feedback} from "../../components/Feedback/Feedback";
import {Training as MyTraining} from "../../components/Trainings/Training";


export const Training = () => {

    return (
        <>
            <div className={'container-color'}>
                <div className={'container'}>
                    <div className={s.header}>
                        <h1 className={s.title}>Тренировки</h1>
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

                        <MyTraining/>

                    </div>
                </div>
            </div>
        </>
    );
};


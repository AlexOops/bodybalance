import React from 'react';
import {Video} from "../../../../components/Trainings/Video/Video";
import s from "../AnklesSection/AnklesSection.module.scss";

const AnklesSection = () => {

    const anklesData = [{
        title: "Упражнения для восстановления подвижности голеностопного сустава",
        description: "Продемонстрированные на видео упражнения направлены на восстановление подвижности голеностопного сустава и рекомендуются к выполнению на ранней стадии реабилитации. Эти упражнения способствуют увеличению диапазона движений в суставе и уменьшению посттравматического отека. Упражнения могут выполняться в положении сидя или стоя. При повреждении боковых связок сначала следует выполнять только движения вверх и вниз. Затем постепенно можно перейти и к движениям во всем диапазоне, «выписывая» носком буквы алфавита.",
        url: "https://www.youtube.com/watch?v=dDXeXDW6af8&ab_channel=www.sportsinjuryclinic.net",
        thumbnail: "",
        duration: 1200,
        category: ""
    }, {
        title: "Изометрическое сокращение пронаторов и супинаторов стопы",
        description: "Статическое сокращение пронаторов и супинаторов стопы рекомендуется выполнять на начальной стадии реабилитации. Для укрепления задней большеберцовой мышцы (пронатора) необходимо повернуть стопу внутрь, пытаясь преодолеть при этом сопротивление. Для укрепления малоберцовых мышц (супинаторы) необходимо повернуть стопу наружу, пытаясь опять же преодолеть сопротивление. Сопротивление при выполнении упражнения может создавать ассистент, удерживая стопу руками.",
        url: "https://www.youtube.com/watch?v=ECdWxjE3iaU&ab_channel=www.sportsinjuryclinic.net",
        thumbnail: "",
        duration: 1200,
        category: ""
    }]

    return (<>
        <div className={'container-color'}>
            <div className={'container'}>
                <div className={s.header}>
                    <p className={s.title}>Голеностопный сустав</p>
                    <p className={s.text}>мобильное соединение костей голени и стопы. Анатомически его составляет
                        большебердцовая, малобердцовая и таранная кости, заключённые в суставную капсулу и окружённые
                        связками. Этот сложный блоковидный сустав даёт нам возможность ходить – он отвечает за движение
                        стопы во всех плоскостях.</p>
                </div>
            </div>

            <div className={s.servicesTitleWrap}>
                <h2 className={s.servicesTitle}>Комплекс упражнений для голеностопного сустава</h2>
            </div>

            {
                anklesData.map((item, idx) => {
                    return (<div className={s.ankles_content} key={idx}>
                        <div className={s.ankles_content_description}>
                            <p className={s.ankles_content_title}>{item.title}</p>
                            <p className={s.ankles_content_text}>{item.description}</p>
                        </div>

                        <Video url={item.url}/>

                    </div>)
                })
            }

        </div>
    </>);
};

export default AnklesSection;
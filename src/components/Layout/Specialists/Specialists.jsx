import s from './Specialists.module.scss'

export const Specialists = () => {


    return (
        <>
            <div className="container-color">
            <div className={s.main}>
                <div className={s.description}>
                    <h1 className={s.title}>Специалисты</h1>
                    <p className={s.text}>Следует отметить, что постоянный количественный рост и сфера нашей активности прекрасно подходит для реализации форм воздействия.</p>
                </div>
                <div className={s.servicesTitleWrap}>
                    <h2 className={s.servicesTitle}>Наша команда</h2>
                </div>

            </div>
        </div>
        </>
    )
}
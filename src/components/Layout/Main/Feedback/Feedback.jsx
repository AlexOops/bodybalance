import s from './Feedback.module.scss'
import customers from "../../../../assets/customers.png";
import doubleQuotes from "../../../../assets/double-quotes.svg";

export const Feedback = ({name, text, author, profession}) => {
    return (
            <div className={'container'}>
                <h2 className={s.section}>{name}</h2>
                <div className={s.direction}>
                    <div className={s.img}>
                        <img src={customers} alt=""/>
                    </div>
                    <div className={s.feedback}>
                        <div className={s.line}></div>
                        <img className={s.quotes} src={doubleQuotes} alt=""/>
                        <p>{text}</p>
                        <p className={s.name}>{author} <span className={s.profession}>{profession}</span></p>
                        <div className={s.line}></div>
                    </div>
                </div>
            </div>



    )
}
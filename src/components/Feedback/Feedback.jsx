import s from './Feedback.module.scss'
import customers from "../../assets/customers.png";
import doubleQuotes from "../../assets/double-quotes.svg";
import {ArrowLeft} from "../Arrow/ArrowLeft";
import {ArrowRight} from "../Arrow/ArrowRight";

export const Feedback = ({name, text, author, profession}) => {
    return (

            <div className={'flexRelative'}>
                    <h2 className={s.section}>{name}</h2>
                    <div className={s.direction}>
                        <ArrowLeft width={64}/>
                        <div className={`${s.feedback} container`}>
                            <div className={s.img}>
                                <img src={customers} alt=""/>
                            </div>
                            <div>
                                <div className={s.line}/>
                                <img className={s.quotes} src={doubleQuotes} alt=""/>
                                <p>{text}</p>
                                <p className={s.name}>{author} <span className={s.profession}>{profession}</span></p>
                                <div className={s.line}/>
                            </div>
                        </div>
                        <ArrowRight/>
                    </div>

                </div>




    )
}
import s from './Partners.module.scss'
import cmrt from "../../../../assets/cmrt.svg";
import powerdot from "../../../../assets/powerdot.svg";
import rocktape from "../../../../assets/rocktape.svg";

export const Partners = () => {
    return (
        <div className={'container'}>
        <div className={s.partners}>
            <img className={s.img} src={cmrt} alt="cmrt"/>
            <img className={s.img} src={powerdot} alt="powerdot"/>
            <img className={s.img} src={rocktape} alt="rocktape"/>
        </div>
        </div>
    )
}
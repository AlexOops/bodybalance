import logo from '../../assets/logo.svg'
import s from './Header.module.scss'
import '../../index.scss'
import {Navigate} from "../Navigate/Navigate";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";
import {openModal} from "../../redux/slices/modal";
import Modal from "../Modal/Modal";
import {Login} from "../../pages/Login/Login";
import {Registration} from "../../pages/Registration/Registration";

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const typeModalLogin = 'modalLogin'
    const typeModalRegistration = 'modalRegister'

    const onClickLogout = () => {
        if(window.confirm("Вы действительно хотите выйти?")){
            dispatch(logout()); //обнулили данные в state auth
            window.localStorage.removeItem('token'); //удалили токен из localStorage
        }
    }

    const onClickLogin = () => {
        //контент логина в модальном окне
        dispatch(openModal(typeModalLogin));
    }

    const onClickRegister = () => {
        //контент регистрации в модальном окне
        dispatch(openModal(typeModalRegistration));
    }

    return (
        <div className={'container-color'}>
            <div className={'container'}>
                <div className={s.header}>
                    <Link to={'/'}>
                        <img className={s.logo} src={logo} alt="logo"/>
                    </Link>
                    <Navigate/>


                    <div className={s.login}>

                        {isAuth ? (
                            <button onClick={onClickLogout} className={`${s.singUp} ${s.button}`}>Выход</button>
                        ) : (<>

                            <button className={`${s.singUp} ${s.button}`} onClick={onClickLogin}>Вход</button>

                            <button className={`${s.singOut} ${s.button}`} onClick={onClickRegister}>Регистрация</button>
                            <Modal type={typeModalLogin}><Login/></Modal>
                            <Modal type={typeModalRegistration}><Registration/></Modal>

                        </>)}

                    </div>
                </div>
            </div>
        </div>

    )
}
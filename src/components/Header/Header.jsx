import logo from '../../assets/logo.svg'
import s from './Header.module.scss'
import '../../index.scss'
import {Navigate} from "../Navigate/Navigate";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const onClickLogout = () => {
        if(window.confirm("Вы действительно хотите выйти?")){
            dispatch(logout()); //обнулили данные в state auth
            window.localStorage.removeItem('token'); //удалили токен из localStorage
        }
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
                            <Link to="/login">
                            <button className={`${s.singUp} ${s.button}`}>Вход</button>
                            </Link>
                            <Link to="/register">
                            <button className={`${s.singOut} ${s.button}`}>Регистрация</button>
                            </Link>
                        </>)}

                    </div>
                </div>
            </div>
        </div>

    )
}
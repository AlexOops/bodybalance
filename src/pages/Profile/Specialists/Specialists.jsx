import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchEmployers} from "../../../redux/slices/employers";
import s from "./Specialists.module.scss";


export const Specialists = () => {

    // const dispatch = useDispatch();
    // const employers = useSelector(state => state.employers);
    //
    //
    // useEffect(() => {
    //     dispatch(fetchEmployers())
    // }, [])

    return (
        <>
            <h1 className={s.title}>Специалисты</h1>

            <div className={s.container}>
                <div className={s.content}>
                    {/*{*/}
                    {/*    employers.map((item, idx) => {*/}
                    {/*        return (*/}
                    {/*            <ul className={s.specialists}>*/}
                    {/*                <li className={s.specialists__item}>*/}
                    {/*                    <img src="" alt="avatar"/>*/}
                    {/*                    <p className={s.specialists__item__name}></p>*/}

                    {/*                </li>*/}
                    {/*            </ul>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}
                </div>
            </div>
        </>

    );
};
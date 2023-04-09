import React, {useEffect} from 'react';
import s from './Modal.module.scss';
import cross from '../../assets/modal_cross.svg'
import {useDispatch, useSelector} from "react-redux";
import {active, selectIsActive} from "../../redux/slices/modal";
const Modal = ({children, width='1070px', height='490px'}) => {
    const dispatch = useDispatch();
    const modalActive = useSelector(selectIsActive);
    console.log('globalActive', modalActive)
    useEffect(() => {
        if (modalActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [modalActive]);
    return (
        <div className={(modalActive) ? `${s.modal} ${s.active}` : s.modal} onClick={()=>dispatch(active(false))}>
            <div style={{ width, height }} className={(modalActive) ? `${s.content} ${s.active}` : s.content} onClick={(e)=> e.stopPropagation()}>
                <div className={s.cross} onClick={()=>dispatch(active(false))}><img className={s.crossImg} src={cross} alt=""/></div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
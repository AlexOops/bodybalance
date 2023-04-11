import React, {useEffect} from 'react';
import s from './Modal.module.scss';
import cross from '../../assets/modal_cross.svg'
import {useDispatch, useSelector} from "react-redux";
import {active, closeModal, selectIsActive, selectModalBody} from "../../redux/slices/modal";
const Modal = () => {
    const dispatch = useDispatch();
    const modalActive = useSelector(selectIsActive);
    const body = useSelector(selectModalBody);

    useEffect(() => {

        if (modalActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [modalActive]);
    return (
        <div className={(modalActive) ? `${s.modal} ${s.active}` : s.modal} onClick={()=>dispatch(closeModal())}>
            <div className={(modalActive) ? `${s.content} ${s.active}` : s.content} onClick={(e)=> e.stopPropagation()}>
                <div className={s.cross} onClick={()=>dispatch(closeModal())}><img className={s.crossImg} src={cross} alt=""/></div>
                {body}
            </div>
        </div>
    );
};

export default Modal;
import React from 'react';
import s from './Modal.module.scss';
import cross from '../../assets/modal_cross.svg'
const Modal = ({active, setActive, children}) => {
    return (
        <div className={(active) ? `${s.modal} ${s.active}` : s.modal} onClick={()=>setActive(false)}>
            <div className={(active) ? `${s.content} ${s.active}` : s.content} onClick={(e)=> e.stopPropagation()}>
                <div className={s.cross} onClick={()=>setActive(false)}><img src={cross} alt=""/></div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
import React from 'react';
import s from "./Card.module.scss";
import ReactMarkdown from "react-markdown";
import {CardSkeleton} from "./CardSkeleton";
import Modal from "../../Modal/Modal";
import {useState} from "react";
import card_img from "../../../assets/rectangle33.jpg";
export const Card = ({
    id,
    price,
    name,
    description,
    text,
    isPopular,
    imageUrl,
    isLoading,
}) => {
    const[modalActive, setModalActive] = useState(false);

    if (isLoading){
        return <CardSkeleton/>
    }
    return (
       <>
           <div className={s.card} onClick={()=> setModalActive(true)}>
               <div className={s.flexCenter}>
                   <div className={`${s.img} ${s.center}`}>
                       <img src={imageUrl} alt=""/>
                   </div>

                   <h3 className={s.name}>
                       {name}
                   </h3>

                   {isPopular ?
                       <>
                           <ReactMarkdown>{description}</ReactMarkdown>
                       </>
                       :
                       <>
                           <div className={s.text}><ReactMarkdown>{text}</ReactMarkdown></div>
                       </>
                   }
               </div>

               {isPopular?? <div className={s.price}>{price}</div>}

           </div>
           <Modal active={modalActive} setActive={setModalActive}>
               <img className={s.serviceImage} src={card_img} alt=""/>
               <div className={s.modalCard}>
                   <h3 className={s.modalName}>
                       {name}
                   </h3>
                   <div className={s.margin_tb_10}>
                   <ReactMarkdown>{description}</ReactMarkdown>
                   </div>
                   <div className={s.moduleText}>Данный комплекс отличнно подойдет при:</div>
                   <div className={s.moduleFullText}><ReactMarkdown>{text}</ReactMarkdown></div>
                   <div className={s.price}>{price}</div>
               </div>

           </Modal>
       </>
    );
};
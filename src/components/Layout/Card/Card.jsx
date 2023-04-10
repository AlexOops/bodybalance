import React from 'react';
import s from "./Card.module.scss";
import ReactMarkdown from "react-markdown";
import {CardSkeleton} from "./CardSkeleton";
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
    isFull,
}) => {
   if (isLoading) {
        return <CardSkeleton/>
    }
   if (isFull) {
       return <div className={s.fullCard}>
           <img className={s.serviceImage} src={card_img} alt=""/>
           <div className={s.modalCard}>
               <div>
                   <h3 className={s.modalName}>
                       {name}
                   </h3>
                   <div className={s.margin_tb_10}>
                       <ReactMarkdown>{description}</ReactMarkdown>
                   </div>
                   <div className={s.moduleText}>Данный комплекс отличнно подойдет при:</div>
                   <div className={s.moduleFullText}><ReactMarkdown>{text}</ReactMarkdown></div>
               </div>

               <div className={s.flexSB}>
                   <div className={s.price}>{price}</div>
                   <button className={s.button} type ="submit">Записаться </button>
               </div>
           </div>
       </div>
   }

    return (
       <>
           <div className={s.card}>
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


       </>
    );
};
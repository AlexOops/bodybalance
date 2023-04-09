import React from 'react';
import s from "./Card.module.scss";
import ReactMarkdown from "react-markdown";
import {CardSkeleton} from "./CardSkeleton";
import Modal from "../../Modal/Modal";
import {useState} from "react";
import card_img from "../../../assets/rectangle33.jpg";
import {useDispatch, useSelector} from "react-redux";
import {active, selectIsActive} from "../../../redux/slices/modal";
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
   if (isLoading){
        return <CardSkeleton/>
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
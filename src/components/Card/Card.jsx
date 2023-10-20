import React from 'react';
import s from "./Card.module.scss";
import ReactMarkdown from "react-markdown";
import {CardSkeleton} from "./CardSkeleton";
import card_img from "../../assets/rectangle33.jpg";
import {useDispatch} from "react-redux";
import {setSelectedService} from "../../redux/slices/services";
import {closeModal} from "../../redux/slices/modal";
import {setSelectedEmployer} from "../../redux/slices/employers";
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
    handleAction,
    employer,
}) => {


    const dispatch = useDispatch();
    const handleSelectService = () => {
        dispatch(setSelectedService({id: id, name:name}));
        dispatch(closeModal('modalService'));
        (employer) ? dispatch(setSelectedEmployer({id: employer._id, name: employer.fullName})) : console.log('У услуги еще нет сотрудника')
        handleAction(); //действие в родительском компоненте.
    }


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
                   <button className={s.button} onClick={handleSelectService} type ="submit">Записаться </button>
               </div>
           </div>
       </div>
   }

    return (
       <>
           <div className={s.card}>
               <div className={s.flexCenter}>
                   <div className={`${s.img} ${s.center}`}>
                       <img className={s.image} src={imageUrl} alt=""/>
                   </div>

                   <h3 className={s.name}>
                       {name}
                   </h3>

                   {isPopular ?
                       <div className={s.description}>
                           <ReactMarkdown>{description}</ReactMarkdown>
                       </div>
                       :
                       <div>
                           <div className={s.text}><ReactMarkdown>{text}</ReactMarkdown></div>
                       </div>
                   }
               </div>

               {isPopular?? <div className={s.price}>{price}</div>}

           </div>


       </>
    );
};
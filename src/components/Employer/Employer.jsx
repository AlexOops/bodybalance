import React from 'react';
import s from "./Employer.module.scss";
import ReactMarkdown from "react-markdown";
import {EmployerSkeleton} from "./EmployerSkeleton";
import card_img from "../../assets/rectangle33.jpg";
import {useDispatch} from "react-redux";
import {setSelectedEmployer} from "../../redux/slices/employers";
import {closeModal} from "../../redux/slices/modal";
import {useRef} from "react";
export const Employer = ({
    id,
    name,
    profession,
    description,
    certificates,
    text,
    imageUrl,
    isLoading,
    isFull,
    handleAction,
}) => {

    const dispatch = useDispatch();
    const handleSelectService = () => {
        dispatch(setSelectedEmployer({id: id, name:name}));
        dispatch(closeModal('modalService'));
        handleAction(); //действие в родительском компоненте.
    }


   if (isLoading) {
        return <EmployerSkeleton/>
    }
   if (isFull) {
       return <div className={s.fullCard}>
           <div className={s.leftBox}>
               <img className={s.employerImage} src={imageUrl} alt=""/>
               <div className={s.certificates}>{certificates?.map((doc,key) =>
                   <img key={"certificate"+key} className={s.certificateItem} src={`http://localhost:4444${doc}`} alt="сертификат"/>
               )}</div>
           </div>

           <div className={s.modalCard}>
               <div>
                   <h3 className={s.modalName}>
                       {name}
                   </h3>
                   <h4>{profession}</h4>
                   <div className={s.margin_tb_10}>
                       <ReactMarkdown>{description}</ReactMarkdown>
                   </div>
                   <div className={s.moduleText}>Достижения:</div>
                   <div className={s.moduleFullText}><ReactMarkdown>{text}</ReactMarkdown></div>
               </div>

               <div className={s.flexSB}>
                   <button className={s.button} onClick={handleSelectService} type ="submit">Записаться на прием </button>
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
               </div>

           </div>


       </>
    );
};
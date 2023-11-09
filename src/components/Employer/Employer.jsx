import React from 'react';
import s from "./Employer.module.scss";
import ReactMarkdown from "react-markdown";
import {EmployerSkeleton} from "./EmployerSkeleton";
import {useDispatch} from "react-redux";
import {setSelectedEmployer} from "../../redux/slices/employers";
import {closeModal} from "../../redux/slices/modal";

export const Employer = ({
                             id,
                             name,
                             profession,
                             description,
                             certificates,
                             achievements,
                             imageUrl,
                             isLoading,
                             isFull,
                             handleAction,
                             openImageFromParent
                         }) => {

    const dispatch = useDispatch();

    const handleSelectService = () => {
        dispatch(setSelectedEmployer({id: id, name: name + ' - ' + profession}));
        dispatch(closeModal('modalEmployer'));
        handleAction(); //действие в родительском компоненте.
    }

    if (isLoading) {
        return <EmployerSkeleton/>
    }

    if (isFull) {
        return <div className={s.fullCard}>

            <div className={s.leftBox}>
                <img className={s.employerImageFull} src={imageUrl} alt="аватар"/>

                <div className={s.certificates}>{certificates?.map((doc, key) =>
                    <img key={"certificate" + key}
                         className={s.certificateItem}
                         src={`http://localhost:4444${doc}`}
                         alt="сертификат"
                         onClick={() => openImageFromParent(doc)}
                    />
                )}
                </div>

            </div>

            <div className={s.fullCardDescription}>
                <div>
                    <h3 className={s.employerTitleFull}>
                        {name}
                    </h3>
                    <div className={s.professionFull}>{profession}</div>
                    <div className={s.margin_tb_10}>
                        <ReactMarkdown>{description}</ReactMarkdown>
                    </div>
                    <div className={s.moduleText}>Достижения:</div>
                    <div className={s.moduleFullText}><ReactMarkdown>{achievements}</ReactMarkdown></div>
                </div>

                <div className={s.flexSB}>
                    <button className={s.button} onClick={handleSelectService} type="submit">Записаться на прием
                    </button>
                </div>
            </div>
        </div>
    }

    return (
        <div key={`employer${id}`} className={s.cardDoctor}>
            <img src={imageUrl} alt="doc" className={s.cardImage}/>
            <h2 className={s.employerTitle}>{name}</h2>
            <p className={s.profession}>{profession}</p>
        </div>

    );
};
import React, {useEffect, useState} from 'react';
import s from './Carousel.module.scss';
import arrow from "../../assets/Vector.svg";
import {Dots} from "../Slider2/Dots/Dots";
import {nanoid} from "nanoid";

const Carousel = ({children}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [length, setLength] = useState(children.length);

    const next = () => {
        if (currentIndex < (length - 1)) {
            setCurrentIndex( prevState => prevState + 1);

        }
    };

    const prev = () => {
      if (currentIndex > 0) {
          setCurrentIndex( prevState => prevState - 1);

      }
    };

    const clickDot = (index) => {
        setCurrentIndex(index);
    }

    useEffect(()=> {
        setLength(children.length);
    }, [children]);



    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                {
                    // currentIndex > 0 &&
                    <button className={s.leftArrow} onClick={prev}>
                        <svg width="11" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg" transform ='scale (-1, 1)'>
                            <path d="M2 24L13 13L2 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                }

                <div className={s.contentWrapper}>
                    <div
                        className={s.content}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {children}
                    </div>
                </div>
                {
                    // currentIndex < (length -1) &&
                    <button className={s.rightArrow} onClick={next}>
                        <svg width="11" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 24L13 13L2 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                }

            </div>
            <div className={s.dots}>
                {[...Array(children.length)].map((el, index) =>
                    <div className={(currentIndex===index)?  `${s.dot} ${s.dotActive}` : s.dot} onClick={ () =>clickDot(index)}  key={nanoid()}
                    />
                )}
            </div>
        </div>
    );
};

export default Carousel;
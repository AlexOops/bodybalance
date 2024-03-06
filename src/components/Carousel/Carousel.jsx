import React, {useEffect, useState} from 'react';
import s from './Carousel.module.scss';
import {nanoid} from "nanoid";

const Carousel = ({children, show = 1}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [length, setLength] = useState(0);


    useEffect(() => {
        setLength(children.length);
    }, [children]);

    useEffect(() => {
        if (show === 1) {
            if (currentIndex >= length) {
                setCurrentIndex(0)
            }
            const timeout = setInterval(() => {
                setCurrentIndex(prevState => prevState + 1)
            }, 10000)
            return () => {
                clearInterval(timeout)
            }
        }

    }, [currentIndex, children.length, length])


    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1);
        } else if (currentIndex >= length) {
            setCurrentIndex(0)
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1);
        } else if (currentIndex < 0) {
            setCurrentIndex(children.length - 1)
        }
    };

    const clickDot = (index) => {
        setCurrentIndex(index);
    }


    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                {
                    // currentIndex > 0 &&
                    <button className={s.leftArrow} onClick={prev}>
                        <svg width="11" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                             transform='scale (-1, 1)'>
                            <path d="M2 24L13 13L2 2" stroke="white" strokeWidth="3" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </button>
                }

                {!(show > 0) ?

                    <div className={s.contentWrapper}>
                        <div
                            className={s.content}
                            style={{transform: `translateX(-${currentIndex * 100}%)`}}
                        >
                            {children}
                        </div>
                    </div>

                    :

                    <div className={s.contentWrapper}>
                        <div
                            className={`${s.content} ${s['num' + show]}`}
                            style={{transform: `translateX(-${currentIndex * (100 / show)}%)`}}
                        >
                            {children}
                        </div>
                    </div>
                }
                {
                    // currentIndex < (length -1) &&
                    <button className={s.rightArrow} onClick={next}>
                        <svg width="11" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 24L13 13L2 2" stroke="white" strokeWidth="3" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </button>
                }

            </div>
            {
                !(show > 1) &&
                < div className={s.dots}>
                    {[...Array(children.length)].map((el, index) =>
                        <div className={(currentIndex === index) ? `${s.dot} ${s.dotActive}` : s.dot}
                             onClick={() => clickDot(index)} key={nanoid()}
                        />
                    )}
                </div>
            }
        </div>
    );
};

export default Carousel;
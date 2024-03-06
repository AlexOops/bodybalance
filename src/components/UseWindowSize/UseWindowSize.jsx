import { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize(); // Вызываем при первой загрузке страницы

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
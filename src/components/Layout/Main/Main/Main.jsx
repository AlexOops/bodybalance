import {Header} from "../../../Header/Header";
import {Footer} from "../../../Footer/Footer";
import {Outlet, useLocation} from "react-router-dom";
import {Slider} from "../Slider/Slider";
import {PopularServices} from "../PopularServices/PopularServices";
import {TeamDoctor} from "../TeamDoctor/TeamDoctor";
import {Feedback} from "../Feedback/Feedback";
import {Partners} from "../Partners/Partners";

export const Main = () => {
    const location = useLocation()
    return (
        <>
            <Header/>
            {location.pathname === '/' ?
                <>
                <Slider />
                <PopularServices />
                <TeamDoctor />
                <Feedback />
                <Partners/>
                </>
                :
                <Outlet/>
            }
            <Footer/>
        </>
    )
}
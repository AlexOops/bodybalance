import {PopularServices} from "../../components/Main/PopularServices/PopularServices";
import {TeamDoctor} from "../../components/Main/TeamDoctor/TeamDoctor";
import {Feedbacks} from "../../components/Main/Feedbacks/Feedbacks";
import {Partners} from "../../components/Main/Partners/Partners";
import {Slider2} from "../../components/Slider2/Slider2";

export const Main = () => {
    return (
        <>
            <Slider2/>
            <PopularServices/>
            <TeamDoctor/>
            <Feedbacks/>
            <Partners/>
        </>
    )
}

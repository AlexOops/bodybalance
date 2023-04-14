import {createBrowserRouter} from "react-router-dom";
import {Main} from "./components/Layout/Main/Main/Main";
import {Contacts} from "./pages/Contacts/Contacts";
import {Services} from "./pages/Services/Services";
import {Trainings} from "./pages/Trainings/Trainings";
import {Login} from "./pages/Login/Login";
import {Registration} from "./pages/Registration/Registration";
import {Specialists} from "./pages/Specialists/Specialists";
import {OnlineRehabilitation} from "./pages/OnlineRehabilitation/OnlineRehabilitation";
import AnklesSection from "./pages/Trainings/Video/AnklesSection/AnklesSection";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/contacts",
                element: <Contacts/>,
            },
            {
                path: "/online_rehabilitation",
                element: <OnlineRehabilitation/>,
            },
            {
                path: "/services",
                element: <Services/>,
            },
            {
                path: "/specialists",
                element: <Specialists/>,
            },
            {
                path: "/training",
                element: <Trainings/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Registration/>,
            },
            {
                path: "/training/ankle",
                element: <AnklesSection/>,
            },
        ]
    },
]);
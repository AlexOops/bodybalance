import {createBrowserRouter} from "react-router-dom";
import {Main} from "./components/Layout/Main/Main/Main";
import {Contacts} from "./pages/Contacts/Contacts";
import {OnlineRehabilitation} from "./pages/OnlineRehabilitation/OnlineRehabilitation";
import {Services} from "./pages/Services/Services";
import {Trainings} from "./pages/Trainings/Trainings";
import {Specialists} from "./pages/Specialists/Specialists";

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

        ]
    },
]);
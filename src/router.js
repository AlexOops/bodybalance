import {createBrowserRouter} from "react-router-dom";
import {Main} from "./components/Layout/Main/Main/Main";
import {Contacts} from "./pages/Contacts/Contacts";
import {About} from "./components/Layout/About";
import {OnlineRecording} from "./components/Layout/OnlineRecording";
import {Services} from "./pages/Services/Services";
import {Trainings} from "./pages/Trainings/Trainings";
import {Specialists} from "./components/Layout/Specialists/Specialists";


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
                path: "/about",
                element: <About/>,
            },
            {
                path: "/online_recording",
                element: <OnlineRecording/>,
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
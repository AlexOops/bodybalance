import {createBrowserRouter} from "react-router-dom";
import {Main} from "./components/Layout/Main/Main/Main";
import {Contacts} from "./components/Contacts/Contacts";
import {About} from "./components/Layout/About";
import {OnlineRecording} from "./components/Layout/OnlineRecording";
import {Services} from "./components/Layout/Services";
import {Specialists} from "./components/Layout/Specialists";
import {Training} from "./components/Layout/Training";
import {Login} from "./pages/Login";
import {Registration} from "./pages/Registration";


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
                element: <Training/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Registration/>,
            },
        ]
    },
]);
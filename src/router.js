import {createBrowserRouter} from "react-router-dom";
import {Main} from "./components/Layout/Main/Main/Main";
import {Contacts} from "./pages/Contacts/Contacts";
import {Services} from "./pages/Services/Services";
import {Training} from "./pages/Trainings/Training";
import {Login} from "./pages/Login/Login";
import {Registration} from "./pages/Registration/Registration";
import {Specialists} from "./pages/Specialists/Specialists";
import {OnlineRehabilitation} from "./pages/OnlineRehabilitation/OnlineRehabilitation";
import {ErrorPage} from "./pages/404/ErrorPage";
import {Videos} from "./pages/Trainings/Videos/Videos";
import {Admin} from "./pages/admin/Admin";
import {EmailAdmin} from "./pages/admin/email/EmailAdmin";
import {PatientsAdmin} from "./pages/admin/patients/PatientsAdmin";
import {SpecialistsAdmin} from "./pages/admin/specialists/SpecialistsAdmin";
import {SettingsAdmin} from "./pages/admin/settings/SettingsAdmin";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/contacts",
                element: <Contacts/>,
            },
            {
                path: "/online-rehabilitation",
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
            {
                path: "/training/:id",
                element: <Videos/>,
            },
        ]
    },
    {
        path: "/admin",
        element: <Admin/>,
        children: [
            {
                path: "/admin/email",
                element: <EmailAdmin/>,
            },
            {
                path: "/admin/patients",
                element: <PatientsAdmin/>,
            },
            {
                path: "/admin/specialists",
                element: <SpecialistsAdmin/>,
            },
            {
                path: "/admin/settings",
                element: <SettingsAdmin/>,
            },
        ]
    }
]);
import {createBrowserRouter} from "react-router-dom";
import {LayoutPage} from "./components/Layout/LayoutPage";
import {Main as Test}  from "./pages/Main/Main";
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
import {Customers} from "./pages/admin/Customers/Customers";
import {SpecialistsAdmin} from "./pages/admin/specialists/SpecialistsAdmin";
import {SettingsAdmin} from "./pages/admin/settings/SettingsAdmin";
import {Records} from "./pages/admin/Records/Records";

//profile
import {ProfileMain} from "./pages/Profile/ProfileMain/ProfileMain";
import {ProfileLayout, ProfileLoyout} from "./pages/Profile/ProfileLayout";
import {Appointments as ProfileAppointments} from "./pages/Profile/Appointments/Appointments";
import {Trainings as ProfileTrainings} from "./pages/Profile/Trainings/Trainings";
import {Specialists as ProfileSpecialists} from "./pages/Profile/Specialists/Specialists";
import {Recommendations} from "./pages/Profile/Recommendations/Recommendations";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Test/>,
            },
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
                path: "/admin/records",
                element: <Records/>,
            },
            {
                path: "/admin/customers",
                element: <Customers/>,
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
    },
    {
        path: "/profile",
        element:  <ProfileLayout/>,
        children: [
            {
                path: "/profile",
                element: <ProfileMain/>
            },
            {
                path: "/profile/appointments",
                element: <ProfileAppointments/>
            },
            {
                path: "/profile/trainings",
                element: <ProfileTrainings/>
            },
            {
                path: "/profile/specialists",
                element: <ProfileSpecialists/>
            },
            {
                path: "/profile/recommendations",
                element: <Recommendations/>
            }
        ]
    }
]);
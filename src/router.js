import {createBrowserRouter} from "react-router-dom";
import {LayoutPage} from "./components/Layout/LayoutPage";
import {Main as Test}  from "./pages/Main/Main";
import {Contacts} from "./pages/Contacts/Contacts";
import {Services} from "./pages/Services/Services";
import {Login} from "./pages/Login/Login";
import {Registration} from "./pages/Registration/Registration";
import {Specialists} from "./pages/Specialists/Specialists";
import {OnlineRehabilitation} from "./pages/OnlineRehabilitation/OnlineRehabilitation";
import {ErrorPage} from "./pages/404/ErrorPage";
import {ResetPassword} from "./pages/ResetPassword/ResetPassword";

//admin
import {Admin} from "./pages/admin/Admin";
import {Consultations} from "./pages/admin/Consultations/Consultations";
import {Customers} from "./pages/admin/Customers/Customers";
import {Specialists as SpecialistsAdmin} from "./pages/admin/Specialists/Specialists";
import {Services as ServicesAdmin} from "./pages/admin/Services/Services";
import {Appointments} from "./pages/admin/Appointments/Appointments";
import Calendar from "./pages/admin/Calendar/Calendar";
import {Training as AdminTraining} from "./pages/admin/Training/Training";
import {Main as AdminMain} from "./pages/admin/Main/Main";

//profile
import {Main as ProfileMain} from "./pages/Profile/Main/Main";
import {Profile} from "./pages/Profile/Profile";
import {Appointments as ProfileAppointments} from "./pages/Profile/Appointments/Appointments";
import {Training as ProfileTraining} from "./pages/Profile/Training/Training";
import {Security} from "./pages/Profile/Security/Security";

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
                path: "/Specialists",
                element: <Specialists/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Registration/>,
            }
        ]
    },
    {
        path: "/admin",
        element: <Admin/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/admin",
                element: <AdminMain/>
            },
            {
                path: "/admin/Consultations",
                element: <Consultations/>,
            },
            {
                path: "/admin/records",
                element: <Appointments/>,
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
                path: "/admin/services",
                element: <ServicesAdmin/>,
            },
            {
                path: "/admin/calendar",
                element: <Calendar/>,
            },
            {
                path: "/admin/training",
                element: <AdminTraining/>,
            },
        ]
    },
    {
        path: "/profile",
        element:  <Profile/>,
        errorElement: <ErrorPage/>,
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
                path: "/profile/training",
                element: <ProfileTraining/>
            },
            {
                path: "/profile/security",
                element: <Security/>
            },


        ]
    },
    {
        path: "/reset-password/:token",
        element: <ResetPassword/>,
        errorElement: <ErrorPage/>,
    }
]);
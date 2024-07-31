///routes.tsx
import "../index.css";
import Root from "../layouts/Root.tsx";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.tsx"
import ProtectedRoutes from "./ProtecetdRoutes.tsx";
import Login from "../pages/Login.tsx";
import OonTop from "../pages/OonTop.tsx";
import PMI from "../pages/PMI.tsx";
import Register from "../pages/Register.tsx";
import Profile from "../pages/Profile.tsx";
import CRM from "../pages/CRM.tsx";
import UserEdit from "../pages/UserEdit.tsx";
import PatientProfile from "../pages/PatientProfile.tsx";
import PatientEdit from "../pages/PatientEdit.tsx";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: "/",
        children: [
            { index: true, element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },

            {
                path: "/oontop", element:
                    <ProtectedRoutes>
                        <OonTop />
                    </ProtectedRoutes>
            },
            {
                path: "/pmi", element:
                    <ProtectedRoutes>
                        <PMI />
                    </ProtectedRoutes>
            },
            {
                path: "/profile", element: (
                    <ProtectedRoutes>
                        <Profile />
                    </ProtectedRoutes>
                )
            },
            {
                path: "/crm", element: (
                    <ProtectedRoutes>
                        <CRM />
                    </ProtectedRoutes>
                )
            },
            {
                path: "/profile/:id", element:
                    <ProtectedRoutes>
                        <UserEdit />
                    </ProtectedRoutes>
            },
            {
                path: "/oontop/:id", element:
                    <ProtectedRoutes>
                        <PatientProfile />
                    </ProtectedRoutes>
            },
            {
                path: "/patientprofile/:id", element:
                    <ProtectedRoutes>
                        <PatientEdit />
                    </ProtectedRoutes>
            },






        ],
    },
]);

export default router
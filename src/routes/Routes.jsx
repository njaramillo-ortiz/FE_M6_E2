import { Route, Routes } from "react-router";
import { Doctors } from "./Doctors";
import { Home } from "./Home";
import { AppointmentForm } from "../components/AppointmentForm";
import { Admin } from "./Admin";
import { Agenda } from "./Agenda";
import ProtectedRoute from "./ProtectedRoute";

export default function HospitalRoutes(){

    return(
        <Routes>
            <Route
                path='/'
                element={<Home />}
            />
            <Route
                path='doctors'
                element={<Doctors />} 
            />
            <Route
                path='reserve'
                element={
                    <ProtectedRoute allowedRoles={['user','admin']} >
                        <AppointmentForm />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path='admin'
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <Admin />
                    </ProtectedRoute>
                }
            />
            <Route 
                path='agenda'
                element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                        <Agenda />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
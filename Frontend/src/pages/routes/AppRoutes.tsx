import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import Dashboard from "../Dashboard";
import { ProtectedRoute } from "./ProtectedRoute";

function AppRoutes(){
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate to='/login' replace />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} />

            <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>}
            />
        </Routes>
    </BrowserRouter>
    )
}
export default AppRoutes;
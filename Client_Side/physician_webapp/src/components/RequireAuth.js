import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () =>{
    const { auth } = useAuth();
    console.log(auth);
    const location = useLocation();
    return(
        auth?.payload ? <Outlet /> : <Navigate to="/login" state = {{from: location}} replace />
    );
}

export default RequireAuth;
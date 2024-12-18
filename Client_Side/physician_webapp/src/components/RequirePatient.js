import { useLocation, Navigate, Outlet } from "react-router-dom";
import usePat from "../hooks/usePat";

const RequirePatient = () =>{
    const { pat } = usePat();
    console.log(pat);
    const location = useLocation();
    return(
        pat?.First_Name ? <Outlet /> : <Navigate to="/Dashboard" state = {{from: location}} replace />
    );
}

export default RequirePatient;
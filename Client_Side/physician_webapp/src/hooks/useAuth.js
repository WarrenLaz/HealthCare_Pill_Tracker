import { useContext } from "react";
import AuthContext from "../context/Auth";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;
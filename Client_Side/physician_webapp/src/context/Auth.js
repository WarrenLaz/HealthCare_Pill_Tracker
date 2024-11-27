import { useState, createContext  } from "react";

const AuthContext = createContext({});

export const Auth = ({children})=>{
    const [auth, setAuth] = useState({});
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
import { useState, createContext  } from "react";

const AuthContext = createContext({});

export const Auth = ({children})=>{
    const [auth_, setAuth] = useState({});

    return(
        <AuthContext.Provider value={{auth_, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
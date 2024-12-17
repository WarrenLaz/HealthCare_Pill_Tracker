import { useState, createContext  } from "react";

const PatContext = createContext({});

export const PatInfo = ({children})=>{
    const [pat, setPat] = useState({});
    return(
        <PatContext.Provider value={{pat, setPat}}>
            {children}
        </PatContext.Provider>
    );
}

export default PatContext;
import { useContext } from "react";
import PatContext from "../context/PatInfo";

const usePat = () => {
    return useContext(PatContext);
}

export default usePat;
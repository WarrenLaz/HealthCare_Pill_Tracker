import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    console.log("PAYLOAD: ", auth.payload);

    useEffect(() => {
        //let isMounted = true;
        console.log("working2");
        
        const verifyRefreshToken = async () => {
            try {
                console.log("work")
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        }

        !auth?.payload? verifyRefreshToken() : setIsLoading(false);

    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.payload)}`)
    }, [isLoading])

    return (
        <>
            {isLoading ? <p>Loading</p> : <Outlet/>}
        </>
    )
}

export default PersistLogin
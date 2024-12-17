import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('http://localhost:8000/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log("AccessToken1 : ",  JSON.stringify(prev));
            console.log("AccessToken2 : " ,response.data.packet);
            return { ...prev, payload: response.data.packet }
        });
        return response.data.packet;
    }
    return refresh;
};

export default useRefreshToken;
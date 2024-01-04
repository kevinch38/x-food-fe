import axiosInstance from "../api/axiosInstance"

const AuthService = () => {
    const TOKEN_KEY = 'token';

    const login = async (user) => {
        const { data } = await axiosInstance.post('/api/auth/admins/login', user);
        return data;
    }

    const logout = () => {
        sessionStorage.clear();
    }

    const getTokenFromStorage = () => {
        return sessionStorage.getItem(TOKEN_KEY);
    }
    
    const verifyToken = async (token) => {
        const { data } = await axiosInstance.post('/api/auth/admins/verify', token);
        return data;
    }

    return {
        login,
        logout,
        getTokenFromStorage,
        verifyToken,
    }
}

export default AuthService;

import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

if(process.env.REACT_APP_STAGE === 'staging'){
    axios.defaults.baseURL = 'http://staging01-django-react-boilerplate.net'
}
else if(process.env.REACT_APP_STAGE === 'production'){
    axios.defaults.baseURL = 'http://django-react-boilerplate.net';
}
else {
    axios.defaults.baseURL = 'http://localhost:8000'
}


const AuthContext = createContext();
export default AuthContext;
axios.defaults.withCredentials = true;
// Auth Provider
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [authTokens, setAuthTokens] = useState(() => null);
    const [user, setUser] = useState(() => null);
    const [loading, setLoading] = useState(true);

    const loginUser = async (code) => {
        try {
            const response = await axios.post('/dj-rest-auth/google/', {
                code: code,
            });
            setAuthTokens(response.data);
            setUser(response.data.user);
            navigate('/');
        } catch (error) {
            console.log(error)
            if (error.response.status === 403) {
                navigate('/unauthorized');
            }
        }
    };

    const refreshToken = async () => {
        try {
            const tokenResponse = await axios.post(
                '/dj-rest-auth/token/refresh/',
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            if (tokenResponse.status === 200) {
                const token = tokenResponse.data;
                const userResponse = await axios.get('/dj-rest-auth/user/', {
                });
                if (userResponse.status === 200) {
                    token['user'] = userResponse.data;
                    setAuthTokens(token);
                    setUser(token.user);
                    if(location.pathname === '/login'){
                        navigate('/');
                    }

                }
            }
        } catch (error) {}
    };

    const logoutUser = async () => {
        try {
            const response = await axios.post('/dj-rest-auth/logout/', {
                withCredentials: true,
            });
            if (response.status === 200) {
                setAuthTokens(null);
                setUser(null);
                navigate('/login', { replace: true });
            }
        } catch (error) {
            navigate('/login', { replace: true });
        }
    };

    const contextData = {
        user: user,
        authTokens: authTokens,
        setUser: setUser,
        setAuthTokens: setAuthTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        refreshToken: refreshToken,
    };

    useEffect(() => {
        if (!authTokens) {
            refreshToken().then(() => setLoading(false));
        }
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

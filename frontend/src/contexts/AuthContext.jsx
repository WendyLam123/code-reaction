import { useContext, createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [token, setToken] = useState(()=>localStorage.getItem('token'));

    const login = (newToken) =>{
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () =>{
        localStorage.removeItem('token');
        setToken(null);
    }

    const isLoggedIn = token? true: false;


    return (
        <AuthContext.Provider value = {{token, isLoggedIn, login, logout}}
        >
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;

export const useAuth = () =>{
    return useContext(AuthContext);
}


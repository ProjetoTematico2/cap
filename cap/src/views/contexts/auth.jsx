import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const isAuth = async () => {
    //     const authenticated = await window.api.Action({ controller: "Login", action: "isAuthenticated" });
    //     return authenticated;
    // }
    useEffect(() => {
        // // const recoveredUser = localStorage.getItem('user');
        // const auth = isAuth();
        // if(!auth)
        // // if (recoveredUser) {
        // //     setUser(JSON.parse(recoveredUser));

        // //     if (!auth)
        // //         logout();
        // // }
        setLoading(false);

    }, [user]);

   


    const login = async (user, password) => {
        const authenticated = await window.api.Action({ controller: "Login", action: "Authenticate", params: { usuario: user, senha: password } });

        if (authenticated.status) {
            // localStorage.setItem('user', JSON.stringify(authenticated.user));
            setUser(authenticated.user);
            navigate('/');
        }else{
            window.api.Alert({ status: false, text: 'Usuário ou Senha inválidos', title: "Erro!" });
        }

    };

    const logout = () => {
        // localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
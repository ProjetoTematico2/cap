import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);

    }, [user]);

   


    const login = async (user, password) => {
        const authenticated = await window.api.Action({ controller: "Login", action: "Authenticate", params: { usuario: user, senha: password } });

        if (authenticated.status) {
            console.log(authenticated);
            setUser(authenticated.user);
            navigate('/');
        }else{
            window.api.Alert({ status: false, text: 'Usuário ou Senha inválidos', title: "Erro!" });
        }

    };

    const logout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from './contexts/auth';
import { useState, useEffect } from "react";

import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './shared/Layout';


//CENTRAIS ==========================================
import Centrais from './pages/Centrais/Index';
import CentraisCreate from './pages/Centrais/Create';
import CentraisEdit from './pages/Centrais/Edit';

//PRESTADORES ==========================================
import Prestadores from './pages/Prestadores/Index';
import PrestadoresCreate from './pages/Prestadores/Create';
import PrestadoresEdit from './pages/Prestadores/Edit';

//PROCESSOS ==========================================
import Processos from './pages/Processos/Index';
import ProcessosCreate from './pages/Processos/Create';
import ProcessosEdit from './pages/Processos/Edit';

// USUARIOS
import Usuarios from "./pages/Usuarios/Index";
import UsuariosCreate from "./pages/Usuarios/Create";
import UsuariosEdit from "./pages/Usuarios/Edit";

// INSTITUICOES
import Instituicoes from "./pages/Instituicoes/Index";
import InstituicoesCreate from "./pages/Instituicoes/Create";
import InstituicoesEdit from "./pages/Instituicoes/Edit";

// ENTIDADES
import Entidades from "./pages/Entidades/Index";
import EntidadesCreate from "./pages/Entidades/Create";
import EntidadesEdit from "./pages/Entidades/Edit";
import EntidadesDescredenciar from "./pages/Entidades/Descredenciar";

// Agendamento das tarefas
import Agendamentos from './pages/Agendamentos/Index';
import AgendamentosCreate from './pages/Agendamentos/Create';
import AgendamentosEdit from './pages/Agendamentos/Edit';



const AppRoutes = () => {

    const getConfig = async () => {
        let config = await window.api.App();
        return config;
    }
 
    var config = getConfig();
    console.log(config);
    // useEffect(() => {


    //     fetchData();

    // }, null);

    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div>Carregando Informações de Usuário...</div>
        }
        if (!authenticated) {
            return <Navigate to="/login" />
        }

        return children;
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="login" element={<Login />} />
                    <Route exact path='/' element={<Private><Layout /></Private>}>
                        <Route index element={<Private><Home /></Private>} />
  
                        <Route path="instituicoes" element={<Private><Instituicoes /></Private>} />
                        <Route path="instituicoes/create" element={<Private><InstituicoesCreate /></Private>} />
                        <Route path="instituicoes/edit/:id" element={<Private><InstituicoesEdit /></Private>} />

                      
                        <Route path="centrais" element={<Private><Centrais /></Private>}/>
                        <Route path="centrais/create" element={<Private><CentraisCreate /></Private>}/>
                        <Route path="centrais/edit/:id" element={<Private><CentraisEdit /></Private>}/>

                        <Route path="prestadores" element={<Private><Prestadores /></Private>} />
                        <Route path="prestadores/create" element={<Private><PrestadoresCreate /></Private>} />
                        <Route path="prestadores/edit/:id" element={<Private><PrestadoresEdit /></Private>}/>

                        <Route path="processos" element={<Private><Processos /></Private>} />
                        <Route path="processos/create/:id" element={<Private><ProcessosCreate /></Private>} />
                        <Route path="processos/edit/:id" element={<Private><ProcessosEdit /></Private>} />

                        <Route path="usuarios" element={<Private><Usuarios /></Private>} />
                        <Route path="usuarios/create" element={<Private><UsuariosCreate /></Private>}/>
                        <Route path="usuarios/edit/:id" element={<Private><UsuariosEdit /></Private>}/>

                        <Route path="entidades" element={<Private><Entidades /></Private>} />
                        <Route path="entidades/create" element={<Private><EntidadesCreate /></Private>} />
                        <Route path="entidades/edit/:id" element={<Private><EntidadesEdit /></Private>} />
                        <Route path="entidades/descredenciar/:id" element={<Private><EntidadesDescredenciar /></Private>} />
                        
                        <Route path="agendamentos/" element={<Private><Agendamentos /></Private>} />
                        <Route path="agendamentos/create" element={<Private><AgendamentosCreate /></Private>} />
                        <Route path="agendamentos/edit/:id" element={<Private><AgendamentosEdit /></Private>} />


                        
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes;
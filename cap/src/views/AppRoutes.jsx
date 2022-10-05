import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from './contexts/auth';

import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './shared/Layout';
// import Centrais from './pages/Centrais';
// import Instituicoes from './pages/Instituicoes/Index';
import Prestadores from './pages/Prestadores';
import AtividadesPrestador from "./pages/AtividadesPrestador";
import Processos from './pages/Processos';


//CENTRAIS ==========================================
import Centrais from './pages/Centrais/Index';
import CentraisCreate from './pages/Centrais/Create';
import CentraisEdit from './pages/Centrais/Edit';

// USUARIOS
import Usuarios from "./pages/Usuarios/Index";
import UsuariosCreate from "./pages/Usuarios/Create";
import UsuariosEdit from "./pages/Usuarios/Edit";

// INSTITUICOES
import Instituicoes from "./pages/Instituicoes/Index";
import InstituicoesCreate from "./pages/Instituicoes/Create";
import InstituicoesEdit from "./pages/Instituicoes/Edit";



const AppRoutes = () => {

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

                        <Route path="centrais/create" element={<Private><CentraisCreate /></Private>} />
                        <Route path="centrais/edit/:id" element={<Private><CentraisEdit /></Private>} />




                        <Route path="prestadores" element={<Private><Prestadores /></Private>} />
                        <Route path="centrais" element={<Private><Centrais /></Private>} />
                        
                        <Route path="atividades" element={<Private><AtividadesPrestador /></Private>} />
                        <Route path="processos" element={<Private><Processos /></Private>} />

                        <Route path="usuarios" element={<Private><Usuarios /></Private>} />
                        <Route path="usuarios/create" element={<Private><UsuariosCreate /></Private>} />
                        <Route path="usuarios/edit/:id" element={<Private><UsuariosEdit /></Private>} />

                        <Route path="instituicoes" element={<Private><Instituicoes /></Private>} />
                        <Route path="instituicoes/create" element={<Private><InstituicoesCreate /></Private>} />
                        <Route path="instituicoes/edit/:id" element={<Private><InstituicoesEdit /></Private>} />


                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes;
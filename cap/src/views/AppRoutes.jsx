import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from './contexts/auth';

import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './shared/Layout';
// import Centrais from './pages/Centrais';
import Instituicoes from './pages/Instituicoes/Index';
import Atividades from './pages/Atividades';
import Prestadores from './pages/Prestadores';
import Processos from './pages/Processos';


//CENTRAIS ==========================================
import Centrais from './pages/Centrais/Index';
import CentraisCreate from './pages/Centrais/Create';
import CentraisEdit from './pages/Centrais/Edit';



const AppRoutes = () => {

    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);
        
        if(loading){
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

                        <Route path="centrais/create" element={<Private><CentraisCreate /></Private>}/>
                        <Route path="centrais/edit/:id" element={<Private><CentraisEdit /></Private>}/>

                        


                        <Route path="prestadores" element={<Private><Prestadores /></Private>} />
                        <Route path="processos" element={<Private><Processos /></Private>} />
                        <Route path="centrais" element={<Private><Centrais /></Private>}/>
                        <Route path="instituicoes" element={<Private><Instituicoes /></Private>} />
                        <Route path="atividades" element={<Private><Atividades /></Private>} />
                        <Route path="processos" element={<Private><Processos /></Private>} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes;
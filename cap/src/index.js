import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {createRoot} from 'react-dom/client';
import Layout from './views/shared/Layout';
import Home from './views/pages/Home';
import Prestadores from './views/pages/Prestadores';
import Processos from './views/pages/Processos';
import Login from './views/pages/Login';
import Centrais from './views/pages/Centrais';
import Instituicoes from './views/pages/Instituicoes';
import Atividades from './views/pages/Atividades';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
import './views/content/app.css';
import './views/content/app.js';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Home />
//   </React.StrictMode>
// );

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="prestadores" element={<Prestadores />} />
          <Route path="processos" element={<Processos />} />
          <Route path="login" element={<Login />} />
          <Route path="centrais" element={<Centrais />} />
          <Route path="instituicoes" element={<Instituicoes />} />
          <Route path="atividades" element={<Atividades />} />
          <Route path="processos" element={<Processos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);



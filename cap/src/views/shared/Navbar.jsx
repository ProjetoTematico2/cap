import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    const [activeMenu, setActiveMenu] = useState('/');

    return (
        <nav className="side-menu">
            <input className="form-control" type="text" id="search-option" name="search-option" placeholder="Pesquisar" />
            <ul>
                <li className={activeMenu === '/' ? 'active' : ''} onClick={() => { setActiveMenu('/') }}>
                    <NavLink id="/" to="/"> <i className="fa-solid fa-plus"></i> Novo Cadastro</NavLink>
                </li>
                <li className={activeMenu === 'prestadores' ? 'active' : ''} onClick={() => { setActiveMenu('prestadores') }}>
                    <NavLink id="prestadores" to="/prestadores"><i className="fa-regular fa-user"></i> Prestadores</NavLink>
                </li>
                <li className={activeMenu === 'processos' ? 'active' : ''} onClick={() => { setActiveMenu('processos') }}>
                    <NavLink id="processos" to="/processos"><i className="fa-regular fa-file-lines"></i> Processos</NavLink>
                </li>

                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Outros</a>
                    <ul className="dropdown-menu">
                        <li className={activeMenu === 'login' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                            <NavLink id="login" to="/login"><i className="fa-solid fa-right-to-bracket"></i> Login</NavLink>
                        </li>
                        <li className={activeMenu === 'centrais' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                            <NavLink id="centrais" to="/centrais"><i className="fa-solid fa-archway"></i> Centrais</NavLink>
                        </li>
                        <li className={activeMenu === 'instituicoes' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                            <NavLink id="instituicoes" to="/instituicoes"><i className="fa-solid fa-archway"></i> Instituição</NavLink>
                        </li>
                        <li className={activeMenu === 'atividaes' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                            <NavLink id="atividades" to="/atividades"><i className="fa-brands fa-galactic-republic"></i> Atividades</NavLink>
                        </li>
                    </ul>
                </li>


            </ul>
        </nav>
    );
}

export default Navbar;
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
                <li className={activeMenu === 'prestadores' ? 'active' : ''}  onClick={() => { setActiveMenu('prestadores') }}>
                    <NavLink id="prestadores" to="/prestadores"><i className="fa-regular fa-user"></i> Prestadores</NavLink>
                </li>
                <li className={activeMenu === 'processos' ? 'active' : ''} onClick={() => { setActiveMenu('processos') }}>
                    <NavLink id="processos" to="/processos"><i className="fa-regular fa-file-lines"></i> Processos</NavLink>
                </li>
                <li className={activeMenu === 'login' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                    <NavLink id="login" to="/login"><i className="fa-regular fa-file-lines"></i> Login</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
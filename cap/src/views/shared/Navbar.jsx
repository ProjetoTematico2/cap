import React from "react";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../contexts/auth';
function Navbar() {
    const [activeMenu, setActiveMenu] = useState('/');
    const { user } = useContext(AuthContext);
    return (
        <nav className="side-menu">
            <input className="form-control" type="text" id="search-option" name="search-option" placeholder="Pesquisar" />
            <ul>
                {
                    user.appMode === 0 ?
                         <>

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

                                    <li className={activeMenu === 'instituicoes' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                                        <NavLink id="entidades" to="/entidades"><i className="fa-solid fa-archway"></i> Entidades</NavLink>
                                    </li>

                                    <li className={activeMenu === 'centrais' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                                        <NavLink id="centrais" to="/centrais"><i className="fa-solid fa-archway"></i> Centrais</NavLink>
                                    </li>

                                    {/* <li className={activeMenu === 'atividaes' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                         <NavLink id="atividades" to="/atividades"><i className="fa-brands fa-galactic-republic"></i> Atividades</NavLink>
                     </li> */}
                                    <li className={activeMenu === 'atividadesPrestador' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                                        <NavLink id="atividadesPrestador" to="/atividadesPrestador"><i className="fa-solid fa-clipboard-user"></i> Atividades do prestador</NavLink>
                                    </li>

                                    <li className={activeMenu === 'atividadesInstituicao' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                                        <NavLink id="" to="/atividadesInstituicao"><i className="fa-solid fa-clipboard-user"></i> Atividades da insituição</NavLink>
                                    </li>

                                    <li className={activeMenu === 'atividades' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                                        <NavLink id="atividades" to="/atividades"><i className="fa-solid fa-clipboard-user"></i> Atividades</NavLink>
                                    </li>
                                    <li className={activeMenu === 'usuarios' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                                        <NavLink id="usuarios" to="/usuarios"><i className="fa-solid fa-user"></i> Usuários</NavLink>
                                    </li>

                        <li className={activeMenu === 'usuarios' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                            <NavLink id="usuarios" to="/usuarios"><i className="fa-solid fa-user"></i> Usuários</NavLink>
                        </li>
                        <li className={activeMenu === 'atividades' ? 'active' : ''} onClick={() => { setActiveMenu('login') }}>
                            <NavLink id="atividades" to="/atividades"><i className="fa-solid fa-clipboard-user"></i> Atividades</NavLink>
                        </li>
                  

             

                                </ul>
                            </li>
                         </>
                    :
                    user.appMode === 1 ?
                        <li>CU</li>
                    :
                    <li></li>


                }
            </ul>

        </nav>
    );
}

export default Navbar;
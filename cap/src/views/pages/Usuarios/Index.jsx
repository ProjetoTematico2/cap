import { useNavigate, NavLink } from 'react-router-dom'
import React, { useState, useEffect } from "react";

import Title from "../../shared/Title";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function Usuarios() {

    const navigate = useNavigate();
    const [search, setSearch] = useState({ name: '', user: '' });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, [search]);

    const fetchData = async () => {

        const data = await window.api.Action({ controller: "Usuarios", action: "GetUsuarios", params: search });
        setUsers(data);
    }

    const handleSearch = async (evt) => {
        const value = evt.target.value;
        setSearch({
            ...search,
            [evt.target.name]: value
        });


    }

    function CreateUser() {
        navigate('create');
    }

    function DeleteUser(id, nome) {

        const handleClickDelete = async (id) => {

            const result = await window.api.Action({ controller: "Usuarios", action: "Delete", params: id });
            window.api.Alert({ status: result.status, text: result.text, title: result.status ? "Sucesso!" : "Erro!" });
            if (result.status) {
                fetchData();
            }
        }

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h3>Excluir registro</h3>
                        <p>Deseja excluir o usuario <b>{nome}</b>?</p>

                        <button className='btn btn-confirm modal-btn'
                            onClick={() => {
                                handleClickDelete(id);
                                onClose();
                            }}
                        >
                            Confirmar
                        </button>

                        <button className='btn btn-cancel modal-btn' onClick={onClose}>Cancelar</button>
                    </div>
                );
            }
        });
    }

    function handleData() {
        return (
            <table className='table table-small'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Usuário</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(r => (

                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.nome}</td>
                            <td>{r.usuario}</td>
                            <td>
                                <div className="btn-group" role="group">

                                    <span id="btnGroupDrop1" type="button" className="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className='fa fa-cog'></i> opções
                                    </span>
                                    <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                        <li> <NavLink className="dropdown-item" id="edit" to={`/usuarios/edit/${r.id}`}> <i className='fa fa-edit'></i> Editar</NavLink></li>
                                        <li> <a className="dropdown-item" onClick={() => { DeleteUser(r.id, r.nome) }} to="#"><i className="fa-solid fa-trash"></i> Excluir</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        )

    }

    return (
        <>
            <Title title={"Usuários"} />

            <div className="row search-container">
                <div className="input-form col-md-3">
                    <input
                        id="name"
                        name="name"
                        className="form-control input rounded-2"
                        type="text"
                        placeholder="Nome"
                        required={true}
                        value={search.name}
                        onChange={handleSearch}
                    />
                </div>

                <div className="input-form col-md-3">
                    <input
                        id="user"
                        name="user"
                        className="form-control input rounded-2"
                        type="text"
                        placeholder="Usuário"
                        required={true}
                        value={search.user}
                        onChange={handleSearch}
                    />
                </div>

            </div>

            <button type="button" className='btn btn-custom' onClick={_ => CreateUser()}><i className='fa fa-plus'></i> Novo</button>

            <div className='row table-container'>
                <div className='col-md-12'>
                    {handleData()}
                </div>
            </div>

        </>




    )



}
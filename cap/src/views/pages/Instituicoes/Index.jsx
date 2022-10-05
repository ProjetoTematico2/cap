import { useNavigate, NavLink } from 'react-router-dom'
import { useState, useEffect } from "react";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Title from "../../shared/Title";


const Index = () => {
    const navigate = useNavigate();

    const [instituicoes, setInstituicoes] = useState([]);
    const [search, setSearch] = useState({
        nome: '',
        cnpj: ''
    });

    const fetchData = async () => {

        const data = await window.api.Action({ controller: "Instituicoes", action: "GetInstituicoes", params: search });
        setInstituicoes(data);
    }

    useEffect(() => {
        fetchData();

    }, [search]);

    const CreateInstituicao = () => {
        navigate('create');
    }

    const handleSearch = async (evt) => {
        const value = evt.target.value;
        setSearch({
            ...search,
            [evt.target.name]: value
        });

        
    }

    const DeleteInstituicao = (id, nome) => {

        const handleClickDelete = async (id) => {

            const result = await window.api.Action({ controller: "Instituicoes", action: "Delete", params: id });
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
                        <p>Deseja excluir a instituição <b>{nome}</b>?</p>

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

    return (

        <>
           <Title title={"Instituições"} />

            <div className="row search-container">
                <div className="input-form col-md-3">
                    <input
                        id="nome"
                        name="nome"
                        className="form-control input rounded-2"
                        type="text"
                        placeholder="Nome"
                        required={true}
                        value={search.nome}
                        onChange={handleSearch}
                    />
                </div>

                <div className="input-form col-md-3">
                    <input
                        id="cnpj"
                        name="cnpj"
                        className="form-control input rounded-2"
                        type="text"
                        placeholder="CNPJ"
                        required={true}
                        value={search.cnpj}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <button type="button" className='btn btn-custom' onClick={() => { CreateInstituicao() }}><i className='fa fa-plus'></i> Novo</button>

            <div className='row table-container'>
                <div className='col-md-12'>
                    <table className='table table-small'>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>CNPJ</th>
                                <th>E-mail</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {instituicoes.map(r => (

                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{r.nome}</td>
                                    <td>{r.cnpj}</td>
                                    <td>{r.email}</td>
                                    <td>
                                        <div className="btn-group" role="group">

                                            <span id="btnGroupDrop1" type="button" className="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className='fa fa-cog'></i> opções
                                            </span>
                                            <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                <li> <NavLink className="dropdown-item" id="edit" to={`/instituicoes/edit/${r.id}`}> <i className='fa fa-edit'></i> Editar</NavLink></li>
                                                <li> <a className="dropdown-item" onClick={() => { DeleteInstituicao(r.id, r.nome) }} to="#"><i className="fa-solid fa-trash"></i> Excluir</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>

                                // <li >
                                //     {r.name}
                                //     {r.favorite && <span>(Favorito)</span>}
                                //     <button onClick={() => handleFavorites(r.id)}> Favoritar</button>

                                // </li>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>


    );


}

export default Index
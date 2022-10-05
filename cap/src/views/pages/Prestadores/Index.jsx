import { useNavigate, NavLink } from 'react-router-dom'
import { useState, useEffect } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Title from "../../shared/Title";

const Index = () => {
    const navigate = useNavigate();

    const [prestadores, setPrestadores] = useState([]);
    const [search, setSearch] = useState({
        id: '',
        cpf: '',
        nome: '',
    });

    const fetchData = async () => {

        const data = await window.api.Action({ controller: "Prestadores", action: "GetPrestadores", params: search });
        setPrestadores(data);
    }

    useEffect(() => {


        fetchData();

    }, [search]);

    const handleSearch = async (evt) => {
        const value = evt.target.value;
        setSearch({
            ...search,
            [evt.target.name]: value
        });


    }

    const CreatePrestador = () => {
        navigate('create');
    }


    const DeletePrestador = (id, nome) => {

        const handleClickDelete = async (id) => {

            const result = await window.api.Action({ controller: "Prestadores", action: "Delete", params: id });
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
                        <p>Deseja excluir o prestador <b>{nome}</b>?</p>

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
            <Title title={"Prestadores"} />

            <div className="row search-container">
                <div className="input-form col-md-3">
                    <input
                        id="id"
                        name="id"
                        className="form-control input rounded-2"
                        type="number"
                        placeholder="Código"
                        value={search.id}
                        onChange={handleSearch}
                    />
                </div>

                <div className="input-form col-md-3">
                    <input
                        id="nome"
                        name="nome"
                        className="form-control input rounded-2"
                        type="text"
                        placeholder="Nome"
                        value={search.nome}
                        onChange={handleSearch}
                    />
                </div>

                <div className="input-form col-md-3">
                    <input
                        id="cpf"
                        name="cpf"
                        className="form-control input rounded-2"
                        type="text"
                        placeholder="CPF"
                        value={search.cpf}
                        onChange={handleSearch}
                    />
                </div>



            </div>

            <button type="button" className='btn btn-custom' onClick={() => { CreatePrestador() }}><i className='fa fa-plus'></i> Novo</button>


            <div className='row table-container'>
                <div className='col-md-12'>
                    <table className='table table-small'>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Último Processo</th>
                                <th>Horas a Cumprir</th>
                                <th>Horas Cumpridas</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {prestadores.map(r => (

                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{r.nome}</td>
                                    <td>{r.cpf}</td>
                                    <td>{r.ultimo_processo}</td>
                                    <td>{r.horas_cumprir}</td>
                                    <td>{r.horas_cumpridas}</td>
                                    <td>
                                        <div className="btn-group" role="group">

                                            <span id="btnGroupDrop1" type="button" className="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className='fa fa-cog'></i> opções
                                            </span>
                                            <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                <li> <NavLink className="dropdown-item" id="edit" to={`/prestadores/edit/${r.id}`}> <i className='fa fa-edit'></i> Editar</NavLink></li>
                                                <li> <NavLink className="dropdown-item" id="edit" to={`/processos/create/${r.id}`}> <i className='fa fa-plus'></i> Novo Processo</NavLink></li>
                                                <li> <a className="dropdown-item" onClick={() => { DeletePrestador(r.id, r.nome) }} to="#"><i className="fa-solid fa-trash"></i> Excluir</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>

    )

}

export default Index
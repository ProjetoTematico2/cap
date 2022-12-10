import { useNavigate, NavLink } from 'react-router-dom'
import { useState, useEffect, useContext } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Title from "../../shared/Title";
import Select from 'react-select';
import { AuthContext } from "../../contexts/auth";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Index = () => {
    const navigate = useNavigate();

    const [registros, setRegistros] = useState([]);

    const { user } = useContext(AuthContext);
    const [processos, setProcessos] = useState([]);
    const [prestadores, setPrestadores] = useState([]);
    const [search, setSearch] = useState({
        id: '',
        nro_processo: '',
        id_prestador: null,
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const showRegistros = async (id) => {
        const data = await window.api.Action({ controller: "Processos", action: "GetRegistros", params: { id: id } });

        if (data.status) {
            setRegistros(data.data);
            setShow(true);
        }
        else {
            window.api.Alert({ status: data.status, text: data.text, title: data.status ? "Sucesso!" : "Erro!" });
        }

    }

    const fetchData = async () => {

        const data = await window.api.Action({ controller: "Processos", action: "GetProcessos", params: search });
        setProcessos(data);
    }

    useEffect(() => {

        fetchData();

    }, [search]);

    const handleSearch = async (evt) => {
        const value = evt.value ?? evt.target.value;
        setSearch({
            ...search,
            [evt.target.name]: value
        });


    }

    const handleSearchDrop = async (evt) => {
        const value = evt;
        setSearch({
            ...search,
            ['id_prestador']: value
        });


    }


    useEffect(() => {


        const fetchData = async () => {
            let data = await window.api.Action({ controller: "Processos", action: "GetPrestadores" });
            setPrestadores(data);
        }

        fetchData();

    }, []);

    const DeleteProcesso = (id, nome) => {

        const handleClickDelete = async (id) => {

            const result = await window.api.Action({ controller: "Processos", action: "Delete", params: id });
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
                        <p>Deseja excluir o processo <b>{nome}</b>?</p>

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
            <Title title={"Processos"} />

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
                        id="nro_processo"
                        name="nro_processo"
                        className="form-control input rounded-2"
                        type="text"
                        placeholder="Número Processo"
                        value={search.nro_processo}
                        onChange={handleSearch}
                    />
                </div>

                <div className="input-form col-md-3">
                    <Select
                        options={prestadores}
                        id="id_prestador"
                        name="id_prestador"
                        value={search.id_prestador}
                        placeholder="Prestador"
                        onChange={handleSearchDrop}
                    />

                </div>



            </div>




            <div className='row table-container'>
                <div className='col-md-12'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Número Processo</th>
                                <th>Prestador</th>
                                <th>Horas a Cumprir</th>
                                <th>Horas Cumpridas</th>
                                <th>Vara</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {processos.map(r => (

                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{r.nro_processo}</td>
                                    <td>{r.prestador}</td>
                                    <td>{r.horas_cumprir}</td>
                                    <td>{r.horas_cumpridas}</td>
                                    <td>{r.vara}</td>
                                    
                                    <td>
                                        {
                                            user.appMode === 0 ?
                                                <div className="btn-group" role="group">

                                                    <span id="btnGroupDrop1" type="button" className="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className='fa fa-cog'></i> opções
                                                    </span>
                                                    <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                        <li> <NavLink className="dropdown-item" id="edit" to={`/processos/edit/${r.id}`}> <i className='fa fa-edit'></i> Editar</NavLink></li>
                                                        <li> <a className="dropdown-item" onClick={() => { showRegistros(r.id) }} to="#"><i className="fa-solid fa-list-check"></i> Ver registros</a></li>
                                                        <li> <a className="dropdown-item" onClick={() => { DeleteProcesso(r.id, r.nro_processo) }} to="#"><i className="fa-solid fa-trash"></i> Excluir </a></li>
                                                    </ul>
                                                </div>
                                                :
                                                <button type="button" className='btn btn-dark-blue' onClick={() => { showRegistros(r.id) }}><i className="fa-solid fa-list-check"></i> Ver registros</button>
                                        }

                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>







            <Modal className='modal-lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registros</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{fontSize: "10pt"}}>

                    {
                        registros.length === 0 ? null :
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Tarefa</th>
                                        <th>Data de entrada</th>
                                        <th>Data de saída</th>
                                        <th>Horas cumpridas</th>
                                        <th>Observação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registros.map(r => (

                                        <tr key={r.id}>
                                            <td>{r.agendamento.tarefa}</td>
                                            <td>{r.dt_entrada}</td>
                                            <td>{r.dt_saida}</td>
                                            <td>{r.total_horas}</td>
                                            <td>{r.observacao}</td>

                                        
                                        </tr>

                                    ))}
                                </tbody>

                            </table>

                    }



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>

                </Modal.Footer>
            </Modal>

        </>

    )

}

export default Index
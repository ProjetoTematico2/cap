import { useNavigate, NavLink } from 'react-router-dom'
import { useState, useEffect } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Title from "../../shared/Title";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


const Index = () => {
    const navigate = useNavigate();

    const [prestadores, setPrestadores] = useState([]);
    const [search, setSearch] = useState({
        id: '',
        cpf: '',
        nome: '',
    });

    const GerarListagem = async (id_prestador, nro_processo) => {
        const search = {
            id_prestador: id_prestador
        }

        console.log(search.id_prestador)
        const processo = await window.api.Action({ controller: "Processos", action: "GetProcessos", params: search });
        const atestados = await window.api.Action({ controller: "AtestadoFrequencia", action: "GetAtestadoFrequencia", params: search });

        console.log(atestados)

     
        const body = atestados.map((e) => {
            return [
                { text: String(e.data_entrada) },
                { text: String(e.data_saida) },
                { text: String(e.processo) },
                { text: String(e.titulo) },
            ];
        });

        let content = [...body]

        console.log(content)

        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        const dd1 = {
            content: [
                // { text: 'Tables', style: 'header' },
                // 'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
                // { text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader' },
                // 'The following table has nothing more than a body array',
                {
                    style: 'tableExample',
                    table: {
                        body: [
                            ["Data Entrada", "Data Saída", "Número Processo", "Tarefa"],  
                            ["dsa", "das","das","ada"]
                        ]
                    }
                }
            ]
        }

        const dd = {

            content: [
                { text: 'A simple table (no headers, no width specified, no spans, no styling)' },
                'The following table has nothing more than a body array',
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', 55, 55],
                        body: content
                    }
                },

            ]
        }

        pdfMake.createPdf(dd1).open({}, window.open('', '_blank'));
        // pdf.print();
        // pdf.download('PPRA.pdf');
    }


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
                                                <li> <a className="dropdown-item" onClick={() => { GerarListagem(r.id, r.ultimo_processo) }} to="#"><i className="fa-solid fa-trash"></i> Gerar Listagem</a></li>
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
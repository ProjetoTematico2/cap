import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Title from "../../shared/Title";
import Endereco from "../../shared/Endereco";
import Label from "../../shared/Label";



const Create = (props) => {

    const [entidadeName, setentidadeName] = useState('');
    const [cpnj, setCNPJ] = useState();
    const [firstPhone, setFirstPhone] = useState('');
    const [secondPhone, setSecondPhone] = useState('');
    const [email, setEmail] = useState('');
    const [tarefas, setTarefas] = useState([]);
    const [tarefaTitulo, setTarefaTitulo] = useState('');
    const [tarefaDescricao, setTarefaDescricao] = useState('');
    const [status, setStatus] = useState(1);


    const navigate = useNavigate();

    const [endereco, setEndereco] = useState({
        rua: '',
        cep: '',
        numero: '',
        bairro: '',
        complemento: '',
        id_cidade: ''
    });


    const handleEndereco = (evt, name = null) => {
        const value = evt.value ?? evt.target.value;

        setEndereco({
            ...endereco,
            [name ? name : evt.target.name]: value
        })

    }


    const handleSubmit = async () => {

        const payload = {
            nome: entidadeName,
            cnpj: cpnj,
            telefone1: firstPhone,
            telefone2: secondPhone,
            email: email,
            endereco: endereco,
            tarefas: tarefas
        }

        const postResult = await window.api.Action({ controller: "Entidades", action: "Create", params: payload });


        window.api.Alert({ status: postResult.status, text: postResult.text, title: postResult.status ? "Sucesso!" : "Erro!" });

        if (postResult.status)
            navigate("/entidades");
    }

    const addTarefa = () => {
        let statusAlert = true;
        let message = '';

        
        if (tarefaTitulo ===null || tarefaTitulo === '' ) {
            statusAlert = false
            message = 'Informe um nome de titulo';
        } else if (tarefaDescricao === null || tarefaDescricao === '' ) {
            statusAlert = false
            message = 'Informe uma descrição';
        }else if (tarefas.find(s => s.tarefaTitulo === tarefaTitulo ) ){
            statusAlert = false
            message = 'Titulo já inserido';
        }

        if (!statusAlert)
            return window.api.Alert({ statusAlert: false, text: message, title: "Atenção!" });

        let tarefa = {
            tarefaTitulo,
            tarefaDescricao,
            status
        }
        
        setTarefas([...tarefas, tarefa]);
             
        setTarefaTitulo('');
        setTarefaDescricao('');
    }

    const removerTarefa = (item) => {
        let newTarefas = tarefas.filter(s => s !== item);
        setTarefas([...newTarefas]);
    }


    return (
        <div>
            <Title title={"Nova entidade"} />

            <div className="row">

                <div className="col-md-4">

                    <div className="col-md-12">
                        <Label nameLabel={"Nova Entidade"} />

                        <div className="input-form">

                            <label htmlFor="entidadeName">Nome</label>
                            <input
                                id="entidadeName"
                                className="form-control input rounded-2"
                                type="text"
                                placeholder="Nome da entidade"
                                value={entidadeName}
                                required={true}
                                onChange={(e) => setentidadeName(e.target.value)}
                            />
                        </div>

                        <div className="input-form">
                            <label htmlFor="cnpj">CNPJ</label>
                            <input
                                id="cnpj"
                                className="form-control input rounded-2"
                                type="text"
                                placeholder="000.000.000-00"
                                required={true}
                                value={cpnj}
                                onChange={(e) => setCNPJ(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-12">

                        <Label nameLabel={"Contatos da entidade"} />

                        <div className="input-form">
                            <label htmlFor="phone-1">Telefone 1</label>
                            <input
                                id="phone-1"
                                className="form-control input rounded-2"
                                type={"tel"}
                                placeholder="(00) 0000-0000"
                                required={true}
                                value={firstPhone}
                                onChange={(e) => setFirstPhone(e.target.value)}
                            />
                        </div>

                        <div className="input-form">
                            <label htmlFor="phone-2">Telefone 2 (opcional)</label>
                            <input
                                id="phone-2"
                                className="form-control input rounded-2"
                                type="tel"
                                value={secondPhone}
                                placeholder="(00) 0000-0000"
                                required={false}
                                onChange={(e) => setSecondPhone(e.target.value)}
                            />
                        </div>

                        <div className="input-form">
                            <label htmlFor="phone-2">Email</label>
                            <input
                                id="email"
                                className="form-control input rounded-2"
                                type="email"
                                placeholder="****@***.com"
                                required={true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                </div>

                <div className="col-md-8">
                    <Endereco endereco={endereco} handleChange={handleEndereco} />
                </div>

                <div className="row">

                    <div className="col-md-12" style={{ 'marginTop': '2rem' }}>
                        <Label nameLabel={"Atividades da entidade"}></Label>

                        <div className="input-form">
                            <label htmlFor="tarefaTitulo">Título</label>
                            <input
                                id="tarefaTitulo"
                                className="form-control input rounded-2"
                                type="text"
                                placeholder="Titulo"
                                value={tarefaTitulo}
                                required={true}
                                onChange={(e) => setTarefaTitulo(e.target.value)}
                            />
                        </div>

                        <div className="input-form">
                            <label htmlFor="tarefaDescricao">Descrição</label>
                            <input
                                id="tarefaDescricao"
                                className="form-control input rounded-2"
                                type="text"
                                placeholder="Descrição"
                                required={false}
                                value={tarefaDescricao}
                                onChange={(e) => setTarefaDescricao(e.target.value)}
                            />
                        </div>

                        <div className="input-form my-2">
                            <label htmlFor="status">Status</label>

                            <label className="label-radio">
                                Ativo
                                <input
                                    className="radio"
                                    type="radio"
                                    name="status"
                                    value="1"
                                    defaultChecked
                                    onChange={(_) => setStatus(1)}
                                />
                            </label>

                            <label className="label-radio">
                                Inativo
                                <input
                                    className="radio"
                                    type="radio"
                                    name="status"
                                    value="0"
                                    onChange={(_) => setStatus(0)}
                                />
                            </label>

                            <button type="button" className='btn btn-dark-blue mx-2' onClick={addTarefa} ><i className='fa fa-plus'></i> Adicionar Tarefa</button>
                        </div>


                    </div>

                    <div className="row">

                        <div className="col-md-12">
                            {
                                 tarefas.length > 0 ?
                                    <table className="table table-border">
                                        <thead>
                                            <tr>
                                                <td>Titulo</td>
                                                <td>Descricao</td>
                                                <td>Status</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tarefas.map((s, i) => (
                                                    <tr key={i} >
                                                        <td>
                                                            {s.tarefaTitulo}
                                                        </td>
                                                        <td>
                                                            {s.tarefaDescricao ?? "--"}
                                                        </td>
                                                        <td>
                                                            { s.status === 1 ?  'Ativo' : 'Inativo'  }
                                                        </td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger pull-right mx-2" onClick={() => { removerTarefa(s) }}><i className="fa-solid fa-trash"></i> Excluir</button>

                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table> : <span></span> }
                        </div>

                    </div>


                </div>

                <div className="row">
                    <div className="col-md-12 btn-inline" style={{ 'marginTop': '2rem' }}>
                        <button className="btn btn-dark-blue" onClick={handleSubmit}>Confirmar</button>
                        <button type="button" onClick={() => { navigate("/entidades"); }} className="btn btn-danger"><i className="fa fa-trash"></i> Cancelar</button>
                    </div>

                </div>

            </div>
        </div>
    )

}

export default Create;
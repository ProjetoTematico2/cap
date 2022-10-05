import React, { useState } from "react";
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom'
import Title from "../../shared/Title";
import Endereco from "../../shared/Endereco";
import InputDiasSemana from "../../shared/InputDiasSemana";
import Label from "../../shared/Label";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const Create = (props) => {
    const navigate = useNavigate();
    const [image, setImage] = useState('');

    const [prestador, setPrestador] = useState({
        nome: '',
        cpf: '',
        nome_mae: '',
        dt_nascimento: '',
        estado_civil: 0,
        etnia: 0,
        escolaridade: 0,
        renda_familiar: 0,
        telefone1: '',
        telefone2: '',
        religiao: '',
        possui_beneficios: false,
        beneficios: [],
        familiares: [],
        habilidades: [],
        cursos: []
    });

    const [endereco, setEndereco] = useState({
        rua: '',
        cep: '',
        numero: '',
        bairro: '',
        complemento: '',
        id_cidade: ''
    });

    const [familiar, setFamiliar] = useState({
        familiar_nome: '',
        familiar_parentesco: '',
        familiar_idade: '',
        familiar_profissao: ''
    });

    const [habilidade, SetHabilidade] = useState({
        habilidade: '',
    });


    const [trabalho, setTrabalho] = useState({
        trabalho_descricao: '',
        trabalho_horario_inicio: '',
        trabalho_horario_fim: '',
        trabalho_dias_semana: []
    });

    const [cursos, setCursos] = useState({
        curso_descricao: '',
        curso_instituicao: '',
        curso_observacao: ''
    })

    const [saude, setSaude] = useState({
        saude_deficiencia: 0,
        saude_drogas: [],
        saude_observacao: ''
    });

    const [droga, setDroga] = useState({
        droga_nome: '',
        droga_frequencia: 0
    });

    const [beneficios, setBeneficio] = useState('');

    const askModal =(id)=>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h3>Criar novo processo</h3>
                        <p>Deseja associar um processo para o prestador <b>{prestador.nome}</b>?</p>

                        <button className='btn btn-confirm modal-btn'

                            onClick={async () => {
                                onClose();
                                navigate(`/processos/create/${id}`);
                            }}
                        >
                            Sim
                        </button>


                        <button className='btn btn-cancel modal-btn' onClick={()=>{
                             onClose();
                            navigate("/prestadores");

                        }}>Não</button>
                    </div>
                );
            }
        });
    }

    const submitForm = (e) => {
        e.preventDefault();

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h3>Adicionar Novo Prestador</h3>
                        <p>Confirma a criação do prestador <b>{prestador.nome}</b>?</p>

                        <button className='btn btn-confirm modal-btn'
                            onClick={async () => {
                                const payload = {
                                    prestador: prestador,
                                    trabalho: trabalho,
                                    image: image,
                                    saude: saude,
                                    endereco: endereco
                                }

                                const postResult = await window.api.Action({ controller: "Prestadores", action: "Create", params: payload });

                                window.api.Alert({ status: postResult.status, text: postResult.text, title: postResult.status ? "Sucesso!" : "Erro!" });
                                onClose();
                                if (postResult.status) {
                                    askModal(postResult.id);
                                    
                                }
                                    
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

    const handleDroga = (evt, name = null) => {
        const value = evt.value ?? evt.target.value;

        setDroga
            ({
                ...droga,
                [name ? name : evt.target.name]: value
            });

    }

    const handleSaude = (evt, name = null) => {
        const value = evt.value ?? evt.target.value;

        setSaude({
            ...saude,
            [name ? name : evt.target.name]: value
        })

    }

    const handleBeneficio = (evt) => {
        const value = evt.target.value;

        setBeneficio(value)
    }

    const handleEndereco = (evt, name = null) => {
        const value = evt.value ?? evt.target.value;

        setEndereco({
            ...endereco,
            [name ? name : evt.target.name]: value
        })

    }

    const handleFamilia = (evt, name = null) => {
        const value = evt.value ?? evt.target.value;

        setFamiliar({
            ...familiar,
            [name ? name : evt.target.name]: value
        })

    }

    const handleHabilidade = (evt) => {
        const value = evt.target.value;

        SetHabilidade({
            ...habilidade,
            [evt.target.name]: value
        })
    }

    const handlePrestador = (evt, prop_name = null) => {
        const value = evt.value ?? evt.target.value;

        setPrestador({
            ...prestador,
            [prop_name ? prop_name : evt.target.name]: value
        })
    }

    const handleBeneficios = (evt) => {
        const value = evt.value ?? evt.target.value;
        let booleanValue = false;
        if (value && typeof value === "string") {
            if (value.toLowerCase() === "true") booleanValue = true;
            if (value.toLowerCase() === "false") booleanValue = false;
        }

        setPrestador({
            ...prestador,
            ["possui_beneficios"]: booleanValue
        })
    }

    const handleTrabalho = (evt, prop_name = null) => {

        const value = evt.value ?? evt.target.value;

        setTrabalho({
            ...trabalho,
            [prop_name ? prop_name : evt.target.name]: value
        })
    }

    const handleDias = (value) => {

        setTrabalho({
            ...trabalho,
            ["trabalho_dias_semana"]: value.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0))
        })
    }

    const handleCursos = (evt, prop_name = null) => {
        const value = evt.value ?? evt.target.value;

        setCursos({
            ...cursos,
            [prop_name ? prop_name : evt.target.name]: value
        })
    }


    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const handleImage = async (e) => {
        let file = e.target.files[0];
        if (file) {
            const base64 = await convertBase64(file);
            setImage(base64);
        }
    }
    const removeImage = () => {
        setImage('');
    }

    const addHabilidade = () => {
        let status = true;
        let message = '';

        if (!habilidade.habilidade) {
            status = false
            message = 'Informe uma habilidade';
        }
        if (!status)
            return window.api.Alert({ status: false, text: message, title: "Atenção!" });


        var habilidades = prestador.habilidades;
        habilidades.push(habilidade.habilidade);
        setPrestador({
            ...prestador,
            ["habilidades"]: habilidades
        });

        SetHabilidade({ habilidade: '' })


    }

    const addBeneficio = () => {
        let status = true;
        let message = '';

        if (!beneficios) {
            status = false
            message = 'Informe um benefício';
        }
        if (!status)
            return window.api.Alert({ status: false, text: message, title: "Atenção!" });


        var lista_beneficios = prestador.beneficios;
        lista_beneficios.push(beneficios);
        setPrestador({
            ...prestador,
            ["beneficios"]: lista_beneficios
        });

        setBeneficio('');


    }

    const addDroga = () => {
        let drogas = saude.saude_drogas;
        drogas.push(droga);
        setSaude({
            ...saude,
            ["saude_drogas"]: drogas
        });

        setDroga({
            droga_nome: '',
            droga_frequencia: 0
        });

    }

    const removerDroga = (item) => {
        var drogas = saude.saude_drogas.filter(s => s !== item);
        setSaude({
            ...saude,
            ["saude_drogas"]: drogas
        })

    }

    const removerBeneficio = (item) => {
        var lista_beneficios = prestador.beneficios.filter(s => s !== item);
        setPrestador({
            ...prestador,
            ["beneficios"]: lista_beneficios
        })

    }

    const addFamiliar = () => {
        let status = true;
        let message = '';

        if (!familiar.familiar_nome) {
            status = false
            message = 'Informe um nome de familiar';
        } else if (!familiar.familiar_parentesco) {
            status = false
            message = 'Informe um parentesco';
        }

        if (!status)
            return window.api.Alert({ status: false, text: message, title: "Atenção!" });

        var familiares = prestador.familiares;
        familiares.push(familiar)

        setPrestador({
            ...prestador,
            ["familiares"]: familiares
        })

        setFamiliar({
            familiar_nome: '',
            familiar_parentesco: '',
            familiar_idade: '',
            familiar_profissao: ''
        })

    }


    const addCurso = () => {
        let status = true;
        let message = '';

        if (!cursos.curso_descricao) {
            status = false
            message = 'Informe uma descrição';
        }
        if (!status)
            return window.api.Alert({ status: false, text: message, title: "Atenção!" });


        var listcursos = prestador.cursos;
        listcursos.push(cursos);

        setPrestador({
            ...prestador,
            ["cursos"]: listcursos
        });

        setCursos({
            curso_descricao: '',
            curso_instituicao: '',
            curso_observacao: ''
        }
        );
    }


    const removerFamiliar = (item) => {
        var familiares = prestador.familiares.filter(s => s !== item);
        setPrestador({
            ...prestador,
            ["familiares"]: familiares
        })
    }


    const removerHabilidade = (item) => {
        var habilidades = prestador.habilidades.filter(s => s !== item);
        setPrestador({
            ...prestador,
            ["habilidades"]: habilidades
        })
    }

    const revomerCurso = (item) => {
        var listcursos = prestador.cursos.filter(s => s !== item);
        setPrestador({
            ...prestador,
            ["cursos"]: listcursos
        })
    }





    return (
        <form onSubmit={submitForm}>

            <div className="row">
                <Title title={"Novo Prestador"} />
                <div className="col-md-12" style={{ marginTop: "1rem" }}>
                    <Label nameLabel={"Informações do Prestador"} />
                    <div className="row">

                        <div className="col-md-8">

                            <div className="row">


                                <div className="col-md-3">

                                    <div className="input-group mb-2 mt-2">

                                        <label className="file-input-custom" htmlFor="inputGroupFile04" id="upload-file-layout">

                                            {
                                                image ?
                                                    <img src={image} alt="" srcSet="" />
                                                    :
                                                    <span id="empty-image">
                                                        <i className="fa fa-image"></i> <br />
                                                        Foto
                                                    </span>
                                            }




                                        </label>
                                        <input type="file" className="file-select-custom" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={handleImage} />
                                    </div>
                                    {
                                        image ?
                                            <div style={{ display: "flex" }}>
                                                <button className="btn btn-danger btn-remove-img" onClick={removeImage}><i className="fa-solid fa-trash"></i> remover imagem</button>
                                            </div>

                                            : null
                                    }

                                </div>

                                <div className="col-md-9">

                                    <div className="input-form">
                                        <label htmlFor="nome">Nome</label>
                                        <input
                                            id="nome"
                                            name="nome"
                                            className="form-control input rounded-2"
                                            type="text"
                                            placeholder="Nome do Prestador"
                                            value={prestador.nome}
                                            required={true}
                                            onChange={handlePrestador}

                                        />
                                    </div>

                                    <div className="input-form">
                                        <label htmlFor="nome_mae">Nome da Mãe</label>
                                        <input
                                            id="nome_mae"
                                            name="nome_mae"
                                            className="form-control input rounded-2"
                                            type="text"
                                            placeholder="Nome da mae"
                                            value={prestador.nome_mae}
                                            required={true}
                                            onChange={handlePrestador}
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="input-form">
                                                <label htmlFor="cpf">CPF</label>
                                                <input
                                                    id="cpf"
                                                    name="cpf"
                                                    className="form-control input rounded-2"
                                                    type="number"
                                                    placeholder="CPF"
                                                    required={true}
                                                    value={prestador.cpf}
                                                    onChange={handlePrestador}
                                                />
                                            </div>

                                            <div className="input-form">
                                                <label htmlFor="telefone1">Telefone</label>
                                                <input
                                                    id="telefone1"
                                                    name="telefone1"
                                                    className="form-control input rounded-2"
                                                    type="number"
                                                    placeholder="(00) 00000-0000"
                                                    required={true}
                                                    value={prestador.telefone1}
                                                    onChange={handlePrestador}
                                                />
                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="input-form">
                                                <label htmlFor="dt_nascimento">Data de Nascimento</label>
                                                <input
                                                    id="dt_nascimento"
                                                    name="dt_nascimento"
                                                    className="form-control input rounded-2"
                                                    type="date"
                                                    placeholder="Data de nascimento"
                                                    required={true}
                                                    value={prestador.dt_nascimento}
                                                    onChange={handlePrestador}
                                                />
                                            </div>

                                            <div className="input-form">
                                                <label htmlFor="telefone2">Telefone 2 (opcional)</label>
                                                <input
                                                    id="telefone2"
                                                    name="telefone2"
                                                    className="form-control input rounded-2"
                                                    type="number"
                                                    placeholder="(00) 00000-0000"
                                                    required={false}
                                                    value={prestador.telefone2}
                                                    onChange={handlePrestador}
                                                />
                                            </div>

                                        </div>

                                    </div>


                                </div>


                            </div>

                        </div>
                        <div className="col-md-4">

                            <div class="row">
                                <div className="col-md-6">
                                    <div className="input-form">
                                        <label htmlFor="estado_civil">Estado Civil</label>
                                        <select className="select-custom w-10 form-select form-select-md" id="estado_civil" name="estado_civil"
                                            value={prestador.estado_civil}
                                            required={true}
                                            onChange={handlePrestador}>
                                            <option defaultValue={true} value={0}>Solteiro</option>
                                            <option value={1}>Casado</option>
                                            <option value={2}>Separado</option>
                                            <option value={3}>Divorciado</option>
                                            <option value={4}>Viúvo</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="input-form">
                                        <label htmlFor="nome">Etnia</label>
                                        <select className="select-custom w-10 form-select form-select-md" id="etnia" name="etnia"
                                            value={prestador.etnia}
                                            required={true}
                                            onChange={handlePrestador}>
                                            <option defaultValue={true} value={0}>Branco</option>
                                            <option value={1}>Preto</option>
                                            <option value={2}>Pardo</option>
                                            <option value={3}>Pardo</option>
                                            <option value={4}>Amarela</option>
                                            <option value={5}>Indigena</option>
                                        </select>
                                    </div>

                                </div>

                            </div>



                            <div className="input-form">
                                <label htmlFor="nome">Escolaridade</label>
                                <select className="select-custom w-10 form-select form-select-md" id="escolaridade" name="escolaridade"
                                    value={prestador.escolaridade}
                                    required={true}
                                    onChange={handlePrestador}>
                                    <option defaultValue={true} value={0}>Analfabeto</option>
                                    <option value={1}>Fundamental Incompleto</option>
                                    <option value={2}>Fundamental Completo</option>
                                    <option value={3}>Médio Incompleto</option>
                                    <option value={4}>Médio Completo</option>
                                    <option value={5}>Superior Incompleto</option>
                                    <option value={6}>Superior Completo</option>
                                </select>
                            </div>



                            <div className="input-form">
                                <label htmlFor="religiao">Religião</label>
                                <input
                                    id="religiao"
                                    name='religiao'
                                    className="form-control input rounded-2"
                                    type="text"
                                    placeholder="Religião"
                                    value={prestador.religiao}
                                    onChange={handlePrestador}
                                />
                            </div>



                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-5" style={{ marginTop: "1rem" }}>
                            <div className="input-form inline">
                                <form>
                                    <div>
                                        <label htmlFor="possui_beneficios">Possuí Beneficios do Governo?</label>

                                        <label className="label-radio">
                                            Não
                                            <input
                                                className="radio"
                                                type="radio"
                                                name="possui_beneficios"
                                                value="false"
                                                checked={!prestador.possui_beneficios}
                                                onChange={handleBeneficios}
                                            />
                                        </label>

                                        <label className="label-radio">
                                            Sim
                                            <input
                                                className="radio"
                                                type="radio"
                                                name="possui_beneficios"
                                                value="true"
                                                checked={prestador.possui_beneficios}
                                                onChange={handleBeneficios}
                                            />
                                        </label>
                                    </div>
                                </form>
                            </div>

                            {
                                prestador.possui_beneficios ?

                                    <div className="row">

                                        <div className="input-form col-md-12">
                                            <label htmlFor="beneficios">Informe os benefícios do prestador</label>
                                            <div className="input-group mb-3">

                                                <input
                                                    id="beneficios"
                                                    name="beneficios"
                                                    className="form-control input rounded-2"
                                                    placeholder='Bolsa Familia, Auxilio Emergencial, ...'
                                                    value={beneficios}
                                                    onChange={handleBeneficio}
                                                />

                                                <div className="input-group-append">
                                                    <button className="btn btn-dark-blue" onClick={addBeneficio} type="button"><i className='fa fa-plus'></i> Adicionar Benefícios</button>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            prestador.beneficios.length > 0 ?
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        <table className="table table-small">
                                                            <thead>
                                                                <tr>
                                                                    <th>Benefício</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    prestador.beneficios.map((s, i) => (
                                                                        <tr key={i}>
                                                                            <td>{s}</td>
                                                                            <td><button type="button" className="btn btn-danger pull-right" onClick={() => { removerBeneficio(s) }}><i className="fa-solid fa-trash"></i> Excluir</button></td>
                                                                        </tr>

                                                                    ))
                                                                }
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                                : null
                                        }


                                    </div>


                                    : null

                            }


                        </div>

                        <div className="col-md-7" style={{ marginTop: "1rem" }}>
                            <Endereco endereco={endereco} handleChange={handleEndereco} />
                        </div>
                    </div>


                </div>




                <div className="col-md-12" style={{ marginTop: "1rem" }}>
                    <Label nameLabel={"Familiares"} />

                    <div className="row">
                        <div className="col-md-3">
                            <div className="input-form">
                                <label htmlFor="familiar_nome">Nome</label>
                                <input
                                    id="familiar_nome"
                                    name="familiar_nome"
                                    className="form-control input rounded-2"
                                    type="text"
                                    placeholder="Nome do Familiar"
                                    value={familiar.familiar_nome}
                                    onChange={handleFamilia}

                                />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="input-form">
                                <label htmlFor="familiar_parentesco">Parentesco</label>
                                <input
                                    id="familiar_parentesco"
                                    name="familiar_parentesco"
                                    className="form-control input rounded-2"
                                    type="text"
                                    placeholder="Parentesco"
                                    value={familiar.familiar_parentesco}
                                    onChange={handleFamilia}

                                />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="input-form">
                                <label htmlFor="familiar_idade">Idade (opcional)</label>
                                <input
                                    id="familiar_idade"
                                    name="familiar_idade"
                                    className="form-control input rounded-2"
                                    type="number"
                                    placeholder="Idade do Familiar"
                                    value={familiar.familiar_idade}
                                    onChange={handleFamilia}

                                />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="input-form">
                                <label htmlFor="familiar_profissao">Profissão (opcional)</label>
                                <input
                                    id="familiar_profissao"
                                    name="familiar_profissao"
                                    className="form-control input rounded-2"
                                    type="text"
                                    placeholder="Profissão do Familiar"
                                    value={familiar.familiar_profissao}
                                    onChange={handleFamilia}

                                />
                            </div>
                        </div>
                        <div className="col-md-2" style={{ marginTop: "1rem" }}>
                            <button type="button" className='btn btn-dark-blue' onClick={addFamiliar}><i className='fa fa-plus'></i> Adicionar Familiar</button>
                        </div>

                        <div className="row">

                            <div className="col-md-12">
                                {
                                    prestador.familiares.length > 0 ?
                                        <table className="table table-border">
                                            <thead>
                                                <tr>
                                                    <td>Nome</td>
                                                    <td>Parentesco</td>
                                                    <td>Idade</td>
                                                    <td>Profissão</td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    prestador.familiares.map((s, i) => (
                                                        <tr key={i} >
                                                            <td>
                                                                {s.familiar_nome}
                                                            </td>
                                                            <td>
                                                                {s.familiar_parentesco}
                                                            </td>
                                                            <td>
                                                                {s.familiar_idade ?? "--"}
                                                            </td>
                                                            <td>

                                                                {s.familiar_profissao ?? "--"}
                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-danger pull-right" onClick={() => { removerFamiliar(s) }}><i className="fa-solid fa-trash"></i> Excluir</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table> : null
                                }
                            </div>

                        </div>


                    </div>
                </div>

                <div className="col-md-12" style={{ marginTop: "1rem" }}>
                    <Label nameLabel={"Trabalho"} />
                    <div className="row">

                        <div className="col-md-6">
                            <div className="input-form">
                                <label htmlFor="trabalho_descricao">Descrição</label>
                                <input
                                    id="trabalho_descricao"
                                    name="trabalho_descricao"
                                    className="form-control input rounded-2"
                                    type="text"
                                    placeholder="Descrição"
                                    value={trabalho.trabalho_descricao}
                                    onChange={handleTrabalho}

                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-form">
                                <label htmlFor="trabalho_horario_inicio">Horário de Entrada</label>
                                <input
                                    id="trabalho_horario_inicio"
                                    name="trabalho_horario_inicio"
                                    className="form-control input rounded-2"
                                    type="time"
                                    value={trabalho.trabalho_horario_inicio}
                                    onChange={handleTrabalho}
                                />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="input-form">
                                <label htmlFor="trabalho_horario_fim">Horário de Saída</label>
                                <input
                                    id="trabalho_horario_fim"
                                    name="trabalho_horario_fim"
                                    className="form-control input rounded-2"
                                    type="time"
                                    value={trabalho.trabalho_horario_fim}
                                    onChange={handleTrabalho}
                                />
                            </div>
                        </div>

                        <div className="col-md-7">
                            <div className="input-form">
                                <label htmlFor="trabalho_dias_semana">Dias Semana</label>
                                <InputDiasSemana id="trabalho_dias_semana" name="trabalho_dias_semana" handleChange={handleDias} value={trabalho.trabalho_dias_semana} />
                            </div>
                        </div>



                    </div>
                </div>


                <div className="col-md-12" style={{ marginTop: "1rem" }}>
                    <Label nameLabel={"Habilidades"} />
                    <div className="row">
                        <div className="col-md-5">
                            <div className="input-form">
                                <label htmlFor="habilidade">Descrição</label>
                                <div className="input-group mb-3">
                                    <input
                                        id="habilidade"
                                        name="habilidade"
                                        className="form-control input rounded-2"
                                        type="text"
                                        value={habilidade.habilidade}
                                        onChange={handleHabilidade}
                                    />

                                    <div className="input-group-append">
                                        <button className="btn btn-dark-blue" onClick={addHabilidade} type="button"><i className='fa fa-plus'></i> Adicionar Habilidade</button>
                                    </div>

                                </div>


                            </div>
                        </div>

                    </div>


                    <div className="row">
                        <div className="col-md-5">
                            {
                                prestador.habilidades.length > 0 ?
                                    <table className="table table-border">
                                        <thead>
                                            <tr>
                                                <td>Descrição</td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                prestador.habilidades.map((s, i) => (
                                                    <tr key={i} >
                                                        <td>
                                                            {s}
                                                        </td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger pull-right" onClick={() => { removerHabilidade(s) }}><i className="fa-solid fa-trash"></i> Excluir</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table> : null
                            }
                        </div>
                    </div>
                </div>


                <div className="col-md-12" style={{ marginTop: "1rem" }}>
                    <Label nameLabel={"Cursos e Especializações"} />

                    <div className="row">
                        <div className="col-md-12">
                            <div className="input-form">
                                <label htmlFor="curso_descricao">Descrição</label>
                                <div className="input-group">
                                    <input
                                        id="curso_descricao"
                                        name="curso_descricao"
                                        className="form-control input rounded-2"
                                        type="text"
                                        value={cursos.curso_descricao}
                                        onChange={handleCursos}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="input-form">
                                <label htmlFor="curso_instituicao">Instituição</label>
                                <div className="input-group">
                                    <input
                                        id="curso_instituicao"
                                        name="curso_instituicao"
                                        className="form-control input rounded-2"
                                        type="text"
                                        value={cursos.curso_instituicao}
                                        onChange={handleCursos}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="input-form">
                                <label htmlFor="curso_observacao">Observação</label>
                                <div className="input-group">
                                    <textarea
                                        id="curso_observacao"
                                        name="curso_observacao"
                                        className="form-control input rounded-2"
                                        type="text"
                                        value={cursos.curso_observacao}
                                        rows={4}
                                        onChange={handleCursos}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <button type="button" className='btn btn-dark-blue' onClick={addCurso} style={{ marginTop: "1rem" }}><i className='fa fa-plus'></i> Adicionar Curso / Especialização</button>

                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                {
                                    prestador.cursos.length > 0 ?
                                        <table className="table table-border">
                                            <thead>
                                                <tr>
                                                    <td>Descrição</td>
                                                    <td>Instituição</td>
                                                    <td>Observação</td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    prestador.cursos.map((s, i) => (
                                                        <tr key={i} >
                                                            <td>
                                                                {s.curso_descricao}
                                                            </td>
                                                            <td>
                                                                {s.curso_instituicao}
                                                            </td>
                                                            <td>
                                                                {s.curso_observacao}
                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-danger pull-right" onClick={() => { revomerCurso(s) }}><i className="fa-solid fa-trash"></i> Excluir</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table> : null
                                }
                            </div>
                        </div>

                    </div>


                </div>


                <div className="col-md-12" style={{ marginTop: "1rem" }}>
                    <Label nameLabel={"Saúde"} />
                    <div class="row">
                        <div className="col-md-12">

                            <div className="row">
                                <div className="input-form col-md-6">

                                    <div className="row">

                                        <div className="col-md-12">
                                            <label htmlFor="saude_uso_drogas">Usuário de Drogas? Se sim, informe-as abaixo: </label>

                                        </div>
                                        <div className="col-md-12">

                                            <div className="row">
                                                <div className="col-md-12">

                                                    <div className="input-group mb-3">

                                                        <input
                                                            id="droga_nome"
                                                            name="droga_nome"
                                                            className="form-control input rounded-2"
                                                            placeholder="Cocaína, Álcool, ..."
                                                            type="text"
                                                            value={droga.droga_nome}
                                                            onChange={handleDroga}
                                                        />

                                                        <div className="input-group-append">
                                                            <select className="select-custom w-10 form-select form-select-md" id="droga_frequencia" name="droga_frequencia"
                                                                value={droga.droga_frequencia}
                                                                required={true}
                                                                onChange={handleDroga}>
                                                                <option defaultValue={true} value='0'>Não Usa</option>
                                                                <option value='1'>Eventualmente</option>
                                                                <option value='2'>Com Frequência</option>
                                                            </select>
                                                        </div>

                                                        <div className="input-group-append">
                                                            <button type="button" className='btn btn-dark-blue' onClick={addDroga} ><i className='fa fa-plus'></i> Adicionar Droga</button>
                                                        </div>

                                                    </div>

                                                </div>

                                                {
                                                    saude.saude_drogas.length > 0 ?
                                                        <table className="table table-small">
                                                            <thead>
                                                                <tr>
                                                                    <th>Droga</th>
                                                                    <th>Frequência</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    saude.saude_drogas.map((s, i) => (
                                                                        <tr key={i}>
                                                                            <td>{s.droga_nome}</td>
                                                                            <td>{s.droga_frequencia == 0 ? 'Não Usa' : s.droga_frequencia == 1 ? "Eventualmente" : "Com Frequência"}</td>
                                                                            <td><button type="button" className="btn btn-danger pull-right" onClick={() => { removerDroga(s) }}><i className="fa-solid fa-trash"></i> Excluir</button></td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                        : null
                                                }


                                            </div>

                                        </div>


                                    </div>







                                </div>
                                <div className="input-form col-md-6">
                                    <label htmlFor="saude_deficiencia">Possuí Deficiência? </label>
                                    <select className="select-custom w-10 form-select form-select-md" id="saude_deficiencia" name="saude_deficiencia"
                                        value={saude.saude_deficiencia}
                                        required={true}
                                        onChange={handleSaude}>
                                        <option defaultValue={true} value='0'>Não</option>
                                        <option value='1'>Mental</option>
                                        <option value='2'>Auditiva</option>
                                        <option value='3'>Visual</option>
                                    </select>
                                </div>

                                <div className="col-md-12">
                                    <div className="input-form">
                                        <label htmlFor="saude_observacao">Observação</label>
                                        <div className="input-group">
                                            <textarea
                                                id="saude_observacao"
                                                name="saude_observacao"
                                                className="form-control input rounded-2"
                                                type="text"
                                                value={saude.saude_observacao}
                                                rows={4}
                                                onChange={handleSaude}
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>


            </div>

            <div className="col-md-12 btn-inline" style={{ 'marginTop': '2rem' }}>
                <button type="submit" className="btn btn-dark-blue" ><i className="fa fa-save"></i> Salvar</button>
                <button type="button" onClick={() => {navigate("/prestadores");}} className="btn btn-danger"><i className="fa fa-trash"></i> Cancelar</button>
            </div>

        </form>
    )

}

export default Create;
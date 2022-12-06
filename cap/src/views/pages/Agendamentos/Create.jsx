import React, { useState, useEffect } from "react";
import Label from "../../shared/Label";
import Title from "../../shared/Title";
import InputDiasSemana from "../../shared/InputDiasSemana";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';


export default function Create() {


    const [agendamento_horario_inicio, setAgendamento_horario_inicio] = useState('');
    const [agendamento_horario_fim, setAgendamento_horario_fim] = useState('');
    const [agendamento_dia_inicial, setAgendamento_dia_inicial] = useState(new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }),);
    const [agendamento_dias_semana, setAgendamento_dias_semana] = useState([]);

    const [agendamentos, setAgendamentos] = useState({});
    const [entidades, setEntidades] = useState([]);
    const [processos, setProcessos] = useState([]);
    const [prestadores, setPrestadores] = useState([]);
    const [tarefas, setTarefas] = useState([]);

    const [search, setSearch] = useState({
        id_entidade: '',
        id_prestador: '',
        id_tarefa: '',
        id_processo: null,
    });


    const navigate = useNavigate();

    const handleSubmit = async () => {
        agendamentoPayload();
        console.log(agendamentos);


        const payload = {
            search: search,
            agendamentos: agendamentos
        }

        if (verificaDatas() == true) {
            window.api.Alert({ status: false, text: "Horário inicial inferior ou igual ao horário final", title: "Erro!" });
            return;
        }

        const postResult = await window.api.Action({ controller: "Agendamentos", action: "Create", params: payload });
        window.api.Alert({ status: postResult.status, text: postResult.text, title: postResult.status ? "Sucesso!" : "Erro!" });

        if (postResult.status)
            navigate("/agendamentos/");

    }

    function verificaDatas() {
        let horasInicial = agendamento_horario_inicio.slice(0, 2);
        let minutosInicial = agendamento_horario_inicio.slice(3, 5);

        let horasFinal = agendamento_horario_fim.slice(0, 2);
        let minutosFinal = agendamento_horario_fim.slice(3, 5);

        let horasInicialSegundos = parseInt(horasInicial) * 3600;
        let minutosInicialSegundos = parseInt(minutosInicial) * 60;

        let horasFinalSegundos = parseInt(horasFinal) * 3600;
        let minutosFinalSegundos = parseInt(minutosFinal) * 60;

        const segundosIniciais = horasInicialSegundos + minutosInicialSegundos;
        const segundosFinais = horasFinalSegundos + minutosFinalSegundos;

        const result = segundosFinais - segundosIniciais;

        if (result <= 0) {
            return true;
        }

    }


    function agendamentoPayload() {
        let agendamento = {
            agendamento_horario_inicio: agendamento_horario_inicio,
            agendamento_horario_fim: agendamento_horario_fim,
            agendamento_dia_inicial: agendamento_dia_inicial,
            agendamento_dias_semana: agendamento_dias_semana
        }

        setAgendamentos(agendamento);

    }

    const handleDias = (value) => {
        setAgendamento_dias_semana(value.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0)))
    }


    const fetchDataPrestadores = async () => {
        let data = await window.api.Action({ controller: "Processos", action: "GetPrestadores" });
        setPrestadores(data);
    }

    const fetchDataTarefas = async () => {
        let data = await window.api.Action({ controller: "Entidades", action: "GetTarefasLabel" });
        setTarefas(data);
    }

    const fetchDataEntidades = async (value) => {

        let data = tarefas.map((e) => {

            if (value.instituicaoTarefaId == e.instituicoes.id && e.instituicoes.dt_descredenciamento == null) {
                let entidadeLabel = {
                    value: e.instituicoes.id,
                    label: e.instituicoes.nome
                }
                return entidadeLabel;
            }
        })
        data = data.filter((e) => { return e != undefined });
        setEntidades(data);
    }

    const fetchDataProcessos = async (value) => {
        let data = await window.api.Action({ controller: "Processos", action: "GetProcessosLabel", params: value });
        setProcessos(data);
    }

    useEffect(() => {
        fetchDataPrestadores();
        fetchDataTarefas();
    }, [search]);


    const handleSearchDropPrestador = async (evt) => {
        const value = evt;
        setSearch({
            ...search,
            ['id_prestador']: value
        });
        fetchDataProcessos(value);
    }

    const handleSearchDropTarefa = async (evt) => {
        const value = evt;
        setSearch({
            ...search,
            ['id_tarefa']: value
        });
        fetchDataEntidades(value);
    }


    const handleSearchDropProcesso = async (evt) => {
        const value = evt;
        setSearch({
            ...search,
            ['id_processo']: value
        });
    }

    const handleSearchDropEntidades = async (evt) => {
        const value = evt;
        setSearch({
            ...search,
            ['id_entidade']: value
        });
    }


    return (
        <>
            <div className="row">
                <Title title="Cadastro de período da atividade" />
                <div className="col-md-12 justify-center">

                    <div className="row">

                        <div className="col-md-8">


                            <Label
                                nameLabel="Selecione o prestador, atividade e instituição"
                            />

                            <div className="input-form mb-3 mt-3">
                                <Select
                                    classNamePrefix={"select"}
                                    options={prestadores}
                                    id="id_prestador"
                                    name="id_prestador"
                                    value={search.id_prestador}
                                    placeholder="Prestador"
                                    onChange={handleSearchDropPrestador}

                                />

                            </div>

                            <div className="input-form mb-3 mt-3">
                                <Select
                                    classNamePrefix={"select"}
                                    options={processos}
                                    id="id_processo"
                                    name="id_processo"
                                    value={search.id_processo}
                                    placeholder="Processo"
                                    onChange={handleSearchDropProcesso}
                                />

                            </div>

                            <div className="input-form mb-3 mt-3">
                                <Select
                                    classNamePrefix={"select"}
                                    options={tarefas}
                                    id="id_tarefa"
                                    name="id_tarefa"
                                    placeholder="Tarefa"
                                    onChange={handleSearchDropTarefa}
                                />

                            </div>

                            <div className="input-form mb-3 mt-3">
                                <Select
                                    options={entidades}
                                    id="id_entidade"
                                    name="id_entidade"
                                    value={search.id_entidade}
                                    placeholder="Instituição"
                                    onChange={handleSearchDropEntidades}
                                />

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12" style={{ marginTop: "1rem" }}>
                    <Label nameLabel={"Agendamento"} />
                    <div className="row">
                        <div className="col-md-4">
                            <div className="input-form">
                                <label htmlFor="trabalho_horario_inicio">Horário de Entrada</label>
                                <input
                                    required={true}
                                    id="agendamento_horario_inicio"
                                    name="agendamento_horario_inicio"
                                    className="form-control input rounded-2"
                                    type="time"
                                    value={agendamento_horario_inicio}
                                    onChange={(e) => setAgendamento_horario_inicio(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="input-form">
                                <label htmlFor="agendamento_horario_fim">Horário de Saída</label>
                                <input
                                    required={true}
                                    id="agendamento_horario_fim"
                                    name="agendamento_horario_fim"
                                    className="form-control input rounded-2"
                                    type="time"
                                    value={agendamento_horario_fim}
                                    onChange={(e) => setAgendamento_horario_fim(e.target.value)}
                                />
                            </div>
                        </div>


                        <div className="col-md-8">
                            <div className="input-form">
                                <label htmlFor="agendamento_dia_inicial">Data inicial</label>
                                <input
                                    required={true}
                                    id="agendamento_dia_inicial"
                                    name="agendamento_dia_inicial"
                                    className="form-control input rounded-2"
                                    type="date"
                                    value={agendamento_dia_inicial}
                                    onChange={(e) => setAgendamento_dia_inicial(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="input-form">
                                <label htmlFor="agendamento_dias_semana">Dias Semana</label>
                                <InputDiasSemana id="agendamento_dias_semana" name="agendamento_dias_semana" handleChange={handleDias}
                                    value={agendamento_dias_semana} />
                            </div>
                        </div>

                    </div>


                </div>


            </div>


            <div className="row">
                <div className="col-md-12 btn-inline" style={{ 'marginTop': '2rem' }}>
                    <button className="btn btn-dark-blue" onClick={handleSubmit}>Confirmar</button>
                    <button type="button" onClick={() => { navigate("/agendamentos"); }} className="btn btn-danger"><i className="fa fa-trash"></i> Cancelar</button>
                </div>
            </div>

        </>
    )



}
import { Buffer } from 'buffer';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import Title from "../../shared/Title";
import Select from 'react-select';
import Label from "../../shared/Label";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Edit = (props) => {

    const navigate = useNavigate();
    const { id } = useParams();
    

    const [prestador, setPrestador] = useState('');

    const [centrais, setCentrais] = useState([]);


    const [processo, setProcesso] = useState({
        id_central: { value: -1, label: "" },
        id: id,
        nro_processo: '',
        nro_artigo_penal: '',
        pena_originaria: '',
        pena_originaria_regime: 0,
        inciso: '',
        detalhamento: '',
        prd: false,
        prd_descricao: '',
        horas_cumprir: 0,
        possui_multa: false,
        valor_a_pagar: 0,
        qtd_penas_anteriores: 0,
        vara: '',
    });

    useEffect(() => {


        const fetchData = async () => {
            let data = await window.api.Action({ controller: "Processos", action: "GetCentrais" });
            setCentrais(data);
        }

        fetchData();

    }, []);

    useEffect(() => {


        const fetchData = async () => {
            let data = await window.api.Action({ controller: "Processos", action: "GetProcesso", params: id });
            setProcesso(data);
            setPrestador(data.nome_prestador);

        }

        fetchData();

    }, []);


    const handleProcesso = (evt, name = null) => {

        const value = evt.value ?? evt.target.value;

        setProcesso({
            ...processo,
            [name ? name : evt.target.name]: value
        })

    }

    const handleCentral = (evt) =>{
        setProcesso({
            ...processo,
            ['id_central']: evt
        })
    }

    const handleRadio = (evt, name = null) => {
        const value = evt.value ?? evt.target.value;
        let booleanValue = false;
        if (value && typeof value === "string") {
            if (value.toLowerCase() === "true") booleanValue = true;
            if (value.toLowerCase() === "false") booleanValue = false;
        }

        setProcesso({
            ...processo,
            [name ? name : evt.target.name]: booleanValue
        })
    }


    const submitForm = (e) => {
        e.preventDefault();
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h3>Salvar alterações</h3>
                        <p>Deseja salvar o processo <b>{processo.nro_processo}</b>?</p>

                        <button className='btn btn-confirm modal-btn'
                            onClick={async () => {
                                const payload = {
                                    processo: processo,
                                    id: id
                                }

                                const postResult = await window.api.Action({ controller: "Processos", action: "Edit", params: payload });

                                window.api.Alert({ status: postResult.status, text: postResult.text, title: postResult.status ? "Sucesso!" : "Erro!" });
                                onClose();
                                if (postResult.status) {
                                    navigate("/processos")

                                }
                                    ;
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
        <div>
            <Title title={"Novo Processo"} />

            <form onSubmit={submitForm}>

                <div className="row">

                    <div className="col-md-6">

                        <b>Prestador:</b> {prestador}

                        <div className="input-form">

                            <label htmlFor="id_central">Central responsável</label>
                            <Select
                                options={centrais}
                                id="id_central"
                                name="id_central"
                                value={processo.id_central}
                                onChange={handleCentral}
                            />

                        </div>

                        <div className="input-form">

                            <label htmlFor="nro_processo">Número do processo</label>
                            <input
                                id="nro_processo"
                                name="nro_processo"
                                className="form-control input rounded-2"
                                type="number"
                                placeholder=""
                                value={processo.nro_processo}
                                required={true}
                                onChange={handleProcesso}
                            />
                        </div>

                        <div className="input-form">

                            <label htmlFor="vara">Nome da vara judicial</label>
                            <input
                                id="vara"
                                name="vara"
                                className="form-control input rounded-2"
                                type="text"
                                placeholder=""
                                value={processo.vara}
                                required={true}
                                onChange={handleProcesso}
                            />
                        </div>

                        <div className='row'>
                            <div className="input-form col-md-6">

                                <label htmlFor="qtd_penas_anteriores">Qtd. penas anteriores</label>
                                <input
                                    id="qtd_penas_anteriores"
                                    name="qtd_penas_anteriores"
                                    className="form-control input rounded-2"
                                    type="number"
                                    placeholder=""
                                    value={processo.qtd_penas_anteriores}
                                    required={true}
                                    onChange={handleProcesso}
                                />
                            </div>

                            <div className="input-form col-md-6">

                                <label htmlFor="horas_cumprir">Horas a cumprir</label>
                                <input
                                    id="horas_cumprir"
                                    name="horas_cumprir"
                                    className="form-control input rounded-2"
                                    type="number"
                                    placeholder=""
                                    value={processo.horas_cumprir}
                                    required={true}
                                    onChange={handleProcesso}
                                />
                            </div>
                        </div>


                        <div className="input-form inline">
                            <form>
                                <div>
                                    <label htmlFor="persecucao_penal">Persecução penal?</label>

                                    <label className="label-radio">
                                        Não
                                        <input
                                            className="radio"
                                            type="radio"
                                            name="persecucao_penal"
                                            value="false"
                                            checked={!processo.persecucao_penal}
                                            onChange={handleRadio}
                                        />
                                    </label>

                                    <label className="label-radio">
                                        Sim
                                        <input
                                            className="radio"
                                            type="radio"
                                            name="persecucao_penal"
                                            value="true"
                                            checked={processo.persecucao_penal}
                                            onChange={handleRadio}
                                        />
                                    </label>
                                </div>
                            </form>
                        </div>


                    </div>

                    <div className="col-md-6">
                        <br />
                        <div className="input-form">

                            <label htmlFor="nro_artigo_penal">Número do artigo penal</label>
                            <input
                                id="nro_artigo_penal"
                                name="nro_artigo_penal"
                                className="form-control input rounded-2"
                                type="number"
                                placeholder=""
                                value={processo.nro_artigo_penal}
                                required={true}
                                onChange={handleProcesso}
                            />
                        </div>

                        <div className="input-form">

                            <label htmlFor="pena_originaria">Pena original</label>
                            <input
                                id="pena_originaria"
                                name="pena_originaria"
                                className="form-control input rounded-2"
                                type="text"
                                placeholder=""
                                value={processo.pena_originaria}
                                required={true}
                                onChange={handleProcesso}
                            />
                        </div>

                        <div className="input-form">
                            <label htmlFor="pena_originaria_regime">Tipo de Regime</label>
                            <select className="select-custom w-10 form-select form-select-md" id="pena_originaria_regime" name="pena_originaria_regime"
                                value={processo.pena_originaria_regime}
                                required={true}
                                onChange={handleProcesso}>
                                <option defaultValue={true} value={0}>Aberto</option>
                                <option value={1}>Semi Aberto</option>
                                <option value={2}>Fechado</option>
                            </select>
                        </div>


                    </div>


                    <div className="col-md-12">
                        <div className="input-form">
                            <label htmlFor="detalhamento">Detalhamento</label>
                            <div className="input-group">
                                <textarea
                                    id="detalhamento"
                                    name="detalhamento"
                                    className="form-control input rounded-2"
                                    type="text"
                                    value={processo.detalhamento}
                                    rows={4}
                                    onChange={handleProcesso}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="input-form">
                            <label htmlFor="inciso">Inciso</label>
                            <div className="input-group">
                                <textarea
                                    id="inciso"
                                    name="inciso"
                                    className="form-control input rounded-2"
                                    type="text"
                                    value={processo.inciso}
                                    rows={4}
                                    onChange={handleProcesso}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="input-form inline">
                            <form>
                                <div>
                                    <label htmlFor="prd">Possuí PRD?</label>

                                    <label className="label-radio">
                                        Não
                                        <input
                                            className="radio"
                                            type="radio"
                                            name="prd"
                                            value="false"
                                            checked={!processo.prd}
                                            onChange={handleRadio}
                                        />
                                    </label>

                                    <label className="label-radio">
                                        Sim
                                        <input
                                            className="radio"
                                            type="radio"
                                            name="prd"
                                            value="true"
                                            checked={processo.prd}
                                            onChange={handleRadio}
                                        />
                                    </label>
                                </div>
                            </form>
                        </div>

                        {
                            processo.prd ?

                                <div className="input-form">
                                    <label htmlFor="prd_descricao">Descrição PRD</label>
                                    <div className="input-group">
                                        <textarea
                                            id="prd_descricao"
                                            name="prd_descricao"
                                            className="form-control input rounded-2"
                                            type="text"
                                            value={processo.prd_descricao}
                                            rows={4}
                                            onChange={handleProcesso}
                                        />
                                    </div>
                                </div>
                                : null
                        }

                        {
                            processo.prd ?
                                <div className="input-form inline">
                                    <form>
                                        <div>
                                            <label htmlFor="possui_multa">Possuí multa?</label>

                                            <label className="label-radio">
                                                Não
                                                <input
                                                    className="radio"
                                                    type="radio"
                                                    name="possui_multa"
                                                    value="false"
                                                    checked={!processo.possui_multa}
                                                    onChange={handleRadio}
                                                />
                                            </label>

                                            <label className="label-radio">
                                                Sim
                                                <input
                                                    className="radio"
                                                    type="radio"
                                                    name="possui_multa"
                                                    value="true"
                                                    checked={processo.possui_multa}
                                                    onChange={handleRadio}
                                                />
                                            </label>
                                        </div>
                                        {
                                            processo.possui_multa ?
                                                <div className="input-form">

                                                    <label htmlFor="valor_a_pagar">Valor a pagar</label>
                                                    <input
                                                        id="valor_a_pagar"
                                                        name="valor_a_pagar"
                                                        className="form-control input rounded-2"
                                                        type="number"
                                                        placeholder=""
                                                        value={processo.valor_a_pagar}
                                                        required={true}
                                                        onChange={handleProcesso}
                                                    />
                                                </div>
                                                : null
                                        }


                                    </form>
                                </div>




                                : null
                        }



                    </div>
                </div>

                <div className="col-md-12 btn-inline" style={{ 'marginTop': '2rem' }}>
                    <button type="submit" className="btn btn-dark-blue" ><i className="fa fa-save"></i> Salvar</button>
                    <button type="button" onClick={() => {navigate("/processos");}} className="btn btn-danger"><i className="fa fa-trash"></i> Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Title from "../../shared/Title";
import Label from "../../shared/Label";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default function Create(props) {

    const [nome, setNome] = useState('');
    const [observacao, setObservacao] = useState('');
    const [cnpj, setCNPJ] = useState("000.000.000-00");
    const [telefone1, setTelefone1] = useState('');
    const [telefone2, setTelefone2] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState('');

    const navigate = useNavigate();


    const askModal = (id) => {

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h3>Criar nova atividade</h3>
                        <p>Deseja associar uma processo para a instituicão <b>{nome}</b>?</p>

                        <button className='btn btn-confirm modal-btn'

                            onClick={async () => {
                                onClose();
                                navigate(`/atividadesInstituicao/Create/${id}`);
                            }}
                        >
                            Sim
                        </button>


                        <button className='btn btn-cancel modal-btn' onClick={() => {
                            onClose();
                            navigate("/instituicoes");

                        }}>Não</button>
                    </div>
                );
            }
        });
    }

    const handleSubmit = (e) => {
        console.log("teste")
        e.preventDefault();
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h3>Criar nova atividade</h3>
                        <p>Deseja associar uma processo para a instituicão <b>{nome}</b>?</p>

                        <button className='btn btn-confirm modal-btn'

                            onClick={async () => {
                                const payload = {
                                    nome: nome,
                                    cnpj: cnpj,
                                    telefone1: telefone1,
                                    telefone2: telefone2,
                                    email: email,
                                    observacao: observacao
                                }
                               
                                
                                const postResult = await window.api.Action({ controller: "Instituicoes", action: "Create", params: payload });


                                window.api.Alert({ status: postResult.status, text: postResult.text, title: postResult.status ? "Sucesso!" : "Erro!" });

                                console.log(postResult)

                                onClose();

                                if (postResult.status) {
                                    askModal(postResult.id);
                                    console.log("teste 2")
                                    // navigate("/instituicoes/index");
                                }

                                //navigate(`/atividadesInstituicao/Create/${id}`);
                            }}
                        >
                            Confirmar
                        </button>


                        <button className='btn btn-cancel modal-btn' onClick={onClose}>
                        Cancelar</button>
                    </div>
                );
            }
        });


    }

    return (
        <>
            <form onSubmit={handleSubmit}>




                <div className="row">
                    <Title title={"Instituições"} />

                    <div className="row justify-content-around">

                        <div className="col-md-6">
                            <Label nameLabel="1. Identificação da instituicão" />


                            <div className="input-group mt-3">
                                <input
                                    id="centralName"
                                    className="form-control input mt-5 rounded-2"
                                    type="text"
                                    placeholder="Nome da Instituição"
                                    required={true}
                                    value={nome}
                                    onChange={(e) => { setNome(e.target.value) }}
                                />


                                <div className="input-group">
                                    <input
                                        id="cnpj"
                                        className="form-control input mt-5 rounded-2"
                                        type="text"
                                        placeholder="CNPJ"
                                        required={true}
                                        value={cnpj}
                                        onChange={(e) => { setCNPJ(e.target.value) }}

                                    />
                                </div>

                                <div className="input-group">
                                    <textarea

                                        rows={5}
                                        cols={5}
                                        id="observacoes"
                                        className="form-control input mt-5 rounded-2"
                                        type="text"
                                        placeholder="Observações"
                                        required={true}
                                        value={observacao}
                                        onChange={(e) => { setObservacao(e.target.value) }}

                                    />
                                </div>
                            </div>

                        </div>

                        <div className="col-md-6">
                            <Label nameLabel={"2. Contatos da instituição"} />


                            <div className="input-group mt-3">
                                <input
                                    id="phone-1"
                                    className="form-control input mt-5 rounded-2"
                                    type="tel"
                                    placeholder="Telefone"
                                    required={true}
                                    value={telefone1}
                                    onChange={(e) => { setTelefone1(e.target.value) }}
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    id="phone-2"
                                    className="form-control input mt-5 rounded-2"
                                    type="tel"
                                    placeholder="Telefone 2 (opcional)"
                                    required={false}
                                    value={telefone2}
                                    onChange={(e) => { setTelefone2(e.target.value) }}
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    id="email"
                                    className="form-control input mt-5 rounded-2"
                                    type={"email"}
                                    placeholder="Email"
                                    required={true}
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-10 mt-5">
                                <div className="mt-5 d-flex justify-content-center">
                                    <button type='submit' className="btn btn-custom m-2">Confirmar</button>
                                    <button type='reset' className="btn btn-custom m-2" >Limpar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}


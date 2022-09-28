import React, { useState } from "react";
import Label from "../shared/Label";
import Title from "../shared/Title";
import Buttons from "../shared/Buttons";
import Endereco from "../shared/Endereco";

export default function Instituicoes() {

    const [centralName, setCentralName] = useState('');
    const [observacao, setObservacao] = useState('');
    const [cnpj, setCNPJ] = useState("000.000.000-00");
    const [firstPhone, setFirstPhone] = useState('');
    const [secondPhone, setSecondPhone] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setInstituicao] = useState('');

    function handleSubmit() {
        const payload = {
            centralName,
            observacao,
            cnpj,
            firstPhone,
            secondPhone,
            email,
            tipo: "teste"
        }


    }

    return (
        <>
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
                                value={centralName}
                                onChange={(e) => setCentralName(e.target.value)}
                            />


                            <div className="input-group">
                                <input
                                    id="cnpj"
                                    className="form-control input mt-5 rounded-2"
                                    type="text"
                                    placeholder="CNPJ"
                                    required={true}
                                    value={cnpj}
                                    onChange={(e) => setCNPJ(e.target.value)}

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
                                    onChange={(e) => setObservacao(e.target.value)}

                                />
                            </div>
                        </div>

                        <div>
                            <button className="btn-custom mt-3 me-3">Tipo da instituição</button>
                            <button className="btn-custom mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Endereço</button>
                            {Endereco()}
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
                                value={firstPhone}
                                onChange={(e) => setFirstPhone(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <input
                                id="phone-2"
                                className="form-control input mt-5 rounded-2"
                                type="tel"
                                placeholder="Telefone 2 (opcional)"
                                required={false}
                                value={secondPhone}
                                onChange={(e) => setSecondPhone(e.target.value)}
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
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <Buttons handleSubmit={handleSubmit} style={"mt-2 me-2"}></Buttons>
                </div>
            </div>



        </>
    )



}
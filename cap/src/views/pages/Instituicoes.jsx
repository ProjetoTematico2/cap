import React, { useState } from "react";
import Label from "../shared/Label";
import Title from "../shared/Title";
import InstituicoesController from "../../controllers/Instituicoes";
import Buttons from "../shared/Buttons";

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

        InstituicoesController.salvar(payload).then(console.log("Ok"));

    }

    return (
        <>
            <div className="row">
                <Title title={"Instituições"} />

                <div className="row justify-content-around">

                    <div className="col-md-6">
                        <Label nameLabel="1. Identificação da instituicão" />

                        <div className="form-group mt-3">
                            <div className="input-group">
                                <input
                                    id="centralName"
                                    className="form-control input mt-5 rounded-2"
                                    type="text"
                                    placeholder="Nome da Instituição"
                                    required={true}
                                    value={centralName}
                                    onChange={(e) => setCentralName(e.target.value)}
                                />
                            </div>

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
                            <button className="btn-custom mt-3" >Tipo da instituição</button>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <Label nameLabel={"2. Contatos da instituição"} />

                        <div className="form-group mt-3">
                            <div className="input-group">
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
                    </div>

                    <Buttons handleSubmit={handleSubmit} style={"mt-2 me-2"}></Buttons>

                </div>
            </div>

            <div className="row">

                <div className="col-md-12 mt-4">
                    <Label nameLabel="3. Localização" />
                    <div className="d-flex justify-content-around">

                        <input
                            className="form-control input m-2 w-25 rounded-2"
                            type="text"
                            placeholder="Cep"
                        />

                        <input
                            className="form-control input m-2 rounded-2"
                            type="text"
                            placeholder="Rua"
                        />

                        <input
                            className="form-control input m-2 w-75 rounded-2"
                            type="number"
                            placeholder="Número"
                        />
                    </div>

                    <div className="d-flex justify-content-around">


                        <input
                            className="form-control input m-2 w-25 rounded-2"
                            type="text"
                            placeholder="Bairro"
                        />

                        <input
                            className="form-control input m-2 w-50 rounded-2"
                            type="number"
                            placeholder="Complemento"
                        />

                        <input
                            className="form-control input m-2 w-25 rounded-2"
                            type="number"
                            placeholder="Cidade"
                        />

                        <select class="select-custom form-select form-select-lg m-3" aria-label=".form-select-lg">
                            <option selected>UF</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )



}
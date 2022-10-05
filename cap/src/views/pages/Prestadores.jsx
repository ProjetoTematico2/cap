import React, { useState, useEffect } from "react";
import Label from "../shared/Label";
import Endereco from "../shared/Endereco";
import Title from '../shared/Title';
import Buttons from "../shared/Buttons";


export default function Prestadores() {

    // const [listaPrestadores, setListaPrestadores] = useState([]);

    // useEffect(() => {

    // const getListaPrestadores = async () => {
    //     var data = await window.api.Action({ controller: "Prestadores", action: "getListaPrestadores" });
    //     console.log(data);

    //     }
    //     getListaPrestadores();

    // }, []);
    return (
        <form action="" method="post">
    
            <div className="row">
                <Title title={"Novo Prestador"} />
                <Label nameLabel={"1. Informações do Prestador"} />
    
                <div className="col-md-8">
    
                    <div className="row">
    
    
                        <div className="col-md-4">
    
                            <div className="input-group mb-3 mt-3">
                                <label className="file-input-custom" htmlFor="inputGroupFile04">Foto</label>
                                <input type="file" className="file-select-custom" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                            </div>
    
                        </div>
    
                        <div className="col-md-8">
    
                            <div className="input-group mb-3 mt-3">
                                <input
                                    id="nome"
                                    className="form-control input rounded-2"
                                    type="text"
                                    placeholder="Nome"
                                    required={true}
    
                                />
                            </div>
    
                            <div className="input-group mb-3 mt-3">
                                <input
                                    id="nomeMae"
                                    className="form-control input rounded-2"
                                    type="text"
                                    placeholder="Nome da mae"
                                    required={true}
    
                                />
                            </div>
    
                            <div className="row">
                                <div className="col-md-6">
    
                                    <div className="input-group mb-3 mt-3">
                                        <input
                                            id="cpf"
                                            className="form-control input rounded-2"
                                            type="text"
                                            placeholder="CPF"
                                            required={true}
    
                                        />
                                    </div>
    
                                    <div className="input-group mb-3 mt-3">
                                        <input
                                            id="telefone"
                                            className="form-control input rounded-2"
                                            type="tel"
                                            placeholder="Telefone"
                                            required={true}
    
                                        />
                                    </div>
    
                                </div>
    
                                <div className="col-md-6">
    
    
                                    <div className="input-group mb-3 mt-3">
                                        <input
                                            id="dataDeNascimento"
                                            className="form-control input rounded-2"
                                            type="date"
                                            placeholder="Data de nascimento"
                                            required={true}
    
                                        />
                                    </div>
    
                                    <div className="input-group mb-3 mt-3">
                                        <input
                                            id="telefone2"
                                            className="form-control input rounded-2"
                                            type="tel"
                                            placeholder="Telefone 2 (opcional)"
                                            required={true}
    
                                        />
                                    </div>
    
                                </div>
    
                            </div>
    
    
                        </div>
    
    
                    </div>
    
                </div>
    
    
                <div className="col-md-4">
    
                    <div className="input-group mt-3">
                        <select className="select-custom w-10 form-select form-select-md">
                            <option defaultValue={true} value={0}>Solteiro</option>
                            <option value={1}>Casado</option>
                            <option value={2}>Separado</option>
                            <option value={3}>Divorciado</option>
                            <option value={4}>Viúvo</option>
                        </select>
                    </div>
    
                    <div className="input-group mt-3">
                        <select className="select-custom w-10 form-select form-select-md">
                            <option defaultValue={true} value={0}>Analfabeto</option>
                            <option value={1}>Fundamental Incompleto</option>
                            <option value={2}>Fundamental Completo</option>
                            <option value={3}>Médio Incompleto</option>
                            <option value={4}>Médio Completo</option>
                            <option value={5}>Superior Incompleto</option>
                            <option value={6}>Superior Completo</option>
                        </select>
                    </div>
    
                    <div className="input-group mt-4">
                        <select className="select-custom w-10 form-select form-select-md">
                            <option defaultValue={true} value={0}>Branco</option>
                            <option value={1}>Preto</option>
                            <option value={2}>Pardo</option>
                            <option value={3}>Pardo</option>
                            <option value={4}>Amarela</option>
                            <option value={5}>Indigena</option>
                        </select>
                    </div>
    
                    <div className="input-group mb-3 mt-3">
                        <input
                            id="religiao"
                            className="form-control input rounded-2"
                            type="text"
                            placeholder="Religião"
                            required={true}
                        />
                    </div>
    
                    <div className="input-group mb-3 mt-3">
                        <input
                            id="renda"
                            className="form-control input rounded-2"
                            type="number"
                            placeholder="Renda Familiar"
                            required={true}
                        />
                    </div>
    
                </div>
    
                <div className="row">
    
                    <div className="col-md-4">
    
                        <div className="input-group mb-3 mt-3">
    
                            <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
    
                        </div>
    
                    </div>
    
                    <div className="col-md-8">
    
                        <div className="input-group mb-3 mt-3">
                            <input
                                id="nome"
                                className="form-control input rounded-2"
                                type="text"
                                placeholder="Nome"
                                required={true}
    
                            />
                        </div>
    
                        <div className="input-group mb-3 mt-3">
                            <input
                                id="nomeMae"
                                className="form-control input rounded-2"
                                type="text"
                                placeholder="Nome da mae"
                                required={true}
    
                            />
                        </div>
    
                        <div className="row">
                            <div className="col-md-6">
    
                                <div className="input-group mb-3 mt-3">
                                    <input
                                        id="cpf"
                                        className="form-control input rounded-2"
                                        type="text"
                                        placeholder="CPF"
                                        required={true}
    
                                    />
                                </div>
    
                                <div className="input-group mb-3 mt-3">
                                    <input
                                        id="telefone"
                                        className="form-control input rounded-2"
                                        type="tel"
                                        placeholder="Telefone"
                                        required={true}
    
                                    />
                                </div>
    
                            </div>
    
                            <div className="col-md-6">
    
    
                                <div className="input-group mb-3 mt-3">
                                    <input
                                        id="dataDeNascimento"
                                        className="form-control input rounded-2"
                                        type="date"
                                        placeholder="Data de nascimento"
                                        required={true}
    
                                    />
                                </div>
    
                                <div className="input-group mb-3 mt-3">
                                    <input
                                        id="telefone2"
                                        className="form-control input rounded-2"
                                        type="tel"
                                        placeholder="Telefone 2 (opcional)"
                                        required={true}
    
                                    />
                                </div>
    
                            </div>
    
                        </div>
    
    
                    </div>
    
    
                </div>
    
            </div>
        </form>
    )
}






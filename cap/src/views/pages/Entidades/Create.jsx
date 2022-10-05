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
            endereco: endereco
        }

        const postResult = await window.api.Action({ controller: "Entidades", action: "Create", params: payload });


        window.api.Alert({ status: postResult.status, text: postResult.text, title: postResult.status ? "Sucesso!" : "Erro!" });

        if (postResult.status)
            navigate("/entidades");
    }



    function handleClear() {

        setentidadeName('');


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
                                onChange={(e) => setFirstPhone(e.target.value)}
                            />
                        </div>

                        <div className="input-form">
                            <label htmlFor="phone-2">Telefone 2 (opcional)</label>
                            <input
                                id="phone-2"
                                className="form-control input rounded-2"
                                type="tel"
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
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                </div>

                <div className="col-md-8">
                    <Endereco endereco={endereco} handleChange={handleEndereco} />


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
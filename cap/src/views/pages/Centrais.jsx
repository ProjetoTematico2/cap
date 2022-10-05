import React, { useState } from "react";
import Title from "../shared/Title";
import Endereco from "../shared/Endereco";
import Label from "../shared/Label";
import Buttons from "../shared/Buttons";


export default function Centrais(props) {

    const [centralName, setCentralName] = useState('');
    const [cpnj, setCNPJ] = useState();
    const [firstPhone, setFirstPhone] = useState('');
    const [secondPhone, setSecondPhone] = useState('');
    const [email, setEmail] = useState('');

    const [endereco, setEndereco] = useState({
        rua: null,
        cep: null,
        numero: null,
        bairro: null,
        complemento: null,
        id_cidade: null
    });

    const handleEndereco = (evt, name = null) => {
        debugger;
        const value = evt.value ?? evt.target.value;

        setEndereco({
            ...endereco,
            [ name ? name: evt.target.name]: value 
        })

    }


    function handleSubmit() {

        const payload = {
            centralName: centralName,
            cpnj: cpnj,
            firstPhone: firstPhone,
            secondPhone: secondPhone,
            email: email,
            endereco: endereco
        }

        console.log(payload);
    }


    return (
        <div>
            <Title title={"Nova Central"} />

            <div className="row">

                <div className="col-md-4">

                    <div className="col-md-12">
                        <Label nameLabel={"Identificação da central"} />

                        <div className="input-form">

                            <label htmlFor="centralName">Nome</label>
                            <input
                                id="centralName"
                                className="form-control input rounded-2"
                                type="text"
                                placeholder="Nome da central"
                                value={centralName}
                                required={true}
                                onChange={(e) => setCentralName(e.target.value)}
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

                        <Label nameLabel={"Contatos da central"} />

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
                    <div className="col-md-10 mt-5">
                        <div className="mt-5 d-flex justify-content-center">
                           <Buttons style={"me-2"}></Buttons>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

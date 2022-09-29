import React, { useState } from "react";
import Title from "../shared/Title";
import Label from "../shared/Label";


export default function Centrais(props) {

    const [centralName, setCentralName] = useState('');
    const [cpnj, setCNPJ] = useState("000.000.000-00");
    const [firstPhone, setFirstPhone] = useState('');
    const [secondPhone, setSecondPhone] = useState('');
    const [email, setEmail] = useState('');


    function handleSubmit() {

        const payload = {
            centralName: centralName,
            cpnj: cpnj,
            firstPhone: firstPhone,
            secondPhone: secondPhone,
            email: email
        }


    }

    function handleClear() {

        setCentralName('');


    }

    return (
        <div>
            <Title title={"Nova Central"} />

            <div className="row justify-content-start">

                <div className="col-md-6">


                    <Label nameLabel={"1. Identificação da central"} />

                    <div className="input-group mt-3">
                        <input
                            id="centralName"
                            className="form-control input mt-5 rounded-2"
                            type="text"
                            placeholder="Nome da central"
                            value={centralName}
                            required={true}
                            onChange={(e) => setCentralName(e.target.value)}
                        />
                    </div>

                    <div className="input-group ">
                        <input
                            id="cnpj"
                            className="form-control input mt-5 rounded-2"
                            type="text"
                            placeholder="CNPJ"
                            required={true}
                            value={cpnj}
                            onChange={(e) => setCNPJ(e.target.value)}
                        />

                    </div>

                </div>

                <div className="col-md-6">
                    <Label nameLabel={"2. Contatos da central"} />

                    <div className="input-group mt-3 ">
                        <input
                            id="phone-1"
                            className="form-control input mt-5 rounded-2"
                            type={"tel"}
                            placeholder="Telefone"
                            required={true}
                            onChange={(e) => setFirstPhone(e.target.value)}
                        />
                    </div>

                    <div className="input-group ">
                        <input
                            id="phone-2"
                            className="form-control input mt-5 rounded-2"
                            type="tel"
                            placeholder="Telefone 2 (opcional)"
                            required={false}
                            onChange={(e) => setSecondPhone(e.target.value)}
                        />
                    </div>

                    <div className="input-group ">
                        <input
                            id="email"
                            className="form-control input mt-5 rounded-2"
                            type={"email"}
                            placeholder="Email"
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10 mt-5">
                        <div className="mt-5 d-flex justify-content-center">
                            <button className="btn-custom m-2" onClick={handleSubmit}>Confirmar</button>
                            <button className="btn-custom m-2" >Cancelar</button>
                            <button className="btn-custom m-2" >Limpar</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

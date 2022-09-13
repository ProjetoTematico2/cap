import React, { useState } from "react";
import Title from "../shared/Title";
import Label from "../shared/Label";

export default function Centrais(props) {

   


    return (
        <div>
            <Title title={"Nova Central"} />
            <div className="row">
                <div className="col-md-6">
                    <Label nameLabel={"1. Identificação da central"} />

                    <div className="form-group mt-3">
                        <div className="input-group">
                            <input
                                id="centralName"
                                className="form-control input mt-5 rounded-2"
                                type="text"
                                placeholder="Nome da central"
                                required={true}
                            />
                        </div>

                        <div className="input-group">
                            <input
                                id="cnpj"
                                className="form-control input mt-5 rounded-2"
                                type="text"
                                placeholder="CNPJ"
                                required={true}
                            />
                        </div>
                    </div>

                </div>

                <div className="col-md-6">
                    <Label nameLabel={"2. Contatos da central"} />

                    <div className="form-group mt-3">
                        <div className="input-group">
                            <input
                                id="phone-1"
                                className="form-control input mt-5 rounded-2"
                                type={"tel"}
                                placeholder="Telefone"
                                required={true}
                            />
                        </div>

                        <div className="input-group">
                            <input
                                id="phone-2"
                                className="form-control input mt-5 rounded-2"
                                type={"tel"}
                                placeholder="Telefone 2 (opcional)"
                                required={false}
                            />
                        </div>

                        <div className="input-group">
                            <input
                                id="email"
                                className="form-control input mt-5 rounded-2"
                                type={"email"}
                                placeholder="Email"
                                required={true}
                            />
                        </div>
                    </div>

                </div>

            </div>






        </div>
    )

}

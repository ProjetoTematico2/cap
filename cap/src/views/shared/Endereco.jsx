import Label from "./Label";

import { useState, useEffect } from "react";
import Select from 'react-select';

const Endereco = (props) => {
    const [cidades, setCidades] = useState([{ value: -1, label: "Carregando cidades..." }]);



    useEffect(() => {

        const fetchData = async () => {
            const data = await window.api.Action({ controller: "Cidades", action: "GetCidades" });
            setCidades(data);
        }

        fetchData();

    }, []);

    return (
        <>
            <Label nameLabel={"Endereço"} />

            <div className="row">

                <div className="input-form col-md-12">
                    <label htmlFor="rua">Rua</label>
                    <input
                        id="rua"
                        name="rua"
                        className="form-control input rounded-2"
                        type="text"
                        placeholder=""
                        required={true}
                        value={props.endereco.rua}
                        onChange={props.handleChange}
                    />
                </div>

                <div className="input-form col-md-4">
                    <label htmlFor="numero">Número</label>
                    <input
                        id="numero"
                        name="numero"
                        className="form-control input rounded-2"
                        type="number"
                        placeholder=""
                        required={true}
                        value={props.endereco.numero}
                        onChange={props.handleChange}
                    />
                </div>

                <div className="input-form col-md-8">
                    <label htmlFor="bairro">Bairro</label>
                    <input
                        id="bairro"
                        name="bairro"
                        className="form-control input rounded-2"
                        type="text"
                        placeholder=""
                        required={true}
                        value={props.endereco.bairro}
                        onChange={props.handleChange}
                    />
                </div>

                <div className="input-form col-md-4">
                    <label htmlFor="cep">CEP</label>
                    <input
                        id="cep"
                        name="cep"
                        className="form-control input rounded-2"
                        type="text"
                        placeholder=""
                        required={true}
                        value={props.endereco.cep}
                        onChange={props.handleChange}
                    />
                </div>

                <div className="input-form col-md-8">
                    <label htmlFor="id_cidade">Cidade</label>

                    <Select
                        options={cidades}
                        id="id_cidade"
                        name="id_cidade"
                        onChange={(evt) => { props.handleChange(evt, "id_cidade") }}
                        value={cidades.find(s => s.value === props.endereco.id_cidade)}
                        required={true} />
                </div>

                <div className="input-form col-md-12">
                    <label htmlFor="complemento">Complemento</label>
                    <textarea 
                        id="complemento"
                        name="complemento"
                        className="form-control input rounded-2"
                        rows={7}
                        placeholder=""
                        value={props.endereco.complemento}
                        onChange={props.handleChange}
                    />
                </div>

            </div>
        </>
    );


}

export default Endereco


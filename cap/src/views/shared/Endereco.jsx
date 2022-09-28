import Label from "./Label";

export default function Endereco(props) {
    return (
        <div className="row modal fade" id="exampleModal" tabIndex={"-1"} aria-labelledby="exampleModalLabel" aria-hidden="true">

            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <Label className="modal-title" id="exampleModalLabel" nameLabel="3. Localizacão" />
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="d-flex justify-content-around">

                            <input
                                className="form-control input m-2  rounded-2"
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

                        <div className="d-flex justify-content-around mb-4">
                            <input
                                className="form-control input m-2 w-50 rounded-2"
                                type="text"
                                placeholder="Bairro"
                            />

                            <input
                                className="form-control input m-2 w-50 rounded-2"
                                type="text"
                                placeholder="Cidade"
                            />

                            <select className="select-custom w-10 form-select form-select-md m-3" aria-label=".form-select-lg">
                                <option defaultValue={true}>UF</option>
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

                        <div className="d-flex justify-content-around mb-4">
                            <input
                                className="form-control input rounded-2"
                                type="text"
                                placeholder="Complemento"
                            />
                        </div>

                    </div>


                    <div className="modal-footer">
                        <button type="button" className="btn-custom" data-bs-dismiss="modal">Fechar</button>
                        <button type="button" className="btn-custom">Salvar</button>
                    </div>

                </div>
            </div>

        </div>
    )

}
import Title from "../shared/Title";
import Label from "../shared/Label";
import Buttons from "../shared/Buttons";

export default function Processos() {
    return (
        <div className="row">

            <Title title={"Cadastro da Situação User"} />
            <Label nameLabel={"1. Informações do processo"} style={"mb-3"} />


            <div className="col-md-12">
                <div className="row">

                    <div className="col-md-5 me-5">

                        <div className="input-group mb-3 mt-3">
                            <input
                                id="processo"
                                className="form-control input rounded-2"
                                type="number"
                                placeholder="Número do processo"
                                required={true}
                            />
                        </div>

                        <div className="input-group">
                            <textarea
                                rows={5}
                                cols={5}
                                id="detalhamento"
                                className="form-control input mt-2 rounded-2"
                                type="text"
                                placeholder="Detalhamento"
                                required={false}
                            />
                        </div>

                        <div className="input-group mb-3 mt-3">
                            <input
                                id="vara"
                                className="form-control input rounded-2"
                                type="number"
                                placeholder="Vara do processo"
                                required={true}
                            />
                        </div>

                        <div className="input-group mb-3 mt-3">
                            <input
                                id="qtdePenas"
                                className="form-control input rounded-2"
                                type="number"
                                placeholder="Qtde de penas anteriores"
                                required={true}
                            />
                        </div>

                        <button className="btn-custom w-75">Adicionar outro processo</button>


                    </div>


                    <div className="col-md-6">

                        <div className="input-group mb-3 mt-3">
                            <input
                                id="artigo"
                                className="form-control input rounded-2"
                                type="number"
                                placeholder="Número do artigo penal"
                                required={true}
                            />
                        </div>

                        <div className="input-group mb-3 mt-3">
                            <input
                                id="pena"
                                className="form-control input rounded-2"
                                type="number"
                                placeholder="Pena original"
                                required={true}
                            />
                        </div>

                        <div className="mt-4 mb-4">

                            <span className="span-custom d-block mb-2">Tipo de regime da pena</span>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={"aberto"} />
                                <label className="form-check-label" htmlFor="inlineRadio1">Aberto</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={"semi"} />
                                <label className="form-check-label" htmlFor="inlineRadio2">Semi Aberto</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={"fechado"} />
                                <label className="form-check-label" htmlFor="inlineRadio3">Fechado</label>
                            </div>

                        </div>

                        <div className="mt-4 mb-4">
                            <div className="input-group mb-3 mt-3">

                                <input
                                    id="pena"
                                    className="form-control input rounded-2"
                                    type="number"
                                    placeholder="Horas a cumprir"
                                    required={true}
                                />
                            </div>
                        </div>

                        <div className="mt-4 mb-4">

                            <span className="span-custom me-2">Possui outra PRD</span>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value={1} />
                                <label className="form-check-label" htmlFor="inlineRadio4">Sim</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value={0} />
                                <label className="form-check-label" htmlFor="inlineRadio5">Não</label>
                            </div>

                        </div>

                        <div className="input-group mt-3">
                            <textarea
                                rows={5}
                                cols={5}
                                id="prd"
                                className="form-control input mt-2 rounded-2"
                                type="text"
                                placeholder="Quais?"
                                required={false}
                            />
                        </div>

                        <div className="mt-3">

                            <span className="span-custom me-2">Possui multa</span>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio6" value={1} />
                                <label className="form-check-label" htmlFor="inlineRadio6">Sim</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio7" value={0} />
                                <label className="form-check-label" htmlFor="inlineRadio7">Não</label>
                            </div>

                            <div className="input-group mb-3 mt-3">
                                <input
                                    id="valor"
                                    className="form-control input rounded-2"
                                    type="number"
                                    placeholder="Valor a pagar"
                                    required={true}
                                />
                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    <Buttons style={"me-2 mb-3"} />
                </div>

            </div>
        </div>
    )
}
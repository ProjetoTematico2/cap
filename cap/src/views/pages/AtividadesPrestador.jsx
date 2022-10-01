import React from "react";
import Buttons from "../shared/Buttons";
import Label from "../shared/Label";
import Title from "../shared/Title";

export default function AtividadesPrestador() {
    return (
        <form action="" method="post">

            <div className="row">
                <Title title="Cadastro de período da atividade" />
                <div className="col-md-12">

                    <div className="row justify-content-evenly">

                        <div className="col-md-6">


                            <Label
                                nameLabel="1. Selecione o prestador, atividade e instituição"
                            />

                            <div className="input-group mb-3 mt-3">
                                <input
                                    id="religiao"
                                    className="form-control search-custom rounded-2"
                                    type="text"
                                    placeholder="Pesquisar prestador"
                                    required={true}
                                />
                            </div>

                            <div className="input-group mb-3 mt-3">
                                <input
                                    id="religiao"
                                    className="form-control search-custom rounded-2"
                                    type="text"
                                    placeholder="Pesquisar atividade"
                                    required={true}
                                />
                            </div>

                            <div className="input-group mb-3 mt-3">
                                <input
                                    id="instituicao"
                                    className="form-control search-custom rounded-2"
                                    type="text"
                                    placeholder="Pesquisar instituições disponíveis"
                                    required={true}
                                />
                            </div>


                        </div>

                        <div className="col-md-4">
                            <Label
                                nameLabel="2. Período da atividade"
                            />

                            <div className="mt-3">
                                <span className="span-custom">Data da tarefa</span>
                            </div>
                            <div className="input-group mb-3 mt-3 ">
                                <input
                                    id="data"
                                    className="form-control input rounded-2"
                                    type="date"
                                    placeholder="Data"
                                    required={true}

                                />
                            </div>

                            <div className="mt-3">
                                <span className="span-custom">Horário de entrada</span>
                            </div>
                            <div className="input-group mb-3 mt-3">
                                <input
                                    id="horarioInicial"
                                    className="form-control input rounded-2"
                                    type="time"
                                    placeholder="Data"
                                    required={true}

                                />
                            </div>

                            <div className="mt-3">
                                <span className="span-custom">Horário de saída</span>
                            </div>
                            <div className="input-group mb-3 mt-3">
                                <input
                                    id="horarioFinal"
                                    className="form-control input rounded-2"
                                    type="time"
                                    placeholder="Data"
                                    required={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Buttons style={"me-3 mt-3"} />
                    </div>
                </div>
            </div>
        </form>

    )



}
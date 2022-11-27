import Title from "../../shared/Title";
import Label from "../../shared/Label";
import Buttons from "../../shared/Buttons";

export default function AtividadesInstituicao() {
    return (

        <form action="" method="post">
            <div className="row">
                <Title title={"Nova Atividade da instituição"} />
                <Label nameLabel={"1. Informações da atividade"} style={"mb-3"} />


                <div className="col-md-12">

                    <span className="span-custom">Status da Atividade</span>
                    <div className="mt-2">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="ativo" value={1} />
                            <label className="form-check-label" htmlFor="ativo">Ativo</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inativo" value={0} />
                            <label className="form-check-label" htmlFor="inativo">Inativo</label>
                        </div>
                    </div>

                    <div className="input-group mb-3 mt-3 w-50">
                        <input
                            id="activity"
                            className="form-control input rounded-2"
                            type="text"
                            placeholder="Título da Atividade"
                            required={true}
                        />
                    </div>

                    <div className="input-group w-50">
                        <textarea
                            rows={5}
                            cols={5}
                            id="description"
                            className="form-control input mt-2 rounded-2"
                            type="text"
                            placeholder="Descrição"
                            required={false}
                        />
                    </div>

                    <div className="mt-3">
                        <button className="btn-custom w-25">Adicionar outra Atividade</button>
                    </div>

                    <div>
                        <Buttons style={"mx-2 mt-5"} />
                    </div>



                </div>


            </div>
        </form>

    )

}
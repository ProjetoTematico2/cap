
import { useState, useEffect, useContext } from "react";
import Title from "../shared/Title";
import Select from 'react-select';
import { AuthContext } from "../contexts/auth";

const Sincronizacao = () => {

    const [entidades, setEntidades] = useState([]);
    const [entidade, setEntidade] = useState(null);
    const { user } = useContext(AuthContext);

    const fetchData = async () => {

        const data = await window.api.Action({ controller: "Entidades", action: "GetEntidadesSelect" });
        setEntidades(data);
    }

    useEffect(() => {

        fetchData();

    }, []);


    var downloadTxtFile = async () => {

        if (!entidade) {
            window.api.Alert({ status: false, text: "Informe uma Entidade", title: "Erro!" });
            return;
        }

        const result = await window.api.Action({ controller: "Sincronizacao", action: "GetFile", params: { entidade: entidade } });

        if (!result.status) {
            window.api.Alert({ status: false, text: result.text, title: "Erro!" });
            return;
        }

        const element = document.createElement("a");
        const file = new Blob([result.data], { type: 'application/octet-stream' });
        element.href = URL.createObjectURL(file);
        element.download = result.fileName;
        document.body.appendChild(element);
        element.click();
    }

    var downloadTxtFileEntidade = async () =>{
        const result = await window.api.Action({ controller: "Sincronizacao", action: "GetFileEntidade"});
        if (!result.status) {
            window.api.Alert({ status: false, text: result.text, title: "Erro!" });
            return;
        }

        const element = document.createElement("a");
        const file = new Blob([result.data], { type: 'application/octet-stream' });
        element.href = URL.createObjectURL(file);
        element.download = result.fileName;
        document.body.appendChild(element);
        element.click();
    }

    const handleEntidades = async (evt) => {
        const value = evt;
        setEntidade(value);
    }




    return (

        <div className="main-window">
            <Title title={"Exportar Dados"} />
            <div className="col-md-12">
                <input id="inputFile" style={{ display: 'none' }} value="aaaa" />
                <div className="row">

                    <div className="col-md-12">

                        {
                            user.appMode === 0 ?
                                <>
                                    <div className="input-form col-md-12">
                                        <label htmlFor="id_entidade">Entidades</label>
                                        <Select
                                            options={entidades}
                                            id="id_entidade"
                                            name="id_entidade"
                                            placeholder="Entidade"
                                            onChange={handleEntidades}
                                        />
                                    </div>

                                    <div className="input-form" style={{ marginTop: "1rem" }}>

                                        <button className="btn btn-dark-blue" onClick={downloadTxtFile}><i className="fa-solid fa-download"></i> Baixar Arquivo</button>

                                    </div>
                                </>

                                :

                                <div className="input-form" style={{ marginTop: "1rem" }}>

                                    <button className="btn btn-dark-blue" onClick={downloadTxtFileEntidade}><i className="fa-solid fa-download"></i> Baixar Arquivo</button>

                                </div>

                        }




                    </div>





                </div>


            </div>


        </div>
    );
}

export default Sincronizacao;

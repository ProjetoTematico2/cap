import React, { useState, useContext } from "react";
import image from "../../assets/logo.png";

import { AuthContext } from "../contexts/auth";

export default function Login(props) {

    const { authenticated, login } = useContext(AuthContext);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function handleUser(user) {
        setUser(user);
    }

    function handlePassword(password) {
        setPassword(password);
    }

    const handleSubmit = () => {
        login(user, password);
    }

    const handleFile = async (e) => {
        let file = e.target.files[0];

        if (file) {

            var fr = new FileReader();
            fr.onload = async () => {

                var result = await window.api.Action({ controller: "Sincronizacao", action: "SetFile", params: { data: fr.result } });
                e.target.value = null;
                window.api.Alert({ status: result.status, text: result.text, title: result.status ? "Sucesso!" : "Erro!" });
            }

            fr.readAsArrayBuffer(file);

        }
    }


    return (

        <div className="main-window">
            <div className="login-form">

                <form action="" method="post">

                    <div className="d-flex justify-content-center">
                        <img className="img-fluid" src={image} width={300} height={300} alt="Logo" />
                    </div>

                    <div className="d-flex justify-content-center">
                        <h1 className="text-center">Central integrada de alternativas penais</h1>
                    </div>

                    <div className="form-group row d-flex justify-content-center mt-3">
                        <div className="col-md-8 col-lg-6">

                            <div className="justify-content-center">
                                <input
                                    id="user"
                                    className="form-control input p-2 m-3 rounded-2"
                                    type="text"
                                    placeholder="Usuário"
                                    required={true}
                                    onChange={(e) => { handleUser(e.target.value); }}
                                />
                            </div>

                            <div className="justify-content-center">
                                <input id="password"
                                    className="form-control input p-2 m-3 rounded-2"
                                    type="password"
                                    placeholder="Senha"
                                    autoComplete="true"
                                    required={true}
                                    onChange={(e) => { handlePassword(e.target.value); }}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="button" onClick={() => { handleSubmit() }} className="btn btn-dark-blue">Entrar</button>
                    </div>

                    <br />
                    <div className="d-flex justify-content-center">

                        <label className="file-sync-custom btn btn-outline-dark btn-sm" htmlFor="fileInput" id="upload-file-layout" >
                            <i className="fa fa-rotate"></i> Sincronizar Dados
                        </label>
                        <input type="file" className="file-select-custom" id="fileInput" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={handleFile}/>
                    </div>

                </form>

            </div>

        </div>
    )
} 

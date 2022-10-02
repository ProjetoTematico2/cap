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


    return (

        <div className="main-window">
            <div className="login-form">


                <div className="d-flex justify-content-center">
                    <img className="img-fluid" src={image} width={300} height={300} alt="Logo" />
                </div>

                <div className="d-flex justify-content-center">
                    <h1 className="text-center">Central integrada de alternativas penais</h1>
                </div>

                <div className="form-group row d-flex justify-content-center mt-3">
                    <div className="col-md-8 col-lg-6">

                        <div className="input-group justify-content-center">
                            <input
                                id="user"
                                className="form-control input p-2 m-3 rounded-2"
                                type="text"
                                placeholder="Usuário"
                                required={true}
                                onChange={(e) => { handleUser(e.target.value); }}
                            />
                        </div>

                        <div className="input-group justify-content-center">
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
                    <button type="button" onClick={() => { handleSubmit() }} className="btn btn-custom">Entrar</button>
                </div>

            </div>
        </div>

    )
} 

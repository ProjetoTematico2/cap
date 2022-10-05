import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import Title from "../../shared/Title";
import Buttons from "../../shared/Buttons";


export default function Create() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async () => {
        const payload = {
            userName,
            user,
            password,
        }

        const postResult = await window.api.Action({ controller: "Usuarios", action: "Create", params: payload });
        window.api.Alert({ status: postResult.status, text: postResult.text, title: postResult.status ? "Sucesso!" : "Erro!" });

        if (postResult.status)
            navigate("/usuarios");
    }

    return (

        <div>
            <Title title="Novo usuário" />
            <div className="row justify-content-center">
                <div className="col-md-12">


                    <div className="input-form">
                        <label htmlFor="userName">Nome do usuário</label>
                        <input
                            id="userName"
                            className="form-control input rounded-2"
                            type="text"
                            value={userName}
                            required={true}
                            onChange={(e) => { setUserName(e.target.value) }}
                        />
                    </div>

                    <div className="input-form">
                        <label htmlFor="user">Usuário</label>
                        <input
                            id="user"
                            className="form-control input rounded-2"
                            type="text"
                            value={user}
                            required={true}
                            onChange={(e) => { setUser(e.target.value) }}
                        />
                    </div>

                    <div className="input-form">
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            className="form-control input rounded-2"
                            type="password"
                            value={password}
                            required={true}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>


                </div>

            </div>

            <div className="row">
                <div className="col-md-10 mt-5">
                    <div className="mt-5 d-flex justify-content-center">
                        <button type='submit' className="btn btn-custom m-2" onClick={handleSubmit}>Confirmar</button>
                        <button type='reset' className="btn btn-custom m-2" >Limpar</button>
                    </div>
                </div>
            </div>
        </div>

    )


}
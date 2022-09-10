import { useState, useEffect } from "react";


const Prestadores = () => {

    const [listaPrestadores, setListaPrestadores] = useState([]);

    useEffect(() => {

        const getListaPrestadores = async () => {
            const data = await window.api.Action({ controller: "Prestadores", action: "getListaPrestadores" });
            console.log(data);
            setListaPrestadores(data);

        }
        getListaPrestadores();

    }, []);




    return (

        <div>
            <ul>
                {listaPrestadores.map(s => (<li key={s.id}>{s.nome}</li>))}
            </ul>

        </div>
    )

}

export default Prestadores;
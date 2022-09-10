import { useState, useEffect } from "react";
const Prestadores = () => {
    const [menuItens, setMenuItens] = useState();

    const getListaPrestadores = async () => {

        const lista = await window.api.Action({ controller: "Prestadores", action: "getListaPrestadores" });
        console.log(lista);
        //setListaPrestadores(lista);
    }
    getListaPrestadores();
   
    return <div>
        Prestadores
    </div>

}

export default Prestadores;
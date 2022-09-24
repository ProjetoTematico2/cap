import React from "react";

export default function Buttons(props) {
    return (

        <div className="row">
            <div className="col-md-10 mt-5">
                <div className="mt-1 d-flex justify-content-center">
                    <button className={`btn-custom ${props.style}`} onClick={props.handleSubmit}>Confirmar</button>
                    <button className={`btn-custom ${props.style}`} onClick={props.handleCancel}>Cancelar</button>
                    <button className={`btn-custom ${props.style}`} onClick={props.handleClean}>Limpar</button>
                </div>
            </div>
        </div>

    )
}
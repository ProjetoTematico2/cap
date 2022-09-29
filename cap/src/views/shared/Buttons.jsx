import React from "react";

export default function Buttons(props) {
    return (

        <div className="row">
            <div className="col-md-10 mt-2">
                <div className="d-flex justify-content-center">
                    <button type="submit" className={`btn-custom ${props.style}`} onClick={props.handleSubmit}>Confirmar</button>
                    <button className={`btn-custom ${props.style}`} onClick={props.handleCancel}>Cancelar</button>
                    <button type="reset" className={`btn-custom ${props.style}`} onClick={props.handleClean}>Limpar</button>
                </div>
            </div>
        </div>

    )
}
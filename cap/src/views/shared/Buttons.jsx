import React from "react";

export default function Buttons(props) {
    return (

        <div className="row">
            <div className="col-md-10 mt-2">
                <div className="d-flex justify-content-center">
                    <button type="submit" className={`btn-custom ${props.style}`} onClick={props.handleSubmit}>Confirmar</button>
                    <button type="reset" className={`btn-custom ${props.style}`}>Limpar</button>
                </div>
            </div>
        </div>

    )
}
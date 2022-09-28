import React from "react";

export default function Label(props) {
    return (

        <div className={`label-container ${props.style}`}>
            <span className="label-title">{props.nameLabel}</span>
        </div>


    )

}
import React from "react";

function Edit(props) {
    return (
        <button className="editBtn" onClick={props.edit}>Edit</button>
    );
}

export default Edit;
import React from "react";

function Delete(props) {
    return (
        <button className="deleteBtn" onClick={props.delete}>Delete</button>
    );
}

export default Delete;
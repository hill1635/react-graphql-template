import React from "react";

function Cancel() {
    return (
        <button className="cancelBtn" onClick={props.cancel}>Cancel</button>
    );
}

export default Cancel;
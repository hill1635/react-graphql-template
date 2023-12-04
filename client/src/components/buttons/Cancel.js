import React from "react";

function Cancel(props) {
    return (
        <button className="cancelBtn" onClick={props.cancel}>Cancel</button>
    );
}

export default Cancel;
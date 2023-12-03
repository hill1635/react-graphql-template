import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import "./Search.scss";

function SearchResults(props) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (props.results !== undefined) {
            setResults(props.results);
            console.log(props.results);
        }
    }, [props.results]);

    const select = (e, result) => {
        e.preventDefault();
        console.log("result", result);
    }

    return (
        <div className="searchResults">
            {props.results.map(result => {
                return <span className="searchResult" key={result.id} onClick={e => select(e, result)}>{result.name}</span>
            })}
        </div>
        
    );
}

export default SearchResults;
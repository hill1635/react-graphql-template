import React, { useState } from "react";
import "./Search.scss";
import SearchResults from "./searchresults/SearchResults";
import SearchBtn from "../buttons/Search";

function SearchBar(props) {
    var [input, setInput] = useState("");
    var [results, setResults] = useState([]);

    return (
        <div className="searchWrapper">
            <form className="searchBar">
                <input className="searchBarInput" type="text" placeholder="Search" onChange={e => setInput(e.target)}></input>
                <SearchBtn input={input} setResults={setResults} />
            </form>
            <SearchResults results={results} />
        </div>
    );
}

export default SearchBar;
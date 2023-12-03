import React from "react";
import "./Header.scss";
import Navigation from "../navigation/Navigation";
import Search from "../search/Search";

function Header() {
    return (
        <header>
            <img alt="Logo" src="#"/>
            <Search />
            <Navigation />
        </header>
    );
}

export default Header;
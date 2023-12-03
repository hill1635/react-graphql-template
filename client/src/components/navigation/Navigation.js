import React from "react";
import "./Navigation.scss";

function Navigation(props) {

  return (
    <nav className="nav" role="navigation">
      {props.links.map((link) => (
        <a href={link.href}>{link.name}</a>
      ))}
    </nav>
  );
}

export default Navigation;

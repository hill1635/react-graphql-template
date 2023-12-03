import React, { useEffect } from "react";
import API from "../utils/API";
import "./Home.scss";

function Home(props) {

  useEffect(() => {
    console.log("user: ", props.user);
  }, [ props.user ]);

  return (
    <main>
      <div className="wrapper">
        <h1>Welcome to the homepage!</h1>
        <p>Get started here to for the first impression.</p>
      </div>
    </main>
  );
}

export default Home;

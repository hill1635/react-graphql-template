import React from "react";
import "./SignUp.scss";
import SignupBtn from "../../components/buttons/SignUp";
import API from "../../utils/UserAPI";

function SignUp() {
  var createAccount = () => {
    API.create({
      email: document.querySelector("#userInput").value,
      password: document.querySelector("#passwordInput").value
    })
    .then(() => window.location.href = "/login"); 
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <input type="text" placeholder="Username" id="userInput"></input>
      <input type="text" placeholder="Password" id="passwordInput"></input>
      <SignupBtn submit={createAccount} />
    </main>
  );
}

export default SignUp;

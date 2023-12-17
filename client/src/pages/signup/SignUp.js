import React from "react";
import { useState } from "react";
import "./SignUp.scss";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

function SignUp() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const CREATE_USER = gql`
    mutation UserMutation($email: String!, $password: String!) {
      create(email: $email, password: $password) {
          email
          password
      }
    }
  `;

  const [createUser, { data }] = useMutation(CREATE_USER);

  return (
    <main>
      <h1>Sign Up</h1>
      <input type="text" placeholder="Email" id="userInput" onChange={(e) => setEmail(e.target.value)}></input>
      <input type="text" placeholder="Password" id="passwordInput" onChange={(e) => setPassword(e.target.value)}></input>
      <button onClick={() => createUser({ variables: { email: email, password: password } })}>Sign Up</button>
    </main>
  );
}

export default SignUp;

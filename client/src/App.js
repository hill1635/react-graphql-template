import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Account from "./pages/account/Account";
import About from "./pages/about/About";
import Footer from "./footer/Footer";
import "./App.scss";
import "./components/buttons/Buttons.scss";

function App() {
  const [ loggedIn, setLoggedIn ] = useState(false);

  return (
    <Router>
      <div className="background">
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

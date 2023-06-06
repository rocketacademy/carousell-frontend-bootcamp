import React from "react";
import { Outlet } from "react-router-dom";

import "./App.css";
import logo from "../logo.png";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const App = () => (
  <div className="App">
    <header className="App-header">
      <LoginButton />
      <LogoutButton />
      <img src={logo} className="App-logo" alt="logo" />
      <Outlet />
    </header>
  </div>
);

export default App;

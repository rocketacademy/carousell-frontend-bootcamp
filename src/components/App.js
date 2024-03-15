import React from "react";
import { Outlet } from "react-router-dom";

import "./App.css";
import logo from "../logo.png";
import LogoutButton from "./LogoutButton";

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Outlet />
      <LogoutButton />
    </header>
  </div>
);

export default App;

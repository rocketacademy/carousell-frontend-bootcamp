import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import logo from "../logo.png";
import Button from "react-bootstrap/esm/Button";



export default function App() {
  const {isAuthenticated, loginWithRedirect, logout,user}=useAuth0();
  return(
  <div className="App">
    <header className="App-header">
      {isAuthenticated ? (<p>Welcome {user.email}</p>):(<p>You are not logged in</p>)}
      <img src={logo} className="App-logo" alt="logo" />
      <Outlet />
      <p>{"\n\n"}</p>
    
      <Button onClick={()=>loginWithRedirect()}>Log in</Button>
      <Button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </Button>
    </header>
  </div>)
};



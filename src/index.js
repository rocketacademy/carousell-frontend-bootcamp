import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import Home from "./components/Home";
import NewListingForm from "./components/NewListingForm";
import Listing from "./components/Listing";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_AUDIENCE,
      scope:
        "read:current_user update:current_user_metadata openid profile email",
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="listings/new" element={<NewListingForm />} />
          <Route path="listings/:listingId" element={<Listing />} />
          <Route path="*" element={"Nothing here!"} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
);

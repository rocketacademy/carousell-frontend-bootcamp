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
    domain={process.env.ISSUER_BASE_DOMAIN}
    clientId={process.env.CLIENT_ID}
    audience={process.env.AUDIENCE}
    scope="read:current_user update:current_user_metadata"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <Routes>
        {/* Route that provides base app UI */}
        <Route path="/" element={<App />}>
          {/* Route that renders home content */}
          <Route index element={<Home />} />
          {/* Route that renders new listing form */}
          <Route path="listings/new" element={<NewListingForm />} />
          {/* Route that renders individual listings */}
          <Route path="listings/:listingId" element={<Listing />} />
          {/* Route that matches all other paths */}
          <Route path="*" element={"Nothing here!"} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
);

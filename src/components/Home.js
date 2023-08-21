import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import ListingPreviewList from "./ListingPreviewList";

const Home = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated && (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Logout
        </button>
      )}
      <br />
      <br />
      <Link to="/listings/new">Sell</Link>
      <br />
      <br />
      Listings
      <ListingPreviewList />
    </div>
  );
};

export default Home;

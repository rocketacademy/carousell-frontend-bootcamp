import React from "react";
import { Link } from "react-router-dom";

import ListingPreviewList from "./ListingPreviewList";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { logout } = useAuth0();
  return (
    <div>
      <Link to="/listings/new">Sell</Link>
      <br />

      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
      <br />
      <ListingPreviewList />
    </div>
  );
};

export default Home;

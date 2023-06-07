import React from "react";
import { Link } from "react-router-dom";

import ListingPreviewList from "./ListingPreviewList";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  console.log(user);
  return (
    <div>
      <Link to="/listings/new">Sell</Link>
      <br />
      <br />
      <ListingPreviewList />
      <br />
      {isAuthenticated && (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      )}
    </div>
  );
};

export default Home;

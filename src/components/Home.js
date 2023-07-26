import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import ListingPreviewList from "./ListingPreviewList";

const Home = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <br />
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
      <br />
      <Link to="/listings/new">Sell</Link>
      <br />
      <br />
      <ListingPreviewList />
      {isAuthenticated && (
        <div>
          <h2>{user.nickname}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Home;

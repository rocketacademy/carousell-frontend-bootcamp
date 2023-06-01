import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import ListingPreviewList from "./ListingPreviewList";

const Home = () => {
  const navigate = useNavigate();
  const { logout, loginWithRedirect, isAuthenticated, isLoading, user } =
    useAuth0();

  const renderUserDetails = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    } else if (isAuthenticated) {
      return (
        <div>
          <div>Welcome, {user.nickname}</div>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <div>Please login to buy or sell</div>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </div>
      );
    }
  };

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/listings/new");
    } else {
      loginWithRedirect();
    }
  };

  return (
    <div>
      {renderUserDetails()}
      <button onClick={handleClick}>Sell</button>
      <br />
      <br />
      <h3>Listings:</h3>
      <ListingPreviewList />
    </div>
  );
};

export default Home;

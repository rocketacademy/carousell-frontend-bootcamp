import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  const logoutButton = (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );

  return <div>{isAuthenticated && logoutButton}</div>;
};

export default LogoutButton;

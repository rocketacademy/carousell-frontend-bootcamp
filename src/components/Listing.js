import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useAuth0 } from "@auth0/auth0-react";

import { BACKEND_URL } from "../constants.js";

const Listing = () => {
  // const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
  //   useAuth0();

  // const [accessToken, setAccessToken] = useState("");

  // const checkUser = async () => {
  //   if (isAuthenticated) {
  //     let token = await getAccessTokenSilently({
  //       audience: "https://carousell/api",
  //       scope: "read:current_user",
  //     });
  //     console.log(token);
  //     setAccessToken(token);
  //   } else {
  //     loginWithRedirect();
  //   }
  // };

  const [listingId, setListingId] = useState();
  const [listing, setListing] = useState({});

  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, user } =
    useAuth0();

  useEffect(() => {
    // If there is a listingId, retrieve the listing data
    if (listingId) {
      axios.get(`${BACKEND_URL}/listings/${listingId}`).then((response) => {
        setListing(response.data);
      });
    }
    // Only run this effect on change to listingId
  }, [listingId]);

  // Update listing ID in state if needed to trigger data retrieval
  const params = useParams();
  if (listingId !== params.listingId) {
    setListingId(params.listingId);
  }

  // Store a new JSX element for each property in listing details
  const listingDetails = [];
  if (listing) {
    for (const key in listing) {
      listingDetails.push(
        <Card.Text key={key}>{`${key}: ${listing[key]}`}</Card.Text>
      );
    }
  }

  const handleClick = async () => {
    // checkUser();
    // If user is not yet authenticated, authenticate before allowing them to buy
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    // Retrieve access token
    const accessToken = await getAccessTokenSilently({
      audience: "https://carousell/api",
      scope: "read:current_user",
    });

    // Mark the listing as bought
    const response = await axios
      .put(
        `${BACKEND_URL}/listings/${listingId}`,
        {
          userEmail: "calebcc.castro@gmail.com",
          userFirstName: "caleb",
          userLastName: "castro",
          userPhoneNumber: "96717532",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setListing(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Card bg="dark">
        <Card.Body>
          {listingDetails}
          <Button onClick={handleClick} disabled={listing.BuyerId}>
            Buy
          </Button>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
};

export default Listing;

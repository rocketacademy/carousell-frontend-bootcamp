import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants.js";

const Listing = () => {
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
    // If user is not yet authenticated, authenticate before allowing them to buy
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
console.log(user)
    try {
      // Retrieve access token
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "read:current_user",
      });

      // Mark the listing as bought
      const response = await axios.put(
        `${BACKEND_URL}/listings/${listingId}/buy`,
        // User is currently logged-in user
        { buyerEmail: user.email },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update the listing on the page
      setListing(response.data);
    } catch (error) {
      console.error("Error obtaining access token:", error.message);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  const handleClick2 = async () => {
    try {
      // Retrieve access token
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "read:current_user",
      });

      // Mark the listing as bought
      const response = await axios.delete(
        `${BACKEND_URL}/listings/${listingId}/buy`,
        {
          data: { buyerEmail: user.email }, // Use "data" instead of passing in the body directly
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

     
        window.alert("Buy request canceled successfully!");
        setListing(response.data);
        // Show an error alert
       
      
    } catch (error) {
      if (error.response.status===403){
        window.alert("You cannot cancel buy request as you are not the buyer.");
      }
      console.error("Error obtaining access token:", error.message);
    }
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Card bg="dark">
        <Card.Body>
          {listingDetails}
          <Button onClick={handleClick} disabled={listing.buyerId}>
            Buy
          </Button>
          <Button onClick={handleClick2}>Cancel Buy Request</Button>
          <br />
          
        </Card.Body>
      </Card>
      <br />
    </div>
  );
};

export default Listing;

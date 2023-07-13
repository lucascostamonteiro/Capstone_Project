import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleListing from "../SingleListing";
import ListingsGoogleMaps from "../ListingsGoogleMaps";
import './ListingsPage.css'


function Listings() {
  const allListingsObj = useSelector(state => state.listings);
  const allListings = Object.values(allListingsObj).reverse();
  const [hoveredListing, setHoveredListing] = useState(null);

  const handleListingHover = (listing) => {
    setHoveredListing(listing);
  };

  const handleListingLeave = () => {
    setHoveredListing(null);
  };

  return (
    <>
      <div>
        <h3 className="listings-page-title">Available Listings</h3>
      </div>
      <div className="listings-map-container">
        {allListings?.map(listing => (
          <div className="single-listing-container"
            key={listing?.id}
            onMouseEnter={() => handleListingHover(listing)}
            onMouseLeave={handleListingLeave}>
            <SingleListing key={listing?.id} listing={listing} />
          </div>
        ))}
        <div className="main-map">
          <div className="listing-google-maps">
            <ListingsGoogleMaps hoveredListing={hoveredListing} />
          </div>
        </div>
      </div>
    </>
  )
}


export default Listings;

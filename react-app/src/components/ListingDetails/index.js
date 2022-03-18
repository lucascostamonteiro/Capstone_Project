import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const ListingDetails = () => {
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const listing = useSelector(state => state.listings[id]);

// TODO Check if user is logged in
  return (
    <div>
      <div className="main-listing-div">
        <div className="listing-title">{listing?.title}</div>
        <div className="listing-location">{listing?.city}, {listing?.state}</div>
        <div className="image-div"><img crossOrigin="anonymous" key={listing?.id} src={listing?.url} /></div>
        <div className="listing-description">{listing?.description}</div>
        <div className="listing-price">${listing?.price} / night</div>
        <div className="listing-bedroom">{listing?.bedroom === 1 ?
          `${listing?.bedroom} Bedroom` :
          `${listing?.bedroom} Bedrooms`} <i className="fa-solid fa-bed"></i></div>
        <div className="listing-bathroom">{listing?.bathroom === 1 ?
          `${listing?.bathroom} Bathroom` :
          `${listing?.bathroom} Bathrooms`} <i className="fa-solid fa-bath"></i></div>
      </div>
      {/* //TODO - ADD REVIEWS */}
    </div>
  )
}

export default ListingDetails;

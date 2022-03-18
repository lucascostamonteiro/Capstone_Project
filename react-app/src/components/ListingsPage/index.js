import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, NavLink } from 'react-router-dom';
import { getListings } from "../../store/listing"


function Listings() {
  const dispatch = useDispatch();
  const allListingsObj = useSelector(state => state.listings)
  const allListings = Object.values(allListingsObj)

  console.log("ALL", allListings)

  useEffect(() => {
    dispatch(getListings())
  }, [])

  return (
    <div>
      {allListings?.map(listing => (
        <div>
          <div className="main-listing-div">
            <Link key={listing?.id} to={`/listings/${listing?.id}`}>
              <div className="listing-title">{listing?.title}</div>
              <div className="listing-location">{listing?.city}, {listing?.state}</div>
              <div className="image-div"><img crossOrigin="anonymous" key={listing?.id} src={listing?.url} /></div>
            </Link>
            <div className="listing-price">${listing?.price} / night</div>
          </div>
        </div>
      ))}
    </div>
  )
}


export default Listings;

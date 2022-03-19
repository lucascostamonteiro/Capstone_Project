import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditListingModal from "../EditListingModal";
import { deleteListing } from "../../store/listing";


const ListingDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const listing = useSelector(state => state.listings[id]);

  // console.log('++++', listing.id)

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteListing(listing))
    return history.push('/listings')
  }


  return (
    <div>
      <div className="main-listing-div">
        <div className="listing-title">{listing?.title}</div>
        <div className="listing-location">{listing?.city}, {listing?.state}</div>
        <div>
          {sessionUser?.id === listing?.user_id && (
            <>
              <EditListingModal />
              <button id='delete-listing-button' onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
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

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getListings } from "../../store/listing"


function Listings() {
  const dispatch = useDispatch();
  const allListings = useSelector(state => state?.listings)

  console.log("ALL", allListings)

  useEffect(() => {
    dispatch(getListings())
  }, [])

  return (
    null
    // <div>
    //   {allListings?.map(listing => (
    //     <div>listing</div>
    //   ))}
    // </div>
  )
}


export default Listings;

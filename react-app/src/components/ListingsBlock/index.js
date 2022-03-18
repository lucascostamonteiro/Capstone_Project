// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, Link } from 'react-router-dom';
// import { getListings } from "../../store/listing"


// function Listings() {
//   const dispatch = useDispatch();
//   const allListingsObj = useSelector(state => state.listings)
//   const allListings = Object.values(allListingsObj)

//   console.log("ALL", allListings)

//   useEffect(() => {
//     dispatch(getListings())
//   }, [])

//   return (
//     <div>
//       {allListings?.map(listing => (
//         <div>
//         </div>
//       ))}
//     </div>
//   )
// }


// export default Listings;

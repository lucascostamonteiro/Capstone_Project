// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom';



// const MyListings = () => {
//   const sessionUser = useSelector(state => state.session.user);
//   const listingsObj = useSelector(state => state.listings);
//   const listings = Object.values(listingsObj);
//   const userListings = listings.filter(singleListing => singleListing?.user_id === sessionUser?.id);

//   console.log('USER', listings)
//   console.log('++++', userListings)

//   return (
//     <div className="main-listings-div">
//       <Link to={`/listings/${userListings?.id}`}>
//         <div className="main-listings-title">{userListings?.title}</div>
//         <div className="main-listings-location">{userListings?.city}, {userListings?.state}</div>
//         <div className="listing-price">${userListings?.price} / night</div>
//         <div className="main-listings-image-div">
//           <img crossOrigin="anonymous" key={userListings?.id} src={userListings?.url} />
//         </div>
//       </Link>
//     </div>
//   )
// }


// export default MyListings;

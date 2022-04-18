import { useSelector } from 'react-redux'
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import './MyListings.css'



const MyListings = () => {
  const { id } = useParams();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const listingsObj = useSelector(state => state.listings);
  const listings = Object.values(listingsObj);
  const userListings = listings.filter(singleListing => singleListing?.user_id === sessionUser?.id).reverse();

  const handleImgError = (e) => {
    e.target.src = '../../../../static/not-image.png';
  }

  if (!sessionUser) return Redirect('/');

  if (sessionUser?.id !== +id) history.push('/page-not-found');


  return (
    <>
      <span className="return-link">
        <Link className="return-link-text" to={'/listings/'}>
          <span className="return-link-text"><i className="fa-solid fa-arrow-left"></i> Return to all listings</span>
        </Link>
      </span>
      <div>
        <h3 className="listings-page-title">My Listings</h3>
      </div>
      {!userListings.length ?
        <div className='no-listings-title-div'>
          <h4 className='no-listings-title'>You don't have any listing yet</h4>
        </div> :
        <div>
          {userListings?.map(listing => (
            <div className="main-listings-div">
              <Link className="link-image" key={listing?.id} to={`/listings/${listing?.id}`}>
                <img className="image-listings" crossOrigin="anonymous" key={listing?.id} src={listing?.url} onError={handleImgError} alt={""}/>
              </Link>
              <div className="main-listings-info">
                <Link className="links-info" key={listing?.id} to={`/listings/${listing?.id}`}>
                  <div className="main-listings-title">{listing?.title}</div>
                  <div className="main-listings-address">{listing?.address}</div>
                  <div className="main-listings-location">{listing?.city}, {listing?.state}</div>
                  <div className="listing-details">
                    <div className="main-listings-guest"> {listing?.guest === 1 ? `${listing?.guest} Guest` : `${listing?.guest} Guests`}</div>
                    <div className="main-listings-bedroom">{listing?.bedroom === 1 ? `${listing?.bedroom} Bedroom` : `${listing?.bedroom} Bedrooms`}</div>
                    <div className="main-listings-bathroom">{listing?.bathroom === 1 ? `${listing?.bathroom} Bathroom` : `${listing?.bathroom} Bathrooms`}</div>
                  </div>
                  <div className="listing-price">${listing?.price} / night</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      }
    </>
  )
}


export default MyListings;

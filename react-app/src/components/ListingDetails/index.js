import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditListingModal from "../EditListingModal";
import CreateReviewModal from "../ReviewModal";
import { deleteListing } from "../../store/listing";
import SingleReview from "../SingleReview";
import './ListingDetails.css'


const ListingDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const listing = useSelector(state => state.listings[id]);

  const allListingsObj = useSelector(state => state.listings);
  const allListings = Object.values(allListingsObj);

  const reviewsObj = useSelector(state => state?.reviews);
  const reviews = Object.values(reviewsObj);

  const listingReviews = reviews.filter(({ listing_id }) => listing_id === +id);


  // console.log('++++LISTING++++', allListings)
  // console.log('****', sessionUser)

  // Average Rating
  const ratings = [];
  for (let i = 0; i < listingReviews.length; i++) {
    ratings.push(listingReviews[i].rating);
  }

  const averageRating = ratings.reduce((a, b) => a + b, 0) / listingReviews.length;


  const handleImgError = (e) => {
    e.target.src = '../../../../static/not-image.png';
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteListing(listing))
    return history.push('/listings')
  }

  if (allListingsObj[id] === undefined) history.push('/page-not-found');

  return (
    <>
      <span className="return-link">
        <Link className="return-link-text" to={'/listings/'}>
          <span className="return-link-text"><i className="fa-solid fa-arrow-left"></i> Return to all listings</span>
        </Link>
      </span>
      <div className="listing-details-page">
        <div className="listing-div-title">
          <div className="listing-title">{listing?.title}</div>
          <div className="listing-address">{listing?.address}</div>
          <div className="listing-location">{listing?.city}, {listing?.state}</div>
          <div className="average-rating-title">
            {listingReviews.length > 0 ?
              <div> {averageRating.toFixed(2)} <span><i class="fa-solid fa-star"></i> </span></div> :
              <div>No reviews yet</div>
            }
          </div>
          <div className="editing-buttons">
            {sessionUser?.id === listing?.user_id && (
              <>
                <EditListingModal />
                <button id='delete-listing-button' onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>
        </div>
        <div className="detail-image-div">
          <img crossOrigin="anonymous" key={listing?.id} src={listing?.url} onError={handleImgError} />
        </div>
        <div className="reviews-info-div">
          <div className="listing-info">
            <div className="listing-description">{listing?.description}</div>
            <div className="host-name">Hosted by: <span>{listing?.username} </span></div>
            <div className="listing-price">${listing?.price} / night</div>
            <div className="listing-bathroom">
              {listing?.guest === 1 ?
                `${listing?.guest} Guest` :
                `${listing?.guest} Guests`}
              <i className="fa-solid fa-people-group"></i>
            </div>
            <div className="listing-bedroom">
              {listing?.bedroom === 1 ?
                `${listing?.bedroom} Bedroom` :
                `${listing?.bedroom} Bedrooms`}
              <i className="fa-solid fa-bed"></i>
            </div>
            <div className="listing-bathroom">
              {listing?.bathroom === 1 ?
                `${listing?.bathroom} Bathroom` :
                `${listing?.bathroom} Bathrooms`}
              <i className="fa-solid fa-bath"></i>
            </div>
          </div>
          <div className="review-div">
            <div className="reviews-create-div">
              {/* <span>Reviews for this listing</span> */}
              <div className="average-rating-div">
                {listingReviews.length > 0 ?
                  <div> {averageRating.toFixed(2)}
                    <span><i class="fa-solid fa-star"></i></span>
                    <span> · {listingReviews.length} Reviews </span>
                  </div> :
                  <div>No Reviews yet</div>
                }
              </div>
              {sessionUser && listing?.user_id !== sessionUser?.id &&
                <div> <CreateReviewModal /> </div>
              }
            </div>
            <SingleReview />
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingDetails;

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import EditReviewModal from '../EditReviewModal'
import { deleteReview } from '../../store/review'
import './SingleReview.css'


const SingleReview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const reviewObj = useSelector(state => state.reviews);
  const reviews = Object.values(reviewObj);
  const listingReview = reviews.filter(({ listing_id }) => listing_id === +id);
  // console.log('REVIEW', listingReview.id);


  const handleDelete = async (review, e) => {
    e.preventDefault();
    await dispatch(deleteReview(review))
  }


  return (
    <div>
      {listingReview.map(review => (
        <div className='single-review-div' key={review.id}>
          <span className='review-username'>{review.user.username}</span>
          {/* <div>{review.rating}</div> */}
          <div>
            {[...Array(review.rating)].map((star, idx) => (
              <i className="fa-solid fa-star" key={idx}></i>
            ))}
          </div>
          <span className='review-date'>{dayjs(review.createdAt).format("MMMM YYYY")}</span>
          <div>{review.content}</div>
          <div className='review-buttons'>
            {sessionUser?.id === review?.user?.id &&
              <>
                <EditReviewModal review={review} />
                <button className="button-class delete-button" onClick={(e) => handleDelete(review, e)}>Delete</button>
              </>
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default SingleReview;

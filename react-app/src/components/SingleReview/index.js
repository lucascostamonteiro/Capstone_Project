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
    <div className='single-div-main'>
      {listingReview.map(review => (
        <div className='single-review' key={review.id}>
          <span className='review-username'>{review.user.username}</span>
          <div className='rating-date-div'>
            <div className='star-rating'>
              {[...Array(review.rating)].map((star, i) => (
                <i className="fa-solid fa-star" key={i}></i>
              ))}
            </div>
            <div className='review-date'>{dayjs(review.createdAt).format("MMMM YYYY")}</div>
          </div>
          <div className='review-content'>{review.content}</div>
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

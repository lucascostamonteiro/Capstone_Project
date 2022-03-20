import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { deleteReview } from '../../store/review'


const SingleReview = () => {
  const { id } = useParams();
  // const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const reviewObj = useSelector(state => state.reviews);
  const reviews = Object.values(reviewObj);
  const listingReview = reviews.filter(({ listing_id }) => listing_id === +id);
  // console.log('REVIEW', listingReview);


  //   const handleDelete = async () => {
  //     e.preventDefault();
  //     await dispatch(deleteReview(listingReview))
  //   }

  return (
    <div>
      {listingReview.map(review => (
        <div key={review.id}>
          <div>{review.user.username}</div>
          <div>{dayjs(review.createdAt).format("MMMM YYYY")}</div>
          <div>{review.rating}</div>
          <div>
            {[...Array(review.rating)].map((star, idx) => (
              <i className="fa-solid fa-star" key={idx}></i>
            ))}
          </div>
          <div>{review.content}</div>
        </div>
      ))}
      {/* <div>
      {sessionUser === listingReview.user.id &&
        <EditReviewModal />
      }
      <button onClick={handleDelete}>Delete</button>
    </div> */}
    </div>
  )
}

export default SingleReview;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editReview } from "../../store/review";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";


function EditReviewForm({review, setShowModal }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(review.rating)
  const [hover, setHover] = useState(null)
  const [content, setContent] = useState(review.content);
  const [errors, setErrors] = useState([]);

  console.log('+++', review)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedReview = {
      id: review.id,
      user_id: sessionUser.id,
      listing_id: review.listing_id,
      rating,
      content
    }
    const data = await dispatch(editReview(editedReview));
    if (data.errors) setErrors(data.errors)
    else if (data) setShowModal(false)
  };

  return (
    <>
      <form
        className="review-form"
        onSubmit={handleSubmit} >
        <div className="create-review-div">
          <h2> Share a review </h2>
        </div>
        <div>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
        <div id="rating-div">
          <div id='starRating'>
            {[...Array(5)].map((star, i) => {
              const ratingVal = i + 1;
              return (
                <label key={i}>
                  <input
                    type='radio'
                    name='rating'
                    value={ratingVal}
                    onClick={() => setRating(ratingVal)}
                  />
                  <FaStar
                    className='ratingStars'
                    size={40}
                    onMouseEnter={() => setHover(ratingVal)}
                    onMouseLeave={() => setHover(null)}
                    color={
                      ratingVal <= (hover || rating)
                        ? 'FFA534'
                        : '#e4e5e9'
                    }
                  />
                </label>
              );
            })}
          </div>
        </div>
        <div>
          <label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </>
  );
}

export default EditReviewForm;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../store/review";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import './ReviewForm.css'

function CreateReviewForm({ setShowModal }) {
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(null)
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      user_id: sessionUser.id,
      listing_id: id,
      rating,
      content
    }

    const data = await dispatch(createReview(newReview));
    if (data.errors) setErrors(data.errors)
    else if (data) setShowModal(false)
  };

  return (
    <>
      <form
        className="review-form"
        onSubmit={handleSubmit}>
        <div className="create-review-div">
          <h2 className="share-review-title"> Share a review </h2>
        </div>
        <div className="errors-div">
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
        <div id="rating-div">
          <div id='star-rating'>
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
              className="review-content-box"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              // required
            />
          </label>
        </div>
        <button className="button-review" type="submit">Submit Review</button>
      </form>
    </>
  );
}

export default CreateReviewForm;

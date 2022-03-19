import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../store/review";
import { useParams } from "react-router-dom";
import './Reviews.css'

function CreateReviewForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user)

  // console.log('USER', sessionUser)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      user_id: sessionUser.id,
      listing_id: id,
      rating,
      review
    }
    const data = await dispatch(createReview(newReview));
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
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <div id="rating-div">
          <strong>*RATINGS*</strong>
        </div>
        <div>
          <label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </>
  );
}

export default CreateReviewForm;

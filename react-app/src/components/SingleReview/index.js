import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'


const SingleReview = () => {
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const reviewsObj = useSelector(state => state?.reviews);
  const reviews = Object.values(reviewsObj);
  const listingReview = reviews.filter(({ listing_id }) => listing_id === +id);
  // const listingRating =
  console.log('REVIEWS', listingReview)

  return (
    null
  )
}

export default SingleReview;

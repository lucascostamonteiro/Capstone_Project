const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const load = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

const create = (newReview) => ({
  type: CREATE_REVIEW,
  newReview,
});

const edit = (review) => ({
  type: EDIT_REVIEW,
  editedReview: review,
});

const remove = (review) => ({
  type: DELETE_REVIEW,
  deletedReview: review,
});


export const getReviews = () => async dispatch => {
  const res = await fetch('/api/reviews/')
  if (res.ok) {
    const reviews = await res.json()
    dispatch(load(reviews))
  } else {
    const errors = await res.json();
    return errors;
  }
}


export const createReview = (review) => async (dispatch) => {
  const res = await fetch('/api/reviews/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const newReview = await res.json();
    dispatch(create(newReview));
    return newReview;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const editReview = (review) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const editedReview = await res.json();
    dispatch(edit(editedReview));
    return editedReview;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteReview = (review) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${review.id}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    const deletedReview = await res.json();
    dispatch(remove(deletedReview));
    return deletedReview;
  } else {
    const errors = await res.json();
    return errors;
  }
};

let initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_REVIEWS: {
      newState = { ...state };
      action.reviews.all_reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    }

    case CREATE_REVIEW: {
      return { [action.newReview.id]: action.newReview, ...state };
    }

    case EDIT_REVIEW: {
      newState = { ...state }
      newState[action.editedReview.id] = action.editedReview;
      return newState;
    }

    case DELETE_REVIEW: {
      newState = { ...state };
      delete newState[action.deletedReview.id];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;

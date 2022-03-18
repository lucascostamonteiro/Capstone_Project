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

export const editListing = (review) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(listing),
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

export const deleteListing = (listing) => async (dispatch) => {
  console.log('LISTING', listing)
  const res = await fetch(`/api/listings/${listing.id}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    const deletedListing = await res.json();
    dispatch(remove(deletedListing));
    return deletedListing;
  } else {
    const errors = await res.json();
    return errors;
  }
};

let initialState = {};

const listingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_LISTINGS: {
      newState = { ...state };
      action.listings.all_listings.forEach((listing) => {
        newState[listing.id] = listing;
      });
      return newState;
    }

    case CREATE_LISTING: {
      return { [action.newListing.id]: action.newListing, ...state };
    }

    case EDIT_LISTING: {
      newState = { ...state }
      newState[action.editedListing.id] = action.editedListing;
      return newState;
    }

    case DELETE_LISTING: {
      newState = { ...state };
      delete newState[action.deletedListing.id];
      return newState;
    }
    default:
      return state;
  }
};

export default listingsReducer;

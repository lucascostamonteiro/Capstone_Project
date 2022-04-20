const LOAD_ALL_BOOKINGS = 'bookings/LOAD_ALL_BOOKINGS';
const LOAD_USER_BOOKINGS = 'bookings/LOAD_USER_BOOKINGS';
const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
const EDIT_BOOKING = 'bookings/EDIT_BOOKING';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';

const load = (bookings) => ({
  type: LOAD_ALL_BOOKINGS,
  bookings,
});

const loadUserBookings = (bookings) => ({
  type: LOAD_USER_BOOKINGS,
  bookings
})

const create = (newBooking) => ({
  type: CREATE_BOOKING,
  newBooking,
});

const edit = (editedBooking) => ({
  type: EDIT_BOOKING,
  editedBooking,
});

const remove = (booking) => ({
  type: DELETE_BOOKING,
  deletedBooking: booking,
});


export const getBookings = () => async dispatch => {
  const res = await fetch('/api/bookings/')
  if (res.ok) {
    const bookings = await res.json();
    dispatch(load(bookings));
  } else {
    const errors = await res.json();
    return errors;
  }
}


export const getUserBookings = (userId) => async dispatch => {
  const res = await fetch(`/api/bookings/mybookings/${userId}`);
  if (res.ok) {
    const userBookings = await res.json();
    dispatch(loadUserBookings(userBookings));
  } else {
    const errors = await res.json();
    return errors
  }
}

export const createBooking = (booking) => async dispatch => {
  const res = await fetch(`/api/bookings/listings/${booking?.listing_id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  });
  if (res.ok) {
    const newBooking = await res.json();
    dispatch(create(newBooking));
    return newBooking;
  } else {
    const errors = await res.json();
    return errors;
  }
}


export const editBooking = (booking) => async dispatch => {
  const res = await fetch(`/api/bookings/listings/${booking.id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  });
  if (res.ok) {
    const editedBooking = await res.json();
    dispatch(edit(editedBooking));
    return editedBooking;
  } else {
    const errors = await res.json();
    return errors;
  }
}


export const deleteBooking = (booking) => async dispatch => {
  console.log('ID', booking)
  const res = await fetch(`/api/bookings/listings/${booking.id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const deletedBooking = await res.json();
    dispatch(remove(deletedBooking));
    return deletedBooking;
  } else {
    const errors = await res.json();
    return errors;
  }
}

let initialState = {};

const bookingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ALL_BOOKINGS: {
      newState = { ...state };
      action.bookings.all_bookings.forEach(booking => {
        newState[booking.id] = booking;
      });
      return newState;
    }
    case LOAD_USER_BOOKINGS: {
      newState = { ...state };
      action.bookings.user_bookings.forEach(booking => {
        newState[booking.id] = booking;
      });
      return newState;
    }
    case CREATE_BOOKING: {
      return { [action.newBooking.id]: action.newBooking, ...state };
    }
    case EDIT_BOOKING: {
      newState = { ...state }
      newState[action.editedBooking.id] = action.editedBooking;
      return newState;
    }
    case DELETE_BOOKING: {
      const newState = { ...state };
      console.log('REDUCER', action.deletedBooking)
      delete newState[action.deletedBooking.id];
      return newState;
    }
    default:
      return state;
  }
};

export default bookingsReducer;

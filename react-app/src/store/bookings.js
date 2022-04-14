const LOAD_ALL_BOOKINGS = 'bookings/LOAD_ALL_BOOKINGS';
const LOAD_USER_BOOKINGS = 'bookings/LOAD_USER_BOOKINGS';
const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
const EDIT_BOOKING = 'bookings/EDIT_BOOKING';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';

const load = (bookings) => ({
  type: LOAD_ALL_BOOKINGS,
  bookings,
});

const create = (newBooking) => ({
  type: CREATE_BOOKING,
  newBooking,
});

const edit = (booking) => ({
  type: EDIT_BOOKING,
  editedBooking: booking,
});

const remove = (booking) => ({
  type: DELETE_BOOKING,
  deletedBooking: booking,
});


export const getBookings = () => async dispatch => {
  const res = await fetch('/api/bookings/')
  if (res.ok) {
    const bookings = await res.json();
    dispatch(load(bookings))
  } else {
    const errors = await res.json();
    return errors;
  }
}

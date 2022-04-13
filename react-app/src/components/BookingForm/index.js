import React, { useState } from "react";

const BookingForm = () => {

  const now = new Date(Date.now());
  const tomorrow = new Date(now.getDate() + 1);
  const dayAfterTomorrow = new Date(tomorrow.getDate() + 2);

  console.log('NOW', now)
  console.log('TMRW', tomorrow);
  console.log('DAF', dayAfterTomorrow);

  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guests, setGuests] = useState(1);
  const [errors, setErrors] = useState([]);
  const [render, setRender] = useState(false);

  return (
    <form>
      <label className='booking-form'>
        Check-in
        <input
          className='booking-form'
          type='datetime-local'
          onChange={(e) => setCheckIn(e.target.value)}
          value={checkIn}
        />
      </label>
      <label className='booking-form'>
        Check-out
        <input
          className='booking-form'
          type='datetime-local'
          onChange={(e) => setCheckOut(e.target.value)}
          value={checkOut}
        />
      </label>
      <label className='booking-form'>
        Guests
        <input
          className='booking-form'
          type='number'
          onChange={(e) => setGuests(e.target.value)}
          value={guests}
        />
      </label>
      <button id='booking-bar-button' type='submit'>
        <i className="fas fa-search" />
      </button>
    </form >
  );
}

export default BookingForm;

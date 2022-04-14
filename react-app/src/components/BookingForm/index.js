import React, { useState } from "react";
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import * as moment from 'moment';
import './BookingForm.css'
import './react_dates_overrides.css'

const BookingForm = () => {


  // const now = moment();
  const tomorrow = moment().add(1, 'days');
  const dayAfterTomorrow = moment().add(2, 'days');

  const [startDate, setStartDate] = useState(tomorrow);
  const [endDate, setEndDate] = useState(dayAfterTomorrow);
  const [guests, setGuests] = useState(1);
  const [errors, setErrors] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);

  const dateRange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }

  const datesOnFocusHandler = focusedInput => {
    setFocusedInput(focusedInput)
  }

  return (
    <form className="booking-form">
      <h3>Book Your Stay</h3>
      <DateRangePicker
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId="startDate" // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId="endDate" // PropTypes.string.isRequired,
        // onDatesChange={({ startDate, endDate }) => setDatesSelected({ startDate, endDate })} // PropTypes.func.isRequired,
        onDatesChange={dateRange} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={datesOnFocusHandler} // PropTypes.func.isRequired,
      />
      <label className='guest-form'>
        Guests
        <input
          className='guest-input'
          type='number'
          onChange={(e) => setGuests(e.target.value)}
          value={guests}
        />
      </label>
      <div className="booking-button-div">
        <button className='booking-button' type='submit'>
          Submit Booking
        </button>
      </div>
    </form>




    // Form
    // <form className='booking-form'>
    //   <label >
    //     Check-in
    //     <input
    //       className='check-in-form'
    //       type='datetime-local'
    //       onChange={(e) => setCheckIn(e.target.value)}
    //       value={checkIn}
    //     />
    //   </label>
    //   <label className='check-out-form'>
    //     Check-out
    //     <input
    //       className='booking-form'
    //       type='datetime-local'
    //       onChange={(e) => setCheckOut(e.target.value)}
    //       value={checkOut}
    //     />
    //   </label>
    //   <label className='guest-form'>
    //     Guests
    //     <input
    //       className='booking-form'
    //       type='number'
    //       onChange={(e) => setGuests(e.target.value)}
    //       value={guests}
    //     />
    //   </label>
    //   <button id='booking-button' type='submit'>
    //     Book
    //   </button>
    // </form >
  );
}

export default BookingForm;

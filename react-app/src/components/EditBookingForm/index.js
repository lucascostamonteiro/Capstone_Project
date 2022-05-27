import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import * as moment from 'moment';
import { editBooking } from "../../store/booking";

import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';
import './EditBookingForm.css';

const EditBookingForm = ({ setShowModal, booking }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  // const moment = extendMoment(Moment);

  const sessionUser = useSelector(state => state.session.user);
  const listing = useSelector(state => state.listings[booking?.listing_id]);
  // const listing = useSelector(state => state?.listings[id]);
  const bookingsObj = useSelector(state => state?.bookings);
  const bookings = Object.values(bookingsObj).reverse();
  const currentBookings = bookings.filter(singleBooking => singleBooking?.listing_id === booking?.listing_id);

  const [startDate, setStartDate] = useState(moment(booking?.start_date));
  const [endDate, setEndDate] = useState(moment(booking?.end_date));
  const [guest, setGuest] = useState(booking?.guest);
  const [errors, setErrors] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [firstBlocked, setfirstBlocked] = useState(null);


  const dateRange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }

  const datesOnFocusHandler = focusedInput => {
    setFocusedInput(focusedInput)
  }

  const isBlocked = date => {
    // if (firstBlocked !== null && startDate && date > firstBlocked) return true;

    let blocked;
    let bookedRanges = [];
    for (const key in currentBookings) {
      bookedRanges.push(moment.range(currentBookings[key]?.start_date, currentBookings[key]?.end_date))
    }
    blocked = bookedRanges.find(range => range.contains(date));
    // if (firstBlocked === null && date > startDate && blocked) {
    //   setfirstBlocked(date)
    // }
    return blocked;
  };


  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedBooking = {
      id: booking.id,
      user_id: sessionUser.id,
      listing_id: booking.listing_id,
      start_date: startDate.utcOffset(7).format('YYYY-MM-DD'),
      end_date: endDate.utcOffset(7).format('YYYY-MM-DD'),
      guest: parseInt(guest)
    }
    const data = await dispatch(editBooking(editedBooking))
    if (data.errors) {
      setErrors(data.errors)
    } else if (data) {
      history.push(`/mybookings/${sessionUser?.id}`)
      setShowModal(false)
    }
  }


  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="errors-list">
        <ul className='single-error'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
      <h3>Booking Details</h3>
      <DateRangePicker
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId="startDate" // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId="endDate" // PropTypes.string.isRequired,
        onDatesChange={dateRange} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={datesOnFocusHandler} // PropTypes.func.isRequired,
        isDayBlocked={isBlocked} //PropTypes.func,
      />
      <label className='guest-form'>
        Guests
        <select className="guest-input" defaultValue={guest} onChange={(e) => setGuest(e.target.value)}>
          {[...Array(listing.guest).keys()].map((num, i) => (
            <option className="guest-option" key={i}>{num + 1}</option>
          ))}
        </select>
      </label>
      <div className="booking-button-div">
        <button className='booking-button' type='submit'>
          Edit Booking
        </button>
      </div>
    </form>
  );
}

export default EditBookingForm;

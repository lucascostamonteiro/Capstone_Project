import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import BookingForm from '../BookingForm';
import LoginForm from '../auth/LoginForm';


function BookingModal() {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <button id='booking-button'
        onClick={() => setShowModal(true)}>Create New Booking</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {sessionUser ? <BookingForm setShowModal={setShowModal} /> : <LoginForm />}
        </Modal>
      )}
    </>
  );
}

export default BookingModal;

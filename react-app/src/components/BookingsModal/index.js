import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import BookingForm from '';


function BookingModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='booking-button'
        onClick={() => setShowModal(true)}>Create New Booking</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <BookingForm />
        </Modal>
      )}
    </>
  );
}

export default BookingModal;

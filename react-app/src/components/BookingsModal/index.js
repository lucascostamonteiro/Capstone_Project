import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import BookingForm from '../BookingForm';


function BookingModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='booking-button'
        onClick={() => setShowModal(true)}>Create New Booking</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <BookingForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default BookingModal;

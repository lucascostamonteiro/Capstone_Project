import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from '../Reviews';



function CreateReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='create-review-button' onClick={() => setShowModal(true)}>Create a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReview />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;

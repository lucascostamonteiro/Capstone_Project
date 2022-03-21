import React, { useState } from "react"
import { Modal } from '../../context/Modal'
import EditReviewForm from "../EditReview"
import './EditReviewModal.css'

const EditReviewModal = ({ review }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <button className="button-class" onClick={() => setShowModal(true)} >
        Edit Review
      </button>
      {
        showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditReviewForm setShowModal={setShowModal} review={review} />
          </Modal>
        )
      }
    </div >
  )
}

export default EditReviewModal;

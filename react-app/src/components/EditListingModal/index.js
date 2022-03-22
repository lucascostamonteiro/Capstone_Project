import React, { useState } from "react"
import { Modal } from '../../context/Modal'
import EditListing from "../EditListing"

const EditListingModal = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <button id="edit-listing-button" onClick={() => setShowModal(true)} >
        Edit Listing
      </button>
      {
        showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditListing setShowModal={setShowModal} />
          </Modal>
        )
      }
    </div >
  )
}

export default EditListingModal;

import React, { useState } from "react"
import { Modal } from '../../context/Modal'
import CreateListing from "../CreateListing"
import './CreateListingModal.css'

const CreateListingModal = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <button className="create-listing-button" onClick={() => setShowModal(true)} >
        Create Listing
      </button>
      {
        showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreateListing setShowModal={setShowModal} />
          </Modal>
        )
      }
    </div >
  )
}

export default CreateListingModal;

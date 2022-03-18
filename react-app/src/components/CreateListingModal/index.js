import React, { useState } from "react"
import { Modal } from '../../context/Modal'
import CreateListing from "../CreateListing"

const CreateListingModal = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <button onClick={() => setShowModal(true)} >
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

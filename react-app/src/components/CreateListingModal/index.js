import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Modal } from '../../context/Modal'
import CreateListing from "../CreateListing"
import './CreateListingModal.css'

const CreateListingModal = () => {
  const [showModal, setShowModal] = useState(false);
  // const sessionUser = useSelector(state => state.session.user);


  // console.log('USER', sessionUser);

  return (
    <>
      {/* {!sessionUser?.host ?
        <div>
          <button className="host-button" >
            Become a Host
          </button>
        </div>
        : */}
        <div>
          <button className="create-listing-button" onClick={() => setShowModal(true)} >
            Create Listing
          </button>
          {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <CreateListing setShowModal={setShowModal} />
              </Modal>
            )
          }
        </div >
      {/* } */}
    </>
  )
}

export default CreateListingModal;

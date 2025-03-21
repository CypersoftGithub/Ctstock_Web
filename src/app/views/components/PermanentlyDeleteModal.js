import React, { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";

const PermanentlyDeleteModal = ({
  deletePermanentModal,
  setDeletePermanentModal,
  id,
  setId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePermanently = () => {
  };
  return (
    <Modal
      show={deletePermanentModal}
      size="sx"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalBody>
        <h5 className="mb-3">Are you sure you want to Delete Permanently ?</h5>
      </ModalBody>
      <Modal.Footer>
        <button
          type="button"
          className="btn_secondary"
          onClick={() => {
            setDeletePermanentModal(false);
            setId("");
            // setAnnouncementId("");
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn_primary"
          onClick={handleDeletePermanently}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PermanentlyDeleteModal;

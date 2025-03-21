import React, { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";

const DeleteModal = ({
  forBanner = false,
  forAnnouncement = false,
  forEvent = false,
  forGroup = false,
  forMiniGroup = false,
  deleteModal,
  setDeleteModal,
  id,
  setId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = () => {
    if (forBanner) {
    } else if (forAnnouncement) {
    } else if (forEvent) {
    } else if (forGroup) {
    } else if (forMiniGroup) {
    }
  };
  return (
    <Modal
      show={deleteModal}
      size="sx"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalBody>
        <h5 className="mb-3">Are you sure you want to Delete ?</h5>
      </ModalBody>
      <Modal.Footer>
        <button
          type="button"
          className="btn_secondary"
          onClick={() => {
            setDeleteModal(false);
            setId("");
            // setAnnouncementId("");
          }}
        >
          Cancel
        </button>
        <button type="button" className="btn_primary" onClick={handleDelete}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

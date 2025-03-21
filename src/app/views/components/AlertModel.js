import React, { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";

const AlertModel = ({
  alertModel,
  setAlertModel,
  forAccept,
  setForAccept,
  id,
  setUserId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleApproval = () => {
    if (forAccept) {
    } else {
    }
  };

  return (
    <Modal
      show={alertModel}
      size="sx"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalBody>
        <h5 className="mb-3">
          Are You Sure? You want to {forAccept ? "Accept" : "Reject"} User
          Profile ?
        </h5>
      </ModalBody>
      <Modal.Footer>
        <button
          type="button"
          className="btn_secondary"
          onClick={() => {
            setAlertModel(false);
            setForAccept(false);
          }}
        >
          Cancel
        </button>
        <button type="button" className="btn_primary" onClick={handleApproval}>
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModel;

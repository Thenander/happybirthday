import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export function ConfirmModal({
  showModal = false,
  handleCloseModal = () => {},
  modalTitle = "",
  modalBody = "",
  closeLabel = "Close",
  confirmLabel = "Delete",
  onConfirm = () => {},
  confirmLabelVariant = "danger",
}) {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          {closeLabel}
        </Button>
        <Button variant={confirmLabelVariant} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

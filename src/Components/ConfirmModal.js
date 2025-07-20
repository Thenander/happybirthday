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
  confirmColor = "danger",
}) {
  const confirmButton = {
    borderRadius: "10rem",
    textTransform: "uppercase",
    width: "100%",
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header
        className={`bg-${confirmColor} text-light`}
        closeButton
        style={{ border: "1px solid #fff" }}
        closeVariant="white"
      >
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalBody}
        <Button
          variant="light"
          onClick={handleCloseModal}
          className="mt-3 w-100"
          style={{ borderRadius: "10rem" }}
        >
          {closeLabel}
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button
          size="lg"
          variant={confirmColor}
          onClick={onConfirm}
          style={confirmButton}
        >
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

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
  const bgStyle = {
    backgroundColor: "#043889",
    border: "1px solid #fff",
    color: "#fff",
  };
  const buttonStyle = {
    borderRadius: "10rem",
    textTransform: "uppercase",
    width: "100%",
  };
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton style={bgStyle} closeVariant="white">
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
          variant={confirmLabelVariant}
          onClick={onConfirm}
          style={buttonStyle}
        >
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

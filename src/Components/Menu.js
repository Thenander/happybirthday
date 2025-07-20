import { Button, Modal } from "react-bootstrap";
import styles from "./Menu.module.css";
import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import Input from "./Input";

export default function Menu({
  menuIsActive,
  storedBirthdate,
  handleForgetDateOfBirth,
  handleRegisterDateOfBirth,
}) {
  /* Modal */
  const [showModal, setShowModal] = useState();
  const [modalTitle, setModalTitle] = useState();
  const [modalBody, setModalBody] = useState();
  const [closeLabel, setCloseLabel] = useState();
  const [confirmLabel, setConfirmLabel] = useState();
  const [onConfirm, setOnConfirm] = useState();
  const [confirmLabelVariant, setConfirmLabelVariant] = useState();

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  /*
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 */
  const rowClass = styles["row"];

  return (
    <div
      className={`${styles["wrapper"]} ${
        menuIsActive ? styles["active"] : styles["inactive"]
      }`}
    >
      <ConfirmModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        modalTitle={modalTitle}
        modalBody={modalBody}
        closeLabel={closeLabel}
        confirmLabel={confirmLabel}
        onConfirm={onConfirm}
        confirmLabelVariant={confirmLabelVariant}
      />
      {/*       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change number of months</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            Are you really sure you want to change number of months?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handlePeriod(25);
              handleClose();
            }}
          >
            Change
          </Button>
        </Modal.Footer>
      </Modal>
      */}
      <div className={rowClass} />

      <RegisterBirthDate
        storedBirthdate={storedBirthdate}
        showRegisterDateOfBirthModal={showRegisterDateOfBirthModal}
        rowClass={rowClass}
      />

      <Forget
        storedBirthdate={storedBirthdate}
        showConfirmForgetModal={showConfirmForgetModal}
        rowClass={rowClass}
      />
      {/*
      <div className={rowClass} onClick={handleShow}>
        Change range...
      </div>
     */}
      <div className={rowClass}>Other</div>
    </div>
  );

  function showConfirmForgetModal() {
    const action = "Forget saved birthdate";

    handleShowModal();
    setModalTitle(action);
    setModalBody(<Body />);
    setConfirmLabel(action);
    setOnConfirm(() => () => {
      handleForgetDateOfBirth();
      handleCloseModal();
    });

    function Body() {
      const main =
        "Are you really sure you want to forget your saved birthdate?";
      const sub = "You will be able to enter it again, though.";

      return (
        <>
          <div className="mb-3">{main}</div>
          <small className="text-muted">{sub}</small>
        </>
      );
    }
  }

  function showRegisterDateOfBirthModal(date) {
    const action = "Register date of birth";
    let d;

    setModalTitle(action);
    setModalBody(<Body />);
    setConfirmLabel(action);
    handleShowModal();
    setOnConfirm(() => () => {
      handleRegisterDateOfBirth(date);
      handleCloseModal();
    });

    function Body() {
      return (
        <div>
          <label htmlFor="date" className="w-100">
            Date of birth
            <input
              id="date"
              className="form-control mb-3"
              type="date"
              onChange={() => {}}
            />
          </label>
        </div>
      );
    }
  }
}

function Forget({ storedBirthdate, showConfirmForgetModal, rowClass }) {
  const forgetDateOfBirth = () =>
    isDisabled(storedBirthdate, showConfirmForgetModal);

  return (
    <div className={rowClass} onClick={forgetDateOfBirth}>
      <span className={isDisabled(!storedBirthdate)}>Forget birthdate</span>
    </div>
  );
}

function RegisterBirthDate({
  storedBirthdate,
  showRegisterDateOfBirthModal,
  rowClass,
}) {
  const registerDateOfBirth = () =>
    isDisabled(!storedBirthdate, showRegisterDateOfBirthModal);

  return (
    <div className={rowClass} onClick={registerDateOfBirth}>
      Register date of birth...
    </div>
  );
}

function isDisabled(bool, func) {
  if (func) {
    if (bool) {
      func();
    } else {
      doNuttin();
    }
  }

  if (bool) {
    return "opacity-25";
  }
  return "";
}

function doNuttin() {}

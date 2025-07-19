import { Button, Modal } from "react-bootstrap";
import styles from "./Menu.module.css";
import { useState } from "react";

export default function Menu({
  menuIsActive,
  showConfirm,
  handlePeriod,
  storedBirthdate,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const rowClass = styles["row"];

  return (
    <div
      className={`${styles["wrapper"]} ${
        menuIsActive ? styles["active"] : styles["inactive"]
      }`}
    >
      <Modal show={show} onHide={handleClose}>
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
      <div className={rowClass} />

      <div
        className={rowClass}
        onClick={() => {
          alert("Register birth");
        }}
      >
        Register date of birth...
      </div>

      <div
        className={rowClass}
        onClick={() => isDisabled(storedBirthdate, showConfirm)}
      >
        <span className={isDisabled(!storedBirthdate)}>Forget birthdate</span>
      </div>

      <div className={rowClass} onClick={handleShow}>
        Change range...
      </div>

      <div className={rowClass}>Other</div>
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

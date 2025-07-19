import { useEffect, useState } from "react";
import Input from "./Components/Input";
import List from "./Components/List";
import {
  attr,
  getMilestoneDatesFromBirthdate,
  getMonthMilestoneDates,
  MINE,
  OTHER,
} from "./Helpers/helpers";
import { Button, Collapse, Container, Modal } from "react-bootstrap";
import { Cake } from "lucide-react";

import styles from "./App.module.css";
import Burger from "./Components/Burger";
import Menu from "./Components/Menu";

export default function App() {
  const [showTable, setShowTable] = useState({ [MINE]: false, [OTHER]: true });
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState();
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [period, setPeriod] = useState(100);
  const [listLength, setListLength] = useState(10);
  const [confirmRegisterDateOfBirth, setConfirmRegisterDateOfBirth] =
    useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get birthdate from localStorage
  const storedBirthdate = localStorage.getItem("birthdate");

  // State for milestone birthdays and animation
  const [milestoneBirthdays, setMilestoneBirthdays] = useState();
  const [showTodayMilestones, setShowTodayMilestones] = useState(false);

  // Update milestone birthdays when birthdate changes
  useEffect(() => {
    if (storedBirthdate) {
      setMilestoneBirthdays(
        getMilestoneDatesFromBirthdate(storedBirthdate, period, listLength)
      );
    }
  }, [listLength, period, storedBirthdate]);

  useEffect(() => {
    if (milestoneBirthdays?.find((i) => i.isToday)) {
      setShowTable({ [MINE]: true, [OTHER]: false });
    }
  }, [milestoneBirthdays]);

  // Show today's milestones after mount
  useEffect(() => {
    const timer = setTimeout(() => setShowTodayMilestones(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Handle birthdate input
  const handleBirthdateSubmit = (birthdate) => {
    localStorage.setItem("birthdate", birthdate);
    setMilestoneBirthdays(
      getMilestoneDatesFromBirthdate(birthdate, period, listLength)
    );
  };

  const showConfirm = () => {
    setConfirm({ onConfirm: handleDelete });
    handleShow();
  };

  const handleDelete = () => {
    localStorage.removeItem("birthdate");
    setMilestoneBirthdays();
    handleClose();
    setMenuIsActive(false);
  };

  const handlePeriod = (period) => {
    setPeriod(period);
    setMenuIsActive(false);
  };

  return (
    <Container
      style={{
        maxWidth: "500px",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
      className={styles.bg}
    >
      <Burger isActive={menuIsActive} setIsActive={setMenuIsActive} />

      <Menu
        menuIsActive={menuIsActive}
        showConfirm={showConfirm}
        handlePeriod={handlePeriod}
        storedBirthdate={storedBirthdate}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forget saved birthdate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            Are you really sure you want to forget your saved birthdate?
          </div>
          <small className="text-muted">
            You will be able to enter it again, though.
          </small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={confirm?.onConfirm}>
            Forget birthdate
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={menuIsActive ? styles["main_blurred"] : styles["main"]}>
        <div {...attr}>
          <div className="py-4">
            <Cake size={36} className="text-warning" />
            <h1 className="m-0 fs-2 mt-2 text-light">
              {`Celebrate every ${period} months!`}
            </h1>
          </div>
        </div>

        <Collapse in={!storedBirthdate}>
          <div>
            <Input onClickHandler={handleBirthdateSubmit} />
          </div>
        </Collapse>

        <Collapse in={!!milestoneBirthdays}>
          <div>
            <List
              list={milestoneBirthdays}
              label="My birthdays!"
              dateLabel="Birthdays"
              showTable={showTable}
              setShowTable={setShowTable}
              mine
            />
          </div>
        </Collapse>

        <Collapse in={showTodayMilestones}>
          <div>
            <List
              list={getMonthMilestoneDates(period, listLength)}
              label="Who's celebrating today?"
              dateLabel="Date of birth"
              showTable={showTable}
              setShowTable={setShowTable}
            />
          </div>
        </Collapse>
      </div>
    </Container>
  );
}
function ConfirmModal({
  show = false,
  handleClose = () => {},
  modalTitle = "",
  modalBody = "",
  closeLabel = "Close",
  confirmLabel = "Delete",
  onConfirm = () => {},
  confirmLabelVariant = "danger",
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {closeLabel}
        </Button>
        <Button variant={confirmLabelVariant} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

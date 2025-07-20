import styles from "./Menu.module.css";
import { useEffect, useState } from "react";
import { ConfirmModal } from "./ConfirmModal";

export default function Menu({
  menuIsActive,
  savedBirthdate,
  savedInterval,
  handleBirthdateRemoval,
  handleBirthdateSubmit,
  handleIntervalSubmit,
  register,
  error,
  setError,
}) {
  const [showModal, setShowModal] = useState();
  const [modalTitle, setModalTitle] = useState();
  const [modalBody, setModalBody] = useState();
  const [closeLabel, setCloseLabel] = useState();
  const [confirmLabel, setConfirmLabel] = useState();
  const [onConfirm, setOnConfirm] = useState();
  const [confirmLabelVariant, setConfirmLabelVariant] = useState();

  useEffect(() => {
    if (menuIsActive) {
      setError();
    }
  }, [menuIsActive, setError]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    resetModalInfo();
  };

  const resetModalInfo = () => {
    setModalTitle();
    setModalBody();
    setCloseLabel();
    setConfirmLabel();
    setOnConfirm();
    setConfirmLabelVariant();
  };

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

      {error && <div className={`${rowClass} bg-danger`}>{error}</div>}

      <div className={rowClass} />

      <SubmitBirthdate
        savedBirthdate={savedBirthdate}
        showBirthdateSubmitModal={showBirthdateSubmitModal}
        rowClass={rowClass}
        register={register}
      />

      <RemoveBirthdate
        savedBirthdate={savedBirthdate}
        showConfirmRemoveModal={showConfirmRemoveModal}
        rowClass={rowClass}
      />

      <SubmitInterval
        showIntervalSubmitModal={showIntervalSubmitModal}
        rowClass={rowClass}
        register={register}
      />

      <div className={rowClass}>Other</div>
    </div>
  );

  function showConfirmRemoveModal() {
    const title = "Remove saved birthdate";
    const action = "Remove";
    const main = "Are you really sure you want to remove your saved birthdate?";
    const sub = "You will be able to enter it again, though.";
    const body = (
      <>
        <div className="mb-3">{main}</div>
        <small className="text-muted">{sub}</small>
      </>
    );

    handleShowModal();
    setModalTitle(title);
    setModalBody(body);
    setConfirmLabel(action);
    setConfirmLabelVariant("danger");
    setOnConfirm(() => () => {
      handleBirthdateRemoval();
      handleCloseModal();
    });
  }

  function showBirthdateSubmitModal(register) {
    const title = "Submit date of birth";
    const action = "Submit";
    const body = (
      <div>
        <label htmlFor="birthdate" className="w-100">
          Enter date of birth
          <input
            autoFocus
            id="birthdate"
            name="birthdate"
            {...register("birthdate")}
            className="form-control mb-3"
            type="date"
          />
        </label>
      </div>
    );

    setModalTitle(title);
    setModalBody(body);
    setConfirmLabel(action);
    setConfirmLabelVariant("primary");
    handleShowModal();
    setOnConfirm(() => () => {
      handleBirthdateSubmit();
      handleCloseModal();
    });
  }

  function showIntervalSubmitModal(register) {
    const title = "Submit months interval";
    const action = "Submit";
    const body = (
      <div>
        <label htmlFor="birthdate" className="w-100">
          Enter interval{" "}
          <span>
            <small>{`(current: ${savedInterval})`}</small>
          </span>
          <input
            autoFocus
            id="interval"
            name="interval"
            {...register("interval", {
              min: 1,
              max: 1000,
              validate: {
                checkAvailability: (inp) => {
                  console.log(inp);
                },
              },
            })}
            className="form-control mb-3"
            type="number"
            min={1}
            max={1000}
          />
        </label>
      </div>
    );

    setModalTitle(title);
    setModalBody(body);
    setConfirmLabel(action);
    setConfirmLabelVariant("primary");
    handleShowModal();
    setOnConfirm(() => () => {
      handleIntervalSubmit();
      handleCloseModal();
    });
  }
}

function SubmitBirthdate({
  savedBirthdate,
  showBirthdateSubmitModal,
  rowClass,
  register,
}) {
  const submitBirthdate = () =>
    isDisabled(!savedBirthdate, () => showBirthdateSubmitModal(register));

  return (
    <div className={rowClass} onClick={submitBirthdate}>
      <span className={isDisabled(savedBirthdate)}>
        Submit date of birth...
      </span>
    </div>
  );
}

function RemoveBirthdate({ savedBirthdate, showConfirmRemoveModal, rowClass }) {
  const removeBirthdate = () =>
    isDisabled(savedBirthdate, showConfirmRemoveModal);

  return (
    <div className={rowClass} onClick={removeBirthdate}>
      <span className={isDisabled(!savedBirthdate)}>Remove date of birth</span>
    </div>
  );
}

function SubmitInterval({ showIntervalSubmitModal, rowClass, register }) {
  return (
    <div className={rowClass} onClick={() => showIntervalSubmitModal(register)}>
      <span>Submit months interval</span>
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

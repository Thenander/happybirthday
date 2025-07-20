import styles from "./Menu.module.css";
import { useEffect, useState } from "react";
import { ConfirmModal } from "./ConfirmModal";

export default function Menu({
  menuIsActive,
  savedBirthdate,
  savedInterval,
  savedListlength,
  resetted,
  handleBirthdateRemoval,
  handleBirthdateSubmit,
  handleIntervalSubmit,
  handleListlengthSubmit,
  handleAllReset,
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
  const [confirmColor, setConfirmColor] = useState();

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
    setConfirmColor();
  };

  const rowClass = styles["row"];
  const errorClass = styles["error"];

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
        confirmColor={confirmColor}
      />

      <div className={rowClass} />

      <SubmitBirthdate
        savedBirthdate={savedBirthdate}
        showBirthdateSubmitModal={showBirthdateSubmitModal}
        rowClass={rowClass}
        register={register}
      />

      <SubmitInterval
        showIntervalSubmitModal={showIntervalSubmitModal}
        rowClass={rowClass}
        register={register}
      />

      <SubmitListLength
        showListlengthSubmitModal={showListlengthSubmitModal}
        rowClass={rowClass}
        register={register}
      />

      <RemoveBirthdate
        savedBirthdate={savedBirthdate}
        showConfirmRemoveModal={showConfirmRemoveModal}
        rowClass={rowClass}
      />

      <Reset
        showAllResetModal={showAllResetModal}
        rowClass={rowClass}
        resetted={resetted}
      />

      {error && <div className={`${errorClass}`}>{error}</div>}
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
    setConfirmColor("danger");
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
    setConfirmColor("primary");
    handleShowModal();
    setOnConfirm(() => () => {
      handleBirthdateSubmit();
      handleCloseModal();
    });
  }

  function showIntervalSubmitModal(register) {
    const title = "Change months interval";
    const action = "Change";
    const body = (
      <div>
        <label htmlFor="interval" className="w-100">
          Enter interval{" "}
          <span>
            <small>{`(current: ${savedInterval})`}</small>
          </span>
          <input
            autoFocus
            id="interval"
            name="interval"
            {...register("interval", { min: 1, max: 1000 })}
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
    setConfirmColor("primary");
    handleShowModal();
    setOnConfirm(() => () => {
      handleIntervalSubmit();
      handleCloseModal();
    });
  }

  function showListlengthSubmitModal(register) {
    const title = "Change list length";
    const action = "Change";
    const body = (
      <div>
        <label htmlFor="listlength" className="w-100">
          Enter list length{" "}
          <span>
            <small>{`(current: ${savedListlength})`}</small>
          </span>
          <input
            autoFocus
            id="listlength"
            name="listlength"
            {...register("listlength", { min: 1, max: 100 })}
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
    setConfirmColor("primary");
    handleShowModal();
    setOnConfirm(() => () => {
      handleListlengthSubmit();
      handleCloseModal();
    });
  }

  function showAllResetModal() {
    const title = "Reset all";
    const action = "Reset";
    const main = "Are you really sure you want to reset all data?";
    const sub = "This cannot be undone.";
    const body = (
      <>
        <div className="mb-3">{main}</div>
        <small className="text-danger">{sub}</small>
      </>
    );

    handleShowModal();
    setModalTitle(title);
    setModalBody(body);
    setConfirmLabel(action);
    setConfirmColor("danger");
    setOnConfirm(() => () => {
      handleAllReset();
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
      <span className={isDisabled(!savedBirthdate)}>
        Remove date of birth...
      </span>
    </div>
  );
}

function SubmitInterval({ showIntervalSubmitModal, rowClass, register }) {
  return (
    <div className={rowClass} onClick={() => showIntervalSubmitModal(register)}>
      <span>Change months interval...</span>
    </div>
  );
}

function SubmitListLength({ showListlengthSubmitModal, rowClass, register }) {
  return (
    <div
      className={rowClass}
      onClick={() => showListlengthSubmitModal(register)}
    >
      <span>Change list length...</span>
    </div>
  );
}

function Reset({ showAllResetModal, rowClass, resetted }) {
  const removeBirthdate = () => isDisabled(resetted, showAllResetModal);

  return (
    <div className={rowClass} onClick={removeBirthdate}>
      <span className={isDisabled(!resetted)}>Reset all...</span>
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

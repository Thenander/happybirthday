import { useEffect, useState } from "react";
import List from "./Components/List";
import {
  attr,
  getMilestoneDatesFromBirthdate,
  getMonthMilestoneDates,
  MINE,
  OTHER,
} from "./Helpers/helpers";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import { Cake } from "lucide-react";

import styles from "./App.module.css";
import Burger from "./Components/Burger";
import Menu from "./Components/Menu";

import { useForm } from "react-hook-form";

export default function App() {
  const savedBirthdate = localStorage.getItem("birthdate");
  const savedInterval = localStorage.getItem("interval") || 100;
  const savedListlength = localStorage.getItem("listlength") || 10;

  const [showTable, setShowTable] = useState({ [MINE]: false, [OTHER]: true });
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [error, setError] = useState();
  console.log(error);

  const { register, getValues, reset } = useForm();

  const [milestoneBirthdays, setMilestoneBirthdays] = useState();
  const [showTodayMilestones, setShowTodayMilestones] = useState(false);

  useEffect(() => {
    if (savedBirthdate) {
      setMilestoneBirthdays(
        getMilestoneDatesFromBirthdate(
          savedBirthdate,
          savedInterval,
          savedListlength
        )
      );
    }
  }, [savedBirthdate, savedInterval, savedListlength]);

  useEffect(() => {
    if (milestoneBirthdays?.find((i) => i.isToday)) {
      setShowTable({ [MINE]: true, [OTHER]: false });
    }
  }, [milestoneBirthdays]);

  useEffect(() => {
    const timer = setTimeout(() => setShowTodayMilestones(true), 0);
    return () => clearTimeout(timer);
  }, []);

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
      <Burger menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive} />
      <Menu
        menuIsActive={menuIsActive}
        savedBirthdate={savedBirthdate}
        savedInterval={savedInterval}
        handleBirthdateRemoval={handleBirthdateRemoval}
        handleBirthdateSubmit={handleBirthdateSubmit}
        handleIntervalSubmit={handleIntervalSubmit}
        handleAllReset={handleAllReset}
        register={register}
        error={error}
        setError={setError}
      />

      <div className={menuIsActive ? styles["main_blurred"] : styles["main"]}>
        <div {...attr}>
          <div className="py-4">
            <Cake size={36} className="text-warning" />
            <h1 className="m-0 fs-2 mt-2 text-light">
              {`Celebrate every ${savedInterval} months!`}
            </h1>
          </div>
        </div>

        <Collapse in={!!milestoneBirthdays && savedBirthdate}>
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
              list={getMonthMilestoneDates(savedInterval, savedListlength)}
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

  function handleBirthdateRemoval() {
    localStorage.removeItem("birthdate");
    setMilestoneBirthdays();
    setMenuIsActive(false);

    reset();
  }

  function handleBirthdateSubmit() {
    const birthdate = getValues("birthdate");
    localStorage.setItem("birthdate", birthdate);
    setMenuIsActive(false);
    setMilestoneBirthdays(
      getMilestoneDatesFromBirthdate(birthdate, savedInterval, savedListlength)
    );

    reset();
  }

  function handleIntervalSubmit() {
    const interval = getValues("interval");
    if (!isValidNumber(interval)) {
      setError("Not valid!");
      return;
    }

    localStorage.setItem("interval", interval);
    setMenuIsActive(false);
    setMilestoneBirthdays(
      getMilestoneDatesFromBirthdate(savedBirthdate, interval, savedListlength)
    );

    reset();

    function isValidNumber(input) {
      // Only allow numbers between 1 and 1000
      const regex = /^(?:[1-9]|[1-9][0-9]|[1-9][0-9]{2}|1000)$/;
      return regex.test(String(input));
    }
  }

  function handleAllReset() {
    localStorage.clear();
    setMilestoneBirthdays();
    setMenuIsActive(false);

    reset();
  }
}

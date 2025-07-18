import { useEffect, useState } from "react";
import Input from "./Components/Input";
import List from "./Components/List";
import {
  attr,
  getMilestoneDatesFromBirthdate,
  getMonthMilestoneDates,
  MINE,
} from "./Helpers/helpers";
import { Collapse, Container } from "react-bootstrap";
import { Cake } from "lucide-react";

export default function App() {
  const [showTable, setShowTable] = useState({ [MINE]: false, other: true });
  // Get birthdate from localStorage
  const storedBirthdate = localStorage.getItem("birthdate");

  // State for milestone birthdays and animation
  const [milestoneBirthdays, setMilestoneBirthdays] = useState();
  const [showTodayMilestones, setShowTodayMilestones] = useState(false);

  // Update milestone birthdays when birthdate changes
  useEffect(() => {
    if (storedBirthdate) {
      setMilestoneBirthdays(getMilestoneDatesFromBirthdate(storedBirthdate));
      setShowTable({ [MINE]: true, other: false });
    }
  }, [storedBirthdate]);

  // Show today's milestones after mount
  useEffect(() => {
    const timer = setTimeout(() => setShowTodayMilestones(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Handle birthdate input
  const handleBirthdateSubmit = (birthdate) => {
    localStorage.setItem("birthdate", birthdate);
    setMilestoneBirthdays(getMilestoneDatesFromBirthdate(birthdate));
  };

  return (
    <Container style={{ maxWidth: "500px", height: "100vh" }}>
      <div {...attr}>
        <div className="py-4">
          <Cake size={36} />
          <h1 className="m-0 fs-2 mt-2">Celebrate every 100 months!</h1>
        </div>
        {!storedBirthdate && <hr />}
      </div>
      {!storedBirthdate && <Input onClickHandler={handleBirthdateSubmit} />}
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
            list={getMonthMilestoneDates()}
            label="Who's celebrating today?"
            dateLabel="Date of birth"
            showTable={showTable}
            setShowTable={setShowTable}
          />
        </div>
      </Collapse>
    </Container>
  );
}

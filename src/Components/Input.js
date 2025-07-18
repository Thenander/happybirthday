import { useState } from "react";
import { attr } from "../Helpers/helpers";
import { Collapse } from "react-bootstrap";

export default function Input({ onClickHandler }) {
  const [date, setDate] = useState("");

  const handleChange = (e) => setDate(e.target.value);

  const handleSubmit = () => {
    onClickHandler(date);
    setDate("");
  };

  return (
    <div {...attr}>
      <div>
        <label htmlFor="date" className="text-light">
          Enter your date of birth
          <input
            id="date"
            className="form-control mb-3"
            type="date"
            value={date}
            onChange={handleChange}
          />
        </label>
      </div>
      <Collapse in={!!date}>
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-warning w-100 fs-1 mb-3"
            style={{ borderRadius: "100vh" }}
          >
            Find my birthdays!
          </button>
        </div>
      </Collapse>
    </div>
  );
}

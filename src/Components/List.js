import { Cake, PartyPopper, Plus, Minus } from "lucide-react";
import { attr, MINE, OTHER } from "../Helpers/helpers";
import { celebrities } from "../celebrities";
import { Fragment, useState } from "react";
import { Collapse } from "react-bootstrap";
import styles from "./List.module.css";

export default function List({
  list = [],
  label = "",
  dateLabel = "",
  showTable,
  setShowTable,
  mine = false,
}) {
  const key = mine ? MINE : OTHER;
  const [showCelebs, setShowCelebs] = useState({});

  const handleClickTable = () => {
    setShowTable((prev) =>
      Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, !v]))
    );
  };

  const handleChange = (date) => {
    setShowCelebs((prev) => {
      return { ...prev, [date]: !prev[date] };
    });
  };

  const getRowStyle = (hasPassed, isToday) =>
    isToday
      ? {
          fontWeight: "bold",
          backgroundColor: "#0d6efd",
          color: "#FFFFFF",
        }
      : hasPassed
      ? { opacity: 0.5 }
      : {};

  const wrapperClass = `border p-1 ${
    mine ? "bg-warning" : "bg-primary text-light"
  }`;
  const tableClass = `table ${
    mine ? "table-warning" : "table-primary"
  } table-sm striped m-0`;

  return (
    <div {...attr} style={{ paddingBottom: "1rem" }}>
      <div
        className={`${wrapperClass} ${styles["animated"]} ${
          showTable[key] ? styles["go-square"] : styles["go-round"]
        }`}
      >
        <div onClick={handleClickTable}>
          <Header label={label} mine={mine} />
        </div>
        <Collapse in={showTable[key]}>
          <div>
            <table className={tableClass}>
              <thead>
                <tr>
                  <th {...attr}>{dateLabel}</th>
                  <th />
                  <th {...attr}>Celebrating months</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list.map(({ milestone, date, hasPassed, isToday }) => {
                  const celebritiesThisDay = celebrities.filter(
                    ({ birthdate }) => birthdate === date
                  );

                  return (
                    <Fragment key={milestone || celebritiesThisDay}>
                      <tr onClick={() => handleChange(date)}>
                        <TableCell
                          value={date}
                          hasPassed={hasPassed}
                          isToday={isToday}
                        />
                        <td style={getRowStyle(hasPassed, isToday)}>
                          {isToday && (
                            <PartyPopper size={20} strokeWidth={1.5} />
                          )}
                        </td>
                        <TableCell
                          value={milestone}
                          hasPassed={hasPassed}
                          isToday={isToday}
                        />
                        <td style={getRowStyle(hasPassed, isToday)}>
                          {!mine && celebritiesThisDay.length > 0 && (
                            <div>{showCelebs[date] ? <Minus /> : <Plus />}</div>
                          )}
                        </td>
                      </tr>

                      {celebritiesThisDay.length > 0 && showCelebs[date] && (
                        <tr>
                          <td colSpan={100} className="bg-light">
                            <ul className="text-start m-0 opacity-50">
                              {celebritiesThisDay.map(({ name }) => {
                                return (
                                  <li key={name}>
                                    <small>{name}</small>
                                  </li>
                                );
                              })}
                            </ul>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

function TableCell({ value, hasPassed, isToday }) {
  return (
    <td {...attr} style={getRowStyle(hasPassed, isToday)}>
      {value}
    </td>
  );
}

function getRowStyle(hasPassed, isToday) {
  if (isToday) {
    return {
      fontWeight: "bold",
      backgroundColor: "#0d6efd",
      color: "#FFFFFF",
    };
  }
  if (hasPassed) {
    return { opacity: 0.5 };
  }
  return {};
}

function Header({ label, mine }) {
  return (
    <div className="d-flex align-items-center justify-content-center my-3">
      <Cake className={`me-2 ${mine ? "text-primary" : "text-warning"}`} />
      <h2 className="m-0 fs-4">{label}</h2>
    </div>
  );
}

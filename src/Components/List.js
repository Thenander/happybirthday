import { Cake, PartyPopper } from "lucide-react";
import { attr } from "../Helpers/helpers";
import { celebrities } from "../celebrities";
import { Fragment, useState } from "react";

export default function List({
  list = [],
  label = "",
  dateLabel = "",
  mine = false,
}) {
  const [showCelebs, setShowCelebs] = useState({});

  const handleChange = (e, date) => {
    setShowCelebs((prev) => {
      return { ...prev, [date]: e.target.checked };
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

  const wrapperClass = `border rounded p-1 ${
    mine ? "bg-warning" : "bg-primary text-light"
  }`;
  const tableClass = `table ${
    mine ? "table-warning" : "table-primary"
  } table-sm striped m-0`;

  return (
    <div {...attr} style={{ paddingBottom: "1rem" }}>
      <div className={wrapperClass}>
        <Header label={label} />
        <table className={tableClass}>
          <thead>
            <tr>
              <th {...attr}>{dateLabel}</th>
              <th />
              <th {...attr}>Celebrating months</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {list.map(({ milestone, date, hasPassed, isToday }) => {
              const celebritiesThisDay = celebrities.filter(
                ({ birthdate }) => birthdate === date
              );

              return (
                <Fragment key={milestone || celebritiesThisDay}>
                  <tr>
                    <TableCell
                      value={date}
                      hasPassed={hasPassed}
                      isToday={isToday}
                    />
                    <td style={getRowStyle(hasPassed, isToday)}>
                      {isToday && <PartyPopper size={20} strokeWidth={1.5} />}
                    </td>
                    <TableCell
                      value={milestone}
                      hasPassed={hasPassed}
                      isToday={isToday}
                    />
                    <td style={getRowStyle(hasPassed, isToday)}>
                      {celebritiesThisDay.length > 0 && (
                        <div>
                          <input
                            onChange={(e) => handleChange(e, date)}
                            className="form-check-input"
                            type="checkbox"
                          />
                        </div>
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

function Header({ label }) {
  return (
    <div className="d-flex align-items-center justify-content-center my-3">
      <Cake className="me-2" />
      <h2 className="m-0 fs-4">{label}</h2>
    </div>
  );
}

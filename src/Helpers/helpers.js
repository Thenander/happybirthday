// Helpers/helpers.js

// Centralt attribut för t.ex. <td {...attr}>
export const attr = {
  className: "text-center",
};

/**
 * Format: YYYY-MM-DD (lokal tid)
 */
export function formatLocalDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Beräknar ett nytt datum genom att lägga till eller dra ifrån månader.
 * Klarar både positiva och negativa offset.
 */
function calculateDateFromOffset(baseDate, monthOffset) {
  const origDay = baseDate.getDate();
  const origMonth = baseDate.getMonth();
  const origYear = baseDate.getFullYear();

  const totalMonths = origMonth + monthOffset;
  const year = origYear + Math.floor(totalMonths / 12);
  const monthIdx = ((totalMonths % 12) + 12) % 12; // 0–11

  const daysInTarget = new Date(year, monthIdx + 1, 0).getDate();
  const day = Math.min(origDay, daysInTarget);

  return new Date(year, monthIdx, day);
}

/**
 * Returnerar { milestone, date } för varje months:e månad bakåt från idag.
 */
export function getMonthMilestoneDates(period = 100, length = 10) {
  const today = new Date();

  return Array.from({ length }, (_, i) => {
    const monthsAgo = (i + 1) * -period;
    const date = calculateDateFromOffset(today, monthsAgo);
    return {
      milestone: (i + 1) * period,
      date: formatLocalDate(date),
    };
  });
}

/**
 * Returnerar { milestone, date, hasPassed, isToday } från ett födelsedatum.
 * @param {*} birthdateStr ex. "1970-01-01"
 * @param {*} period default 100
 * @param {*} length default 10
 * @returns
 */
export function getMilestoneDatesFromBirthdate(
  birthdateStr,
  period = 100,
  length = 10
) {
  const birthdate = new Date(birthdateStr);
  if (Number.isNaN(birthdate)) throw new Error("Invalid date");

  const todayStr = formatLocalDate(new Date());

  return Array.from({ length }, (_, i) => {
    const months = (i + 1) * period;
    const date = calculateDateFromOffset(birthdate, months);
    const dateStr = formatLocalDate(date);

    return {
      milestone: dateStr === todayStr ? `${months} months!` : months,
      date: dateStr === todayStr ? "Today" : dateStr,
      hasPassed: dateStr < todayStr,
      isToday: dateStr === todayStr,
    };
  });
}

export const MINE = "mine";
export const OTHER = "other";

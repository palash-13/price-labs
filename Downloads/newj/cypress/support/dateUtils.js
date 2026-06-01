// Helpers to translate an ISO date ("YYYY-MM-DD") into the strings the
// react-datepicker uses, so tests can pass plain dates from fixtures.

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function ordinal(day) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = day % 100;
  return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

export function parseDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// e.g. "2026-06-01" -> "Choose Monday, June 1st, 2026"
export function toAriaLabel(isoDate) {
  const date = parseDate(isoDate);
  return `Choose ${WEEKDAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${ordinal(
    date.getDate()
  )}, ${date.getFullYear()}`;
}

// e.g. "2026-06-01" -> "2026-06"
export function toYearMonth(isoDate) {
  const [year, month] = isoDate.split("-");
  return `${year}-${month.padStart(2, "0")}`;
}

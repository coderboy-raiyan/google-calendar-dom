import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import createDayElement from "./createDayElement";

const daysContainer = document.querySelector(
  "[data-calender-days]"
) as HTMLDivElement;

function renderMonth(monthDate: Date) {
  const monthTitle = document.querySelector(
    "[data-month-title]"
  ) as HTMLDivElement;
  monthTitle.textContent = format(monthDate, "MMMM yyy");

  const dayElements = getCalenderDates(monthDate).map((date, index) => {
    return createDayElement(date, {
      isCurrentMonth: isSameMonth(monthDate, date),
      isCurrentDay: isSameDay(Date.now(), date),
      showWeekName: index < 7,
    });
  });

  daysContainer.innerText = "";
  dayElements.forEach((ele) => {
    daysContainer.insertAdjacentHTML("beforeend", ele);
  });
}

function getCalenderDates(date: Date) {
  const firstWeekStart = startOfWeek(startOfMonth(date));
  const lastWeekStart = endOfWeek(endOfMonth(date));
  const dates = eachDayOfInterval({
    start: firstWeekStart,
    end: lastWeekStart,
  });
  return dates;
}

export default renderMonth;

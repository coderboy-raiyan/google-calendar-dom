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
import { openAddModalEvent } from "./modal";

const daysContainer = document.querySelector(
  "[data-calender-days]"
) as HTMLDivElement;

function renderMonth(monthDate: Date) {
  const monthTitle = document.querySelector(
    "[data-month-title]"
  ) as HTMLDivElement;
  monthTitle.textContent = format(monthDate, "MMMM yyy");

  const calenderDates: Date[] = [];

  const dayElements = getCalenderDates(monthDate).map((date, index) => {
    calenderDates.push(date);
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
  const dayElementDiv = document.querySelectorAll(".day");

  for (let i = 0; i < dayElementDiv.length; i++) {
    const calenderDate = calenderDates[i];
    const ele = Array.from(dayElementDiv)[i];
    ele.querySelector("[data-add-event-btn]")?.addEventListener("click", () => {
      openAddModalEvent(calenderDate);
    });
  }
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

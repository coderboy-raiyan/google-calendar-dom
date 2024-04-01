import { format } from "date-fns";
import { ICreateDayElementOptions } from "./interfaces/DayElementTypes/createDayElementTypes";

function createDayElement(date: Date, options: ICreateDayElementOptions = {}) {
  const {
    isCurrentMonth = true,
    isCurrentDay = false,
    showWeekName = false,
  } = options;

  const dayElement: any = ` <div class="day ${
    !isCurrentMonth ? "non-month-day" : ""
  }" data-date-wrapper>
    <div class="day-header">
      <div class="week-name" data-week-name>${
        showWeekName ? format(date, "E") : ""
      }</div>
      <div class="day-number ${
        isCurrentDay ? "active" : ""
      }" data-day-number>${date.getDate()}</div>
      <button class="add-event-btn" data-add-event-btn>+</button>
    </div>
    <div class="events" data-events-container>
     
    </div>
    <button class="events-view-more-btn"></button>
  </div>`;

  return dayElement;
}

export default createDayElement;

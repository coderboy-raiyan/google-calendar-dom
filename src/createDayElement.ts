import { format } from "date-fns";
import { ICreateDayElementOptions } from "./interfaces/DayElements/createDayElementTypes";

function createDayElement(date: Date, options: ICreateDayElementOptions = {}) {
  const {
    isCurrentMonth = true,
    isCurrentDay = false,
    showWeekName = false,
  } = options;

  const dayElement = ` <div class="day ${
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
    <div class="events">
      <button class="all-day-event green event">
        <div class="event-name">Short</div>
      </button>
      <button class="event">
        <div class="color-dot blue"></div>
        <div class="event-time">7am</div>
        <div class="event-name">Event Name</div>
      </button>
      <button class="event">
        <div class="color-dot green"></div>
        <div class="event-time">8am</div>
        <div class="event-name">Event Name</div>
      </button>
      <button class="event">
        <div class="color-dot blue"></div>
        <div class="event-time">9am</div>
        <div class="event-name">Event Name</div>
      </button>
      <button class="event">
        <div class="color-dot blue"></div>
        <div class="event-time">10am</div>
        <div class="event-name">Event Name</div>
      </button>
    </div>
    <button class="events-view-more-btn"></button>
  </div>`;

  return dayElement;
}

export default createDayElement;

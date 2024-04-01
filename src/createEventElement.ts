import { format, parse } from "date-fns";
import { IEventType } from "./interfaces/EventTypes/eventTypes";
const allDayEventTemplate = document.querySelector(
  "#all-day-event-template"
) as HTMLTemplateElement;
const timedEventTemplate = document.querySelector(
  "#timed-event-template"
) as HTMLTemplateElement;

function createEventElement(event: IEventType) {
  return event.isAllDay
    ? createAllDayEventElement(event)
    : createTimedEventElement(event);
}

function createAllDayEventElement(event: IEventType) {
  const element = allDayEventTemplate.content.cloneNode(true) as HTMLDivElement;
  element.querySelector("[data-event]")?.classList.add(event.color as string);
  element.querySelector("[data-name]")!.textContent = event.name as string;
  return element;
}
function createTimedEventElement(event: IEventType): HTMLDivElement {
  const element = timedEventTemplate.content.cloneNode(true) as HTMLDivElement;
  element.querySelector("[data-name]")!.textContent = event.name as string;
  element.querySelector("[data-color]")!.classList.add(event.color as string);
  element.querySelector("[data-time]")!.textContent = format(
    parse(event.startTime as string, "HH:mm", event.date),
    "h:mma"
  );
  return element;
}

export default createEventElement;

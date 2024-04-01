import { isSameDay } from "date-fns";
import { IEventType } from "./interfaces/EventTypes/eventTypes";
import eventTimeToNumber from "./utils/eventTimeToNumber";

const EVENTS_KEY: string = "calendar";

let events: IEventType[] =
  JSON.parse(localStorage.getItem(EVENTS_KEY) as string) || [];

export function addEvent(event: IEventType) {
  events.push(event);
  save();
}

export function getEventsForDay(date: Date): IEventType[] {
  return events
    .filter((event) => isSameDay(event.date, date))
    .sort(compareEvents);
}

function compareEvents(eventA: IEventType, eventB: IEventType) {
  if (eventA.isAllDay && eventB.isAllDay) {
    return 0;
  } else if (eventA.isAllDay) {
    return -1;
  } else if (eventB.isAllDay) {
    return 1;
  } else {
    return (
      eventTimeToNumber(eventA.startTime as string) -
      eventTimeToNumber(eventB.startTime as string)
    );
  }
}

function save() {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

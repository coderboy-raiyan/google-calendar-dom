export type IEventType = {
  id?: string;
  date: Date | number;
  name?: string;
  startTime?: string | undefined;
  endTime?: string | undefined;
  isAllDay?: boolean;
  color?: string;
};

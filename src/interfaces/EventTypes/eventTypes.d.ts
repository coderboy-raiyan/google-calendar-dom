export type IEventType = {
  id?: string;
  date: Date | number;
  name?: string;
  startTime?: string | undefined | Date;
  endTime?: string | undefined | Date;
  isAllDay?: boolean;
  color?: string;
};

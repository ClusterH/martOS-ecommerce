import { DayOfWeek } from "./DayOfWeek";

export interface DayStoreCalendar {
  dayOfWeek: DayOfWeek;
  openingTime: Date;
  closingTime: Date;
  storeStatus?: string;
};

import { DayStoreCalendar } from "./DayStoreCalendar";

export type StoreCalendar = {
  referenceStoreId: string;
  country: string;
  days: DayStoreCalendar[];
};

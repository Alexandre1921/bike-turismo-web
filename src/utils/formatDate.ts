import { format, utcToZonedTime } from "date-fns-tz";

const timeZone = "Etc/Zulu";

function presentDate(dateToPresent: string | number | Date, dateFormat = "dd/MM/yyyy"): string {
  return format(utcToZonedTime(dateToPresent, timeZone), dateFormat);
}

export { presentDate };

import { format, utcToZonedTime } from 'date-fns-tz';

const timeZone = 'Etc/Zulu';
export const presentDate = (dateToPresent: string | number | Date, dateFormat = 'dd/MM/yyyy') =>
  format(utcToZonedTime(dateToPresent, timeZone), dateFormat);

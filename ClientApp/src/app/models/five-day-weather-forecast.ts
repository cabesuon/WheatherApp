import { DayWeather } from '.';

export function fiveDayWeatherForecastKey(date: Date) {
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

export type DayWeatherForecast = DayWeather[];

export interface FiveDayWeatherForecast {
  [date: string]: DayWeatherForecast;
}

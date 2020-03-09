export interface DayWeather {
  cityName: string;
  date: Date;
  icon: string;
  description: string;
  feelsLikeC: number;
  tempMinC: number;
  tempMaxC: number;
  feelsLikeF: number;
  tempMinF: number;
  tempMaxF: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDeg: number;
  rain3h: number;
  rainChance: number;
}

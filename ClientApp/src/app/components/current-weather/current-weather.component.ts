import { Component, OnInit, Input } from '@angular/core';

import { DayWeather, Coordinates, TemperatureUnits } from '../../models';

export interface CurrentWeatherComponentParams {
  coords: Coordinates;
  unit: TemperatureUnits;
  weather: DayWeather;
}

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  _params: CurrentWeatherComponentParams = null;
  @Input() set params(params: CurrentWeatherComponentParams) {
    this.reset();
    if (!params) {
      return;
    }
    this._params = params;
    this.date = new Date(params.weather.date);
    this.temp = (params.unit === TemperatureUnits.Celsius ?
      params.weather.feelsLikeC : params.weather.feelsLikeF).toFixed();
    this.min = (params.unit === TemperatureUnits.Celsius ?
      params.weather.tempMinC : params.weather.tempMinF).toFixed();
    this.max = (params.unit === TemperatureUnits.Celsius ?
      params.weather.tempMaxC : params.weather.tempMaxF).toFixed();
    this.place = params.weather.cityName;
    this.icon = params.weather.icon;
    this.description = params.weather.description.toUpperCase();
    this.hummidity = params.weather.humidity.toFixed();
    this.pressure = params.weather.pressure.toFixed();
    this.windSpeed = params.weather.windSpeed.toFixed(2);
    this.windDeg = params.weather.windDeg.toFixed();
    this.rain3h = params.weather.rain3h.toFixed(2);
    this.rainChance = params.weather.rainChance.toFixed();
  }

  date: Date;
  temp: string;
  min: string;
  max: string;
  place: string;
  icon: string;
  description: string;
  hummidity: string;
  pressure: string;
  windSpeed: string;
  windDeg: string;
  rain3h: string;
  rainChance: string;

  reset() {
    this.date = new Date(Date.now());
    this.temp = '--';
    this.min = '--';
    this.max = '--';
    this.place = '--';
    this.icon = '';
    this.description = '--';
    this.hummidity = '--';
    this.pressure = '--';
    this.windSpeed = '--';
    this.windDeg = '--';
    this.rain3h = '--';
    this.rainChance = '--';
  }

  constructor() {
    this.reset();
  }

  ngOnInit() {
  }

}

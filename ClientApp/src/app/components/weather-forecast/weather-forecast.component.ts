import { Component, OnInit, Input } from '@angular/core';

import { DayWeatherForecast, TemperatureUnits } from '../../models';

export interface DayWeatherForecastComponentParams {
  unit: TemperatureUnits;
  dayWeatherForecast: DayWeatherForecast;
}
@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {

  _params:  DayWeatherForecastComponentParams;
  @Input() set params(params: DayWeatherForecastComponentParams) {
    this._params = params;
  }
  displayedColumns: string[] = [
    'time',
    'condition',
    'feelsLike',
    'precip',
    'amount',
    'humidity',
    'wind',
    'pressure'
  ];
  dataSource = [];

  constructor() { }

  ngOnInit() {
  }

  formatTemp(tempC: number, tempF: number) {
    return (this._params.unit === TemperatureUnits.Celsius ? tempC : tempF).toFixed();
  }

}

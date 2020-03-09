import { Component, OnInit, Input } from '@angular/core';

import { DayWeatherForecastComponentParams } from '../weather-forecast/weather-forecast.component';

import { FiveDayWeatherForecast, TemperatureUnits } from '../../models';

export interface FiveDayWeatherForecastComponentParams {
  unit: TemperatureUnits;
  fiveDayWeatherForecast: FiveDayWeatherForecast;
}

@Component({
  selector: 'app-five-day-weather-forecast',
  templateUrl: './five-day-weather-forecast.component.html',
  styleUrls: ['./five-day-weather-forecast.component.css']
})
export class FiveDayWeatherForecastComponent implements OnInit {

  private keys: string[] = [];
  private values: DayWeatherForecastComponentParams[] = [];
  @Input() set params(
    params: FiveDayWeatherForecastComponentParams
  ) {
    this.keys = [];
    this.values = [];
    if (!params) {
      return;
    }
    this.keys = Object.keys(params.fiveDayWeatherForecast);
    this.values = Object.values(params.fiveDayWeatherForecast)
      .map<DayWeatherForecastComponentParams>(
        v => {
          return {
            unit: params.unit,
            dayWeatherForecast: v
          };
        }
      );
  }

  constructor() { }

  ngOnInit() {
  }

}

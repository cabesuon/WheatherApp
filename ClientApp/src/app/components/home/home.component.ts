import { Component, OnInit } from '@angular/core';

import { DataService, ShareService } from '../../services';

import { CurrentWeatherComponentParams } from '../current-weather/current-weather.component';
import {
  FiveDayWeatherForecastComponentParams
} from '../five-day-weather-forecast/five-day-weather-forecast.component';

import {
  Coordinates,
  TemperatureUnits,
  fiveDayWeatherForecastKey
} from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  unit: TemperatureUnits = null;
  coords: Coordinates = null;

  fiveDayWeatherForecastParams: FiveDayWeatherForecastComponentParams;
  currentWeatherParams: CurrentWeatherComponentParams;

  constructor(
    private dataService: DataService,
    private shareService: ShareService
  ) {
    this.unit = this.shareService.getUnit();
    this.shareService.unitObservable.subscribe(unit => {
      this.unit = unit;
      this.updateParams();
    });
  }

  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser.');
      this.updateParams();
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          this.updateParams();
        },
        error => {
          console.log(error.message);
          this.updateParams();
        }
      );
    }
  }

  updateParams() {
    if (!this.unit) {
      return;
    }
    if (!this.coords) {
      this.coords = { lat: 38.8995891, lon: -77.0323285 };
    }
    this.dataService.getCurrentWeather(this.coords).subscribe(
      currentWeather => {
        this.currentWeatherParams = {
          coords: this.coords,
          unit: this.unit,
          weather: currentWeather
        };
      }
    );
    this.dataService.getWeatherForecast(this.coords).subscribe(
      weatherForecast => {
        const fiveDayWeatherForecast = {};
        let key: string;
        for (const dayWeather of weatherForecast) {
          key = fiveDayWeatherForecastKey(dayWeather.date);
          if (!fiveDayWeatherForecast.hasOwnProperty(key)) {
            fiveDayWeatherForecast[key] = [];
          }
          fiveDayWeatherForecast[key].push(dayWeather);
        }
        this.fiveDayWeatherForecastParams = {
          unit: this.unit,
          fiveDayWeatherForecast
        };
      }
    );
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public forecasts: DayWeather[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.http.get<DayWeather[]>(
            `${this.baseUrl}weatherforecast/${position.coords.longitude}/${position.coords.latitude}`
            ).subscribe(
            result => {
              this.forecasts = result;
            },
            error => console.error(error)
          );
        },
        error => console.error(error)
      );
    }
  }
}

interface DayWeather {
  date: Date;
  temperatureC: number;
  description: string;
  icon: string;
  humidityPercentage: number;
  windSpeed: number;
  precipitation: number;
}

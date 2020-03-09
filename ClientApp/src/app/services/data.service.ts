import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DayWeather, Coordinates } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  getCurrentWeather(coord: Coordinates): Observable<DayWeather> {
    return this.http.get<DayWeather>(
      `${this.baseUrl}currentweather/${coord.lon}/${coord.lat}`
      );
  }

  getWeatherForecast(coord: Coordinates): Observable<DayWeather[]> {
    return this.http.get<DayWeather[]>(
      `${this.baseUrl}weatherforecast/${coord.lon}/${coord.lat}`
      );
  }

}

import { Injectable } from '@angular/core';

import { TemperatureUnits } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  key = 'weather-app-temp-unit';

  constructor() { }

  getTempUnit(): TemperatureUnits {
    return localStorage.getItem(this.key) as unknown as TemperatureUnits;
  }

  setTempUnit(unit: TemperatureUnits) {
    localStorage.setItem(this.key, unit.toString());
  }
}

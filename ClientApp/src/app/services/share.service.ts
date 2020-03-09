import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { LocalStorageService } from '../services/local-storage.service';

import { Coordinates, TemperatureUnits } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  unit: TemperatureUnits;
  unitObservable: Subject<TemperatureUnits>;

  coords: Coordinates;
  coordsObservable: Subject<Coordinates>;

  constructor(private localStorageService: LocalStorageService) {
    this.initUnit();
  }

  // unit
  initUnit() {
    this.unitObservable = new Subject<TemperatureUnits>();
    this.unit = this.localStorageService.getTempUnit();
    if (!this.unit) {
      this.unit = TemperatureUnits.Celsius;
    }
    this.setUnit(this.unit);
  }

  getUnit(): TemperatureUnits {
    return this.unit;
  }

  setUnit(value: TemperatureUnits) {
    if (this.unit !== value) {
      this.unit = value;
      this.emitUnitObservable(this.unit);
      this.localStorageService.setTempUnit(this.unit);
    }
  }

  emitUnitObservable(value: TemperatureUnits) {
    this.unitObservable.next(value);
  }

  // coords
  initCoords() {
    this.coordsObservable = new Subject<Coordinates>();
    this.coords = { lat: 38.8995891, lon: -77.0323285 };
    this.setUnit(this.unit);
  }

  getCoords(): Coordinates {
    return this.coords;
  }

  setCoords(value: Coordinates) {
    if (this.coords.lat !== value.lat && this.coords.lon !== value.lon) {
      this.coords = value;
      this.emitCoordsObservable(this.coords);
    }
  }

  emitCoordsObservable(value: Coordinates) {
    this.coordsObservable.next(value);
  }
}

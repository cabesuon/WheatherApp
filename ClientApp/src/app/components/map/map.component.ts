import { Component, AfterViewInit, Input } from '@angular/core';

import * as L from 'leaflet';

import { Coordinates } from '../../models';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  _coords: Coordinates = { lat: 38.8995891, lon: -77.0323285 };
  @Input() set coords(coords: Coordinates) {
    if (!coords) {
      return;
    }
    this._coords = coords;
    this.updatePosition();
  }
  map: L.Map;
  marker: L.Marker;

  constructor() { }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.updatePosition();
  }

  updatePosition() {
    const latlng: L.LatLngTuple = [this._coords.lat, this._coords.lon];
    if (!this.marker) {
      this.marker = L.marker(latlng);
      this.marker.addTo(this.map);
    }
    this.map.setView(latlng, 13);
    this.marker.setLatLng(latlng);
  }

}

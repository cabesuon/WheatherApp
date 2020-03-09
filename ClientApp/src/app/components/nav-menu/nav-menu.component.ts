import { Component, OnInit } from '@angular/core';

import { ShareService } from '../../services';

import { TemperatureUnits } from '../../models';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  logo = 'assets/logo.png';
  title = 'Weather App';
  unit: TemperatureUnits = null;

  constructor(private shareService: ShareService) {}

  ngOnInit() {
    this.unit = this.shareService.getUnit();
  }

  unitChange() {
    this.shareService.setUnit(this.unit);
  }
}

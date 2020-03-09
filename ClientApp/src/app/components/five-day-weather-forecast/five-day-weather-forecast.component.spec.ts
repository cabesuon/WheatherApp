import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDayWeatherForecastComponent } from './five-day-weather-forecast.component';

describe('FiveDayWeatherForecastComponent', () => {
  let component: FiveDayWeatherForecastComponent;
  let fixture: ComponentFixture<FiveDayWeatherForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveDayWeatherForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDayWeatherForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

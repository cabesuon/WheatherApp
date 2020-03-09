# Weather App

## Short Description

Web app that shows current weather conditions and 5 days wheater forecast.

## Functional Features

* The app shows browser current location’s weather conditions including: date, location, temperature, corresponding description of weather and icon.
* If now location is provided, because browser does not supported or user don't allow, default location is then used __lat=38.8995891__, __lon=-77.0323285__.
* Besides current location’s weather conditions, the app also shows extended weather forecast for the next 5 days.
* App also shows current humidity, wind and precipitation percentage (chances of rain).
* User can decide to use Celsius or Fahrenheit, the app save the last selection in browser’s local storage for future usage.

## Non-functional Features

* The app supports Chrome 70+ and Microsoft Edge.
* It's responsive, from small screens (~320 x 570) to desktops.
* The app was developed in **TypeScript** and **C#** languages.
* On the front-end, the following libraries and frameworks were used:
  * **Angular** 8.2 (framework),
  * **Material** 8.2 (components and typography),
  * **Bootstrap** 4.3 (grid and utilities),
  * **Leaflet** 1.6 (map).
* The back-end was fully developed using **.NET Core** 3.1.

## Others

* The app uses:
  * weather information from [OpenWeatherMap API](https://openweathermap.org/api),
  * streets map from [OpenStreetMap](https://www.openstreetmap.org),
* The app logo was made by [iconixar](https://www.flaticon.com/authors/iconixar) from [Flaticon](https://www.flaticon.com/).

## Note

The precipitation percentage (chance of rain) was modeled and developed by me, using the weather information retrieved from OpenWeatherMap API. You should not take the precipitation percentage of the app as a reliable value. It is NOT returned by OpenWeatherMap API.

## Links

* [c#](https://docs.microsoft.com/en-us/dotnet/csharp/index)
* [TypeScript](https://www.typescriptlang.org)

* [dotnet.microsoft.com](https://dotnet.microsoft.com)
* [angular.io](https://angular.io)
* [material.angular.io](https://material.angular.io)
* [getbootstrap.com](https://getbootstrap.com)
* [leafletjs.com](https://leafletjs.com)

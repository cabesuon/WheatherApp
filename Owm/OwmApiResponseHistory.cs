using System;
using System.Collections.Generic;
using weather_app.models;

namespace weather_app.owm
{
    public class OwmApiResponseHistory
    {
        private Dictionary<string, OwmApiCurrentWeatherResponse> CurrentWeatherHistory =
        new Dictionary<string, OwmApiCurrentWeatherResponse>();

        private Dictionary<string, OwmApiWeatherForecastResponse> WeatherForecastHistory =
        new Dictionary<string, OwmApiWeatherForecastResponse>();

        public IDayWeather getCurrentWeatherResponse(Coordinates coord)
        {
            var key = coord.ToString();
            OwmApiCurrentWeatherResponse val = null;
            if (this.CurrentWeatherHistory.TryGetValue(key, out val))
            {
                var now = DateTime.Now;
                if (now.Subtract(val.Date).TotalMinutes <= 10) {
                    return val.Value;
                }
            }
            return null;
        }

        public List<IDayWeather> getWeatherForecastResponse(Coordinates coord)
        {
            var key = coord.ToString();
            OwmApiWeatherForecastResponse val = null;
            if (this.WeatherForecastHistory.TryGetValue(key, out val))
            {
                var now = DateTime.Now;
                if (now.Subtract(val.Date).TotalMinutes <= 10) {
                    return val.Value;
                }
            }
            return null;
        }

        public void addCurrentWeatherResponse(Coordinates coord, IDayWeather response)
        {
            var key = coord.ToString();
            this.CurrentWeatherHistory.Remove(key);
            var val = new OwmApiCurrentWeatherResponse();
            val.Date = DateTime.Now;
            val.Value = response;
            this.CurrentWeatherHistory.Add(key, val);
        }

        public void addWeatherForecastResponse(Coordinates coord, List<IDayWeather> response)
        {
            var key = coord.ToString();
            this.WeatherForecastHistory.Remove(key);
            var val = new OwmApiWeatherForecastResponse();
            val.Date = DateTime.Now;
            val.Value = response;
            this.WeatherForecastHistory.Add(key, val);
        }
    }

    internal class OwmApiCurrentWeatherResponse
    {
        public DateTime Date { get; set; }

        public IDayWeather Value { get; set; }
    }

    internal class OwmApiWeatherForecastResponse
    {
        public DateTime Date { get; set; }
        
        public List<IDayWeather> Value { get; set; }
    }
}

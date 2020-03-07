using System;

namespace weather_app.models
{
    public interface IDayWeather
    {
        DateTime Date { get; }
        
        double TemperatureC { get; }

        string Description { get; }

        string Icon { get; }

        double HumidityPercentage { get; }

        double WindSpeed { get; }

        double Precipitation { get; }
    }
}

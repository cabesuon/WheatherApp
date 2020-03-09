using System;

namespace weather_app.models
{
    public interface IDayWeather
    {
        string CityName { get; }
        
        DateTime Date { get; }
        
        string Icon { get; }

        string Description { get; }

        double FeelsLikeC { get; }

        double TempMinC { get; }

        double TempMaxC { get; }

        double FeelsLikeF { get; }

        double TempMinF { get; }

        double TempMaxF { get; }

        double Pressure { get; }

        double Humidity { get; }
        
        double WindSpeed { get; }

        double WindDeg { get; }

        double Rain3h { get; }

        double RainChance { get; }
    }
}

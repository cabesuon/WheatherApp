using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Net.Http;
using System.Net.Http.Headers;
using weather_app.models;

namespace weather_app.owm
{
    public class OwmApi
    {
        public string Key { get; set; }

        private OwmApiResponseHistory history = new OwmApiResponseHistory();
        
        public IDayWeather GetCurrentWeather(Coordinates coord)
        {
            IDayWeather currentWeather = this.history.getCurrentWeatherResponse(coord);

            if (currentWeather != null)
            {
                return currentWeather;
            }

            var baseUrl = "https://api.openweathermap.org";
            var url = "data/2.5/weather?" +
            $"lat={coord.Lat}&lon={coord.Lon}&appid={this.Key}";
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Add("User-Agent", "Anything");
                client.DefaultRequestHeaders.Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = client.GetAsync(url).Result;
                response.EnsureSuccessStatusCode();
                currentWeather= response.Content.ReadAsAsync<OwmCurrentDayWeather>().Result;
            }

            this.history.addCurrentWeatherResponse(coord, currentWeather);

            return currentWeather;
        }

        public List<IDayWeather> GetWeatherForecast(Coordinates coord)
        {
            List<IDayWeather> weatherForecast = this.history.getWeatherForecastResponse(coord);

            if (weatherForecast != null)
            {
                return weatherForecast;
            }

            var baseUrl = "https://api.openweathermap.org";
            var url = "data/2.5/forecast?" +
            $"lat={coord.Lat}&lon={coord.Lon}&appid={this.Key}";

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Add("User-Agent", "Anything");
                client.DefaultRequestHeaders.Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = client.GetAsync(url).Result;
                response.EnsureSuccessStatusCode();
                var result= response.Content.ReadAsAsync<OwmWeatherForecast>().Result;
                if (result != null)
                {
                    weatherForecast = new List<IDayWeather>();
                    foreach(var item in result.List)
                    {
                        item.CityName = result.City.Name;
                        weatherForecast.Add(item);
                    }
                }
            }

            this.history.addWeatherForecastResponse(coord, weatherForecast);

            return weatherForecast;
        }
    }

    /*
     *
     * classes used to parse OwmApi request responses
     *
     */
    
    internal class OwmUtils
    {
        public static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970,1,1,0,0,0,0,System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds( unixTimeStamp ).ToLocalTime();
            return dtDateTime;
        }
    }

    [DataContract]
    internal class OwmCity
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "coord")]
        public OwmCoordinates Coord { get; set; }

        [DataMember(Name = "lon")]
        public double Lon { get; set; }

        [DataMember(Name = "country")]
        public string Country { get; set; }

        [DataMember(Name = "timezone")]
        public int Timezone { get; set; }
    }

    [DataContract]
    internal class OwmWeatherDescription
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "main")]
        public string Main { get; set; }

        [DataMember(Name = "description")]
        public string Description { get; set; }

        [DataMember(Name = "icon")]
        public string Icon { get; set; }
    }

    [DataContract]
    public class OwmCoordinates
    {
        [DataMember(Name = "lon")]
        public float Lon { get; set; }

        [DataMember(Name = "lat")]
        public float Lat { get; set; }
    }

    [DataContract]
    internal class OwmWeatherMain
    {
        [DataMember(Name = "Temp")]
        public double Temp { get; set; }

        [DataMember(Name = "feels_like")]
        public double FeelsLike { get; set; }

        [DataMember(Name = "pressure")]
        public double Pressure { get; set; }

        [DataMember(Name = "humidity")]
        public double Humidity { get; set; }

        [DataMember(Name = "temp_min")]
        public double TempMin { get; set; }

        [DataMember(Name = "temp_max")]
        public double TempMax { get; set; }

        [DataMember(Name = "sea_level")]
        public double SeaLevel { get; set; }

        [DataMember(Name = "grnd_level")]
        public double GrndLevel { get; set; }

        [DataMember(Name = "temp_kf")]
        public double TempKf { get; set; }
    }

    [DataContract]
    internal class OwmWind
    {
        [DataMember(Name = "speed")]
        public double Speed { get; set; }

        [DataMember(Name = "deg")]
        public double Deg { get; set; }
    }

    [DataContract]
    internal class OwmClouds
    {
        [DataMember(Name = "all")]
        public int All { get; set; }
    }

    [DataContract]
    internal class OwmHour
    {
        [DataMember(Name = "1h")]
        public double Hour1 { get; set; }

        [DataMember(Name = "3h")]
        public double Hour3 { get; set; }
    }

    [DataContract]
    internal class OwmSys
    {
        [DataMember(Name = "type")]
        public int Type { get; set; }

        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "message")]
        public double Message { get; set; }

        [DataMember(Name = "country")]
        public string Country { get; set; }

        [DataMember(Name = "sunrise")]
        public double Sunrise { get; set; }

        [DataMember(Name = "sunset")]
        public double Sunset { get; set; }
    }

    [DataContract]
    internal class OwmDayWeather : IDayWeather
    {
        [DataMember(Name = "dt")]
        public double Dt { get; set; }

        [DataMember(Name = "main")]
        public OwmWeatherMain Main { get; set; }

        [DataMember(Name = "weather")]
        public List<OwmWeatherDescription> WeatherDescription { get; set; }

        [DataMember(Name = "clouds")]
        public OwmClouds Clouds { get; set; }

        [DataMember(Name = "wind")]
        public OwmWind Wind { get; set; }

        [DataMember(Name = "rain")]
        public OwmHour Rain { get; set; }

        [DataMember(Name = "snow")]
        public OwmHour Snow { get; set; }

        // IDayWeather

        public string CityName { get; set; }

        public DateTime Date { get { return OwmUtils.UnixTimeStampToDateTime(this.Dt); } }

        public string Icon {
            get {
                return
                $"https://openweathermap.org/img/wn/{this.WeatherDescription[0].Icon}.png";
            }
        }
        
        public string Description { get { return this.WeatherDescription[0].Description; } }

        public double FeelsLikeC { get { return this.Main.FeelsLike - 273.15; } }

        public double TempMinC { get { return this.Main.TempMin - 273.15; } }

        public double TempMaxC { get { return this.Main.TempMax - 273.15; } }

        public double FeelsLikeF { get { return this.FeelsLikeC * 1.8 + 32.00; } }

        public double TempMinF { get { return this.TempMinC * 1.8 + 32.00; } }

        public double TempMaxF { get { return this.TempMaxC * 1.8 + 32.00; } }

        public double Pressure { get { return this.Main.Pressure; } }

        public double Humidity { get { return this.Main.Humidity; } }

        public double WindSpeed { get { return this.Wind.Speed; } }

        public double WindDeg { get { return this.Wind.Deg; } }

        public double Rain3h { get { return this.Rain != null ? this.Rain.Hour3 : 0; } }

        public double RainChance {
            get {
                int humidityFactor = 0;
                if (this.Main.Humidity > 90) {
                    humidityFactor = 20;
                } else if (this.Main.Humidity > 80) {
                    humidityFactor = 15;
                } else if (this.Main.Humidity > 70) {
                    humidityFactor = 10;
                } else if (this.Main.Humidity > 60) {
                    humidityFactor = 5;
                };
                switch(this.WeatherDescription[0].Id) {
                    case 500:
                    case 520:
                        return 20 + humidityFactor;
                    case 501:
                    case 521:
                        return 60 + humidityFactor;
                    case 502:
                    case 522:
                        return 80 + humidityFactor;
                    case 503:
                    case 523:
                        return 100 + humidityFactor;
                }
                return 0;
            }
        }

    }

    [DataContract]
    internal class OwmCurrentDayWeather : OwmDayWeather
    {
        [DataMember(Name = "coord")]
        public OwmCoordinates Coord { get; set; }

        [DataMember(Name = "base")]
        public string Base { get; set; }

        [DataMember(Name = "sys")]
        public OwmSys Sys { get; set; }

        [DataMember(Name = "id")]
        public int Id { get; set; }

        private string _name;
        [DataMember(Name = "name")]
        public string Name {
            get {
                return this._name;
            }
            set {
                this._name = value;
                this.CityName = value;
            }
        }

        [DataMember(Name = "cod")]
        public int Cod { get; set; }
    }

    [DataContract]
    internal class OwmForecastDayWeather : OwmDayWeather
    {
        [DataMember(Name = "dt_txt")]
        public string DtTxt { get; set; }
    }

    [DataContract]
    internal class OwmWeatherForecast
    {
        [DataMember(Name = "cod")]
        public int Cod { get; set; }

        [DataMember(Name = "message")]
        public int Message { get; set; }

        [DataMember(Name = "city")]
        public OwmCity City { get; set; }

        [DataMember(Name = "cnt")]
        public int Cnt { get; set; }

        [DataMember(Name = "list")]
        public List<OwmForecastDayWeather> List { get; set; }
    }

}

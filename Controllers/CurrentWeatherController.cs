using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using weather_app.models;
using weather_app.owm;

namespace weather_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CurrentWeatherController : ControllerBase
    {
        private readonly ILogger<CurrentWeatherController> _logger;

        private readonly OwmApi _owmApi;

        public CurrentWeatherController(ILogger<CurrentWeatherController> logger)
        {
            _logger = logger;
            _owmApi = new OwmApi();
            _owmApi.Key = "66851d19a56b61bb30229d65ce0c091e";
        }

        [HttpGet("{lon}/{lat}")]
        public IDayWeather Get(double lon, double lat, int cnt)
        {
            var coord = new Coordinates();
            coord.Lon = lon;
            coord.Lat = lat;
            return this._owmApi.GetCurrentWeather(coord);
        }
    }
}

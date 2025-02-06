export const Coordinates = {
  lat: 0,
  lon: 0,
};

export const GeocodingResponse = {
  name: "",
  local_names: {},
  lat: 0,
  lon: 0,
  country: "",
  state: "",
};

export const WeatherCondition = {
  id: 0,
  main: "",
  description: "",
  icon: "",
};

export const WeatherData = {
  coord: { ...Coordinates },
  weather: [{ ...WeatherCondition }],
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
  },
  wind: {
    speed: 0,
    deg: 0,
  },
  sys: {
    sunrise: 0,
    sunset: 0,
    country: "",
  },
  name: "",
  dt: 0,
};

export const ForecastData = {
  list: [
    {
      dt: 0,
      main: { ...WeatherData.main },
      weather: [{ ...WeatherData.weather[0] }],
      wind: { ...WeatherData.wind },
      dt_txt: "",
    },
  ],
  city: {
    name: "",
    country: "",
    sunrise: 0,
    sunset: 0,
  },
};

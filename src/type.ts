export type Position = {
    long: number,
    lat: number
}

export type UnitSystem= "metric"|"imperial"

export type WeatherDataCurrent= {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  precipitation: number;
  time: Date;

}

export type WeatherData= {
  time: Date[];
  temperature_2m: Float32Array;
  weather_code_hourly: Float32Array;
  current: WeatherDataCurrent;
  daily: {
    time: Date[];
    weather_code: Float32Array;
    temperature_2m_max: Float32Array;
    temperature_2m_min: Float32Array;
  };
}
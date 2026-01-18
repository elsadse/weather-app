export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "inch";

export type Units= {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
}

export type GeocodingData = {
  city: string;
  country: string;
}

export type DailyForecastItem ={
  day: string;
  temp: number;
  high: number;
  low: number;
  icon: string;
}


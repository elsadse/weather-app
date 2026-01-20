import { z } from "zod"

export const LocationApiResponseSchema = z.object({
    id: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    name: z.string(),
    admin1: z.string().optional(),
    country: z.string()
}).describe("Schema for a single location response from the API")

export const LocationsApiResponseSchema = z.array(LocationApiResponseSchema).describe("Schema for locations response from the API")

export const MatchedLocationSchema = LocationApiResponseSchema.transform((item) => ({
    id: item.id,
    city: item.name,
    region: item.admin1 ?? "",
    country: item.country,
    latitude: item.latitude,
    longitude: item.longitude,
})).describe("Schema for matched locations returned by the API")

export type MatchedLocation = z.infer<typeof MatchedLocationSchema>

export const CurrentWeatherDataApiResponseSchema = z.object({
    time: z.string(),
    temperature_2m: z.number(),
    relative_humidity_2m: z.number(),
    apparent_temperature: z.number(),
    precipitation: z.number(),
    weather_code: z.number(),
    wind_speed_10m: z.number(),
}).describe("Schema for current weather data response from the API")

export const CurrentWeatherDataSchema = CurrentWeatherDataApiResponseSchema.transform((item) => ({
    date: new Date(item.time),
    codeIcon: item.weather_code,
    temperature: item.temperature_2m,
    feels_like: item.apparent_temperature,
    humidity: item.relative_humidity_2m,
    wind_speed: item.wind_speed_10m,
    precipitation: item.precipitation,
}))

export const HourlyWeatherDataApiResponseSchema = z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number()),
    weather_code: z.array(z.number()),
}).describe("Schema for hourly weather data response from the API")

export const HourlyWeatherDataSchema = HourlyWeatherDataApiResponseSchema.transform((item) => {
    const { time, temperature_2m, weather_code } = item
    const result = []
    for (const [index, timeValue] of time.entries()) {
        result.push({
            datetime: new Date(timeValue),
            temperature: temperature_2m[index],
            codeIcon: weather_code[index],
        })
    }
    return result
})

export const DailyWeatherDataApiResponseSchema = z.object({
    time: z.array(z.string()),
    weather_code: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    temperature_2m_max: z.array(z.number()),
}).describe("Schema for daily weather data response from the API")

export const DailyWeatherDataSchema = DailyWeatherDataApiResponseSchema.transform(data => {
    const { time, weather_code, temperature_2m_min, temperature_2m_max } = data
    const result = []
    for (const [index, timeValue] of time.entries()) {
        result.push({
            date: new Date(timeValue),
            codeIcon: weather_code[index],
            min_temperature: temperature_2m_min[index],
            max_temperature: temperature_2m_max[index],
        })
    }
    return result
})

export const WeatherDataApiResponseSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    current: CurrentWeatherDataApiResponseSchema,
    hourly: HourlyWeatherDataApiResponseSchema,
    daily: DailyWeatherDataApiResponseSchema,
}).describe("Schema for weather data response from the API")

export const WeatherDataSchema = WeatherDataApiResponseSchema.transform((item) => ({
    latitude: item.latitude,
    longitude: item.longitude,
    weatherInformation: CurrentWeatherDataSchema.parse(item.current),
    dailyForecast: DailyWeatherDataSchema.parse(item.daily),
    hourlyForecast: HourlyWeatherDataSchema.parse(item.hourly),
}))

export type WeatherData = z.infer<typeof WeatherDataSchema>

export type CurrentWeatherData = z.infer<typeof CurrentWeatherDataSchema>

export type DailyWeatherData = z.infer<typeof DailyWeatherDataSchema>

export type HourlyWeatherData = z.infer<typeof HourlyWeatherDataSchema>

export type Result<T> = { success: true, data: T } | { success: false, error: Error }

export type Location = { latitude: number, longitude: number }

export const LocationInfoApiResponseSchema = z.object({
    city: z.string(),
    countryName: z.string()
}).describe("Schema for a single city response from the API")

export type LocationInfo = z.infer<typeof LocationInfoApiResponseSchema>



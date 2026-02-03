import { z } from "zod"

const GeoLocationApiResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    admin1: z.string().optional(),
    country: z.string().optional(),
})
export type GeoLocationApiResponse = z.infer<typeof GeoLocationApiResponseSchema>

export const GeoLocationsApiResponseSchema = z.array(GeoLocationApiResponseSchema)

export const GeoLocationSchema = GeoLocationApiResponseSchema.transform((item: z.infer<typeof GeoLocationApiResponseSchema>) => ({
    id: item.id,
    city: item.name,
    region: item.admin1 ?? "",
    country: item.country,
    latitude: item.latitude,
    longitude: item.longitude,
}))
export type GeoLocation = z.infer<typeof GeoLocationSchema>

export const ReverseGeocodingApiResponseSchema = z.object({
    city: z.string(),
    countryName: z.string(),
})


export const WeatherDataApiResponseSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    timezone: z.string(),
    current: z.object({
        time: z.string(),
        weather_code: z.number(),
        temperature_2m: z.number(),
        apparent_temperature: z.number(),
        relative_humidity_2m: z.number(),
        wind_speed_10m: z.number(),
        precipitation: z.number(),
    }),
    hourly: z.object({
        time: z.array(z.string()),
        temperature_2m: z.array(z.number()),
        weather_code: z.array(z.number()),
    }),
    daily: z.object({
        time: z.array(z.string()),
        weather_code: z.array(z.number()),
        temperature_2m_max: z.array(z.number()),
        temperature_2m_min: z.array(z.number()),
    })
})

export const WeatherDataSchema = WeatherDataApiResponseSchema.transform((data) => {
    const { daily, hourly } = data

    const dailyForecast = []
    for (const [index, time] of daily.time.entries()) {
        dailyForecast.push({
            date: new Date(time),
            weather_code: daily.weather_code[index],
            temperature_max: daily.temperature_2m_max[index],
            temperature_min: daily.temperature_2m_min[index],
        })
    }

    const hourlyForecast = []
    for (const [index, time] of hourly.time.entries()) {
        hourlyForecast.push({
            datetime: new Date(time),
            weather_code: hourly.weather_code[index],
            temperature: hourly.temperature_2m[index],
        })
    }

    return {
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        infos: {
            current: {
                date: new Date(data.current.time),
                weather_code: data.current.weather_code,
                temperature: data.current.temperature_2m,
                feel_like: data.current.apparent_temperature,
                humidity: data.current.relative_humidity_2m,
                wind_speed: data.current.wind_speed_10m,
                precipitation: data.current.precipitation
            },
            forecast: {
                daily: dailyForecast,
                hourly: hourlyForecast
            }
        }
    }
})

export type WeatherData = z.infer<typeof WeatherDataSchema>


import type { Result } from "@/types"
import { type WeatherData, WeatherDataApiResponseSchema, WeatherDataSchema } from "@/api/types"

export async function fetchWeatherData({ latitude, longitude }: {
    latitude: number,
    longitude: number
}, signal: AbortSignal): Promise<Result<WeatherData>> {
    const params = new URLSearchParams({
        latitude: `${latitude}`,
        longitude: `${longitude}`,
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        hourly: "temperature_2m,weather_code",
        current: "weather_code,temperature_2m,relative_humidity_2m,precipitation,apparent_temperature,wind_speed_10m",
        timezone: "auto"
    })
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal })
    if (response.status !== 200) {
        return { success: false, error: new Error("Failed to fetch weather data.") }
    }

    const parsedWeatherDataApiResponse = WeatherDataApiResponseSchema.safeParse(await response.json())
    if (!parsedWeatherDataApiResponse.success) {
        return { success: false, error: new Error("Failed to parse weather data response.") }
    }

    const parsedWeatherData = WeatherDataSchema.safeParse(parsedWeatherDataApiResponse.data)
    if (!parsedWeatherData.success) {
        return { success: false, error: new Error("Failed to transform weather data response.") }
    }

    return { success: true, data: parsedWeatherData.data }
}
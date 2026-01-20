import { type Result, type WeatherData, WeatherDataApiResponseSchema, WeatherDataSchema } from "@/api/types"

export async function getWeatherData({ latitude, longitude }: { latitude: number, longitude: number }): Promise<Result<WeatherData>> {
    const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        hourly: "temperature_2m,weather_code",
        current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",
        timezone: "auto"
    })
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
    if (response.status !== 200) {
        return { success: false, error: new Error("Failed to get weather data.") }
    }
    const parsedWeatherDataApiResponse = WeatherDataApiResponseSchema.safeParse(await response.json())
    if (!parsedWeatherDataApiResponse.success) {
        return { success: false, error: parsedWeatherDataApiResponse.error }
    }
    const parsedWeatherData = WeatherDataSchema.safeParse(parsedWeatherDataApiResponse.data)
    if (!parsedWeatherData.success) {
        return { success: false, error: parsedWeatherData.error }
    }
    return { success: true, data: parsedWeatherData.data }
}


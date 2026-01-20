import { WeatherDataSchema, type WeatherData } from "@/api/type"

export async function getWeatherData({ latitude, longitude }: { latitude: number, longitude: number }): Promise<{ weatherData?: WeatherData, error?: string }> {
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
        return { error: "Failed to get weather data." }
    }
    const responseData = await response.json()
    const formattedResponseData: WeatherData = {
        latitude: responseData.latitude,
        longitude: responseData.longitude,
        currentWeatherData: {
            day: responseData.current.time,
            temperature: responseData.current.temperature_2m,
            humidity: responseData.current.relative_humidity_2m,
            temperatureFeel: responseData.current.apparent_temperature,
            precipitation: responseData.current.precipitation,
            iconCode: responseData.current.weather_code,
            wind: responseData.current.wind_speed_10m
        },
        hourlyWeatherData: {
            hours: responseData.hourly.time,
            temperatures: responseData.hourly.temperature_2m,
            iconCodes: responseData.hourly.weather_code
        },
        dailyWeatherData: {
            days: responseData.daily.time,
            temperaturesMax: responseData.daily.temperature_2m_max,
            temperaturesMin: responseData.daily.temperature_2m_min,
            iconCodes: responseData.daily.weather_code
        }
    }
    if (!formattedResponseData) {
        return { error: "No weather results found." }
    }
    const parseFormattedResponseData = WeatherDataSchema.safeParse(formattedResponseData)
    if (!parseFormattedResponseData.success) {
        return { error: parseFormattedResponseData.error.message }
    }
    return { weatherData: formattedResponseData }
}
console.log(await getWeatherData({ latitude: 52.52, longitude: 13.41 }))
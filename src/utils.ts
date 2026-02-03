import iconWeatherDrizzle from "@/assets/images/icon-drizzle.webp"
import iconWeatherFrog from "@/assets/images/icon-fog.webp"
import iconWeatherOvercast from "@/assets/images/icon-overcast.webp"
import iconWeatherRain from "@/assets/images/icon-rain.webp"
import iconWeatherSnow from "@/assets/images/icon-snow.webp"
import iconWeatherStorm from "@/assets/images/icon-storm.webp"
import iconWeatherSunny from "@/assets/images/icon-sunny.webp"
import iconWeatherPartlyCloudy from "@/assets/images/icon-partly-cloudy.webp"
import type { Coordinates, MeasureType, Nullable, UnitFor, Units, UnitSystem } from "@/types"
import type { WeatherData } from "@/api/types"

export const icons = {
    drizzle: iconWeatherDrizzle,
    frog: iconWeatherFrog,
    overcast: iconWeatherOvercast,
    rain: iconWeatherRain,
    snow: iconWeatherSnow,
    storm: iconWeatherStorm,
    sunny: iconWeatherSunny,
    partly_cloudy: iconWeatherPartlyCloudy
}

export function getIcon(code: number): string {
    if (code === 0) return icons.sunny
    if (code >= 95) return icons.storm
    if (code === 77) return icons.snow
    if (code >= 1 && code <= 3) return icons.partly_cloudy
    if (code >= 81 && code <= 83) return icons.rain
    if (code === 45 || code === 48) return icons.frog
    if (code === 56 || code === 57) return icons.drizzle
    if (code === 66 || code === 67) return icons.rain
    if (code === 85 || code === 86) return icons.snow
    if (code === 51 || code === 53 || code === 55) return icons.drizzle
    if (code === 61 || code === 63 || code === 65) return icons.rain
    if (code === 71 || code === 73 || code === 75) return icons.snow
    return icons.overcast
}

export function getUnitSystem(units: Units, defaultUnitSystem: UnitSystem): UnitSystem {
    if (units.temperature === "celsius" && units.windspeed === "km/h" && units.precipitation === "mm") {
        return "metric"
    }
    if (units.temperature === "fahrenheit" && units.windspeed === "mph" && units.precipitation === "in") {
        return "imperial"
    }
    return defaultUnitSystem
}

export function getUnitsFor(unitSystem: UnitSystem): Units {
    return unitSystem === "metric"
        ? { temperature: "celsius", windspeed: "km/h", precipitation: "mm" }
        : { temperature: "fahrenheit", windspeed: "mph", precipitation: "in" }
}

export function convertMeasure<T extends MeasureType>(from: UnitFor<T>, value: number, to: UnitFor<T>): number {
    if (from === to) return value

    // Temperature conversions
    if (from === "celsius" && to === "fahrenheit") {
        return (value * 9 / 5) + 32
    }
    if (from === "fahrenheit" && to === "celsius") {
        return (value - 32) * 5 / 9
    }

    // Windspeed conversions
    if (from === "km/h" && to === "mph") {
        return value * 0.621371
    }
    if (from === "mph" && to === "km/h") {
        return value * 1.60934
    }

    // Precipitation conversions
    if (from === "mm" && to === "in") {
        return value * 0.0393701
    }
    if (from === "in" && to === "mm") {
        return value * 25.4
    }

    return value
}

export function convertWeatherData({ from, data, to }: { from: Units, data: Nullable<WeatherData>, to: Units }): Nullable<WeatherData> {
    if (data === null) {
        return null
    }

    return {
        ...data,
        infos: {
            current: {
                date: data.infos.current.date,
                weather_code: data.infos.current.weather_code,
                temperature: convertMeasure(from.temperature, data.infos.current.temperature, to.temperature),
                feel_like: convertMeasure(from.temperature, data.infos.current.feel_like, to.temperature),
                humidity: data.infos.current.humidity,
                wind_speed: convertMeasure(from.windspeed, data.infos.current.wind_speed, to.windspeed),
                precipitation: convertMeasure(from.precipitation, data.infos.current.precipitation, to.precipitation),
            },
            forecast: {
                daily: data.infos.forecast.daily.map((forecast) => ({
                    date: forecast.date,
                    weather_code: forecast.weather_code,
                    temperature_min: convertMeasure(from.temperature, forecast.temperature_min, to.temperature),
                    temperature_max: convertMeasure(from.temperature, forecast.temperature_max, to.temperature),
                })),
                hourly: data.infos.forecast.hourly.map((forecast) => ({
                    datetime: forecast.datetime,
                    weather_code: forecast.weather_code,
                    temperature: convertMeasure(from.temperature, forecast.temperature, to.temperature),
                })),
            }
        },
    }
}

export function getNavigatorLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Not Supported"))
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
            (error) => reject(error),
        );
    });
}


import type { Location } from "@/api/types"
import iconWeatherDrizzle from "@/assets/images/icon-drizzle.webp"
import iconWeatherFrog from "@/assets/images/icon-fog.webp"
import iconWeatherOvercast from "@/assets/images/icon-overcast.webp"
import iconWeatherRain from "@/assets/images/icon-rain.webp"
import iconWeatherSnow from "@/assets/images/icon-snow.webp"
import iconWeatherStorm from "@/assets/images/icon-storm.webp"
import iconWeatherSunny from "@/assets/images/icon-sunny.webp"
import iconWeatherPartlyCloudy from "@/assets/images/icon-partly-cloudy.webp"

export async function getUserPosition(): Promise<Location> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by this browser."))
            return
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            (error) => {
                let message = "Error retrieving position."
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = "The user has declined geolocation."
                        break
                    case error.POSITION_UNAVAILABLE:
                        message = "Location information unavailable."
                        break
                    case error.TIMEOUT:
                        message = "The request has expired."
                        break
                }
                reject(new Error(message))
            },
        )
    })
}

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


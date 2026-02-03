import { type JSX } from "react"
import { useGlobalStore } from "@/hooks/useGlobalStore"
import { useShallow } from "zustand/react/shallow"
import type { WeatherData } from "@/api/types"
import { getIcon } from "@/utils"
import LoadingIcon from "@/assets/images/icon-loading.svg"

type WeatherDataDailyForecast = WeatherData["infos"]["forecast"]["daily"][number]

export function DailyForecastContainer(): JSX.Element {
    const { weatherData, isLoading } = useGlobalStore(
        useShallow((store) => ({
            weatherData: store.fetchedData,
            isLoading: store.isLoading
        }))
    )

    if (weatherData === null) return <div></div>

    const forecasts: WeatherDataDailyForecast[] = weatherData.infos.forecast.daily

    return (
        <section className="flex flex-col gap-y-5">
            <p className="text-preset-5">Daily Forecast</p>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
                {
                    isLoading
                        ? Array.from({ length: 7 }, (_, index) => <WeatherCardLoading key={index} />)
                        : forecasts.map((forecast, index) => (
                            <WeatherCard key={index} forecast={forecast} />
                        ))
                }
            </div>
        </section>
    )
}

function WeatherCard({ forecast }: { forecast: WeatherDataDailyForecast }): JSX.Element {
    const day = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(forecast.date)

    return (
        <div
            className="h-41.25 flex flex-col gap-y-4 px-2.5 py-4 rounded-12 bg-neutral-800 border border-neutral-600 items-center">
            <p className="text-preset-6">{day}</p>
            <img src={getIcon(forecast.weather_code)} alt="Sunny Icon" className="w-15 h-15" />
            <div className="w-full flex flex-row justify-between">
                <p className="text-preset-7">{Math.floor(forecast.temperature_min)}°</p>
                <p className="text-preset-7">{Math.floor(forecast.temperature_max)}°</p>
            </div>
        </div>
    )
}

function WeatherCardLoading(): JSX.Element {

    return (
        <div
            className="h-41.25 flex flex-col gap-y-4 px-2.5 py-4 rounded-12 bg-neutral-800 border border-neutral-600 justify-center items-center">
            <img src={LoadingIcon} alt="Loading Icon" className="w-10 h-10 spin-slow" />
        </div>
    )
}
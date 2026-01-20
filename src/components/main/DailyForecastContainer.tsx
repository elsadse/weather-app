import type { DailyWeatherData } from "@/api/types"
import { getIcon } from "@/utils"

export function DailyForecastContainer({ dailyForecastData }: { dailyForecastData: DailyWeatherData }) {

    return (
        <div className="flex flex-col gap-y-5">
            <span className="text-preset-5">Daily forecast</span>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
                {dailyForecastData.map((item, index) => (
                    <WeatherCard key={index} day={item.date.toLocaleDateString("en-US", { weekday: 'short' })} temperatureMin={Math.round(item.min_temperature)} temperatureMax={Math.round(item.max_temperature)} code={item.codeIcon} />
                ))}
            </div>
        </div>
    )
}

function WeatherCard({ day, temperatureMin, temperatureMax, code }: { day: string, temperatureMin: number, temperatureMax: number, code: number }) {

    return (
        <div className="h-41.25 flex flex-col gap-y-4 px-2.5 py-4 rounded-12 bg-neutral-800 border border-neutral-600 items-center">
            <span className="text-preset-6">{day}</span>
            <img className="h-15 w-15" src={getIcon(code)} alt="weather icon" />
            <div className="flex justify-between w-full">
                <span className="text-preset-7">{temperatureMin + "°"}</span>
                <span className="text-preset-7">{temperatureMax + "°"}</span>
            </div>
        </div>
    )
}
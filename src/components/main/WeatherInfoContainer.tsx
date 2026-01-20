import type { CurrentWeatherData, LocationInfo } from "@/api/types"
import { getIcon } from "@/utils"

export function WeatherInfoContainer({ infoWeatherData, locationInfo }: { infoWeatherData: CurrentWeatherData, locationInfo: LocationInfo }) {

    return (
        <div className="flex flex-col gap-y-5 xl:gap-y-8">
            <WeatherInfo date={infoWeatherData.date} temperature={infoWeatherData.temperature} code={infoWeatherData.codeIcon} locationInfo={locationInfo} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-x-5 xl:gap-x-6">
                <WeatherDetail label="Feels Like" value={infoWeatherData.feels_like} measure="°" />
                <WeatherDetail label="Humidity" value={infoWeatherData.humidity} measure="%" />
                <WeatherDetail label="Wind" value={infoWeatherData.wind_speed} measure=" mph" />
                <WeatherDetail label="Precipitation" value={infoWeatherData.precipitation} measure=" in" />
            </div>
        </div>
    )
}

type WeatherInfoProps = {
    date: Date,
    temperature: number,
    code: number,
    locationInfo: LocationInfo
}

function WeatherInfo({ date, temperature, code, locationInfo }: WeatherInfoProps) {

    return (
        <div className="flex flex-col justify-between items-center md:flex-row gap-y-4 md:gap-0 px-6 py-10 rounded-20 bg-today-small md:bg-today-large h-71.5">
            <div className=" flex flex-col gap-y-3">
                <span className="text-preset-4">{locationInfo.city + ", " + locationInfo.countryName}</span>
                <span className="text-preset-6">{date.toLocaleDateString("en-Us", { weekday: "long", year: "numeric", month: "short", day: "numeric", })}</span>
            </div>
            <div className="flex flex-row gap-x-5 items-center">
                <img src={getIcon(code)} alt="weather icon" className="h-30 w-30" />
                <span className="text-preset-1">{Math.round(temperature) + "°"}</span>
            </div>
        </div>
    )

}

type DetailContainerProps = {
    label: string,
    value: number,
    measure: string,
}

function WeatherDetail({ label, value, measure }: DetailContainerProps) {

    return (
        <div className="h-29.5 flex flex-col gap-y-6 p-5 rounded-12 bg-neutral-800 border-neutral-600 border">
            <span className="text-preset-6">{label}</span>
            <span className="text-preset-3">{value.toString()}{measure}</span>
        </div>
    )
}
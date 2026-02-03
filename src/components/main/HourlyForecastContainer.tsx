import { type JSX, useRef, useState } from "react"
import DropdownIcon from "@/assets/images/icon-dropdown.svg"
import { useCloseDropdown } from "@/hooks/useCloseDropdown"
import { useGlobalStore } from "@/hooks/useGlobalStore"
import { useShallow } from "zustand/react/shallow"
import type { WeatherData } from "@/api/types"
import type { Nullable } from "@/types"
import { getIcon } from "@/utils"
import LoadingIcon from "@/assets/images/icon-loading.svg"

type WeatherDataHourlyForecast = WeatherData["infos"]["forecast"]["hourly"][number]
const weekdayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long" })
const hourFormatter = new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: true })

export function HourlyForecastContainer(): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const { weatherData, isLoading } = useGlobalStore(
        useShallow((store) => ({
            weatherData: store.fetchedData,
            isLoading: store.isLoading
        }))
    )
    const [selectedDateOverride, setSelectedDateOverride] = useState<Nullable<Date>>(null)
    const selectedDate = selectedDateOverride ?? weatherData?.infos.current.date ?? null

    useCloseDropdown(ref, (): void => setIsDropdownOpen(false))

    if (isLoading) return <HourlyForecastContainerLoading />
    if (weatherData === null || selectedDate === null) return <div></div>

    const forecasts: WeatherDataHourlyForecast[] = weatherData.infos.forecast.hourly
    const uniqueDates = [
        ...new Set(
            forecasts.map(
                (forecast: WeatherDataHourlyForecast): string => forecast.datetime.toISOString().slice(0, 10)
            )
        )
    ].map((value: string): Date => new Date(value))

    function setSelectedDate(date: Date): void {
        setSelectedDateOverride(date)
        setIsDropdownOpen(false)
    }

    return (
        <div
            className="h-full xl:max-h-173.25 overflow-y-auto flex flex-col gap-y-4 px-4 md:px-6 py-5 md:py-6 rounded-20 bg-neutral-800">
            <div className="relative" ref={ref}>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-preset-5">Hourly Forecast</p>
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex flex-row gap-x-3 px-4 py-2 rounded-8 bg-neutral-600 cursor-pointer items-center border-focus-neutral"
                    >
                        <p className="text-preset-7 ">{weekdayFormatter.format(selectedDate)}</p>
                        <img src={DropdownIcon} alt="Dropdown icon"
                            className={`w-3 h-4.5 transform ${isDropdownOpen ? '-rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`} />
                    </button>
                </div>
                {isDropdownOpen &&
                    <DaysDropdown selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                        dates={uniqueDates.slice(1, 8)} />}
            </div>
            {
                forecasts
                    .filter((forecast: WeatherDataHourlyForecast) => (
                        forecast.datetime.getDate() === selectedDate.getDate()
                        && forecast.datetime >= weatherData.infos.current.date
                    ))
                    .map((forecast: WeatherDataHourlyForecast, index: number) => {
                        return <HourlyWeatherCard key={index} data={forecast} />
                    })
            }
        </div>
    )
}

function HourlyWeatherCard({ data }: { data: WeatherDataHourlyForecast }): JSX.Element {
    const { datetime, weather_code, temperature } = data

    return (
        <div
            className="h-15 flex flex-row gap-x-2 pl-3 pr-4 py-2.5 rounded-8 bg-neutral-700 border border-neutral-600 items-center justify-between">
            <img src={getIcon(weather_code)} alt="Sunny Icon" className="w-10 h-10" />
            <p className="w-full text-preset-5">{hourFormatter.format(datetime)}</p>
            <p className="text-preset-7">{Math.floor(temperature)}°</p>
        </div>
    )
}

function DaysDropdown({ selectedDate, setSelectedDate, dates }: {
    selectedDate: Date,
    setSelectedDate: (Date: Date) => void,
    dates: Date[]
}): JSX.Element {
    const selectedDay = weekdayFormatter.format(selectedDate)

    return (
        <div
            className="w-53.5 flex flex-col gap-y-1 p-2 rounded-12 bg-neutral-800 border border-neutral-600 absolute right-0 top-12"
        >
            {
                dates.map((date: Date, index: number) => {
                    const day = weekdayFormatter.format(date)

                    return (
                        <div key={index} onClick={() => setSelectedDate(date)}
                            className={`h-10 px-2 py-2.5 flex flex-row items-center justify-between ${day === selectedDay
                                    ? "rounded-8 bg-neutral-700 cursor-pointer"
                                    : "hover:rounded-8 hover:bg-neutral-700"
                                }`}>
                            <p>{day}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

function HourlyForecastContainerLoading(): JSX.Element {

    return (
        <div
            className="h-full xl:max-h-173.25 flex flex-col gap-y-4 px-4 md:px-6 py-5 md:py-6 rounded-20 bg-neutral-800">
            <div className="flex flex-row items-center justify-between">
                <p className="text-preset-5">Hourly Forecast</p>
            </div>
            <div className="h-full flex justify-center items-center">
                <img src={LoadingIcon} alt="Loading Icon" className="w-10 h-10 spin-slow" />
            </div>
        </div>
    )
}
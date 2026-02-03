import { type JSX, useEffect, useState } from "react"
import type { Coordinates, MeasureType, Nullable, Result } from "@/types"
import { useGlobalStore } from "@/hooks/useGlobalStore"
import { getIcon } from "@/utils"
import { useShallow } from "zustand/react/shallow"
import { fetchLocation } from "@/api/geocodingapi"
import LoadingIcon from "@/assets/images/icon-loading.svg"

export function WeatherInfoContainer(): JSX.Element {
    const { weatherData, isLoading } = useGlobalStore(
        useShallow((store) => ({
            weatherData: store.fetchedData,
            isLoading: store.isLoading
        }))
    )

    if (isLoading) return <WeatherInfoContainerLoading />
    if (weatherData === null) return <div></div>

    const { latitude, longitude } = weatherData
    const { date, weather_code, temperature, feel_like, humidity, wind_speed, precipitation } = weatherData.infos.current

    return (
        <section className="flex flex-col gap-y-5 xl:gap-y-8">
            <WeatherInfo coordinates={{ latitude, longitude }} date={date} temperature={temperature} icon={getIcon(weather_code)} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-x-5 xl:gap-x-6">
                <WeatherDetail measureType="temperature" label="Feels Like" value={feel_like} />
                <WeatherDetail measureType={null} label="Humidity" value={humidity} />
                <WeatherDetail measureType="windspeed" label="Wind" value={wind_speed} />
                <WeatherDetail measureType="precipitation" label="Precipitation" value={precipitation} />
            </div>
        </section>
    )
}

function WeatherInfoContainerLoading(): JSX.Element {

    return (
        <section className="flex flex-col gap-y-5 xl:gap-y-8">
            <div className="flex flex-col gap-y-4 px-6 py-10 rounded-20 bg-today-small md:bg-today-large h-71.5 justify-center items-center">
                <img src={LoadingIcon} alt="Loading Icon" className="w-10 h-10 spin-slow" />
                <p className="text-preset-6">Loading...</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-x-5 xl:gap-x-6">
                <WeatherDetailLoading />
                <WeatherDetailLoading />
                <WeatherDetailLoading />
                <WeatherDetailLoading />
            </div>
        </section>
    )
}

function WeatherInfo({ coordinates, date, temperature, icon }: {
    coordinates: Coordinates,
    date: Date,
    temperature: number,
    icon: string
}): JSX.Element {
    const [location, setLocation] = useState<string>("")
    const [, setIsLoading] = useState<boolean>(false)
    const [, setError] = useState<Nullable<Error>>(null)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        function fetchData() {
            setIsLoading(true)
            fetchLocation(coordinates, signal)
                .then((result: Result<string>): void => {
                    if (!signal.aborted) {
                        if (result.success) setLocation(result.data)
                        else setError(result.error)
                    }
                })
                .catch((error) => {
                    if (!signal.aborted) setError(error)
                })
                .finally(() => {
                    if (!signal.aborted) setIsLoading(false)
                })
        }

        fetchData()

        return () => {
            abortController.abort()
        }
    }, [coordinates])

    return (
        <div className="flex flex-col md:flex-row gap-y-4 md:gap-0 px-6 py-10 rounded-20 bg-today-small md:bg-today-large h-71.5 md:justify-between items-center">
            <div className="flex flex-col gap-y-3 ">
                <p className="text-preset-4 max-md:text-center">{location}</p>
                <p className="text-preset-6 max-md:text-center">{date.toDateString()}</p>
            </div>
            <div className="flex flex-row gap-x-5 items-center">
                <img src={icon} alt="Sunny Icon" className="w-30 h-30" />
                <p className="text-preset-1">{Math.floor(temperature)}°</p>
            </div>
        </div>
    )
}

function WeatherDetail({ measureType, label, value }: { measureType: Nullable<MeasureType>, label: string, value: number }): JSX.Element {
    const units = useGlobalStore((store) => store.units)

    let unitLabel: string
    switch (measureType) {
        case "temperature":
            unitLabel = units.temperature == "celsius" ? "°C" : "°F"
            break
        case "windspeed":
            unitLabel = units.windspeed
            break
        case "precipitation":
            unitLabel = units.precipitation
            break
        default:
            unitLabel = "%"
    }

    return (
        <div className="h-29.5 flex flex-col gap-y-6 p-5 rounded-12 bg-neutral-800 border-neutral-600 border">
            <p className="text-preset-6">{label}</p>
            <p className="text-preset-3">{Math.floor(value)} {unitLabel}</p>
        </div>
    )
}

function WeatherDetailLoading(): JSX.Element {
    return (
        <div className="h-29.5 flex flex-col gap-y-6 p-5 rounded-12 bg-neutral-800 border-neutral-600 border justify-center items-center">
            <img src={LoadingIcon} alt="Loading Icon" className="w-10 h-10 spin-slow" />
        </div>
    )
}
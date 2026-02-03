import { Header } from "@/components/header/Header";
import { SearchContainer } from "@/components/main/SearchContainer"
import { WeatherInfoContainer } from "@/components/main/WeatherInfoContainer"
import { DailyForecastContainer } from "@/components/main/DailyForecastContainer"
import { HourlyForecastContainer } from "@/components/main/HourlyForecastContainer"
import { useGlobalStore } from "@/hooks/useGlobalStore"
import { useShallow } from "zustand/react/shallow"
import { ApiError } from "@/components/ApiError"
import { getNavigatorLocation } from "@/utils"
import { useEffect, type JSX } from "react";

export function App(): JSX.Element {
  const { fetchWeatherData, weatherData, error } = useGlobalStore(
    useShallow((store) => ({
      fetchWeatherData: store.fetchDataFunction,
      weatherData: store.fetchedData,
      error: store.error
    }))
  )

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    getNavigatorLocation()
      .then((location) => {
        fetchWeatherData(location, signal)
      })
      .catch(() => {
        // Set default location to Paris, France
        fetchWeatherData({ latitude: 48.8566, longitude: 2.3522 }, signal)
      })

    return () => abortController.abort()
  }, [fetchWeatherData])

  if (error) return (
    <>
      <Header />
      <ApiError />
    </>
  )

  return (
    <>
      <Header />
      <p className="text-preset-2 text-center md:w-96 xl:w-183 md:mx-auto">How's the sky looking today?</p>
      <main className="flex flex-col gap-y-8 xl:gap-y-12">
        <SearchContainer />
        {
          weatherData === null
            ? <p className="text-preset-4 text-center">No search result!</p>
            : <div className="flex flex-col xl:flex-row gap-y-8 xl:gap-x-8">
              <div className="xl:basis-7/10 flex flex-col gap-y-8 xl:gap-y-12">
                <WeatherInfoContainer />
                <DailyForecastContainer />
              </div>
              <div className="xl:basis-3/10">
                <HourlyForecastContainer />
              </div>
            </div>
        }

      </main>
    </>
  )
}
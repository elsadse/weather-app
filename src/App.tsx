import { Header } from "@/components/header/Header";
import { SearchContainer } from "@/components/main/SearchContainer"
import { WeatherInfoContainer } from "@/components/main/WeatherInfoContainer"
import { DailyForecastContainer } from "@/components/main/DailyForecastContainer"
import { HourlyForecastContainer } from "@/components/main/HourlyForecastContainer"
import { LocationContext } from "@/context/LocationContext";
import { useEffect, useState } from "react";
import { LocationInfoApiResponseSchema, type CurrentWeatherData, type DailyWeatherData, type HourlyWeatherData, type Location, type LocationInfo } from "@/api/types";
import { getUserPosition } from "@/utils";
import { getWeatherData } from "@/api/weatherforecastapi";
import { getLocationInfo } from "@/api/geocodingapi";

export function App() {
  const [location, setLocation] = useState<Location | null>(null)
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null)
  const [infoWeatherData, setInfoWeatherData] = useState<CurrentWeatherData | null>(null)
  const [dailyForecastData, setDailyForecastData] = useState<DailyWeatherData | null>(null)
  const [hourlyForecastData, setHourlyForecastData] = useState<HourlyWeatherData | null>(null)


  useEffect(() => {
    async function initializeLocation() {
      const userPosition: Location = await getUserPosition()
      setLocation(userPosition)
    }

    initializeLocation()
  }, [])

  useEffect(() => {
    async function getWeatherFromApi() {
      const responseData = await getWeatherData({ latitude: location!.latitude, longitude: location!.longitude })
      if (!responseData.success) {
        console.error(responseData.error)
        return
      }
      /*const parsedResponseData = WeatherDataSchema.safeParse(responseData.data)
      if (!parsedResponseData.success) {
        console.log(parsedResponseData.error)
        return
      }*/
      setInfoWeatherData(responseData.data.weatherInformation)
      setHourlyForecastData(responseData.data.hourlyForecast)
      setDailyForecastData(responseData.data.dailyForecast)
    }

    async function getCityNameFromApi() {
      const responseData = await getLocationInfo({ latitude: location!.latitude, longitude: location!.longitude })
      if (!responseData.success) {
        console.error(responseData.error)
        return
      }
      const parsedResponseData = LocationInfoApiResponseSchema.safeParse(responseData.data)
      if (!parsedResponseData.success) {
        console.log(parsedResponseData.error)
        return
      }
      setLocationInfo(parsedResponseData.data)
    }

    getWeatherFromApi()
    getCityNameFromApi()
  }, [location])

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <Header />
      <div className="md:w-120.5 xl:w-304 mx-auto">
        <p className="text-preset-2 text-center">How's the sky looking today?</p>
      </div>
      <div className="flex flex-col gap-y-8">
        <SearchContainer />
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="xl:basis-7/10 flex flex-col gap-y-8 xl:gap-y-12">
            {infoWeatherData && locationInfo && <WeatherInfoContainer infoWeatherData={infoWeatherData} locationInfo={locationInfo} />}
            {dailyForecastData && <DailyForecastContainer dailyForecastData={dailyForecastData} />}
          </div>
          <div className="xl:basis-3/10">
            {hourlyForecastData && <HourlyForecastContainer hourlyForecastData={hourlyForecastData} />}
          </div>
        </div>
      </div>
    </LocationContext.Provider>
  );
}

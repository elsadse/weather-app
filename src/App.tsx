import { Header } from "@/components/header/Header";
import { SearchContainer } from "@/components/main/SearchContainer"
import { WeatherInfoContainer } from "@/components/main/WeatherInfoContainer"
import { DailyForecastContainer } from "@/components/main/DailyForecastContainer"
import { HourlyForecastContainer } from "@/components/main/HourlyForecastContainer"

export function App() {

  return (
    <>
      <Header />
      <div className="md:w-120.5 xl:w-304 mx-auto">
        <p className="text-preset-2 text-center">How's the sky looking today?</p>
      </div>
      <div className="flex flex-col gap-y-8">
        <SearchContainer />
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="xl:basis-7/10 flex flex-col gap-y-8 xl:gap-y-12">
            <WeatherInfoContainer />
            <DailyForecastContainer />
          </div>
          <div className="xl:basis-3/10">
            <HourlyForecastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

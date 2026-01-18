import "@/App.css";
import Header from "@/components/header/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { WeatherInfoContainer } from "@/components/WeatherInfoContainer/WeatherInfoContainer";
import { DailyForecastContainer } from "@/components/dailyforecast/DailyForecastContainer";
import { HourlyForecast } from "@/hourlyForecast/HourlyForecast";

export function App() {
  return (
    <div className="app-container">
      <Header />
      <div
        className="
            flex justify-center items-center
            mt-[48px] mb-[48px]
            sm:mt-[48px] sm:mb-[48px]
            md:mt-[64px] md:mb-[64px]"
      >
        <p className="text-center text-[62px]">How's the sky looking today?</p>
      </div>

      <main className="flex flex-col justify-center gap-[32px] sm:gap-[48px] md:gap-[48px] 
            px-[16px]
            sm:px-[24px]
            md:px-[112px]
            md:pb-[80px]
            "
      >
        <SearchBar/>
        <div className=" flex flex-row gap-[32px] ">
          <div className=" flex flex-col gap-[48px] ">
              <div className="">
                <WeatherInfoContainer/>
              </div>
              <div className="">
                <DailyForecastContainer/>
              </div>
          </div>
          <div className="">
            <HourlyForecast/>
          </div>
        </div>
      </main>
    </div>
  );
}

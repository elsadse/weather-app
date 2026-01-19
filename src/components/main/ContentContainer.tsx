import { DailyForecastContainer } from "@/components/main/DailyForecastContainer";
import { HourlyForecastContainer } from "@/components/main/HourlyForecastContainer";
import { WeatherInfoContainer } from "@/components/main/WeatherInfoContainer";

export function ContentContainer() {

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start  gap-8 w-[343px] md:w-[720px] lg:w-full">
            <div className="flex flex-col  gap-8 lg:gap-12 w-[343px] md:w-[720px] lg:w-[800px]">
                <WeatherInfoContainer />
                <DailyForecastContainer />
            </div>
            <HourlyForecastContainer/>
        </div>
    )
}
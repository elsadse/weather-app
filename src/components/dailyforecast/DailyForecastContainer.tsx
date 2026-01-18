//import type { DailyForecastItem } from "@/type";

import { getIconTemperature } from "@/util";

/*type DailyForecastContainerProps={
    forecasts: DailyForecastItem[];
    selectedDay?: string;
    convertTemp?: (temp: number) => number;
    unit?: 'C' | 'F';
}*/
//{forecasts}:DailyForecastContainerProps
export function DailyForecastContainer() {
  const forecasts = [
    { day: "Tue", temp: 20, high: 22, low: 16},
    { day: "Wed", temp: 21, high: 23, low: 17},
    { day: "Thu", temp: 24, high: 26, low: 19},
    { day: "Fri", temp: 25, high: 27, low: 20},
    { day: "Sat", temp: 23, high: 25, low: 18},
    { day: "Sun", temp: 25, high: 27, low: 20},
    { day: "Mon", temp: 24, high: 26, low: 19},
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <h2 className="text-[22px] font-semibold">Daily forecast</h2>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-[16px]">
        {forecasts.map((forecast, index) => (
            <div key={index} className="flex flex-col gap-[16px] p-[16px] bg-[#262540] rounded-lg">
                <div className=" flex flex justify-center">
                    <span>{forecast.day}</span>
                </div>
                <div className="flex flex justify-center h-[60px] w-[60px]">
                    <img className="" src={getIconTemperature(forecast.temp)} alt="" />
                </div>
                <div className="flex flex justify-between">
                    <span>{forecast.low+"°"}</span>
                    <span>{forecast.high+"°"}</span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}

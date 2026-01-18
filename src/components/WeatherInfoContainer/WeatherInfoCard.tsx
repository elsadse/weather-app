//import type { Units } from "@/type";

/*type WeatherInfoCardProps ={
  feelsLike: number;
  humidity: number;
  wind: number;
  precipitation: number;
  units: Units;
}*/
//{ feelsLike, humidity, wind, precipitation, units }:WeatherInfoCardProps
export function WeatherInfoCard()  {
  const metrics = [
    { 
      label: 'Feels Like', 
      //value: `${feelsLike}°`,
      value: "17°"
    },
    { 
      label: 'Humidity', 
      //value: `${humidity}%`,  
      value: "17%"
    },
    { 
      label: 'Wind', 
      //value: `${wind} ${units.windSpeed}`, 
      value: "17km/h"
    },
    { 
      label: 'Precipitation', 
      //value: `${precipitation} ${units.precipitation}`, 
      value: "17mm"
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px]">
        {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col bg-[#262540] gap-[24px] rounded-lg
                p-[20px] h-[118px] w-[182px]"
            >
                <p className="h-[22px] w-[82px] text-[18px] text-left">{metric.label}</p>
                <p className="h-[32px] w-[40px] text-[30px]">{metric.value}</p>
            </div>
        ))}
      </div>
    </>
  );
};



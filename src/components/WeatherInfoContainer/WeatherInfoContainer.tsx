import type { GeocodingData } from "@/type";
import { WeatherInfoCard } from "@/components/WeatherInfoContainer/WeatherInfoCard";
import { getIconTemperature } from "@/util";
import bg_today_large from "@/assets/images/bg-today-large.svg"
import bg_today_small from "@/assets/images/bg-today-small.svg"
import { useEffect, useState } from "react";

/*type Props= {
  location: GeocodingData;
  date: string;
  temperature: number;
  unit: 'C' | 'F';
  icon: string
}*/
//{location, date, temperature, unit, icon }: Props

export function WeatherInfoContainer () {
    const location:GeocodingData ={city:"Nice", country:"France"}
    const date: string= "Tuesday, Aug5, 2025"
    const temperature= 30
    const icon= getIconTemperature(temperature)

    const [bg, setBg] = useState(bg_today_small);

    useEffect(() => {
        const updateBg = () => {
        setBg(window.innerWidth >= 768 ? bg_today_large : bg_today_small);
        };

        updateBg();
        window.addEventListener("resize", updateBg);
        return () => window.removeEventListener("resize", updateBg);
    }, []);


    return (
        <div className="flex flex-col gap-[32px]">
            <div className={` flex flex-row justify-between items-center sm:px-[24px] sm:py-[80px] md:px-[24px] md:py-[80px]
                    h-[343px] w-[286px] 
                    sm:h-[286px] sm:w-[720px]
                    md:h-[286px] md:w-[800px]                           
                    bg-cover bg-center bg-no-repeat
                    
                `}
                style={{ backgroundImage: `url(${bg})` }}
            >
                <div className="h-[68px] w-[450px]">
                    <h2 className="">
                        {location.city}, {location.country}
                    </h2>
                    <p className="">{date}</p>
                </div>

                <div className="flex flex-row justify-between h-[120px] w-[294px]">
                     <img src={icon} alt="icon" />
                    <span className="text-[96px]">
                        {temperature+"°"}
                    </span>
                </div>
            </div>

            <div className="">
                <WeatherInfoCard />
            </div>
        </div>
  );
};

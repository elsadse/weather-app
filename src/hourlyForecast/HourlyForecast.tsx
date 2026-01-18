import icon_dropdown from "@/assets/images/icon-dropdown.svg";
import { getIconTemperature } from "@/util";
import { useState } from "react";
import { DayDropdown } from "./DayDropdown";

export function HourlyForecast() {
  const hourlyforecasts = [
    { time: "3 PM", temp: 20 },
    { time: "4 PM", temp: 20 },
    { time: "5 PM", temp: 20 },
    { time: "6 PM", temp: 19 },
    { time: "7 PM", temp: 18 },
    { time: "8 PM", temp: 18 },
    { time: "9 PM", temp: 17 },
    { time: "10 PM", temp: 17 },
  ];
  const selectedDay = "Tuesday";

  const[isDayDropdownOpen, setIsDayDropdownOpen]= useState(false)

  function handleDropdown(){
    setIsDayDropdownOpen(!isDayDropdownOpen)
  }

  return (
    <>
    <div
      className="flex flex-col bg-[#262540] w-[384px] h-[710px]
            rounded-lg p-[24px]
            overflow-auto
            scrollbar-thin              
            scrollbar-thumb-[#302F4A]    
            scrollbar-track-transparent 
            scrollbar-thumb-rounded-full 
        "
    >
        <div className="flex flex-row justify-between items-center h-[37px] mb-[16px]">
            <span className="flex justify-center"> Hourly forecast</span>
            <button className="flex items-center bg-[#3C3B5E] rounded-lg px-[16px] py-[8px] gap-[12px]"
                onClick={handleDropdown}
            >
                <span className="">{selectedDay}</span>
                <img src={icon_dropdown} alt="icon" />
            </button>
            {isDayDropdownOpen && (
                    <DayDropdown selectedDay={selectedDay}/>
            )}
        </div>

        <div className="flex flex-col gap-[16px]
        ">
            {hourlyforecasts.map((hour, index) => (
                <div
                    key={index}
                    className=" flex flex-row items-center gap-[8px] bg-[#302F4A] rounded-lg
                        pl-[12px] pr-[16px] py-[10px]
                        h-[60px] w-[336px]
                    "
                >
                    <span className=" flex justify-center"><img src={getIconTemperature(hour.temp)} className="h-[40px] w-[40px] mr-[8px]" alt="" /></span>
                    <span className="w-[226px] h-[24px] mr-[8px] text-[20px] ">{hour.time}</span>
                    <span className="">{hour.temp+"°"}</span>
                </div>
            ))}
        </div>
    </div>
    </>
  );
}

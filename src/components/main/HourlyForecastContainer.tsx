import DropdownIcon from "@/assets/images/icon-dropdown.svg"
import WeatherHourIcon from "@/assets/images/icon-rain.webp"
import { useState } from "react"

export function HourlyForecastContainer() {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    return (
        <div className="flex flex-col w-[343px] md:w-[720px] lg:w-[384px] gap-4 px-4 py-5 md:p-6 rounded-20 bg-neutral-800">
            <div className="flex flex-row justify-between items-center">
                <span className="text-preset-5">Hourly forecast</span>
                <div className="relative">
                    <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex flex-row gap-x-3 px-4 py-2 rounded-8 bg-neutral-600 items-center cursor-pointer">
                        <span className="font-dm-medium">Tuesday</span>
                        <img src={DropdownIcon} alt="Units icon"
                            className={` w-3 h-4.5 transform ${isDropdownOpen ? '-rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`}
                        />
                    </div>
                    {isDropdownOpen && <DaysDropdown selectedDay="Tuesday" />}
                </div>
            </div>
            <HourlyWeatherCard hour="3PM" temp={68} />
            <HourlyWeatherCard hour="3PM" temp={68} />
            <HourlyWeatherCard hour="3PM" temp={68} />
            <HourlyWeatherCard hour="3PM" temp={68} />
            <HourlyWeatherCard hour="3PM" temp={68} />
            <HourlyWeatherCard hour="3PM" temp={68} />
            <HourlyWeatherCard hour="3PM" temp={68} />
            <HourlyWeatherCard hour="3PM" temp={68} />
        </div>
    )
}

type DaysDropdownProps = {
    selectedDay: string
}

function DaysDropdown({ selectedDay }: DaysDropdownProps) {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    return (
        <div className="absolute top-13 right-5 flex flex-col w-[214px] p-2 rounded-12 bg-neutral-800 gap-2.5">
            {days.map((day) => {
                const isSelected = day === selectedDay;
                return (
                    <span className={` h-[39px] w-[198px] px-[8px] py-[10px] text-preset-7
                        ${isSelected ? "bg-neutral-700 rounded-8" : "hover:bg-neutral-700 hover:rounded-8"}
                        cursor-pointer 
                    `}>
                        {day}
                    </span>
                )
            })}
        </div>
    )
}

type HourlyWeatherCardProps = {
    hour: string,
    temp: number
}

function HourlyWeatherCard({ hour, temp }: HourlyWeatherCardProps) {

    return (
        <div className="grid grid-cols-[4rem_auto_4rem] justify-stretch w-[311px] md:w-[672px] lg:w-[336px] h-15 bg-neutral-700 items-center rounded-8">
            <img src={WeatherHourIcon} className="w-10 h-10" alt="weather ixon" />
            <span className="text-preset-5">{hour}</span>
            <span className="text-preset-7">{temp + "°"}</span>
        </div>
    )
}
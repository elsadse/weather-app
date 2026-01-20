import type { HourlyWeatherData } from "@/api/types"
import DropdownIcon from "@/assets/images/icon-dropdown.svg"
import { getIcon } from "@/utils"
import { useEffect, useState } from "react"

export function HourlyForecastContainer({ hourlyForecastData }: { hourlyForecastData: HourlyWeatherData }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [selectedDay, setSelectedDay] = useState<Date>(new Date)
    const [currentHour, setCurrentHour] = useState<number>(new Date().getHours())

    const generateAvailableDays = (): Date[] => {
        const today = new Date()
        const days: Date[] = []
        for (let i = 0; i < 7; i++) {
            const date = new Date(today)
            date.setDate(today.getDate() + i)
            days.push(date)
        }
        return days
    }
    const filterHourlyDataForSelectedDay = () => {
        if (!hourlyForecastData || hourlyForecastData.length === 0) return []
        const selectedDate = selectedDay
        const selectedDayNum = selectedDate.getDate()
        const selectedMonth = selectedDate.getMonth()
        const selectedYear = selectedDate.getFullYear()
        const dayData = hourlyForecastData.filter(item => {
            const itemDate = item.datetime
            return itemDate.getDate() === selectedDayNum &&
                itemDate.getMonth() === selectedMonth &&
                itemDate.getFullYear() === selectedYear
        })
        const isToday = selectedDate.getDate() === new Date().getDate() &&
            selectedDate.getMonth() === new Date().getMonth() &&
            selectedDate.getFullYear() === new Date().getFullYear()
        if (isToday) {
            return dayData.filter(item => item.datetime.getHours() >= currentHour)
        }
        return dayData
    }
    const filteredData = filterHourlyDataForSelectedDay()

    useEffect(() => {
        setCurrentHour(new Date().getHours())
    }, [])

    useEffect(() => {
        if (!isDropdownOpen) return

        const timeoutId = setTimeout(() => {
            setIsDropdownOpen(false)
        }, 5000)

        return () => clearTimeout(timeoutId)
    }, [isDropdownOpen])

    const handleDaySelect = (day: Date) => {
        setSelectedDay(day)
        setIsDropdownOpen(false)
    }

    return (
        <div className="h-171.25 max-h-171.25 md:max-h-173.25 overflow-y-auto flex flex-col gap-4 px-4 py-5 md:p-6 rounded-20 bg-neutral-800">
            <div className="flex flex-row justify-between items-center">
                <span className="text-preset-5">Hourly forecast</span>
                <div className="relative">
                    <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex flex-row gap-x-3 px-4 py-2 rounded-8 bg-neutral-600 items-center cursor-pointer">
                        <span className="font-dm-medium">{selectedDay.toLocaleDateString("en-US", { weekday: "long" })}</span>
                        <img src={DropdownIcon} alt="Units icon"
                            className={` w-3 h-4.5 transform ${isDropdownOpen ? '-rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`}
                        />
                    </div>
                    {isDropdownOpen && <DaysDropdown selectedDay={selectedDay} days={generateAvailableDays()} onSelect={handleDaySelect} />}
                </div>
            </div>
            {filteredData.length > 0 && (
                filteredData.map((item, index) => {
                    return (
                        <HourlyWeatherCard
                            key={index}
                            hour={item.datetime.toLocaleString("en-US", { hour: "numeric" })}
                            temperature={Math.round(item.temperature)}
                            code={item.codeIcon}
                        />
                    )
                })
            )}
        </div>
    )
}

type DaysDropdownProps = {
    days: Date[],
    selectedDay: Date,
    onSelect: (day: Date) => void
}

function DaysDropdown({ days, selectedDay, onSelect }: DaysDropdownProps) {

    return (
        <div className="absolute right-0 top-12 flex flex-col w-53.5 p-2 rounded-12 bg-neutral-800 gap-2.5 border border-neutral-600">
            {days.map((day, index) => {
                const isSelected = day.getDate() === selectedDay.getDate() &&
                    day.getMonth() === selectedDay.getMonth() &&
                    day.getFullYear() === selectedDay.getFullYear()
                return (
                    <span key={index} onClick={() => onSelect(day)}
                        className={` h-9.75 px-[8px] py-[10px] text-preset-7
                        ${isSelected ? "bg-neutral-700 rounded-8" : "hover:bg-neutral-700 hover:rounded-8"}
                        cursor-pointer 
                    `}>
                        {day.toLocaleDateString("en-US", { weekday: "long" })}
                    </span>
                )
            })}
        </div>
    )
}

function HourlyWeatherCard({ hour, temperature, code }: { hour: string, temperature: number, code: number }) {

    return (
        <div className="h-15 flex flex-row gap-x-2 pl-3 pr-4 py-2.5 rounded-8 bg-neutral-700 border border-neutral-600 items-center justify-between">
            <img src={getIcon(code)} className="w-10 h-10" alt="weather ixon" />
            <span className="w-full text-preset-5">{hour}</span>
            <span className="text-preset-7">{temperature + "°"}</span>
        </div>
    )
}
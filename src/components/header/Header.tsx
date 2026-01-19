import WeatherAppLogo from "@/assets/images/logo.svg"
import UnitsIcon from "@/assets/images/icon-units.svg"
import DropdownIcon from "@/assets/images/icon-dropdown.svg"
import CheckMarkIcon from "@/assets/images/icon-checkmark.svg"
import { useEffect, useState } from "react"

export function Header() {

    return (
        <div className="flex flex-row justify-between items-center h-8.25 md:h-10.75">
            <img src={WeatherAppLogo} alt="weather app logo" className="h-full w-auto" />
            <SettingContainer />
        </div>
    )
}

function SettingContainer() {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    useEffect(() => {
        if (!isDropdownOpen) return

        const timeoutId = setTimeout(() => {
            setIsDropdownOpen(false)
        }, 5000)

        return () => clearTimeout(timeoutId)
    }, [isDropdownOpen]);

    return (
        <div className="relative">
            <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex flex-row gap-x-1.5 md:gap-2.5 xl:gap-3 px-2.5 md:px-4 py-2 md:py-3 justify-between items-center bg-neutral-800 rounded-6 cursor-pointer"
            >
                <img src={UnitsIcon} alt="Units icon" className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="font-dm-medium text-preset-8 md:text-preset-7">Units</span>
                <img src={DropdownIcon} alt="Units icon"
                    className={`w-2.25 h-3.5 md:h-4.5 md:w-3.5 transform ${isDropdownOpen ? '-rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`} />
            </div>
            {isDropdownOpen && <UnitDropdown />}
        </div>
    )
}

type UnitSystem = 'imperial' | 'metric'

function UnitDropdown() {
    const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial")

    return (
        <div
            className="w-55 h-auto flex flex-col gap-y-1 px-2 py-1.5 rounded-12 bg-neutral-800 absolute right-0 top-10 md:top-13 z-10"
        >
            <span onClick={() => setUnitSystem(unitSystem === "imperial" ? "metric" : "imperial")}
                className="h-10 px-2 py-2.5 text-preset-7 rounded-8 cursor-pointer"
            >
                Switch to <span className="capitalize">{unitSystem}</span>
            </span>
            <UnitDropdownOption unitSystem={unitSystem} label="Temperature" metric="Celsius (°C)"
                imperial="Fahrenheit (°F)" />
            <div className="h-px bg-neutral-600" />
            <UnitDropdownOption unitSystem={unitSystem} label="Wind Speed" metric="km/h"
                imperial="mph" />
            <div className="h-px bg-neutral-600" />
            <UnitDropdownOption unitSystem={unitSystem} label="Precipitation" metric="Millimeters (mm)"
                imperial="Inches (in)" />
        </div>
    )
}

type UnitDropdownOptionProps = {
    unitSystem: UnitSystem,
    label: string,
    metric: string,
    imperial: string
}

function UnitDropdownOption({ unitSystem, label, metric, imperial }: UnitDropdownOptionProps) {

    return (
        <div className="flex flex-col gap-y-2">
            <span className="px-2 pt-1.5 pb-0 text-neutral-300">{label}</span>
            <div
                className={`h-10 flex flex-row gap-x-2.5 px-2 py-2.5 ${unitSystem === "metric" && "bg-neutral-700"} rounded-8 items-center justify-between cursor-pointer`}>
                <span>{metric}</span>
                {unitSystem === "metric" && <img src={CheckMarkIcon} alt="Checkmark icon" className="h-3.5 w-4.25" />}
            </div>
            <div
                className={`h-10 flex flex-row gap-x-2.5 px-2 py-2.5 ${unitSystem === "imperial" && "bg-neutral-700"} rounded-8 items-center justify-between cursor-pointer`}>
                <span>{imperial}</span>
                {unitSystem === "imperial" && <img src={CheckMarkIcon} alt="Checkmark icon" className="h-3.5 w-4.25" />}
            </div>
        </div>

    )
}
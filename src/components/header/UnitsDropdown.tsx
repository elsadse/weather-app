import { useState } from "react";
import type { Units } from "@/type";
import { UnitButton } from "@/components/header/UnitButton";

export function UnitsDropdown() {
  const [units, setUnits] = useState<Units>({
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  });
  const [system, setSystem]=useState <"metric" | "imperial">("metric")

  function handleUnitChange<K extends keyof Units>(type: K, value: Units[K]) {
    const newUnits = { ...units };
    newUnits[type] = value;
    setUnits(newUnits);
  }

  function handleSwitchSystem ()  {
    if (system === 'metric') {
      setUnits({
        temperature: 'fahrenheit',
        windSpeed: 'mph',
        precipitation: 'inch'
      })
      setSystem("imperial")
    } else {
      setUnits({
        temperature: 'celsius',
        windSpeed: 'kmh',
        precipitation: 'mm'
      })
      setSystem("metric")
    }
  }


  return (
    <div className="p-4 md:p-0 space-y-4 md:space-y-6">
      <div className=" h-[39px] w-[198px] rounded-lg overflow-hidden">
        <button onClick={handleSwitchSystem}
          className="w-full text-white py-3 px-4 text-center font-medium cursor-pointer"
        > 
          Switch to {system === "metric" ? "Imperial" : "Metric"}
        </button>
      </div>

      {/* Temperature */}
      <div className="space-y-2">
        <p className="text-sm font-medium px-1">Temperature</p>

        <div className="grid grid-rows-2 gap-1">
          <UnitButton
            active={units.temperature === "celsius"}
            onClick={() => handleUnitChange("temperature", "celsius")}
            label="Celsius (°C)"
          />

          <UnitButton
            active={units.temperature === "fahrenheit"}
            onClick={() => handleUnitChange("temperature", "fahrenheit")}
            label="Fahrenheit (°F)"
          />
        </div>
      </div>

      {/* Ligne de séparation */}
      <div className="h-px bg-[#373650] w-full my-4"></div>

      {/* Wind Speed */}
      <div className="space-y-2">
        <p className="text-sm font-medium px-1">Wind speed</p>

        <div className="grid grid-rows-2 gap-1">
          <UnitButton
            active={units.windSpeed === "kmh"}
            onClick={() => handleUnitChange("windSpeed", "kmh")}
            label="km/h"
          />

          <UnitButton
            active={units.windSpeed === "mph"}
            onClick={() => handleUnitChange("windSpeed", "kmh")}
            label="mph"
          />
        </div>
      </div>

      {/* Ligne de séparation */}
      <div className="h-px bg-[#373650] w-full my-4"></div>

      {/* Precipitation */}
      <div className="space-y-2">
        <p className="text-sm font-medium px-1">Precipitation</p>

        <div className="grid grid-rows-2 gap-1">
          <UnitButton
            active={units.precipitation === "mm"}
            onClick={() => handleUnitChange("precipitation", "mm")}
            label="Millimeters(mm)"
          />

          <UnitButton
            active={units.precipitation === "inch"}
            onClick={() => handleUnitChange("precipitation", "inch")}
            label="Inches(in)"
          />
        </div>
      </div>
    </div>
  );
}

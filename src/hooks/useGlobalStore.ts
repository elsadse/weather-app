import { create } from "zustand/react"
import type { Coordinates, MeasureType, Nullable, Units, UnitSystem } from "@/types"
import type { WeatherData } from "@/api/types"
import { fetchWeatherData } from "@/api/weatherapi"
import * as utils from "@/utils"
import { convertWeatherData, getUnitsFor } from "@/utils"

type GlobalStore = {
    unitSystem: UnitSystem
    switchUnitSystem: () => void
    units: Units
    switchUnit: (measure: MeasureType) => void
    fetchDataFunction: (coordinates: Coordinates, signal: AbortSignal) => void
    isLoading: boolean
    fetchedData: Nullable<WeatherData>
    error: Nullable<Error>
    setError: (error: Nullable<Error>) => void
}

export const useGlobalStore = create<GlobalStore>()((set, get) => ({
        unitSystem: "metric",
        switchUnitSystem: () => set((store) => {
            const unitSystem = store.unitSystem === "metric" ? "imperial" : "metric"
            const units = utils.getUnitsFor(unitSystem)
            const convertedFetchData = convertWeatherData({
                from: store.units,
                data: store.fetchedData,
                to: units
            })
            return { unitSystem, units, fetchedData: convertedFetchData }
        }),
        units: { temperature: "celsius", windspeed: "km/h", precipitation: "mm" },
        switchUnit: (measure: MeasureType) => set((store) => {
            switch (measure) {
                case "temperature": {
                    const temperature = store.units.temperature === "celsius" ? "fahrenheit" : "celsius"
                    const units = { ...store.units, temperature } as Units
                    const unitSystem = utils.getUnitSystem(units, store.unitSystem)
                    const convertedFetchData = convertWeatherData({
                        from: store.units,
                        data: store.fetchedData,
                        to: units
                    })
                    return { unitSystem, units, fetchedData: convertedFetchData }
                }
                case "windspeed": {
                    const windspeed = store.units.windspeed === "km/h" ? "mph" : "km/h"
                    const units = { ...store.units, windspeed } as Units
                    const unitSystem = utils.getUnitSystem(units, store.unitSystem)
                    const convertedFetchData = convertWeatherData({
                        from: store.units,
                        data: store.fetchedData,
                        to: units
                    })
                    return { unitSystem, units, fetchedData: convertedFetchData }
                }
                case "precipitation": {
                    const precipitation = store.units.precipitation === "mm" ? "in" : "mm"
                    const units = { ...store.units, precipitation } as Units
                    const unitSystem = utils.getUnitSystem(units, store.unitSystem)
                    const convertedFetchData = convertWeatherData({
                        from: store.units,
                        data: store.fetchedData,
                        to: units
                    })
                    return { unitSystem, units, fetchedData: convertedFetchData }
                }
            }
        }),
        fetchDataFunction: (coordinates: Coordinates, signal: AbortSignal) => {
            const units = get().units
            set({ isLoading: true })
            fetchWeatherData(coordinates, signal)
                .then((result) => {
                    if (!signal.aborted) {
                        if (result.success) {
                            const convertedFetchData = convertWeatherData({
                                from: getUnitsFor("metric"),
                                data: result.data,
                                to: units
                            })
                            set({ fetchedData: convertedFetchData, error: null, isLoading: false })
                        } else {
                            set({ fetchedData: null, error: result.error, isLoading: false })
                        }
                    }
                })
                .catch((error) => {
                    if (error.name !== "AbortError") {
                        console.error(`Error fetching weather data: ${error}`)
                    }
                    if (!signal.aborted) set({ fetchedData: null, error: error, isLoading: false })
                })
                .finally(() => {
                    if (!signal.aborted) set({ isLoading: false })
                })
        },
        isLoading: false,
        fetchedData: null,
        error: null,
        setError: (error: Nullable<Error>) => set({ error }),
    }),
)
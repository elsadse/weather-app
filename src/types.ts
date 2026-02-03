export type Nullable<T> = T | null
export type Result<T> =
    | { success: false, error: Error }
    | { success: true, data: T }

export type Coordinates = {
    latitude: number
    longitude: number
}

export type UnitSystem = "imperial" | "metric"
export type MeasureType = "temperature" | "windspeed" | "precipitation"
export type UnitFor<T extends MeasureType> =
    T extends "temperature" ? "celsius" | "fahrenheit" :
    T extends "windspeed" ? "km/h" | "mph" :
    T extends "precipitation" ? "mm" | "in"
    : never

export type Units = { [K in MeasureType]: UnitFor<K> }
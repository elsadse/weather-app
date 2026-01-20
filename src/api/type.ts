import { z } from "zod"

export const LocationsApiSchema = z.object({
    id: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    name: z.string(),
    admin1: z.string().optional(),
    country: z.string()
})

export const LocationsResponseApiSchema = z.array(LocationsApiSchema)

export const LocationsResultSchema = LocationsApiSchema.transform((item: z.infer<typeof LocationsApiSchema>) => ({
    id: item.id,
    city: item.name,
    region: item.admin1 ?? "",
    country: item.country,
    latitude: item.latitude,
    longitude: item.longitude,
}))

export type LocationsResult = z.infer<typeof LocationsResultSchema>

export const WeatherDataSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    currentWeatherData: z.object({
        day: z.string(),
        temperature: z.number(),
        humidity: z.number(),
        temperatureFeel: z.number(),
        precipitation: z.number(),
        iconCode: z.number(),
        wind: z.number(),
    }),
    hourlyWeatherData: z.object({
        hours: z.string().array(),
        temperatures: z.number().array(),
        iconCodes: z.number().array(),
    }),
    dailyWeatherData: z.object({
        days: z.string().array(),
        temperaturesMax: z.number().array(),
        temperaturesMin: z.number().array(),
        iconCodes: z.number().array(),
    })
})

export type WeatherData = {
    latitude: number,
    longitude: number,
    currentWeatherData: {
        day: string,
        temperature: number,
        humidity: number,
        temperatureFeel: number,
        precipitation: number,
        iconCode: number,
        wind: number,
    },
    hourlyWeatherData: {
        hours: string[],
        temperatures: number[][],
        iconCodes: number[][],
    },
    dailyWeatherData: {
        days: string[],
        temperaturesMax: number[],
        temperaturesMin: number[],
        iconCodes: number[],
    }
}


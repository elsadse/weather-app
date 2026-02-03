import {
    GeoLocationsApiResponseSchema,
    type GeoLocation,
    GeoLocationSchema,
    type GeoLocationApiResponse, ReverseGeocodingApiResponseSchema
} from "@/api/types"
import type { Coordinates, Result } from "@/types"
import { z } from "zod"

export async function fetchMatchingLocation(searchTerm: string, signal: AbortSignal): Promise<Result<GeoLocation[]>> {
    const params = new URLSearchParams({
        name: searchTerm,
        count: "20",
        language: "en",
        format: "json"
    })
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`, { signal })
    if (response.status !== 200) {
        return { success: false, error: new Error("Failed to fetch geocoding data.") }
    }

    const content = await response.json()
    if (!content["results"]) {
        return { success: false, error: new Error("No geocoding results found.") }
    }

    const result = GeoLocationsApiResponseSchema.safeParse(content["results"])
    if (!result.success) {
        return { success: false, error: new Error(z.prettifyError(result.error)) }
    }

    const data = result.data.map((location: GeoLocationApiResponse): GeoLocation => GeoLocationSchema.parse(location))
    return { success: true, data }
}

export async function fetchLocation(coordinates: Coordinates, signal: AbortSignal): Promise<Result<string>> {
    const params = new URLSearchParams({
        latitude: `${coordinates.latitude}`,
        longitude: `${coordinates.longitude}`,
        localityLanguage: "en"
    })
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`, { signal })
    if (response.status !== 200) {
        return { success: false, error: new Error("Failed to fetch location.") }
    }

    const result = ReverseGeocodingApiResponseSchema.safeParse(await response.json())
    if (!result.success) {
        return { success: false, error: result.error }
    }

    return { success: true, data: `${result.data.city}, ${result.data.countryName}` }
}

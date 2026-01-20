import { LocationInfoApiResponseSchema, LocationsApiResponseSchema, MatchedLocationSchema, type LocationInfo, type MatchedLocation, type Result } from "@/api/types"

export async function fetchLocations(searchQuery: string): Promise<Result<MatchedLocation[]>> {
    const params = new URLSearchParams({
        name: searchQuery,
        count: "20",
        language: "en",
        format: "json"
    })
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`)
    if (response.status !== 200) {
        return { success: false, error: new Error("Failed to fetch geocoding data.") }
    }
    const apiResponseData = await response.json()
    if (!apiResponseData.results) {
        return { success: false, error: new Error("No geocoding results found.") }
    }
    const parsedApiResponseData = LocationsApiResponseSchema.safeParse(apiResponseData.results)
    if (!parsedApiResponseData.success) {
        return { success: false, error: parsedApiResponseData.error }
    }
    const parsedLocations = MatchedLocationSchema.array().safeParse(parsedApiResponseData.data)
    if (!parsedLocations.success) {
        return { success: false, error: parsedLocations.error }
    }
    return { success: true, data: parsedLocations.data }
}


export async function getLocationInfo({ latitude, longitude }: { latitude: number, longitude: number }): Promise<Result<LocationInfo>> {
    const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        localityLanguage: "en"
    })
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`)
    if (response.status !== 200) {
        return { success: false, error: new Error("Failed to get location information.") }
    }
    const apiResponseData = await response.json()
    const parsedApiResponseData = LocationInfoApiResponseSchema.safeParse(apiResponseData)
    if (!parsedApiResponseData.success) {
        return { success: false, error: parsedApiResponseData.error }
    }
    return { success: true, data: parsedApiResponseData.data }
}
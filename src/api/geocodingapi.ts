import { LocationsApiResponseSchema, MatchedLocationSchema, type MatchedLocation, type Result } from "@/api/types"

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

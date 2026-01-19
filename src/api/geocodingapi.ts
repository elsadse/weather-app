import type { LocationsResult } from "@/api/type"
import { LocationsResponseApiSchema, LocationsResultSchema } from "@/api/type"

export async function fetchLocations(searchQuery: string): Promise<{ results: LocationsResult[]; error?: string }> {
    const params = new URLSearchParams({
        name: searchQuery,
        count: "20",
        language: "en",
        format: "json"
    })
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`)
        if (response.status !== 200) {
            return {
                results: [],
                error: "Failed to fetch geocoding data."
            };
        }
        const searchData = await response.json()
        if (!searchData.results) {
            return { results: [], error: "No geocoding results found." }
        }
        const parseResult = LocationsResponseApiSchema.safeParse(searchData.results)
        if (!parseResult.success) {
            return { results: [], error: parseResult.error.message }
        }
        const formattedSearchResults: LocationsResult[] = parseResult.data.map((item): LocationsResult => LocationsResultSchema.parse(item))
        return { results: formattedSearchResults }
    } catch (err) {
        console.error("Error while searching for location")
        return {
            results: [],
            error: "Unknown error during search"
        }
    }
}
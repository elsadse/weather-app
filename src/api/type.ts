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
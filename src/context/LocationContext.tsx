import type { Location } from "@/api/types";
import { createContext } from "react";

type LocationContextType = {
    location: Location | null,
    setLocation: (location: Location) => void
}

export const LocationContext = createContext<LocationContextType | null>(null)
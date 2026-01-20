import IconSearch from "@/assets/images/icon-search.svg";
import type { Location, MatchedLocation } from "@/api/types";
import { useCallback, useContext, useEffect, useState } from "react";
import { fetchLocations } from "@/api/geocodingapi";
import { LocationContext } from "@/context/LocationContext";

export function SearchContainer() {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [resultSSearch, setResultSSearch] = useState<MatchedLocation[]>([])
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const locationContext = useContext(LocationContext)

    useEffect(() => {
        if (searchTerm.length < 2) return

        async function searchLocation() {
            const response = await fetchLocations(searchTerm)
            if (!response.success) {
                console.error(response.error)
                return
            }
            setResultSSearch(response.data)
        }

        searchLocation()
    }, [searchTerm])

    useEffect(() => {
        console.log("DEBUG - Location context:", locationContext?.location);
    }, [locationContext?.location]);

    const handleResultClick = useCallback((result: MatchedLocation) => {
        setSearchTerm(result.city + " " + result.region + ", " + result.country)
        setResultSSearch([])
        setSelectedLocation({ latitude: result.latitude, longitude: result.longitude })
    }, [])

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (selectedLocation) {
            locationContext?.setLocation(selectedLocation)
            console.log(selectedLocation)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="md:w-164 flex flex-col md:flex-row gap-y-3 md:gap-x-4 md:mx-auto">
            <div
                className="h-14 md:w-full flex flex-row gap-x-4 px-6 py-4 items-center justify-between bg-neutral-800 rounded-12 relative">
                <img src={IconSearch} alt="Search Icon" className="w-5 h-5" />
                <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search for a place..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full focus:outline-none placeholder:text-preset-5 color-neutral-200"
                />
                {resultSSearch.length !== 0 && searchTerm.length !== 0 && <SearchDropdown results={resultSSearch} onResultClick={handleResultClick} />}
            </div>
            <button type="submit" className="h-14 px-6 py-4 rounded-12 bg-blue-500 text-preset-5 cursor-pointer">Search</button>
        </form>
    )
}

type SearchDropdownProps = {
    results: MatchedLocation[],
    onResultClick: (result: MatchedLocation) => void;
}

function SearchDropdown({ results, onResultClick }: SearchDropdownProps) {

    return (
        <div
            className="max-h-64 overflow-y-auto absolute left-0 top-16 w-85.75 md:w-147.5 xl:w-131.5 flex flex-col gap-x-1 p-2 bg-neutral-800 rounded-12">
            {
                results.map((result, index) => (
                    <div onClick={() => onResultClick(result)}
                        key={index} className=" flex flex-col px-2 py-2.5 rounded-8 hover:bg-neutral-700 cursor-pointer">
                        <span className="text-preset-6">{result.city}</span>
                        <span className="text-preset-7 text-neutral-200">{result.region}, {result.country}</span>
                    </div>
                ))
            }
        </div>
    )
}




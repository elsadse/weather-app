import { type ChangeEvent, type JSX, useEffect, useState } from "react"
import SearchIcon from "@/assets/images/icon-search.svg"
import LoadingIcon from "@/assets/images/icon-loading.svg"
import ErrorIcon from "@/assets/images/icon-error.svg"
import type { GeoLocation } from "@/api/types"
import { useGlobalStore } from "@/hooks/useGlobalStore"
import { useFetch } from "@/hooks/useFetch"
import { fetchMatchingLocation } from "@/api/geocodingapi"
import { useShallow } from "zustand/react/shallow"
import type { Coordinates, Nullable } from "@/types"

export function SearchContainer(): JSX.Element {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const {
        fetchedData: matchedLocations, setFetchedData: setMatchedLocations,
        isLoading, error, setError,
        fetchParameter: searchInput, setFetchParameter: setSearchInput
    } = useFetch<string, GeoLocation[]>(fetchMatchingLocation)

    const [searchLocation, setSearchLocation] = useState<Nullable<GeoLocation>>(null)

    const { fetchWeatherDataFunction } = useGlobalStore(
        useShallow((state) => ({
            fetchWeatherDataFunction: state.fetchDataFunction,
        }))
    )
    const [coordinates, setCoordinates] = useState<Nullable<Coordinates>>(null)

    useEffect(() => {
        if (coordinates === null) return

        const abortController = new AbortController()
        const signal = abortController.signal

        fetchWeatherDataFunction(coordinates, signal)

        return () => {
            abortController.abort()
        }
    }, [fetchWeatherDataFunction, coordinates])

    function searchInputOnChange(event: ChangeEvent<HTMLInputElement>): void {
        const value: string = event.target.value
        setSearchInput(value)
        setSearchLocation(null)
        setError(null)

        if (value.length < 2) {
            setIsDropdownOpen(false)
            setMatchedLocations([])
        } else {
            setIsDropdownOpen(true)
        }
    }

    function updateSearchInput(location: GeoLocation): void {
        setSearchInput(`${location.city}, ${location.region}, ${location.country}`)
        setSearchLocation(location)
        setIsDropdownOpen(false)
        setError(null)
    }

    function handleSearch(): void {
        if (searchLocation) {
            setCoordinates({ latitude: searchLocation.latitude, longitude: searchLocation.longitude })
            setSearchInput(null)
            setSearchLocation(null)
            setError(null)
        }
    }

    return (
        <div className="md:w-164 flex flex-col md:flex-row gap-y-3 md:gap-x-4 md:mx-auto">
            <div
                className="h-14 md:w-full flex flex-row items-center bg-neutral-800 rounded-12 relative">
                <img src={SearchIcon} alt="Search Icon" className="w-5 h-5 absolute left-6" />
                <input type="search" name="searchInput" value={searchInput ?? ""}
                    onChange={searchInputOnChange}
                    placeholder="Search for a place..."
                    className="w-full h-full pl-15 pr-5 placeholder:text-preset-5 text-preset-5 color-neutral-200 rounded-12 border-focus-neutral" />
                {
                    isDropdownOpen
                    && <SearchDropdown locations={matchedLocations} updateSearchInput={updateSearchInput}
                        isLoading={isLoading} error={error} />
                }
            </div>
            <button disabled={!searchLocation} className={`h-14 px-6 py-4 rounded-12 bg-blue-500 text-preset-5 ${!searchLocation ? "opacity-50" : "cursor-pointer border-focus-blue"
                }`} onClick={handleSearch}>Search
            </button>
        </div>
    )
}

function SearchDropdown({ locations, updateSearchInput, isLoading, error }: {
    locations: Nullable<GeoLocation[]>, updateSearchInput: (searchLocation: GeoLocation) => void, isLoading: boolean,
    error: Nullable<Error>
}): JSX.Element {

    if (error) return <SearchDropdownError error={error} />
    if (isLoading || locations === null) return <SearchDropdownLoading />

    return (
        <div
            className="w-full max-h-177 overflow-y-auto flex flex-col gap-y-1 p-2 rounded-12 bg-neutral-800 border border-neutral-700 absolute left-0 top-16 max-md:top-34"
        >
            {
                locations.length === 0
                    ? <div className="px-2 py-2.5 rounded-8">No results</div>
                    : locations.map((location: GeoLocation): JSX.Element => (
                        <div
                            key={location.id}
                            onClick={() => updateSearchInput(location)}
                            className="flex flex-col gap-y-1 px-2 py-2.5 rounded-8 hover:bg-neutral-700 hover:border hover:border-neutral-600 hover:cursor-pointer">
                            <p className="text-preset-6">{location.city}</p>
                            <p className="text-preset-7 text-neutral-300">{location.region}, {location.country}</p>
                        </div>
                    ))
            }
        </div>
    )
}

function SearchDropdownLoading(): JSX.Element {
    return (
        <div
            className="w-full max-h-177 overflow-y-auto flex flex-col gap-y-1 p-2 rounded-12 bg-neutral-800 border border-neutral-700 absolute left-0 top-16 max-md:top-34"
        >
            <div className="flex flex-row gap-x-2.5 px-2 py-2.5 justify-center items-center">
                <img src={LoadingIcon} alt="Loading Icon" className="w-4 h-4 spin-slow" />
                <p className="w-full text-preset-7">Search in progress...</p>
            </div>
        </div>
    )
}

function SearchDropdownError({ error }: { error: Error }): JSX.Element {

    return (
        <div
            className="w-full max-h-177 overflow-y-auto flex flex-col gap-y-1 p-2 rounded-12 bg-neutral-800 border border-neutral-700 absolute left-0 top-16 max-md:top-34"
        >
            <div className="flex flex-row gap-x-2.5 px-2 py-2.5 justify-center items-center">
                <img src={ErrorIcon} alt="Error Icon" className="w-4 h-4" />
                <p className="w-full text-preset-7">{error.message}</p>
            </div>
        </div>
    )
}
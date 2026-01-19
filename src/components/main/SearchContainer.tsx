import IconSearch from "@/assets/images/icon-search.svg";
import { useState } from "react";

export function SearchContainer() {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [resultSSearch, setResultSSearch] = useState<string[]>([])

    function handleKeyDown() {
        if (resultSSearch.length !== 0) {
            setResultSSearch(["City Name 1", "City Name 1", "City Name 1"])
        }
        if (searchTerm.length !== 0) setResultSSearch(["City Name", "City Name", "City Name"])
    }

    return (
        <form className="md:w-164 flex flex-col md:flex-row gap-y-3 md:gap-x-4 md:mx-auto">
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
                    onKeyDown={handleKeyDown}
                    className="w-full focus:outline-none placeholder:text-preset-5 color-neutral-200"
                />
                {resultSSearch.length !== 0 && searchTerm.length !== 0 && <SearchDropdown results={resultSSearch} />}
            </div>
            <button type="submit" className="h-14 px-6 py-4 rounded-12 bg-blue-500 text-preset-5">Search</button>
        </form>
    )
}

type SearchDropdownProps = {
    results: string[]
}

function SearchDropdown({ results }: SearchDropdownProps) {

    return (
        <div
            className="absolute left-0 top-16 w-85.75 md:w-147.5 xl:w-131.5 flex flex-col gap-x-1 p-2 bg-neutral-800 rounded-12">
            {
                results.map((result) => (
                    <span className="px-2 py-2.5 rounded-8 hover:bg-neutral-700">{result}</span>
                ))
            }
        </div>
    )
}

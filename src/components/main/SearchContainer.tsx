import IconSearch from "@/assets/images/icon-search.svg";
import { useState } from "react";

export function SearchContainer() {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [resultSSearch, setResultSSearch]= useState<string[]>([])

    function handleKeyDown(){
        if(resultSSearch.length!==0){
            setResultSSearch(["City Name 1", "City Name 1", "City Name 1"])
        }
        if(searchTerm.length!==0) setResultSSearch(["City Name", "City Name", "City Name"])
    }

    return (
        <div className="relative">
            <form className="flex flex-col  md:flex-row gap-3 md:gap-4 w-[343px] md:w-[720px] lg:w-[656px] ">
                <div className=" flex-row gap-4  h-[56px] w-full md:w-[590px] lg:w-[526px]  px-[24px] md:px-6  py-4 bg-neutral-800  rounded-12 ">
                    <img src={IconSearch}
                        alt="search icon"
                        className="absolute top-5  w-5 h-5  pointer-events-none"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder='Search for a place...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="focus:outline-none
                            text-preset-5.5 text-neutral-200 
                            placeholder:text-preset-5
                            ml-10
                        "
                    />
                </div>
                <button className="gap-4 text-preset-5.5 bg-blue-500 rounded-12 px-6 py-4 w-full md:w-[114px]">
                    Search
                </button>
            </form>
            {resultSSearch.length!==0 && searchTerm.length!==0 && <SearchDropdown results={resultSSearch}/>}
        </div>
    )
}

type SearchDropdownProps={
    results: string[]
}

function SearchDropdown({results}: SearchDropdownProps) {

    return (
        <div className=" absolute top-16  w-[343px] md:w-[590px] lg:w-[526px] flex flex-col gap-1 p-2 bg-neutral-800 rounded-12">
            {results.map((result)=>(
                <span className="px-2 py-2.5 rounded-8 hover:bg-neutral-700">{result}</span>
            ))}
        </div>
    )
}

import { useState } from "react";
import icon_search from "@/assets/images/icon-search.svg";

export function SearchBar(){
    const [searchTerm, setSearchTerm]= useState<string>('')

    function handleSubmit(){

    }

    function handleKeyDown(){
        
    }

    return(
        <div className="flex justify-center">
            <form className="flex flex-col sm:flex-row  items-center
                    w-full max-w-[600px] sm:max-w-[343px] md:max-w-[526px]
                    sm: px-[5px]
                    " 
                onSubmit={handleSubmit}
            >
                <div className="relative sm:flex-1 w-full">
                    <img src={icon_search} 
                        alt="seach icon" 
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5  pointer-events-none"
                    />
                    <input 
                        type="text" 
                        name="search" 
                        id="search" 
                        placeholder='Search for a place...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className=" h-[56px] w-full rounded-xl bg-[#262540] 
                            pl-12 pr-4 border-none 
                            focus:outline-none
                        "
                    />
                </div>
                <button type="submit"
                    className="mt-[12px] sm:mt-0 sm:ml-[16px]
                        w-full sm:w-auto
                        px-4 py-3 
                        h-[56px]
                        rounded-xl bg-[#4658D9] cursor-pointer
                    "
                >
                    Search
                </button>
            </form>
        </div>
    )
}
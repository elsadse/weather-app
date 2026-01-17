import { useState } from "react";
import icon_units from "@/assets/images/icon-units.svg";
import icon_dropdown from "@/assets/images/icon-dropdown.svg";
import { UnitsDropdown } from "@/components/header/UnitsDropdown";

export function UnitContainer() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="
          flex items-center 
          bg-[#262540] 
          px-3 py-2
          md:px-4 
          h-[33px] sm:h-[43px] md:h-[43px]
          rounded-lg 
          cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <img src={icon_units} alt="Units icon" />
        <span className="mx-[6px] sm:mx-[10px] md:mx-[10px]">Units</span>
        <img src={icon_dropdown} alt="Dropdown icon" />
      </button>

      {isDropdownOpen && (
        <div
          className="
            absolute right-0 
            flex justify-center
            z-10 md:z-auto
            mt-2 
            h-[412px] w-[214px]
            rounded-xl 
            bg-[#262540]
          "
        >
          <UnitsDropdown/>
        </div>
      )}
    </div>
  );
}


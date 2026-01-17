import { useState } from "react";
import icon_units from "@/assets/images/icon-units.svg";
import icon_dropdown from "@/assets/images/icon-dropdown.svg";

function UnitsSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

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
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={icon_units} alt="Units icon" />
        <span className="mx-[6px] sm:mx-[10px] md:mx-[10px]">Units</span>
        <img src={icon_dropdown} alt="Dropdown icon" />
      </button>

      {isOpen && (
        <div
          className="
            absolute bottom-0 
            mt-2 
            rounded-xl 
            bg-[#262540]
          "
        ></div>
      )}
    </div>
  );
}

export default UnitsSwitcher;
